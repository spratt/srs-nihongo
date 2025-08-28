# Hiragana/Katakana Row-Based Learning Implementation Plan

## Overview
Replace the current increment/decrement counter interface for Hiragana and Katakana tabs with a row-based selection system that allows users to practice specific character groups progressively.

## Character Row Structure

### Hiragana Rows (Total: 104 characters)
#### Main Rows (46 characters)
- Vowels: あ い う え お
- K-row: か き く け こ
- S-row: さ し す せ そ
- T-row: た ち つ て と
- N-row: な に ぬ ね の
- H-row: は ひ ふ へ ほ
- M-row: ま み む め も
- Y-row: や ゆ よ
- R-row: ら り る れ ろ
- W-row: わ ゐ ゑ を
- N-consonant: ん

#### Dakuten Rows (15 characters with ゛)
- G-row: が ぎ ぐ げ ご
- Z-row: ざ じ ず ぜ ぞ
- D-row: だ ぢ づ で ど

#### Han-dakuten Rows (10 characters)
- B-row: ば び ぶ べ ぼ (with ゛)
- P-row: ぱ ぴ ぷ ぺ ぽ (with ゜)

#### Combination Rows (33 characters)
- Kya-row: きゃ きゅ きょ
- Sha-row: しゃ しゅ しょ
- Cha-row: ちゃ ちゅ ちょ
- Nya-row: にゃ にゅ にょ
- Hya-row: ひゃ ひゅ ひょ
- Mya-row: みゃ みゅ みょ
- Rya-row: りゃ りゅ りょ
- Gya-row: ぎゃ ぎゅ ぎょ
- Ja-row: じゃ じゅ じょ
- Dya-row: ぢゃ ぢゅ ぢょ
- Bya-row: びゃ びゅ びょ
- Pya-row: ぴゃ ぴゅ ぴょ

### Katakana Rows (Similar structure + extras)
- Same structure as Hiragana for main, dakuten, han-dakuten
- Additional dakuten: vu-row: ヴ
- Additional combinations:
  - Va-row: ヴァ ヴィ ヴェ ヴォ
  - Wi-row: ウィ ウェ ウォ
  - Fa-row: ファ フィ フェ フォ
  - Tsa-row: ツァ ツィ ツェ ツォ
  - She-row: シェ
  - Je-row: ジェ
  - Che-row: チェ

## Implementation Steps

### 1. Create Extended Data Files
- Add dakuten, han-dakuten, and combination characters to data_hiragana.yaml
- Add dakuten, han-dakuten, and combination characters to data_katakana.yaml
- Include proper mnemonics for each new character

### 2. Create Row Selection Component
- Create RowSelector component that displays character rows in a table
- Each row shows:
  - Row name (e.g., "Vowels", "K-row")
  - Visual display of characters in the row
  - Checkbox for selection
- Selected rows should be visually distinguished (different background color)
- Checkboxes control which characters are in the practice pool

### 3. Modify App State Management
- For Hiragana and Katakana tabs:
  - Replace maxQuestions with selectedRows state
  - Store selectedRows in localStorage (e.g., 'selectedRows_hiragana')
  - Update practice pool dynamically based on selected rows
  - Reset "seen" counter when rows are selected/deselected
- Keep Kanji tab unchanged with current increment/decrement interface

### 4. Update UI Layout
- Replace "Seen X / [-]Y[+] / Z total" with:
  - "Seen: X" counter
  - RowSelector table below the counter
- Only apply to Hiragana and Katakana tabs
- Kanji tab retains current interface

### 5. Character Row Mapping
- Create mapping of row names to character lists
- Implement function to get all characters from selected rows
- Handle special cases (e.g., obsolete characters ゐ, ゑ)

### 6. Default State
- If no saved state in localStorage, default to vowels row selected
- Otherwise, restore previously selected rows

### 7. Accessibility Considerations
- Use both color and checkbox state for selected rows
- Ensure color contrast meets WCAG standards
- Test with color blindness simulators

## File Changes Required
1. `src/data_hiragana.yaml` - Add ~58 new characters
2. `src/data_katakana.yaml` - Add ~60+ new characters  
3. `src/RowSelector.tsx` - New component for row selection
4. `src/App.tsx` - Update state management and UI for Hiragana/Katakana
5. `src/characterRows.ts` - New file defining row structures

## Testing Checklist
- [ ] Row selection updates practice pool immediately
- [ ] Seen counter resets on row change
- [ ] Selected rows persist in localStorage
- [ ] Visual feedback for selected rows
- [ ] Kanji tab unchanged
- [ ] All new characters have appropriate mnemonics