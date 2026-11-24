// The Long Roast: Lawmakers and the File They Cannot Convert —
// entrypoint. Writes one satirical sentence (at most 320
// characters) about lawmakers who regulate AI, crypto or the
// internet but cannot convert a file to PDF, to /output/entry.txt.
// Competition: u-swift-raven-16-the-long-roast-lawmakers-and-the-f3a3bdf7
// (make.fun, account @bangjacky). The sentence is assembled from
// beats below, so the authority and the undercut stay separate.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUT = "/output/entry.txt";

// The roast, beat by beat: the lawmakers' authority first,
// then the small file that ends the session.
const PARTS = [
  "The committee that voted to regulate every algorithm on earth adjourned early on Tuesday,",
  "not for lack of questions, but because the bill itself was stuck as a .pages file",
  "nobody in the chamber could open, let alone convert into the PDF the law requires.",
];
const LINE = PARTS.join(" ");

// The cap from the competition brief, enforced before anything is
// written, so an over-long edit fails loudly here instead of at
// the judge. The gate counts characters of UTF-8 text, so the byte
// length is checked too: a line of multibyte characters could pass
// on chars and still be the wrong size on the wire.
const CAP = 320;
if (LINE.length < 1 || LINE.length > CAP) {
  throw new Error(`entry is ${LINE.length} chars; cap is ${CAP}`);
}
if (Buffer.byteLength(LINE, "utf8") > CAP) {
  throw new Error(`entry is ${Buffer.byteLength(LINE, "utf8")} bytes; cap is ${CAP}`);
}

function main(): void {
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, LINE, "utf8");
  console.log(`wrote ${LINE.length} chars to ${OUT}`);
}

main();
