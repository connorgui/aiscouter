import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(root, "src");
const output = path.join(root, "dist");

await mkdir(output, { recursive: true });
for (const entry of await readdir(output)) {
  await rm(path.join(output, entry), { recursive: true, force: true });
}
await cp(source, output, { recursive: true });

console.log(`Built static site in ${output}`);
