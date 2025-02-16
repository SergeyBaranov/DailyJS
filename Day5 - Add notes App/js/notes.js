//добавляем переменную для блока записей
const notesBox = document.querySelector(".notesInput");
// добавляем переменную для работы с кнопкой создания записей
const addNoteBtn = document.querySelector(".addNote");
// добавляем переменную, в которой будут создаваться записи
let notes = document.querySelectorAll(".inputBox");

function showNotes(){
  notesBox.innerHTML = localStorage.getItem("notes");
}

showNotes();

function updateSrorage(){
  localStorage.setItem("notes", notesBox.innerHTML);
}

//создаем функцию по добавлению записи, которая будет выполняться при клике на кнопку

addNoteBtn.addEventListener("click", ()=>{
  let inputNote = document.createElement("p");
  let img = document.createElement("img");
  inputNote.className = "inputBox";
  inputNote.setAttribute("contenteditable", "true");
  img.src = "img/deleteIcon.svg";
  img.className = "deleteIcon";
  inputNote.appendChild(img); // Append img to inputNote first
  notesBox.appendChild(inputNote); // Then append inputNote to notesBox

});


//добавляем функцию, которая будет сохранять записи в localStorage
notesBox.addEventListener("click", function(e) {
  if(e.target.tagName === "IMG"){
    e.target.parentElement.remove();
    updateSrorage();
  } else if(e.target.tagName === "P"){
    notes = document.querySelectorAll(".inputBox");
    notes.forEach(nt => {
      nt.onkeyup = function(){
        updateSrorage();
      }
    });
  }
});

document.addEventListener("keydown", event => {
  if(event.key === "Enter"){
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});