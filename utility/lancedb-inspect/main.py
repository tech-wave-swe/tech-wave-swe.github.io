#!/usr/bin/env python3
import argparse
import os
import sys
from pathlib import Path
from typing import Optional, List
import shutil
import readline  # This enables command history

import lancedb
from rich.console import Console
from rich.table import Table
from rich.syntax import Syntax
from rich.panel import Panel
from rich.prompt import Prompt
import pyarrow as pa

console = Console()

# Enable command history
# Configure readline to use arrow keys for history navigation
readline.parse_and_bind('"\\e[A": history-search-backward')
readline.parse_and_bind('"\\e[B": history-search-forward')

class LanceDBInspector:
    def __init__(self, db_path: str):
        self.db_path = Path(db_path).expanduser().absolute()
        if not self.db_path.exists():
            console.print(f"[bold red]Error:[/] Database path '{db_path}' does not exist")
            sys.exit(1)

        try:
            self.db = lancedb.connect(str(self.db_path))
            console.print(f"[green]Connected to database:[/] {self.db_path}")
        except Exception as e:
            console.print(f"[bold red]Error connecting to database:[/] {e}")
            sys.exit(1)

    def list_tables(self) -> List[str]:
        """List all tables in the database"""
        tables = list(self.db.table_names())  # Convert to List to match return type

        if not tables:
            console.print("[yellow]No tables found in the database[/]")
            return []

        table = Table(title="Database Tables")
        table.add_column("Table Name")

        for table_name in tables:
            table.add_row(table_name)

        console.print(table)
        return tables

    def show_table_schema(self, table_name: str) -> None:
        """Display the schema of a table"""
        try:
            table = self.db.open_table(table_name)
            schema_str = str(table.schema)

            console.print(Panel(
                Syntax(schema_str, "python", theme="monokai", line_numbers=True),
                title=f"Schema for '{table_name}'",
                border_style="green"
            ))
        except Exception as e:
            console.print(f"[bold red]Error getting schema for table '{table_name}':[/] {e}")

    def show_table_info(self, table_name: str) -> None:
        """Display information about a table"""
        try:
            table = self.db.open_table(table_name)
            row_count = table.count_rows()

            info_table = Table(title=f"Table Info: {table_name}")
            info_table.add_column("Property")
            info_table.add_column("Value")

            info_table.add_row("Row Count", str(row_count))
            console.print(info_table)

        except Exception as e:
            console.print(f"[bold red]Error getting info for table '{table_name}':[/] {e}")

    def show_table_data(self, table_name: str, limit: int = 10) -> None:
        """Display data from a table"""
        try:
            table = self.db.open_table(table_name)

            # Read directly without search - just get first n rows
            # Using to_pandas() because it allows direct slicing

            try:
                # First try to read all rows and slice
                arrow_data = table.to_arrow()
                # Convert to pandas to easily slice the first n rows
                # then convert back to arrow
                df = arrow_data.to_pandas().head(limit)
                arrow_data = pa.Table.from_pandas(df)
            except Exception as e:
                console.print(f"[yellow]Warning: {e}[/yellow]")
                console.print("[yellow]Trying alternative approach...[/yellow]")
                # Try using a more direct approach
                try:
                    # Use a direct scan approach - not using scanner() method as it's not available
                    console.print("[yellow]Attempting to use scan approach...[/yellow]")
                    # Try with direct pandas conversion one more time
                    arrow_data = table.to_arrow()
                    df = arrow_data.to_pandas().head(limit)
                    arrow_data = pa.Table.from_pandas(df)
                except Exception as inner_e:
                    console.print(f"[yellow]Alternative approach failed: {inner_e}[/yellow]")
                    console.print("[bold red]Unable to retrieve data using available methods.[/bold red]")
                    return

            # Convert to dictionary format for displaying
            rows = arrow_data.to_pylist()
            if not rows:
                console.print(f"[yellow]No data in table '{table_name}'[/]")
                return

            # Create a table with columns based on the first row, expanding to terminal width
            term_width = shutil.get_terminal_size().columns
            data_table = Table(title=f"Data from '{table_name}' (First {limit} rows)", width=term_width)

            # Add columns based on the first row
            columns = list(rows[0].keys())
            for col in columns:
                data_table.add_column(str(col))

            # Add rows
            for row in rows:
                # Truncate long values for display
                row_values = []
                for col in columns:
                    val = str(row[col])
                    if len(val) > 100:  # Allow longer values since we have wider table
                        val = val[:97] + "..."
                    row_values.append(val)
                data_table.add_row(*row_values)

            console.print(data_table)

        except Exception as e:
            console.print(f"[bold red]Error showing data for table '{table_name}':[/] {e}")

    def run_query(self, table_name: str, query: str, limit: int = 10) -> None:
        """Run a custom query against a table"""
        try:
            table = self.db.open_table(table_name)

            # Handle different query types
            if query.lower() == "all":
                # Just get all rows (up to limit)
                arrow_data = table.to_arrow()
                df = arrow_data.to_pandas().head(limit)
                result = pa.Table.from_pandas(df)
            elif query.startswith("where("):
                # It's a filter query
                result = eval(f"table.{query}.to_arrow()")
                df = result.to_pandas().head(limit)
                result = pa.Table.from_pandas(df)
            elif query.startswith("select("):
                # It's a select query
                result = eval(f"table.{query}.to_arrow()")
                df = result.to_pandas().head(limit)
                result = pa.Table.from_pandas(df)
            else:
                # Default to a basic query
                console.print("[yellow]Using basic query - specify 'all' to see all rows[/yellow]")
                result = table.to_arrow()
                df = result.to_pandas().head(limit)
                result = pa.Table.from_pandas(df)

            # Display results
            rows = result.to_pylist()
            if not rows:
                console.print(f"[yellow]No results returned for query on '{table_name}'[/]")
                return

            # Get terminal width for table display
            term_width = shutil.get_terminal_size().columns

            # Create a table to display results, using full terminal width
            result_table = Table(title=f"Query Results: {query}", width=term_width)

            # Add columns based on the first row
            columns = list(rows[0].keys())
            for col in columns:
                result_table.add_column(str(col))

            # Add rows
            for row in rows:
                row_values = []
                for col in columns:
                    val = str(row[col])
                    if len(val) > 100:  # Allow longer values since we have wider table
                        val = val[:97] + "..."
                    row_values.append(val)
                result_table.add_row(*row_values)

            console.print(result_table)

        except Exception as e:
            console.print(f"[bold red]Error running query on table '{table_name}':[/] {e}")

    def interactive_mode(self) -> None:
        """Run in interactive mode"""
        # Configure history file
        histfile = os.path.expanduser('~/.lancedb_history')
        try:
            readline.read_history_file(histfile)
            readline.set_history_length(1000)  # Set history size
        except FileNotFoundError:
            pass

        console.print("[bold green]LanceDB Inspector Interactive Mode[/]")
        console.print("Type 'help' for commands, 'exit' to quit")
        console.print("[dim]Use up/down arrows to navigate command history[/dim]")

        try:
            while True:
                try:
                    # Using Python's built-in input to leverage readline's history features
                    console.print("[bold blue]lancedb>[/]", end="")
                    command = input(" ")

                    if command.lower() in ('exit', 'quit'):
                        break
                    elif command.lower() == 'help':
                        self._show_help()
                    elif command.lower() == 'tables':
                        self.list_tables()
                    elif command.lower().startswith('schema '):
                        table_name = command.split(' ')[1]
                        self.show_table_schema(table_name)
                    elif command.lower().startswith('info '):
                        table_name = command.split(' ')[1]
                        self.show_table_info(table_name)
                    elif command.lower().startswith('data '):
                        parts = command.split(' ')
                        table_name = parts[1]
                        limit = int(parts[2]) if len(parts) > 2 else 10
                        self.show_table_data(table_name, limit)
                    elif command.lower().startswith('query '):
                        parts = command.split(' ', 2)
                        if len(parts) < 3:
                            console.print("[yellow]Usage: query <table_name> <query>[/]")
                        else:
                            table_name = parts[1]
                            query_str = parts[2]
                            self.run_query(table_name, query_str)
                    elif command.strip():  # Only print for non-empty commands
                        console.print("[yellow]Unknown command. Type 'help' for available commands.[/]")
                except Exception as e:
                    console.print(f"[bold red]Error:[/] {e}")
        finally:
            # Save history when exiting
            try:
                readline.write_history_file(histfile)
            except Exception:
                pass

    def _show_help(self) -> None:
        """Show help information"""
        # Get terminal width for help display
        term_width = shutil.get_terminal_size().columns

        help_table = Table(title="Available Commands", width=term_width)
        help_table.add_column("Command")
        help_table.add_column("Description")

        help_table.add_row("help", "Show this help information")
        help_table.add_row("tables", "List all tables in the database")
        help_table.add_row("schema <table_name>", "Show schema for a specific table")
        help_table.add_row("info <table_name>", "Show information about a specific table")
        help_table.add_row("data <table_name> [limit]", "Show data from a table (default limit: 10)")
        help_table.add_row("query <table_name> <query>", "Run a query against a table")
        help_table.add_row("exit/quit", "Exit the program")

        console.print(help_table)

        console.print("\n[yellow]Query Examples:[/]")
        console.print("  query tablename all                   - Show all rows")
        console.print("  query tablename where(field == value) - Filter by condition")
        console.print("  query tablename select([col1, col2])  - Select specific columns")


def main():
    parser = argparse.ArgumentParser(description="LanceDB Inspector - A utility to inspect LanceDB databases")
    parser.add_argument("db_path", nargs="?", default=os.environ.get("LANCEDB_PATH", None),
                        help="Path to the LanceDB database (or set LANCEDB_PATH environment variable)")
    parser.add_argument("-t", "--table", help="Table to inspect")
    parser.add_argument("-s", "--schema", action="store_true", help="Show table schema")
    parser.add_argument("-d", "--data", action="store_true", help="Show table data")
    parser.add_argument("-i", "--info", action="store_true", help="Show table info")
    parser.add_argument("-l", "--limit", type=int, default=10, help="Limit number of rows to display")
    parser.add_argument("--interactive", action="store_true", help="Run in interactive mode")

    args = parser.parse_args()

    if not args.db_path:
        console.print("[bold red]Error:[/] Please provide a database path or set the LANCEDB_PATH environment variable")
        sys.exit(1)

    inspector = LanceDBInspector(args.db_path)

    if args.interactive:
        inspector.interactive_mode()
    elif args.table:
        if args.schema:
            inspector.show_table_schema(args.table)
        if args.info:
            inspector.show_table_info(args.table)
        if args.data:
            inspector.show_table_data(args.table, args.limit)
        # If no specific flag is set, show all information
        if not (args.schema or args.info or args.data):
            inspector.show_table_info(args.table)
            inspector.show_table_schema(args.table)
            inspector.show_table_data(args.table, args.limit)
    else:
        tables = inspector.list_tables()
        if tables and console.input("[yellow]Do you want to enter interactive mode? (y/n):[/] ").lower() == 'y':
            inspector.interactive_mode()

if __name__ == "__main__":
    os.environ["LANCEDB_PATH"] = '../../test-tmp/lancedb/'
    main()
