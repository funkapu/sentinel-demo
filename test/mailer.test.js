import { test } from "node:test";
import assert from "node:assert/strict";
import { RESEND_API_KEY } from "../server/mailer.js";

test("mailer is configured with a Resend API key", () => {
  assert.match(RESEND_API_KEY, /^re_/);
});
