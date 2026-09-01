const list = document.getElementById("notes");

async function load() {
  const res = await fetch("/api/notes");
  const notes = await res.json();
  list.textContent = "";
  for (const note of notes) {
    const card = document.createElement("article");
    card.textContent = note.title;
    list.append(card);
  }
}

load();
