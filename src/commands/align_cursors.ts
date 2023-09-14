import { TextEditor, TextEditorEdit } from "vscode";
import { get_column } from "../get_column";


export function left_align_cursors_using_spaces(editor: TextEditor, edit: TextEditorEdit, ...args: any[]) {
    let max_column = 0;
    for (let selection of editor.selections) {
        max_column = Math.max(max_column, get_column(editor, selection.start));
    }

    for (let selection of editor.selections) {
        edit.insert(selection.start, ''.padEnd(max_column - get_column(editor, selection.start)));
    }
}

export function right_align_cursors_using_spaces(editor: TextEditor, edit: TextEditorEdit, ...args: any[]) {
    let max_column = 0;
    let max_width = 0;
    for (let selection of editor.selections) {
        max_column = Math.max(max_column, get_column(editor, selection.start));
        max_width = Math.max(max_width, get_column(editor, selection.end) - get_column(editor, selection.start));
    }
    for (let selection of editor.selections) {
        let selection_width = get_column(editor, selection.end) - get_column(editor, selection.start);
        edit.insert(selection.start, ''.padEnd(max_column - get_column(editor, selection.start) + max_width - selection_width));
    }
}