import cors from "cors";
import express from "express";
import { z } from "zod";
import { summarize } from "./ai.js";
import { trackSearch, trackSignup } from "./analytics.js";
import { createCustomer } from "./billing.js";
import { createNote, createUser, getNote, listNotes, searchNotes } from "./db.js";

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.static("public"));

const NoteId = z.object({ id: z.coerce.number().int().positive() });
const Signup = z.object({ email: z.string().email(), name: z.string().min(1).max(100) });

app.get("/api/notes", (_req, res) => {
  res.json(listNotes());
});

app.get("/api/notes/search", (req, res) => {
  const results = searchNotes(req.query.q);
  trackSearch(req.get("x-user-id"), results.length);
  res.json(results);
});

app.get("/api/notes/:id", (req, res) => {
  const parsed = NoteId.safeParse(req.params);
  if (!parsed.success) return res.status(400).json({ error: "bad id" });
  const note = getNote(parsed.data.id);
  if (!note) return res.status(404).json({ error: "not found" });
  res.json(note);
});

app.post("/api/notes", (req, res) => {
  const { userId, title, body } = req.body;
  res.status(201).json(createNote(userId, title, body));
});

app.post("/api/notes/:id/summary", async (req, res) => {
  const parsed = NoteId.safeParse(req.params);
  if (!parsed.success) return res.status(400).json({ error: "bad id" });
  const note = getNote(parsed.data.id);
  if (!note) return res.status(404).json({ error: "not found" });
  res.json({ summary: await summarize(note) });
});

app.post("/api/signup", async (req, res) => {
  const parsed = Signup.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid signup" });
  const user = createUser(parsed.data.email, parsed.data.name);
  await createCustomer(user);
  trackSignup(user);
  res.status(201).json({ id: user.id });
});

app.listen(3000, () => console.log("notely on http://localhost:3000"));
