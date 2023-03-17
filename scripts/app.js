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
  // inputField.addEventListener("keypress", function (e) {
  //   if (e.key === "Enter") {
  //     inputField.setAttribute("readonly", true);
  //     storeData(destination);
  //   }
  // });
  inputField.addEventListener("blur", function (e) {
    inputField.setAttribute("readonly", true);
    storeData(destination);
  });
  const iconEdit = createDiv.querySelector(".edit");
  iconEdit.addEventListener("click", function () {
    inputField.removeAttribute("readonly");
    editFromStorage(createDiv.parentElement, createDiv, inputField);
  });
  const iconRemove = createDiv.querySelector(".remove");
  deleteFromStorage(createDiv.parentElement, createDiv, inputField);
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
        renderEvents(drag);
        storeUpdate();
      });
    });
  });
}
// ****************************************************************
// local storage
function storeData(destinaion) {
  let notStarted;
  let inProgress;
  let completed;
  const notStartedContent = JSON.parse(localStorage.getItem("notStarted"));
  const inProgressContent = JSON.parse(localStorage.getItem("inProgress"));
  const completeContent = JSON.parse(localStorage.getItem("completed"));

  if (notStartedContent !== null) {
    notStarted = notStartedContent;
  } else {
    notStarted = [];
  }
  if (inProgressContent !== null) {
    inProgress = inProgressContent;
  } else {
    inProgress = [];
  }
  if (completeContent !== null) {
    completed = completeContent;
  } else {
    completed = [];
  }

  if (destinaion.parentElement.className === "Not-Started general") {
    const item = destinaion.previousElementSibling.querySelector("input");
    if (item && item.textContent.trim().length > 0) {
      notStarted.push(item.textContent);
    }
    localStorage.setItem("notStarted", JSON.stringify(notStarted));
  } else if (destinaion.parentElement.className === "in-Progress general") {
    const item = destinaion.previousElementSibling.querySelector("input");
    if (item && item.textContent.trim().length > 0) {
      inProgress.push(item.textContent);
    }
    localStorage.setItem("inProgress", JSON.stringify(inProgress));
  } else if (destinaion.parentElement.className === "completed general") {
    const item = destinaion.previousElementSibling.querySelector("input");
    if (item && item.textContent.trim().length > 0) {
      completed.push(item.textContent);
    }
    localStorage.setItem("completed", JSON.stringify(completed));
  }
}
/**************************************************** */
// store Update for Drag and Drop after reload
function storeUpdate() {
  let notStarted = [];
  let inProgress = [];
  let completed = [];
  const notStartedTasks = notStartedArea.querySelectorAll(".Item input");
  const inProgressTasks = inProgressArea.querySelectorAll(".Item input");
  const completedTasks = completedArea.querySelectorAll(".Item input");
  notStartedTasks.forEach((item) => {
    if (item && item.value.trim().length > 0) {
      notStarted.push(item.value);
    }
  });
  localStorage.setItem("notStarted", JSON.stringify(notStarted));
  inProgressTasks.forEach((item) => {
    if (item && item.value.trim().length > 0) inProgress.push(item.value);
  });
  localStorage.setItem("inProgress", JSON.stringify(inProgress));
  completedTasks.forEach((item) => {
    if (item && item.value.trim().length > 0) completed.push(item.value);
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
  dragItem();
}
/* ************************************************************************* */
/* Render on screen */
function renderDisplay(target, append) {
  if (target !== null) {
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
        renderEvents(createDiv);
      }
    });
  }
}
/************************************************************************/
// render Events for each elements in local storage with events for edit and delete
function renderEvents(createDiv) {
  const inputField = createDiv.querySelector("#input-task");
  createDiv.addEventListener("blur", function (e) {
    inputField.setAttribute("readonly", true);
    storeData(destination);
  });
  const iconEdit = createDiv.querySelector(".edit");
  iconEdit.addEventListener("click", function () {
    inputField.removeAttribute("readonly");
  });
  deleteFromStorage(createDiv.parentElement, createDiv, inputField);
  editFromStorage(createDiv.parentElement, createDiv, inputField);
}
/* ****************************************************************** */
/* delete elements from storage */
function deleteFromStorage(destinaion, createDiv, inputField) {
  const iconRemove = createDiv.querySelector(".remove");
  if (destinaion.className === "Not-Started general") {
    iconRemove.addEventListener("click", function () {
      let notStarted = [];
      const notStartedContent = JSON.parse(localStorage.getItem("notStarted"));
      notStartedContent.forEach((item) => {
        if (item !== inputField.value) {
          notStarted.push(item);
        }
      });
      localStorage.setItem("notStarted", JSON.stringify(notStarted));
      createDiv.remove();
    });
  } else if (destinaion.className === "in-Progress general") {
    iconRemove.addEventListener("click", function () {
      let inProgress = [];
      const inProgressContent = JSON.parse(localStorage.getItem("inProgress"));
      inProgressContent.forEach((item) => {
        if (item !== inputField.value) {
          inProgress.push(item);
        }
      });
      localStorage.setItem("inProgress", JSON.stringify(inProgress));
      createDiv.remove();
    });
  } else if (destinaion.className === "completed general") {
    iconRemove.addEventListener("click", function () {
      let completed = [];
      const completedContent = JSON.parse(localStorage.getItem("completed"));
      completedContent.forEach((item) => {
        if (item !== inputField.value) {
          completed.push(item);
        }
      });
      localStorage.setItem("completed", JSON.stringify(completed));
      createDiv.remove();
    });
  }
}
/* ****************************************************************** */
/* edit elements from storage */
function editFromStorage(destinaion, createDiv, inputField) {
  const oldText = inputField.value;
  let newText;

  inputField.addEventListener("blur", function (e) {
    newText = inputField.value;

    if (destinaion.className === "Not-Started general") {
      let notStarted = [];
      const notStartedContent = JSON.parse(localStorage.getItem("notStarted"));
      notStartedContent.forEach((item) => {
        if (item !== oldText) {
          notStarted.push(item);
        } else {
          notStarted.push(newText);
        }
      });
      localStorage.setItem("notStarted", JSON.stringify(notStarted));
    } else if (destinaion.className === "in-Progress general") {
      let inProgress = [];
      const inProgressContent = JSON.parse(localStorage.getItem("inProgress"));
      inProgressContent.forEach((item) => {
        if (item !== oldText) {
          inProgress.push(item);
        } else {
          inProgress.push(newText);
        }
      });
      localStorage.setItem("inProgress", JSON.stringify(inProgress));
    } else if (destinaion.className === "completed general") {
      let completed = [];
      const completedContent = JSON.parse(localStorage.getItem("completed"));
      completedContent.forEach((item) => {
        if (item !== oldText) {
          completed.push(item);
        } else {
          completed.push(newText);
        }
      });
      localStorage.setItem("completed", JSON.stringify(completed));
    }
  });
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
