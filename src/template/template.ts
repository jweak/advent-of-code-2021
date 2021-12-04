import { readLines } from "../lib/file";

async function main() {
  const lines: string[] = await readLines(__dirname, "input.txt");

  console.log(`part1: ${part1(lines)}`);
  console.log(`part2: ${part2(lines)}`);
}

function part1(lines: string[]) {
  return 0;
}

function part2(lines: string[]) {
  return 0;
}

main();
