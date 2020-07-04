import {randomChoices} from './random';

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
    this.prompts = prompts;
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
