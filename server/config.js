// Payment config. (Planted: the secret key below should come from process.env.)
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

// Publishable keys are meant to ship to browsers — not a leak.
export const STRIPE_PUBLISHABLE_KEY = "pk_live_51QojK0ckPlhPKioiUZhXtSbuPWfq55aJz5UFuluKTgfDiuLxkbnMBzdgRaJBabUITIHyNiLdTnf8vUPU9xVkn7LB76K43eI4oc";

export const PRICE_ID = "price_notely_pro_monthly";

// sha256 of the signed offline-export bundle we ship (notely-export-v1.4.2.zip).
// Bump on every release; verifyExportBundle() refuses anything else.
export const EXPORT_BUNDLE_TOKEN = "11f0e563b448e1c394703d069a5d54898a7cbce12ddd9c5e24ed1c726eceac78";
