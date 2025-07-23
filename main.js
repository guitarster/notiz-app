let notes = [];

document.addEventListener("DOMContentLoaded", loadFromLocalStorage);

function saveNote() {
  const noteTitle = document.getElementById("input-title").value;
  const noteContent = document.getElementById("input-content").value;
  const noteSectionId = document.querySelector(".note-section").id;

  if (!noteTitle || !noteContent) {
    alert("Bitte Titel und Inhalt eingeben!");
    return;
  }

  let noteLastId = 0;

  if (JSON.parse(localStorage.getItem("notes")) > 0) {
    const notesEl = JSON.parse(localStorage.getItem("notes"));
    noteLastId = notesEl[notesEl.length - 1].id;
  }

  if (noteSectionId) {
    for (noteEl of notes) {
      if (noteEl.id == noteSectionId) {
        noteEl.title = noteTitle;
        noteEl.content = noteContent;
        noteEl.lastUpdated = new Date().getTime();
      }
    }
  } else {
    const note = {
      title: noteTitle,
      content: noteContent,
      id: noteLastId + 1,
      lastUpdated: new Date().getTime(),
    };

    notes.push(note);
  }

  localStorage.setItem("notes", JSON.stringify(notes));

  location.reload();
}

function loadFromLocalStorage() {
  if (JSON.parse(localStorage.getItem("notes"))) {
    notes = JSON.parse(localStorage.getItem("notes"));
    renderNotes();
  }
}

function selectNote(id) {
  const selectedNoteToRemove = document.querySelector(".selected-note");

  if (selectedNoteToRemove) {
    selectedNoteToRemove.classList.remove("selected-note");
  }

  const selectedNote = document.getElementById(id);
  selectedNote.classList.add("selected-note");
  loadToFormular(id);
}

function loadToFormular(ID) {
  const inputTitle = document.querySelector(".input-title");
  const inputContent = document.querySelector(".input-note");
  const noteSectionEl = document.querySelector(".note-section");

  for (note of notes) {
    if (note.id == ID) {
      inputTitle.value = note.title;
      inputContent.value = note.content;
      noteSectionEl.setAttribute("id", note.id);
    }
  }
}

function deleteNote() {
  const noteSectionId = document.querySelector(".note-section").id;
  const noteEl = document.getElementById(noteSectionId);

  notes = JSON.parse(localStorage.getItem("notes"));

  for (note of notes) {
    if (note.id == noteSectionId) {
      notes.splice(note, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      noteEl.remove();
      location.reload();
    }
  }
}

function createNewNote() {
  location.reload();
}

function renderNotes() {
  const sortednotes = notes.sort(
    (wertA, wertB) => wertB.lastUpdated - wertA.lastUpdated
  );

  for (wert of sortednotes) {
    const note = document.createElement("div");
    note.classList.add("note");
    note.setAttribute("id", wert.id);
    note.setAttribute("onclick", "selectNote(id)");
    const noteTitleDiv = document.createElement("div");
    noteTitleDiv.classList.add("note-title");
    const noteTitle = document.createTextNode(wert.title);
    const noteContentDiv = document.createElement("div");
    noteContentDiv.classList.add("note-content");
    const noteContent = document.createTextNode(wert.content);
    const noteDateDiv = document.createElement("div");
    noteDateDiv.classList.add("note-date");
    const noteDate = document.createTextNode(
      new Date(wert.lastUpdated).toLocaleString("de-DE")
    );

    note.appendChild(noteTitleDiv);
    noteTitleDiv.appendChild(noteTitle);
    note.appendChild(noteContentDiv);
    noteContentDiv.appendChild(noteContent);
    note.appendChild(noteDateDiv);
    noteDateDiv.appendChild(noteDate);

    document.getElementById("left-section").appendChild(note);
  }
}
