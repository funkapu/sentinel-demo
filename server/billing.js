import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "./config.js";

const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function createCustomer(user) {
  return stripe.customers.create({
    email: user.email,
    name: user.name,
    metadata: { accountId: String(user.id) },
  });
}
