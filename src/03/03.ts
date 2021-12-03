import { readLines } from "../lib/file";

const flipBit = (v: 0 | 1) => (v === 0 ? 1 : 0);

async function main() {
  const lines = await readLines(__dirname, "input.txt");

  const p1result = part1(lines);
  console.log(`part1: ${p1result}`);

  const p2result = part2(lines);
  console.log(`part2: ${p2result}`);
}

function getReading(lines: string[], flip: boolean) {
  let filtered = lines.slice();
  const bitAmount = lines[0].length;

  for (let i = 0; i < bitAmount; i++) {
    const commonBits = getCommonBits(filtered);
    const bit = flip
      ? commonBits[i].toString()
      : flipBit(commonBits[i]).toString();

    filtered = filtered.filter((reading) => reading[i] === bit);

    if (filtered.length === 1) {
      break;
    }
  }
  return filtered[0];
}

function part2(lines: string[]) {
  const oxygenBits = getReading(lines, false);
  const co2Bits = getReading(lines, true);

  const oxygen = parseInt(oxygenBits, 2);
  const co2 = parseInt(co2Bits, 2);

  return oxygen * co2;
}

function getCommonBits(binaryNumbers: string[]) {
  const sums: number[] = [];
  binaryNumbers.forEach((bNumber) => {
    bNumber.split("").map((strV, i) => {
      const value = parseInt(strV, 10);
      sums[i] = sums[i] === undefined ? value : sums[i] + value;
    });
  });
  const commonBits = sums.map((sum) => {
    const commonBit = sum / binaryNumbers.length < 0.5 ? 0 : 1;
    return commonBit;
  });
  return commonBits;
}

function part1(input: string[]) {
  const commonBits = getCommonBits(input);
  const gamma = parseInt(commonBits.join(""), 2);
  const epsilon = parseInt(commonBits.map(flipBit).join(""), 2);

  const result = gamma * epsilon;

  return result;
}

main();
