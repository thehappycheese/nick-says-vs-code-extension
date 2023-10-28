import { Selection, TextEditor, TextEditorEdit } from "vscode";
import { get_column } from "../get_column";


/**
 * copy the text to the right of the start of the selection
 * to the line above the line where the selection starts
 * collapse the selection to the start of the line above
 *
 * internally this will be implemented as a normal insertion of
 * newlines, followed by a swap;
 */
export function newline_above(editor: TextEditor, edit: TextEditorEdit, ...args: any[]) {
    
    // Sort selections in reverse order based on their start line
    const selections = editor.selections.sort((a, b) => b.start.line - a.start.line);
    const final_selections = [];
    for (let selection of selections) {
        let line_text = editor.document.lineAt(selection.start.line).text
        let line_text_before_selection_start = line_text.slice(0, selection.start.character)
        let line_text_after_selection_start = line_text.slice(selection.start.character)
        console.log(line_text)
        console.log(editor.document.lineAt(selection.start.line).range)

        edit.replace(
            editor.document.lineAt(selection.start.line).range,
            line_text_after_selection_start + "\n" + line_text_before_selection_start
        )
        const newPosition = selection.start.with({ character: 0 });
        final_selections.push(new Selection(newPosition, newPosition));
    }
    editor.selections = final_selections;
}