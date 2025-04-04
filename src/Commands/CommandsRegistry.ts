import * as vscode from "vscode";
import { ICommand } from "../Interfaces/ICommand";

export class CommandRegistry {
  private _commands: Map<string, ICommand> = new Map<string, ICommand>();
  private _context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this._context = context;
  }

  public registerCommand(command: ICommand): void {
    const commandName = command.getName();
    this._commands.set(commandName, command);

    const disposable = vscode.commands.registerCommand(
      commandName,
      async () => {
        await command.execute();
      },
    );

    this._context.subscriptions.push(disposable);
  }

  public registerCommands(commands: ICommand[]): void {
    commands.forEach((command) => this.registerCommand(command));
  }

  public getCommand(commandName: string): ICommand {
    if (!this._commands.has(commandName)) {
      throw new Error(`Command ${commandName} not found`);
    }

    return this._commands.get(commandName) as ICommand;
  }
}
