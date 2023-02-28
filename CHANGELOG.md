# Change Log

All notable changes to the "Multi-Cursor-Align" extension will be documented in this file.

## [Unreleased]

...

## [1.1.0] - 2023-02-28

### Changed

- Rename extension from `nick_says` to `Multi-Cursor-Align`

### Added

- `nicksays.seek_to_next_occurrence`
  - Seeks all cursors forward on the same line to the next occurrence of the specified string (or to the end of line if not found)
- `nicksays.expand_to_next_occurrence`
  - Expand the cursor forward on the same line to the next occurrence of the specified string (or to the end of line if not found).

## [1.0.3] - 2023-01-30

### Added

- `nicksays.number_cursors_from_one`
- `nicksays.right_align_cursors_using_spaces`

### Changed

- renamed `nicksays.left_align_cursors_using_spaces`
- renamed `Number Cursors from Zero`