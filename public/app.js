const list = document.getElementById("notes");
const form = document.getElementById("search");

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function render(notes) {
  list.textContent = "";
  notes.forEach((note) => {
    const card = document.createElement("article");
    const heading = document.createElement("h3");
    heading.innerHTML = escapeHtml(note.title);
    const body = document.createElement("div");
    body.innerHTML = note.body;
    card.append(heading, body);
    list.append(card);
  });
}

async function load(q) {
  const url = q ? `/api/notes/search?q=${encodeURIComponent(q)}` : "/api/notes";
  const res = await fetch(url);
  render(await res.json());
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  load(new FormData(form).get("q"));
});

load();
