const { json } = require("express/lib/response");

document.addEventListener("DOMContentLoaded",() =>{
let videoPlayer = document.getElementById("video-player");
let videoURL = document.getElementById("video-url-input");
let watchBtn = document.getElementById("watch-button");
let saveNoteBtn = document.getElementById("save-note-button");
let noteInput = document.getElementById("video-note-taking");
let notesList = document.getElementById("notes-list");
let saveBtn = document.getElementById("save-note-button");
let noNotesText = document.getElementById("no-notes-text");

const loadNotes = () => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notesList.innerHTML="";
    notes.forEach((note,index) => {
        const noteElement = createNoteElement(note,index);
        notesList.appendChild(noteElement);
    });
    noNotesText.style.display = notes.length ? "none" : "block";
};

const saveNote = () => {
    const noteText = noteInput.value.trim();
    if(noteText) {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.push(noteText);
        localStorage.setItem("notes", JSON.stringify(notes));
        noteInput = "";
        loadNotes();
    }
}
});

