import { TextEditor, TextEditorEdit } from "vscode";
import * as vscode from 'vscode';
const { showInputBox, showErrorMessage } = vscode.window;

/**
 * Format a number with optional padding based on user setting.
 */
function formatNumber(num: number, endingNumber: number, step: number = 1): string {
    const config = vscode.workspace.getConfiguration('multiCursorTools');
    const paddingEnabled = config.get<boolean>('paddingEnabled', false);

    if (paddingEnabled) {
        // For floats, don't pad (would be confusing)
        if (!Number.isInteger(num) || !Number.isInteger(step)) {
            return num.toString();
        }
        const maxWidth = Math.max(
            Math.abs(num).toString().length,
            Math.abs(endingNumber).toString().length
        );
        const prefix = num < 0 ? '-' : '';
        return prefix + Math.abs(num).toString().padStart(maxWidth, '0');
    }
    return num.toString();
}

export function number_cursors_from_one(editor: TextEditor, edit: TextEditorEdit, ...args: any[]) {
    let num = 1;
    const endingNumber = editor.selections.length;
    for (let selection of editor.selections) {
        edit.replace(selection, formatNumber(num, endingNumber));
        num++;
    }
}

export function number_cursors_from_zero(editor: TextEditor, edit: TextEditorEdit, ...args: any[]) {
    let num = 0;
    const endingNumber = editor.selections.length - 1;
    for (let selection of editor.selections) {
        edit.replace(selection, formatNumber(num, endingNumber));
        num++;
    }
}

export function number_cursors_from_arbitrary(editor: TextEditor, edit: TextEditorEdit, ...args: any[]) {
    showInputBox({
        placeHolder: "1",
        prompt: "Starting number",
        value: "1"
    }).then(user_input => {
        if (user_input === undefined || user_input === "") {
            showErrorMessage('A number was required. No change made.');
            return;
        }
        let num = parseFloat(user_input);
        if (Math.abs(num) >= Number.MAX_SAFE_INTEGER) {
            showErrorMessage('Number too big. No change made.');
            return;
        }
        if (!(num.toString() === user_input)) {
            showErrorMessage('Wrong number format. No change made.');
            return;
        }
        const endingNumber = num + editor.selections.length - 1;
        editor.edit((edit) => {
            for (let selection of editor.selections) {
                edit.replace(selection, formatNumber(num, endingNumber));
                num++;
            }
        });
    });
}

export function number_cursors_from_arbitrary_with_step(editor: TextEditor, edit: TextEditorEdit, ...args: any[]) {
    showInputBox({
        placeHolder: "1",
        prompt: "Starting number",
        value: "1"
    }).then(user_input => {
        if (user_input === undefined || user_input === "") {
            showErrorMessage('A number was required. No change made.');
            return;
        }
        let num = parseFloat(user_input);
        if (Math.abs(num) >= Number.MAX_SAFE_INTEGER) {
            showErrorMessage('Number too big. No change made.');
            return;
        }
        if (!(num.toString() === user_input)) {
            showErrorMessage('Wrong number format. No change made.');
            return;
        }
        showInputBox({
            placeHolder: "1",
            prompt: "Steps",
            value: "1"
        }).then(user_input_step => {
            if (user_input_step === undefined || user_input_step === "") {
                showErrorMessage('A number was required. No change made.');
                return;
            }
            const step = parseFloat(user_input_step);
            if (Math.abs(step) >= Number.MAX_SAFE_INTEGER) {
                showErrorMessage('Number too big. No change made.');
                return;
            }
            if (!(step.toString() === user_input_step)) {
                showErrorMessage('Wrong number format. No change made.');
                return;
            }
            const endingNumber = num + (editor.selections.length - 1) * step;
            editor.edit((edit) => {
                for (let selection of editor.selections) {
                    edit.replace(selection, formatNumber(num, endingNumber, step));
                    num += step;
                }
            });
        });
    });
}