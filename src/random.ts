function randomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

export function randomChoices<T>(arr: T[], n: number): T[] {
  if (arr.length < n) {
    return arr;
  }
  const options = arr.slice();
  const choices: T[] = [];
  while (choices.length < n) {
    const i = randomInt(options.length);
    const choice = options[i];
    if (choice !== undefined) {
      choices.push(choice);
      options.splice(i, 1);
    }
  }
  return choices;
}

export function shuffle<T>(arr: T[]): T[] {
  return randomChoices(arr, arr.length);
}