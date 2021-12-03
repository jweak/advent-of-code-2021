import { readLines } from "../lib/file";

async function main() {
  const lines = await readLines(__dirname, "input.txt");

  const numbers: number[] = lines.map((s) => parseInt(s));

  const increases = getIncreases(numbers);

  console.log(`p1 result = ${increases}`);

  let windows: number[] = [];
  for (let index = 0; index < numbers.length; index++) {
    const a = numbers[index];
    const b = numbers[index - 1];
    const c = numbers[index - 2];
    windows.push(a + b + c);
  }

  const windowIncreases = getIncreases(windows);
  console.log(`p2 result = ${windowIncreases}`);
}

function getIncreases(numbers: number[]) {
  let increases = 0;
  numbers.forEach((val, i) => {
    if (val > numbers[i - 1]) {
      increases = increases + 1;
    }
  });
  return increases;
}

main();
