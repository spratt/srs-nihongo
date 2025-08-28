# Hiragana Feature Implementation Plan

## Overview
Add a tabbed interface to the Japanese SRS app to support learning Hiragana, Katakana, and Kanji separately, with each tab maintaining independent state.

## Completed Tasks
✅ Created `data_hiragana.yaml` with all 46 basic hiragana characters including mnemonics

## Remaining Implementation Steps

### 1. Create Tab Component Structure
- Create a new `TabBar` component with three tabs: Hiragana, Katakana, Kanji
- Style the tabs to match existing app design (using styled-components)
- Position tabs below the title "S.R.S. 日本語"

### 2. Refactor App Component for Multi-Dataset Support
- Convert App from class component to functional component with hooks (or keep as class with proper state management)
- Create separate state management for each tab:
  - Independent `numCorrect` and `numAnswered` counters
  - Independent `maxQuestions` setting (stored in localStorage with keys like 'maxQuestions_hiragana')
  - Independent `seenSet` tracking
  - Independent `QuestionPicker` instances with their own SRS values

### 3. Import Multiple Data Sources
- Import `data_hiragana.yaml` alongside existing `data.yaml`
- Prepare structure for future `data_katakana.yaml`
- Map tab selections to corresponding data sources

### 4. Update State Management
- Modify state structure to support multiple datasets:
  ```typescript
  interface TabState {
    facts: Record<string, Fact>;
    responses: string[];
    question: Question;
    maxQuestions: number;
    numCorrect: number;
    numAnswered: number;
    seenSet: Record<string, object>;
    questionPicker: QuestionPicker;
  }
  
  interface AppState {
    activeTab: 'hiragana' | 'katakana' | 'kanji';
    hiragana: TabState;
    katakana: TabState;
    kanji: TabState;
  }
  ```

### 5. Update localStorage Keys
- Use tab-specific keys: `maxQuestions_hiragana`, `maxQuestions_katakana`, `maxQuestions_kanji`
- Maintain backward compatibility by mapping old `maxQuestions` to `maxQuestions_kanji`

### 6. Set Hiragana as Default
- Initialize app with `activeTab: 'hiragana'`
- Load hiragana data on initial mount

### 7. Maintain Component Reusability
- Keep existing components (Summary, Prompt, buttons) unchanged
- Only modify App component and add TabBar component
- Ensure font size for hiragana displays same as kanji

### 8. Testing Plan
- Verify tab switching preserves state for each tab
- Confirm counters remain independent
- Test localStorage persistence for each tab's settings
- Ensure SRS algorithm works independently per tab

## File Changes Required
1. `src/App.tsx` - Major refactor for tab support
2. `src/TabBar.tsx` - New component (to be created)
3. `src/data_hiragana.yaml` - ✅ Already created
4. Future: `src/data_katakana.yaml` - To be created when implementing Katakana tab

## Design Decisions
- Hiragana tab will be default (most beginners start here)
- Each tab completely independent (no shared state except UI preferences)
- Reuse all existing components for consistency
- Maintain same visual design and user experience