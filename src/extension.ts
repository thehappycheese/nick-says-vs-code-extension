import * as vscode from 'vscode';
import { get_column } from './get_column';
import { number_cursors_from_arbitrary, number_cursors_from_arbitrary_with_step, number_cursors_from_one, number_cursors_from_zero } from './commands/number_cursors';
import { left_align_cursors_using_spaces, right_align_cursors_using_spaces } from './commands/align_cursors';
import { expand_to_next_occurrence, seek_to_next_occurrence } from './commands/seek_selections';
import { newline_above } from './commands/newline_above';

let registerTextEditorCommand = vscode.commands.registerTextEditorCommand;

export function activate(context: vscode.ExtensionContext) {
    
    let register_and_subscribe:typeof vscode.commands.registerTextEditorCommand = (command_name, command_function) => {
        let disposable = registerTextEditorCommand(command_name, command_function);
        context.subscriptions.push(disposable);
        return disposable;
    }

    register_and_subscribe(
        'engineernick.multi-cursor-tools.number_cursors_from_zero',
        number_cursors_from_zero
    );

    register_and_subscribe(
        'engineernick.multi-cursor-tools.number_cursors_from_one',
        number_cursors_from_one
    );

    register_and_subscribe(
        'engineernick.multi-cursor-tools.number_cursors_from_arbitrary',
        number_cursors_from_arbitrary
    );

    register_and_subscribe(
        'engineernick.multi-cursor-tools.number_cursors_from_arbitrary_with_step',
        number_cursors_from_arbitrary_with_step
    );

    register_and_subscribe(
        'engineernick.multi-cursor-tools.left_align_cursors_using_spaces',
        left_align_cursors_using_spaces
    );

    register_and_subscribe(
        'engineernick.multi-cursor-tools.right_align_cursors_using_spaces',
        right_align_cursors_using_spaces
    );
    
    register_and_subscribe(
        'engineernick.multi-cursor-tools.seek_to_next_occurrence',
        seek_to_next_occurrence
    );
    register_and_subscribe(
        'engineernick.multi-cursor-tools.expand_to_next_occurrence',
        expand_to_next_occurrence
    );

    register_and_subscribe(
        'engineernick.multi-cursor-tools.newline_above',
        newline_above
    );

}

export function deactivate() {
    // pass
}
