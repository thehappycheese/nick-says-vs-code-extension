import { TextEditor, TextEditorEdit } from "vscode";
import * as vscode from 'vscode';
const { showInputBox, showErrorMessage } = vscode.window;



let last_seek_expand_value = "";

export async function seek_to_next_occurrence(editor: TextEditor, edit: TextEditorEdit, ...args: any[]) {
    const search_string = await vscode.window.showInputBox({
        placeHolder: "characters to search for",
        prompt: "Move cursors forward to the next occurrence of a search string on a line. Move to end if none found.",
        value: last_seek_expand_value,
    });

    if (search_string === "" || search_string === undefined) {
        vscode.window.showErrorMessage('A character string is required, cursors have not been moved');
        return;
    }

    last_seek_expand_value = search_string;

    let new_selections: vscode.Selection[] = [];

    for (let selection of editor.selections) {
        let text_line = editor.document.lineAt(selection.end.line);
        let offset = text_line.text.slice(selection.end.character).indexOf(search_string);
        let new_position: vscode.Position;
        if (offset === -1) {
            new_position = editor.document.lineAt(selection.end.line).range.end;

        } else {
            new_position = selection.end.translate(0, offset);
        }
        new_selections.push(new vscode.Selection(new_position, new_position));
    }

    editor.selections = new_selections;
}

export async function expand_to_next_occurrence(editor: TextEditor, edit: TextEditorEdit, ...args: any[]) {
    const search_string = await vscode.window.showInputBox({
        placeHolder: "characters to search for",
        prompt: "Expand selection forward from cursors to the next occurrence of a search string on a line. Move to end if none found.",
        value: last_seek_expand_value,
    });

    if (search_string === "" || search_string === undefined) {
        vscode.window.showErrorMessage('A character string is required, cursors have not been moved');
        return;
    }

    last_seek_expand_value = search_string;

    let new_selections: vscode.Selection[] = [];

    for (let selection of editor.selections) {
        let text_line = editor.document.lineAt(selection.end.line);
        let offset = text_line.text.slice(selection.end.character).indexOf(search_string);
        if (offset === -1) {
            new_selections.push(
                new vscode.Selection(
                    selection.start,
                    editor.document.lineAt(selection.end.line).range.end
                )
            );
        } else {
            new_selections.push(
                new vscode.Selection(
                    selection.start,
                    selection.end.translate(0, offset)
                )
            );
        }
    }

    editor.selections = new_selections;
}