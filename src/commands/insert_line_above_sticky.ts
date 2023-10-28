import { Position, Selection, TextEditor, TextEditorEdit } from "vscode";
import { get_column } from "../get_column";


/**
 * Similar to the built-in 'Insert Line Above' but it brings the text after the cursor with.
 * 
 * copy the text to the right of the start of the selection
 * to the line above the line where the selection starts
 * collapse the selection to the start of the line above
 *
 * internally this will be implemented as a normal insertion of
 * newlines, followed by a swap;
*/
export function insert_line_above_sticky(editor: TextEditor, edit: TextEditorEdit, ...args: any[]) {
    // 1. Group and Sort Selections
    const groupedSelections: { [line: number]: Selection[] } = {};
    editor.selections.forEach(selection => {
        const line = selection.start.line;
        if (!groupedSelections[line]) {
            groupedSelections[line] = [];
        }
        groupedSelections[line].push(selection);
    });

    Object.values(groupedSelections).forEach(selections => {
        selections.sort((a, b) => a.start.character - b.start.character);
    });

    // Sort lines in reverse order to handle edits correctly
    const lines = Object.keys(groupedSelections).map(Number).sort((a, b) => b - a);

    // 2. Process Each Line
    const newSelections: Selection[] = [];
    lines.forEach(line => {
        const selections = groupedSelections[line];
        const lineText = editor.document.lineAt(line).text;
        const segments = split_by_selections(lineText, selections);
        segments.reverse()
        const newText = segments.join('\n');
        edit.replace(editor.document.lineAt(line).range, newText);

        // 3. Update Selections
        
        newSelections.push(selections[0]);
    });

    editor.selections = newSelections;
}

function split_by_selections(text: string, selections: Selection[]): string[] {
    const segments: string[] = [];
    let lastEnd = 0;

    selections.forEach(selection => {
        const start = selection.start.character;
        const segment = text.slice(lastEnd, start);
        segments.push(segment);
        lastEnd = start;
    });

    // Add the remaining text after the last selection
    segments.push(text.slice(lastEnd));

    return segments;
}