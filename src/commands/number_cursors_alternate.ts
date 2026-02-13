import { TextEditor, TextEditorEdit } from "vscode";
import * as vscode from 'vscode';

const { showQuickPick, showInputBox, showErrorMessage } = vscode.window;

interface FormatOption {
    label: string;
    description: string;
    format: 'letter-lower' | 'letter-upper' | 'roman-lower' | 'roman-upper';
}

const FORMAT_OPTIONS: FormatOption[] = [
    { label: 'a, b, c...', description: 'lowercase letters', format: 'letter-lower' },
    { label: 'A, B, C...', description: 'uppercase letters', format: 'letter-upper' },
    { label: 'i, ii, iii...', description: 'lowercase roman numerals', format: 'roman-lower' },
    { label: 'I, II, III...', description: 'uppercase roman numerals', format: 'roman-upper' },
];

/**
 * Convert a number (1-3999) to roman numerals
 */
function toRoman(num: number): string {
    if (num < 1 || num > 3999) {
        throw new Error('Roman numerals only supported from 1-3999');
    }

    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const numerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

    let result = '';
    for (let i = 0; i < values.length; i++) {
        while (num >= values[i]) {
            result += numerals[i];
            num -= values[i];
        }
    }
    return result;
}

/**
 * Convert an index (0-25) to a letter
 */
function toLetter(index: number, uppercase: boolean): string {
    const base = uppercase ? 65 : 97;
    return String.fromCharCode(base + index);
}

/**
 * Number cursors with alternate formats (letters or roman numerals)
 */
export async function number_cursors_alternate(editor: TextEditor, edit: TextEditorEdit, ...args: any[]) {
    const selected = await showQuickPick(FORMAT_OPTIONS, {
        placeHolder: 'Select numbering format'
    });

    if (!selected) {
        return;
    }

    const selectionCount = editor.selections.length;

    if (selected.format.startsWith('letter') && selectionCount > 26) {
        showErrorMessage(`Cannot number ${selectionCount} selections with letters (only 26 letters available from a to z)`);
        return;
    }

    if (selected.format.startsWith('roman') && selectionCount > 3999) {
        showErrorMessage(`Cannot number ${selectionCount} selections with roman numerals (only supports 1-3999)`);
        return;
    }

    await editor.edit((editBuilder) => {
        let index = 0;
        for (let selection of editor.selections) {
            let value: string;

            switch (selected.format) {
                case 'letter-lower':
                    value = toLetter(index, false);
                    break;
                case 'letter-upper':
                    value = toLetter(index, true);
                    break;
                case 'roman-lower':
                    value = toRoman(index + 1).toLowerCase();
                    break;
                case 'roman-upper':
                    value = toRoman(index + 1);
                    break;
            }

            editBuilder.replace(selection, value);
            index++;
        }
    });
}

/**
 * Number cursors with alternate formats, allowing custom starting point
 */
export async function number_cursors_alternate_from(editor: TextEditor, edit: TextEditorEdit, ...args: any[]) {
    const selected = await showQuickPick(FORMAT_OPTIONS, {
        placeHolder: 'Select numbering format'
    });

    if (!selected) {
        return;
    }

    const selectionCount = editor.selections.length;
    const isLetter = selected.format.startsWith('letter');
    const isUppercase = selected.format.endsWith('upper');

    let startIndex: number;

    if (isLetter) {
        const exampleLetter = isUppercase ? 'A' : 'a';
        const maxLetter = isUppercase ? 'Z' : 'z';
        const startInput = await showInputBox({
            placeHolder: exampleLetter,
            prompt: `Starting letter (${exampleLetter}-${maxLetter})`,
            value: exampleLetter,
            validateInput: (value) => {
                if (value.length !== 1) {
                    return 'Please enter a single letter';
                }
                const code = value.charCodeAt(0);
                const minCode = isUppercase ? 65 : 97;
                const maxCode = isUppercase ? 90 : 122;
                if (code < minCode || code > maxCode) {
                    return `Please enter a letter from ${exampleLetter} to ${maxLetter}`;
                }
                return null;
            }
        });

        if (startInput === undefined) {
            return;
        }

        const baseCode = isUppercase ? 65 : 97;
        startIndex = startInput.charCodeAt(0) - baseCode;

        const availableLetters = 26 - startIndex;
        if (selectionCount > availableLetters) {
            showErrorMessage(
                `Cannot number ${selectionCount} selections starting from '${startInput}' ` +
                `(only ${availableLetters} letters available from ${startInput} to ${maxLetter})`
            );
            return;
        }
    } else {
        const startInput = await showInputBox({
            placeHolder: '1',
            prompt: 'Starting number (1-3999)',
            value: '1',
            validateInput: (value) => {
                const num = parseInt(value, 10);
                if (isNaN(num) || num.toString() !== value) {
                    return 'Please enter a valid integer';
                }
                if (num < 1 || num > 3999) {
                    return 'Number must be between 1 and 3999';
                }
                return null;
            }
        });

        if (startInput === undefined) {
            return;
        }

        startIndex = parseInt(startInput, 10) - 1;

        const endingNumber = startIndex + selectionCount;
        if (endingNumber > 3999) {
            showErrorMessage(
                `Cannot number ${selectionCount} selections starting from ${startInput} ` +
                `(roman numerals only go up to 3999)`
            );
            return;
        }
    }

    await editor.edit((editBuilder) => {
        let index = startIndex;
        for (let selection of editor.selections) {
            let value: string;

            switch (selected.format) {
                case 'letter-lower':
                    value = toLetter(index, false);
                    break;
                case 'letter-upper':
                    value = toLetter(index, true);
                    break;
                case 'roman-lower':
                    value = toRoman(index + 1).toLowerCase();
                    break;
                case 'roman-upper':
                    value = toRoman(index + 1);
                    break;
            }

            editBuilder.replace(selection, value);
            index++;
        }
    });
}
