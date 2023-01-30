# NickSays

Adds the following text editor commands:

## Command: `Left Align`

![Left Align](./readme_extras/demo_left_align.gif)

## Command: `Right Align`

![Right Align](./readme_extras/demo_right_align.gif)

1. Open a vscode text editor or jupyter notebook text cell
2. Place multiple selections or multiple cursors (eg by using by using `Alt+Left Click` or `Ctrl+Alt+Up/Down Arrow` or other methods)
3. Press `Ctrl+Shift+P` to open the command search
4. Search for:
   - `Align Left Selections by Adding Spaces` OR
   - `Align Right Selections by Adding Spaces`
5. Spaces will be added before each cursor such that all cursors are now vertically aligned
   - Note: Weird stuff happens if there are two cursors on the same line, but it doesn't break anything; You can use Ctrl+Z to undo.

## Command: `Number Cursors from Zero` and `Number Cursors from One`

![Right Align](./readme_extras/demo_number_cursors.gif)

1. Open a vscode text editor or jupyter notebook text cell
2. place multiple selections or multiple cursors (eg by using by using `Alt+Left Click` or `Ctrl+Alt+Up/Down Arrow` or other methods)
3. Press `Ctrl+Shift+P` to open the command search
4. Search for
   - `Number Cursors from Zero` OR
   - `Number Cursors from One`
5. Numbers will be inserted at each cursor
   - starting at `0` or `1` respectively
   - *ordered in the same way that cursors were created*
