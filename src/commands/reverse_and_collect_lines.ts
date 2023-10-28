import { Range, Selection, TextEditor, TextEditorEdit } from "vscode";



/**
 * Reverse lines then remove newline characters
 */
export function reverse_and_collect_lines(editor: TextEditor, edit: TextEditorEdit, ...args: any[]) {
    
    // Sort selections in reverse order based on their start line
    const selections = editor.selections.sort((a, b) => b.start.line - a.start.line);
    for (let selection of selections) {
        let selection_lines = new Range(
            editor.document.lineAt(selection.start.line).range.start,
            editor.document.lineAt(selection.end.line).range.end
        )
        let range_texts = []
        for(let i = selection_lines.start.line;i<=selection_lines.end.line;i++) {
            range_texts.push(editor.document.lineAt(i).text)
        }
        range_texts.reverse()

        edit.replace(
            selection_lines,
            range_texts.join("")
        )
        
    }
}