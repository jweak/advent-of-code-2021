import { readLines } from "../lib/file";
import { sum } from "../lib/number";
import { intersection, difference, last } from "../lib/array";

type Board = {
  rows: number[][];
  columns: number[][];
};

async function main() {
  const lines = await readLines(__dirname, "input.txt");

  const numbersToDraw = lines[0].split(",").map((n) => parseInt(n, 10));

  const nonEmptyLines = lines.slice(1).filter((line) => line !== "");
  const boards: Board[] = [];

  const boardCount = nonEmptyLines.length / 5;
  for (let index = 0; index < boardCount; index++) {
    const boardLines = nonEmptyLines.slice(index * 5, index * 5 + 5);
    const rows = boardLines.map((line) =>
      line
        .split(" ")
        .filter((s) => s !== "")
        .map((n) => parseInt(n, 10))
    );
    const columns = [0, 1, 2, 3, 4].map((i) => rows.map((row) => row[i]));
    boards.push({
      rows,
      columns,
    });
  }

  const p1result = part1(numbersToDraw, boards);
  console.log(`part1: ${p1result}`);

  const p2result = part2(numbersToDraw, boards);
  console.log(`part2: ${p2result}`);
}

function part1(numbers: number[], boards: Board[]) {
  let winningBoard: Board;
  let drawnNumbers: number[];
  for (let i = 0; i < numbers.length; i++) {
    drawnNumbers = numbers.slice(0, i);
    for (const board of boards) {
      if (checkWin(board, drawnNumbers)) {
        winningBoard = board;
        break;
      }
    }
    if (winningBoard) {
      break;
    }
  }

  return calculateScore(winningBoard, drawnNumbers);
}

function part2(numbers: number[], boards: Board[]) {
  let lastToWin = {
    board: boards[0],
    drawnNumbers: [],
  };

  for (const board of boards) {
    for (let i = 0; i < numbers.length; i++) {
      const drawnNumbers = numbers.slice(0, i);
      if (checkWin(board, drawnNumbers)) {
        if (drawnNumbers.length > lastToWin.drawnNumbers.length) {
          lastToWin = {
            board,
            drawnNumbers: drawnNumbers,
          };
        }
        break;
      }
    }
  }
  return calculateScore(lastToWin.board, lastToWin.drawnNumbers);
}

function checkWin(board: Board, drawnNumbers: number[]) {
  const rowMatches = board.rows.filter(
    (row) => intersection(row, drawnNumbers).length === 5
  );
  const columnMatches = board.columns.filter(
    (column) => intersection(column, drawnNumbers).length === 5
  );
  return rowMatches.length > 0 || columnMatches.length > 0;
}

function calculateScore(board: Board, drawnNumbers: number[]) {
  const allBoardNumbers = board.rows.flat();
  const unmatchedNumbers = difference(allBoardNumbers, drawnNumbers);
  return sum(unmatchedNumbers) * last(drawnNumbers);
}

main();
