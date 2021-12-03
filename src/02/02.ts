import { readLines } from "../lib/file";

async function main() {
  const lines = await readLines(__dirname, "input.txt");
  const commands = lines
    .map((command) => command.split(" "))
    .map(([dir, amount]) => ({ direction: dir, amount: parseInt(amount, 10) }));

  const result1 = part1(commands);
  console.log(`p1 ${result1}`);

  const result2 = part2(commands);
  console.log(`p2 ${result2}`);
}

type NavigationCommand = {
  direction: string;
  amount: number;
};
function part1(commands: NavigationCommand[]) {
  let horizontalPosition = 0;
  let depth = 0;

  for (const command of commands) {
    if (command.direction === "forward") {
      horizontalPosition = horizontalPosition + command.amount;
    }
    if (command.direction === "down") {
      depth = depth + command.amount;
    }
    if (command.direction === "up") {
      depth = depth - command.amount;
    }
  }
  const result = depth * horizontalPosition;

  return result;
}

function part2(commands: NavigationCommand[]) {
  let horizontalPosition = 0;
  let depth = 0;
  let aim = 0;

  for (const command of commands) {
    if (command.direction === "forward") {
      horizontalPosition = horizontalPosition + command.amount;
      depth = depth + aim * command.amount;
    }
    if (command.direction === "down") {
      aim = aim + command.amount;
    }
    if (command.direction === "up") {
      aim = aim - command.amount;
    }
  }
  const result = depth * horizontalPosition;

  return result;
}

main();
