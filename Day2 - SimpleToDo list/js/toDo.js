const inputBox = document.getElementById("input-text");
const taskList = document.getElementById("taskList");

function AddTask() {
  if(inputBox.value === '') {
    alert("Добавьте задание");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    taskList.appendChild(li); //Добавляем новый элемент в конец списка
    let span = document.createElement("span"); // создаем новый элемент чтобы убрать задачу
    span.innerHTML = "\u00d7";
    li.appendChild(span);  
  }
  inputBox.value = "";
  saveData();
}

taskList.addEventListener("click", function(e) { //добавляем условиечто при клике на иконку чека будет меняться вид. зачеканный или нет
  if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked");
    saveData();
  } else if(e.target.tagName === "SPAN"){
    e .target.parentElement.remove();
    saveData();
  }
}, false);

function saveData(){
  localStorage.setItem("data", taskList.innerHTML) // Позволяем сохранять введенные данные в локальной базе браузера
}

function showTask() {
  taskList.innerHTML = localStorage.getItem("data");
}

showTask();
