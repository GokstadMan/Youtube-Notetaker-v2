
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

    const deleteNote = (index) => {
        const notes = JSON.parse(localStorage.getItem("notes") );
        notes.splice(index,1);
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
    }

    const createNoteElement = (note,index) => {
        const noteItem = document.createElement("li");
        noteItem.classList.add("bg-gray-300","p-2","m-1");
        noteItem.innerText= note;

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.classList.add("bg-red-300","m-1");

        deleteBtn.onclick = () => deleteNote(index);

        noteItem.appendChild(deleteBtn);
        return noteItem;
    }

    const extractVideoUrl = (url) => {
        return url.split("v=")[1].substring(0,11);
    }

    watchBtn.addEventListener("click", function(){
        let url = videoURL.value;
        const videoID = extractVideoUrl(url);
            if(videoID) {
                videoPlayer.src = `https://www.youtube.com/embed/${videoID}`;
                videoPlayer.classList.remove("h-0");
                videoPlayer.classList.add("h-[200px]", "sm:h-[400px]","w-full","mt-8");
                videoURL.value = "";
            }
            else{alert("Please enter a valid Youtube URL!")}
    })

saveNoteBtn.addEventListener("click",saveNote);
loadNotes();
    
});


