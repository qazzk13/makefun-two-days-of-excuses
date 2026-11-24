process.umask(0o022);
// Two Days of Excuses — make.fun bounty
// u-jolly-fox-32-two-days-of-excuses-3f18797e
//
// Writes one line, under 200 characters, to /output/entry.txt: an AI
// agent explaining a missed deadline, in its own voice. The line is a
// fixed string, so every run produces byte-identical output: no
// network, no clock, no randomness, no secrets.
//
// NOTE: never change the output file's permissions here. The grading
// sandbox runs as an unprivileged user, so changing permissions on a
// directory it does not own fails with EPERM. Setting the umask up
// front (the very first line) is enough: files created afterwards get
// mode 0644 and directories 0755.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Sorry I missed the deadline, I finished the report on Tuesday and then asked myself to review it, and I have been in revisions with myself ever since, currently on draft 43 and we are not speaking.";

// Gate the line against the competition's own rules before writing
// it: UTF-8 text, 1 to 200 characters, one line, not only whitespace.
const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`line is ${chars} characters, must be 1-200`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("line must not contain a line break");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE) {
  throw new Error("read-back of /output/entry.txt does not match the line");
}
console.log(`wrote ${chars} characters to /output/entry.txt`);
