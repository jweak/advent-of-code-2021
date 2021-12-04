export function difference<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter((v) => !arr2.includes(v));
}

export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter((v) => arr2.includes(v));
}

export function last<T>(arr: T[]) {
  return arr[arr.length - 1];
}

export function times(count: number): number[] {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(i);
  }
  return arr;
}
