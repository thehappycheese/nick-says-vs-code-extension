# Change Log

All notable changes to the "Multi-Cursor-Align" extension will be documented in
this file.

## [Unreleased]


## [1.2.0] - 2023-09-14

### Added

- `nicksays.number_cursors_from_arbitrary` (`Number cursors from ...`)
- `nicksays.number_cursors_from_arbitrary_with_step` (`Number cursors from ... choosing steps`)

## [1.1.1] - 2023-03-01

### Changed

- Changed named again from `Multi-Cursor-Align` to `Multi-Cursor Tools`

- Changed command prefixes to `Multi-Cursor` to avoid conflict with the word
  "Align" when searching in the pallet.

### Fixed

- Search now works with some special characters that were causing errors.
  Internally it now uses `String.indexOf` instead of `String.search`. The regex
  behavior of `search` was not intended for this particular feature.

## [1.1.0] - 2023-02-28

### Changed

- Rename extension from `nick_says` to `Multi-Cursor-Align`

### Added

- `nicksays.seek_to_next_occurrence`
  - Seeks all cursors forward on the same line to the next occurrence of the
    specified string (or to the end of line if not found)
- `nicksays.expand_to_next_occurrence`
  - Expand the cursor forward on the same line to the next occurrence of the
    specified string (or to the end of line if not found).

## [1.0.3] - 2023-01-30

### Added

- `nicksays.number_cursors_from_one`
- `nicksays.right_align_cursors_using_spaces`

### Changed

- renamed `nicksays.left_align_cursors_using_spaces`
- renamed `Number Cursors from Zero`


