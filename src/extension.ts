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
			.registerTextEditorCommand('engineernick.multi-cursor-tools.number_cursors_from_zero', (editor, edit, args) => {
		let num=0;
		for (let selection of editor.selections){
			edit.replace(selection,num.toString());
			num++;
		}
	});
	context.subscriptions.push(disposable_number_cursors_from_zero);

	let disposable_number_cursors_from_one = vscode
			.commands
			.registerTextEditorCommand('engineernick.multi-cursor-tools.number_cursors_from_one', (editor, edit, args) => {
		let num=1;
		for (let selection of editor.selections){
			edit.replace(selection,num.toString());
			num++;
		}
	});
	context.subscriptions.push(disposable_number_cursors_from_one);
	
	let disposable_number_cursors_from_arbitrary = vscode
			.commands
			.registerTextEditorCommand('engineernick.multi-cursor-tools.number_cursors_from_arbitrary', (editor, edit, args) => {
		vscode.window.showInputBox({
			placeHolder: "1",
			prompt: "Starting number",
			value: 1
		}).then((num)=>{
			if(parseFloat(num).toString() == num){
				editor.edit((edit)=>{
					for (let selection of editor.selections){
						edit.replace(selection,num.toString());
						num++;
					}
				});
			}else{
				console.error(num);
			}
		},
		console.error);
	});
	context.subscriptions.push(disposable_number_cursors_from_arbitrary);

	let disposable_number_cursors_from_arbitrary_with_steps = vscode
			.commands
			.registerTextEditorCommand('engineernick.multi-cursor-tools.number_cursors_from_arbitrary_with_steps', (editor, edit, args) => {
		vscode.window.showInputBox({
			placeHolder: "1",
			prompt: "Starting number",
			value: 1
		}).then((num)=>{
			if(typeof num === 'number' && !Number.isNaN(num)){
				vscode.window.showInputBox({
					placeHolder: "1",
					prompt: "Steps",
					value: 1
				}).then((step)=>{
					if(typeof step === 'number' && !Number.isNaN(step)){
						editor.edit((edit)=>{
							for (let selection of editor.selections){
								edit.replace(selection,num.toString());
								num+=step;
							}
						});
					}else{
						console.error(step);
					}
				},
				console.error);
			}else{
				console.error(num);
			}
		},
		console.error);
	});
	context.subscriptions.push(disposable_number_cursors_from_arbitrary_with_steps);
	
	let disposable_left_align_cursors_using_spaces = vscode
			.commands
			.registerTextEditorCommand('engineernick.multi-cursor-tools.left_align_cursors_using_spaces', (editor, edit, args) => {
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
			.registerTextEditorCommand('engineernick.multi-cursor-tools.right_align_cursors_using_spaces', (editor, edit, args) => {
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



	let last_seek_expand_value = "";

	let disposable_seek_to_next_occurrence = vscode
			.commands
			.registerTextEditorCommand('engineernick.multi-cursor-tools.seek_to_next_occurrence', async (editor, edit, args) => {
		
		const search_string = await vscode.window.showInputBox({
			placeHolder: "characters to search for",
			prompt: "Move cursors forward to the next occurrence of a search string on a line. Move to end if none found.",
			value: last_seek_expand_value,
		});
		if (search_string==="" || search_string===undefined){
			vscode.window.showErrorMessage('A character string is required, cursors have not been moved');
			return
		}
		last_seek_expand_value = search_string;
		let new_selections:vscode.Selection[] = [];
		for (let selection of editor.selections){
			let text_line = editor.document.lineAt(selection.end.line);
			let offset = text_line.text.slice(selection.end.character).indexOf(search_string);
			let new_position:vscode.Position;
			if (offset===-1){
				new_position = editor.document.lineAt(selection.end.line).range.end;
				
			}else{
				new_position = selection.end.translate(0, offset);
			}
			new_selections.push(new vscode.Selection(new_position, new_position))
		}
		editor.selections = new_selections;
	});
	context.subscriptions.push(disposable_seek_to_next_occurrence);

	let disposable_expand_to_next_occurrence = vscode
			.commands
			.registerTextEditorCommand('engineernick.multi-cursor-tools.expand_to_next_occurrence', async (editor, edit, args) => {
		
		const search_string = await vscode.window.showInputBox({
			placeHolder: "characters to search for",
			prompt: "Expand selection forward from cursors to the next occurrence of a search string on a line. Move to end if none found.",
			value: last_seek_expand_value,
		});
		if (search_string==="" || search_string===undefined){
			vscode.window.showErrorMessage('A character string is required, cursors have not been moved');
			return
		}
		last_seek_expand_value = search_string;
		let new_selections:vscode.Selection[] = [];
		for (let selection of editor.selections){
			let text_line = editor.document.lineAt(selection.end.line);
			let offset = text_line.text.slice(selection.end.character).indexOf(search_string);
			if (offset===-1){
				new_selections.push(
					new vscode.Selection(
						selection.start,
						editor.document.lineAt(selection.end.line).range.end
					)
				);
			}else{
				new_selections.push(
					new vscode.Selection(
						selection.start,
						selection.end.translate(0, offset)
					)
				);
			}
		}
		editor.selections = new_selections;
	});
	context.subscriptions.push(disposable_expand_to_next_occurrence);
	


}


// this method is called when your extension is deactivated
export function deactivate() {}
