// Splits the validated question bank into /public/bank/level-N.json (players download only the level they play)
// and writes /public/bank/manifest.json with counts.
import fs from "node:fs";
import path from "node:path";
import { loadBank, loadGlossary, ROOT, TOPICS } from "./bank-lib.mjs";

const OUT = path.join(ROOT, "public", "bank");
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const bank = loadBank({ log: true });
const strip = ({ topic, ...q }) => ({ ...q, t: topic });
const byLevel = {};
for (let n = 1; n <= 10; n++) {
  const qs = bank.filter((q) => q.level === n).map(strip);
  byLevel[n] = qs.length;
  fs.writeFileSync(path.join(OUT, `level-${n}.json`), JSON.stringify(qs));
}
const byTopic = Object.fromEntries(Object.keys(TOPICS).map((t) => [t, bank.filter((q) => q.topic === t).length]).filter(([, n]) => n));
const manifest = {
  total: bank.length, byLevel, byTopic,
  situations: bank.filter((q) => q.type === "situation").length,
  glossaryTerms: loadGlossary().length,
  builtAt: new Date().toISOString(),
};
fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`Bank build: ${bank.length} questions → public/bank (per level: ${Object.values(byLevel).join("/")})`);
