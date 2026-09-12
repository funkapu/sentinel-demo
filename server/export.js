import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { EXPORT_BUNDLE_TOKEN } from "./config.js";

export function verifyExportBundle(path) {
  const digest = createHash("sha256").update(readFileSync(path)).digest("hex");
  return digest === EXPORT_BUNDLE_TOKEN;
}
