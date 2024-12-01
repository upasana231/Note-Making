
const addNoteButton = document.getElementById("add-note");
const popup = document.getElementById("popup");
const closePopupButton = document.getElementById("close-popup");
const createNoteButton = document.getElementById("create-note");
const titleInput = document.getElementById("note-title");
const descInput = document.getElementById("note-desc");
const notesContainer = document.querySelector(".notes-container");
const themeSelector = document.getElementById("theme-selector");
const noteViewPopup = document.getElementById("note-view-popup");
const noteViewContent = document.getElementById("note-view-content");
const closeNoteViewButton = document.getElementById("close-note-view");
const colorPicker = document.getElementById("color-picker");
const headerImage = document.getElementById("header-image");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let selectedColor = "#ffffff"; 
let editIndex = null; 


document.addEventListener("DOMContentLoaded", () => {
  loadNotes();
  loadTheme();
});


addNoteButton.addEventListener("click", () => {
  resetPopup();
  editIndex = null; 
  popup.classList.remove("hidden");
});

closePopupButton.addEventListener("click", () => {
  popup.classList.add("hidden");
});


closeNoteViewButton.addEventListener("click", () => {
  noteViewPopup.classList.add("hidden");
});


createNoteButton.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  
  if (title && description) {
    if (editIndex === null) {
      notes.push({ title, description, color: selectedColor });
    } else {
      notes[editIndex] = { title, description, color: selectedColor };
    }
    saveNotes();
    loadNotes();
    popup.classList.add("hidden");
  } else {
    alert("Please fill in both title and description.");
  }
});


themeSelector.addEventListener("change", (event) => {
  document.body.className = event.target.value;
  localStorage.setItem("theme", event.target.value);
  updateHeaderImage(event.target.value); 
});

function loadTheme() {
  const savedTheme = localStorage.getItem("theme") || "theme-light";
  document.body.className = savedTheme;
  themeSelector.value = savedTheme;
  updateHeaderImage(savedTheme);
}


function updateHeaderImage(theme) {
  if (theme === "theme-light") {
    headerImage.src = "images/light.gif";
  } else if (theme === "theme-dark") {
    headerImage.src = "images/notes.gif";
  } else if (theme === "theme-cute") {
    headerImage.src = "images/bunny.gif";
  }
}


function loadNotes() {
  notesContainer.innerHTML = '';
  notes.forEach((note, index) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.style.backgroundColor = note.color;
    noteElement.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.description}</p>
      <div class="note-actions">
        <button onclick="viewNote(${index})">View</button>
        <button onclick="editNote(${index})">Edit</button>
        <button onclick="deleteNote(${index})">Delete</button>
      </div>
    `;
    notesContainer.appendChild(noteElement);
  });
}

function viewNote(index) {
  const note = notes[index];
  noteViewContent.innerHTML = `
    <h2>${note.title}</h2>
    <p>${note.description}</p>
  `;
  noteViewPopup.classList.remove("hidden");
}

function editNote(index) {
  const note = notes[index];
  titleInput.value = note.title;
  descInput.value = note.description;
  selectedColor = note.color;
  colorPicker.value = selectedColor;
  editIndex = index;
  popup.classList.remove("hidden");
}

function deleteNote(index) {
  if (confirm("Are you sure you want to delete this note?")) {
    notes.splice(index, 1);
    saveNotes();
    loadNotes();
  }
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function resetPopup() {
  titleInput.value = "";
  descInput.value = "";
  colorPicker.value = "#ffffff";
}
