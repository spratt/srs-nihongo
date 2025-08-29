import {shuffle,randomChoices} from './random';

export const EndOfTime = new Date(8640000000000000);

export interface QuestionPicker {
  nextQuestion(): string;
  feedback(s: string, b: boolean): void;

  isReady(): boolean;
  whenReady(): Date;
}

export class NullQuestionPicker implements QuestionPicker {
  nextQuestion(): string { return "Not implemented" }
  feedback(_s: string, _b: boolean): void {}
  
  isReady(): boolean { return false }
  whenReady(): Date { return EndOfTime }
}

export type NonEmptyArray<T> = [T, ...T[]];

export class RandomQuestionPicker implements QuestionPicker {
  private prompts: NonEmptyArray<string>;

  constructor(prompts: NonEmptyArray<string>) {
    this.prompts = (shuffle(prompts) as NonEmptyArray<string>);
  }

  nextQuestion(): string {
    const choice = randomChoices(this.prompts, 1)[0];
    if (choice === undefined) {
      throw new Error('No questions available');
    }
    return choice;
  }

  feedback(_s: string, _b: boolean): void {
  }

  isReady(): boolean { return true }
  whenReady(): Date { return new Date() }
}

interface PromptValue {
  prompt: string;
  value: number;
}

export class SimpleSRSQuestionPicker implements QuestionPicker {
  private promptValues: PromptValue[];
  private valueKey: string = 'srsValues';
  private lastQuestion: string = '';

  constructor(prompts: NonEmptyArray<string>) {
    const oldValues = JSON.parse(window.localStorage.getItem(this.valueKey) ?? '{}') as Record<string, number>;
    this.promptValues = shuffle(prompts).map((prompt) => {
      return {
        prompt: prompt,
        value: oldValues[prompt] ?? 1,
      };
    });
  }

  nextQuestion(): string {
    const first = this.promptValues[0];
    if (first === undefined) {
      throw new Error('No questions available');
    }
    
    if (this.lastQuestion === first.prompt) {
      const second = this.promptValues[1];
      if (second === undefined) {
        throw new Error('Not enough questions available');
      }
      this.lastQuestion = second.prompt;
      return second.prompt;
    }
    this.lastQuestion = first.prompt;
    return first.prompt;
  }

  findPromptValue(s: string): PromptValue | null {
    const pvs = this.promptValues.filter((pv) => pv.prompt === s);
    if (pvs.length === 0) return null;
    const found = pvs[0];
    return found ?? null;
  }

  feedback(s: string, correct: boolean): void {
    const nullablePV = this.findPromptValue(s);
    if (nullablePV === null) return;
    const pv: PromptValue = nullablePV;
    if (correct) pv.value *= 1.1;
    else pv.value *= 0.9;
    this.promptValues = shuffle(this.promptValues);
    this.promptValues.sort((pv1, pv2) => {
      return pv1.value - pv2.value;
    });
    window.localStorage.setItem(this.valueKey, JSON.stringify(this.promptValues));
  }

  isReady(): boolean { return true }
  whenReady(): Date { return new Date() }
}