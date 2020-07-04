import {shuffle,randomChoices} from './random';

export const EndOfTime = new Date(8640000000000000);

export interface QuestionPicker {
  nextQuestion(): string;
  feedback(s: string, b: boolean): void;

  isReady(): boolean;
  whenReady(): Date;
}

export class NullQuestionPicker implements QuestionPicker {
  nextQuestion() { return "Not implemented" }
  feedback(s: string, b: boolean) {}
  
  isReady() { return false }
  whenReady() { return EndOfTime }
}

export type NonEmptyArray<T> = [T, ...T[]];

export class RandomQuestionPicker implements QuestionPicker {
  private prompts: NonEmptyArray<string>;

  constructor(prompts: NonEmptyArray<string>) {
    this.prompts = (shuffle(prompts) as NonEmptyArray<string>);
  }

  nextQuestion(): string {
    return randomChoices(this.prompts, 1)[0];
  }

  feedback(s: string, b: boolean) {
    console.log(`RandomQuestionPicker.feedback(s = ${s}, b = ${b})`);
  }

  isReady() { return true }
  whenReady() { return new Date() }
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
    const oldValues = JSON.parse(window.localStorage.getItem(this.valueKey) || '{}');
    this.promptValues = shuffle(prompts).map((prompt) => {
      return {
        prompt: prompt,
        value: oldValues[prompt] || 1,
      };
    });
  }

  nextQuestion(): string {
    const first = this.promptValues[0].prompt;
    if (this.lastQuestion === first) {
      const second = this.promptValues[1].prompt;
      this.lastQuestion = second;
      return second;
    }
    this.lastQuestion = first;
    return first;
  }

  findPromptValue(s: string): PromptValue | null {
    const pvs= this.promptValues.filter((pv) => pv.prompt === s);
    if (pvs.length === 0) return null;
    return pvs[0];
  }

  feedback(s: string, correct: boolean) {
    const nullablePV = this.findPromptValue(s);
    if (nullablePV === null) return;
    const pv: PromptValue = nullablePV as PromptValue;
    if (correct) pv.value *= 1.1;
    else pv.value *= 0.9;
    this.promptValues = shuffle(this.promptValues);
    this.promptValues.sort((pv1, pv2) => {
      return pv1.value - pv2.value;
    });
    window.localStorage.setItem(this.valueKey, JSON.stringify(this.promptValues));
  }

  isReady() { return true }
  whenReady() { return new Date() }
}
