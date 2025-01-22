import * as vscode from "vscode";
import { autocompleteOllama } from "../client";

export class CustomInlineCompletionItemProvider
  implements vscode.InlineCompletionItemProvider
{
  async provideInlineCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): Promise<vscode.InlineCompletionList> {
    const contextWindow = 500;
    let textAbove = document.getText(
      new vscode.Range(new vscode.Position(0, 0), position),
    );
    let wordsAbove = textAbove.split(/\s+/);
    if (wordsAbove.length > contextWindow) {
      wordsAbove = wordsAbove.slice(wordsAbove.length - contextWindow);
    }
    textAbove = wordsAbove.join(" ");

    let textBelow = document.getText(
      new vscode.Range(
        position,
        new vscode.Position(
          document.lineCount,
          document.lineAt(document.lineCount - 1).range.end.character,
        ),
      ),
    );
    let wordsBelow = textBelow.split(/\s+/);
    if (wordsBelow.length > contextWindow) {
      wordsBelow = wordsBelow.slice(0, contextWindow);
    }

    textBelow = wordsBelow.join(" ");

    const prompt = `${textAbove}<CURSOR>${textBelow}`;
    const completions = await autocompleteOllama(prompt);

    const inlineCompletions = completions.map((c) => {
      const completionRange = new vscode.Range(
        position,
        position.translate(0, c.code_text.length),
      );

      return new vscode.InlineCompletionItem(c.code_text, completionRange);
    });

    return { items: inlineCompletions };
  }
}
