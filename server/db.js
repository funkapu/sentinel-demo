import { DatabaseSync } from "node:sqlite";

export const db = new DatabaseSync(process.env.DB_PATH ?? "notely.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL
  );
`);

export function getNote(id) {
  return db.prepare("SELECT id, title, body FROM notes WHERE id = ?").get(id);
}

export function listNotes() {
  return db.prepare("SELECT id, title, body FROM notes ORDER BY id DESC LIMIT 50").all();
}

export function createUser(email, name) {
  const info = db.prepare("INSERT INTO users (email, name) VALUES (?, ?)").run(email, name);
  return { id: Number(info.lastInsertRowid), email, name };
}
