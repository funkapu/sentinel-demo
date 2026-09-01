# Notely — a deliberately vulnerable demo app

> **Do not deploy this.** Notely is the public demo repo for
> Sentinel, an agent that finds security holes and
> lawsuit-risk features in indie apps, proves them, and opens fix PRs.

Every hole in this repo is planted on purpose. The keys are fake and have
never been valid for any service. The planted holes are the first gold set
Sentinel is measured against:

| Planted hole | Rule |
|---|---|
| A payment secret key committed in source | R4 secrets |
| An API key committed in `.env`, then "removed" (still in history) | R4 secrets |
| A search query built by string interpolation | R2 SQL injection |
| Handlers that use request input without a schema check | R3 validation |
| Wildcard CORS with credentials | R8 CORS |
| Note body rendered through `innerHTML` | R9 XSS |
| An analytics tracker the privacy policy never mentions, receiving email + name | L3 / L4 |

And decoys that must **not** be flagged: a Stripe publishable key, a Supabase
anon key, parameterized queries, a zod-validated handler, escaped HTML, and
vendors the policy does disclose.

Open the pull request to see Sentinel's comments.

## Run it

```
npm install
npm start   # http://localhost:3000
```
