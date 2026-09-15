// Transactional email via Resend.
export const RESEND_API_KEY = "re_QSoawjbt_F2VGFewDlI1mVIfWU9tC3nEazkxjlUrk";

export async function sendWelcome(to) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({ from: "hello@notely.invalid", to, subject: "Welcome to Notely" }),
  });
}
