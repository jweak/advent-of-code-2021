import { promises as fs } from "fs";
import * as path from "path";

export async function readFile(dirname: string, filename: string) {
  const input = await fs.readFile(path.resolve(dirname, filename), "utf8");
  return input;
}

export async function readLines(dirname: string, filename: string) {
  const content = await readFile(dirname, filename);
  return content.split("\n");
}
