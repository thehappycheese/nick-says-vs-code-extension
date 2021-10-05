// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable_number_cursors = vscode.commands.registerTextEditorCommand('nicksays.number_cursors', (editor, edit, args) => {
		// The code you place here will be executed every time your command is executed
		let num=0;
		for (let selection of editor.selections){
			edit.replace(selection,num.toString());
			num++;
		}
	});
	context.subscriptions.push(disposable_number_cursors);

	let disposable_space_align_cursors = vscode.commands.registerTextEditorCommand('nicksays.space_align_cursors', (editor, edit, args) => {
		// The code you place here will be executed every time your command is executed
		
		let max_column=0;

		function get_column(position:vscode.Position){
			const tab_size = editor.options.tabSize as number;
			const tab_char = "\t";

			let text_line = editor.document.lineAt(position.line);
			let column = 0;
			for(let character of text_line.text.slice(0, position.character)){
				if (character === tab_char){
					if(column % tab_size == 0){
						column += tab_size;
					}else{
						column += tab_size - column % tab_size;
					}
				}else{
					column+=1;
				}
			}
			return column
		}

		for (let selection of editor.selections){
			max_column = Math.max(max_column, get_column(selection.start))
		}
		
		for(let selection of editor.selections){
			edit.insert(selection.start, ''.padEnd(max_column-get_column(selection.start)))
		}
	});
	context.subscriptions.push(disposable_space_align_cursors);

}

// this method is called when your extension is deactivated
export function deactivate() {}
