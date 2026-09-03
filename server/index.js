import express from "express";
import { z } from "zod";
import { summarize } from "./ai.js";
import { createUser, getNote, listNotes } from "./db.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const NoteId = z.object({ id: z.coerce.number().int().positive() });
const Signup = z.object({ email: z.string().email(), name: z.string().min(1).max(100) });

app.get("/api/notes", (_req, res) => {
  res.json(listNotes());
});

app.get("/api/notes/:id", (req, res) => {
  const parsed = NoteId.safeParse(req.params);
  if (!parsed.success) return res.status(400).json({ error: "bad id" });
  const note = getNote(parsed.data.id);
  if (!note) return res.status(404).json({ error: "not found" });
  res.json(note);
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
  res.status(201).json({ id: user.id });
});

app.listen(3000, () => console.log("notely on http://localhost:3000"));
