// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { get_column } from './get_column';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable_number_cursors_from_zero = vscode
			.commands
			.registerTextEditorCommand('nicksays.number_cursors_from_zero', (editor, edit, args) => {
		let num=0;
		for (let selection of editor.selections){
			edit.replace(selection,num.toString());
			num++;
		}
	});
	context.subscriptions.push(disposable_number_cursors_from_zero);

	let disposable_number_cursors_from_one = vscode
			.commands
			.registerTextEditorCommand('nicksays.number_cursors_from_one', (editor, edit, args) => {
		let num=1;
		for (let selection of editor.selections){
			edit.replace(selection,num.toString());
			num++;
		}
	});
	context.subscriptions.push(disposable_number_cursors_from_one);
	
	let disposable_left_align_cursors_using_spaces = vscode
			.commands
			.registerTextEditorCommand('nicksays.left_align_cursors_using_spaces', (editor, edit, args) => {
		let max_column=0;
		for (let selection of editor.selections){
			max_column = Math.max(max_column, get_column(editor, selection.start));
		}
		
		for(let selection of editor.selections){
			edit.insert(selection.start, ''.padEnd(max_column-get_column(editor, selection.start)));
		}
	});
	context.subscriptions.push(disposable_left_align_cursors_using_spaces);

	let disposable_right_align_cursors_using_spaces = vscode
			.commands
			.registerTextEditorCommand('nicksays.right_align_cursors_using_spaces', (editor, edit, args) => {
		let max_column = 0;
		let max_width  = 0;
		for (let selection of editor.selections){
			max_column = Math.max(max_column, get_column(editor, selection.start))
			max_width = Math.max(max_width, get_column(editor, selection.end)-get_column(editor, selection.start));
		}
		for(let selection of editor.selections){
			let selection_width = get_column(editor, selection.end)-get_column(editor, selection.start);
			edit.insert(selection.start, ''.padEnd(max_column-get_column(editor, selection.start) + max_width - selection_width));
		}
	});
	context.subscriptions.push(disposable_right_align_cursors_using_spaces);


}


// this method is called when your extension is deactivated
export function deactivate() {}
