import * as vscode from 'vscode';

export function get_column(editor: vscode.TextEditor, position: vscode.Position) {
	const tab_size = editor.options.tabSize as number;
	const tab_char = "\t";
	let text_line = editor.document.lineAt(position.line);
	let column = 0;
	for (let character of text_line.text.slice(0, position.character)) {
		if (character === tab_char) {
			if (column % tab_size === 0) {
				column += tab_size;
			} else {
				column += tab_size - column % tab_size;
			}
		} else {
			column += 1;
		}
	}
	return column;
}
