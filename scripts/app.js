const notStartedArea = document.querySelector(".Not-Started");
const notStartedAdd = notStartedArea.querySelector("button");
const inProgressArea = document.querySelector(".in-Progress");
const inProgressAdd = inProgressArea.querySelector("button ");
const completedArea = document.querySelector(".completed");
const completedAdd = completedArea.querySelector("button");
const dropArea = document.querySelectorAll(".board-content > div");
let drag = null;
function addTaskHandler(destination) {
  if (
    destination.previousElementSibling.textContent !== "Not Started" &&
    destination.previousElementSibling.textContent !== "In Progress" &&
    destination.previousElementSibling.textContent !== "Completed"
  ) {
    if (validateBeforeAddAnotherTask(destination)) {
      return;
    }
  }

  const createDiv = document.createElement("div");
  createDiv.className = "Item";
  createDiv.innerHTML = `
  <input id="input-task" type="text" placeholder="enter a task" draggable="true"/>
  <ion-icon class="edit" name="create-outline"></ion-icon>
  <ion-icon class="specil-icon remove" name="trash-outline"></ion-icon>
`;
  destination.before(createDiv, destination);
  dragItem();
  const inputField = createDiv.querySelector("#input-task");
  inputField.addEventListener("input", function (e) {
    inputField.textContent = e.target.value;
    inputField.value = e.target.value;
  });
  storeData();
  inputField.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      inputField.setAttribute("readonly", true);
    }
  });
  const iconEdit = createDiv.querySelector(".edit");
  iconEdit.addEventListener("click", function () {
    inputField.removeAttribute("readonly");
  });
  const iconRemove = createDiv.querySelector(".remove");
  iconRemove.addEventListener("click", function () {
    createDiv.remove();
  });
}
function validateBeforeAddAnotherTask(areaOfInsertion) {
  const checkEmpty = areaOfInsertion.previousElementSibling;
  const text = checkEmpty.querySelector("#input-task");
  if (text.value === "") {
    alert("Enter a task first, before making another vield");
    return true;
  }
}
/* *********************************************************************/
// Drag Item
function dragItem() {
  let items = document.querySelectorAll(".Item");
  items.forEach((item) => {
    item.addEventListener("dragstart", (event) => {
      item.style.opacity = ".5";
      drag = item;
    });
    item.addEventListener("dragend", (event) => {
      item.style.opacity = "1";

      drag = null;
    });
    dropArea.forEach((area) => {
      area.addEventListener("dragover", (event) => {
        event.preventDefault();
      });

      area.addEventListener("drop", (event) => {
        area.lastElementChild.before(drag, area.lastElementChild);
        storeData();
      });
    });
  });
}
// ****************************************************************
// local storage
function storeData() {
  const notStarted = [];
  const inProgress = [];
  const completed = [];
  const notStartedTasks = notStartedArea.querySelectorAll(".Item input");
  const inProgressTasks = inProgressArea.querySelectorAll(".Item input");
  const completedTasks = completedArea.querySelectorAll(".Item input");
  notStartedTasks.forEach((item) => {
    if (item)
    notStarted.push(item.textContent);
  });
  localStorage.setItem("notStarted", JSON.stringify(notStarted));
  inProgressTasks.forEach((item) => {
    if (item)
    inProgress.push(item.textContent);
  });
  localStorage.setItem("inProgress", JSON.stringify(inProgress));
  completedTasks.forEach((item) => {
    if (item)
    completed.push(item.textContent);
  });
  localStorage.setItem("completed", JSON.stringify(completed));
}

/* *************************************************************** */
// display DATA
window.onload = function () {
  displayData();
};
function displayData() {
  const notStartedContent = JSON.parse(localStorage.getItem("notStarted"));
  const inProgressContent = JSON.parse(localStorage.getItem("inProgress"));
  const completeContent = JSON.parse(localStorage.getItem("completed"));
  renderDisplay(notStartedContent, notStartedAdd);
  renderDisplay(inProgressContent, inProgressAdd);
  renderDisplay(completeContent, completedAdd);
}
/* ************************************************************************* */
/* Render on screen */
function renderDisplay(target, append) {
  if (target!==null){
  target.forEach((task) => {
    if (task) {
      const createDiv = document.createElement("div");
      createDiv.className = "Item";
      createDiv.innerHTML = `
    <input id="input-task" type="text" placeholder="enter a task" draggable="true"/>
    <ion-icon class="edit" name="create-outline"></ion-icon>
    <ion-icon class="specil-icon remove" name="trash-outline"></ion-icon>
  `;
      const inputField = createDiv.querySelector("#input-task");
      inputField.value = task;
      append.before(createDiv, append);
    }
  });
}
}
/* **************************************************************** */
/* Add Event Lisineres */
notStartedAdd.addEventListener(
  "click",
  function () {
    addTaskHandler(notStartedAdd);
  },
  false
);
inProgressAdd.addEventListener(
  "click",
  function () {
    addTaskHandler(inProgressAdd);
  },
  false
);
completedAdd.addEventListener(
  "click",
  function () {
    addTaskHandler(completedAdd);
  },
  false
);
// event listenner for edit
