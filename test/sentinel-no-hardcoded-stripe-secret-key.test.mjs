// Added by Sentinel (R4). Fails if a Stripe secret key is committed in server/config.js again.
// The key that was here already leaked: rotate it. This test only stops it coming back.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("server/config.js reads STRIPE_SECRET_KEY from the environment, not a literal", () => {
  const src = readFileSync(new URL("../server/config.js", import.meta.url), "utf8");
  assert.doesNotMatch(src, new RegExp("\\b[sr]k_live_[0-9A-Za-z]{20,}"), "a Stripe secret key literal is committed in server/config.js");
  assert.match(src, /process\.env\.STRIPE_SECRET_KEY\b/);
});
