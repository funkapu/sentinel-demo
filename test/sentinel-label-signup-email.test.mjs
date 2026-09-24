// Added by Sentinel (L5). Fails if input#signup-email in public/index.html loses its label again.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("input#signup-email in public/index.html has a label", () => {
  const html = readFileSync(new URL("../public/index.html", import.meta.url), "utf8");
  const tag = html.match(new RegExp("<input\\b[^>]*\\bid=\"signup-email\"[^>]*>"));
  assert.ok(tag, "input#signup-email is gone from public/index.html — this test can no longer check it");
  const before = html.slice(0, tag.index);
  const wrapped = before.lastIndexOf("<label") > before.lastIndexOf("</label>");
  const forLabel = new RegExp("<label\\b[^>]*\\bfor=\"signup-email\"[^>]*>\\s*[^<\\s]").test(html);
  const aria = /\baria-label(ledby)?="[^"]+"/.test(tag[0]);
  assert.ok(forLabel || wrapped || aria, "input#signup-email has no <label>");
});
