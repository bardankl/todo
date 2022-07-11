const titleInput = document.querySelector(".title-input");
const bodyInput = document.querySelector(".body-input");
const submit = document.querySelector(".btn-add");
const form = document.querySelector(".form");

class Task {
  constructor(id, title, body, finished, editing) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.finished = finished;
    this.editing = false;
  }

  addTask() {
    const container = document.querySelector(".card-container");
    const newTask = document.createElement("div");
    newTask.innerHTML = `
    <div class="card card-${this.id} ${this.finished ? "finished" : ""}">
          <div class="card-title title-${this.id}">
            <p>${this.title}</p>
          </div>
          <div class="card-body body-${this.id}">
            <p>
             ${this.body}
            </p>
          </div>
          <div class="icons">
          <button class="material-symbols-outlined icon done done-${
            this.id
          }">done</button>
          <button class="material-symbols-outlined icon edit edit-${
            this.id
          }">edit</button>
    </div>
        </div>
    `;
    container.appendChild(newTask);

    document.querySelector(`.card-container`).addEventListener("click", (e) => {
      if (
        e.target &&
        e.target.className ==
          `material-symbols-outlined icon done done-${this.id}`
      )
        this.finishTask();
      else if (
        e.target &&
        e.target.className ==
          `material-symbols-outlined icon edit edit-${this.id}`
      )
        this.editTask();
    });
  }

  finishTask() {
    if (this.editing === true || submit.innerHTML === "Edit Task")
      return alert("Edit the Task before finishing");
    const cards = document.querySelector(`.card-${this.id}`);
    if (!this.finished) cards.classList.add("finished");
    else cards.classList.remove("finished");
    this.finished = !this.finished;
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  editTask() {
    const handleEditing = (e) => {
      e.preventDefault();
      if (formValidation() === false) return;
      this.title = titleInput.value;
      this.body = bodyInput.value;
      const cardTitle = document.querySelector(`.title-${this.id}`);
      const cardBody = document.querySelector(`.body-${this.id}`);
      cardTitle.innerHTML = `<p>${this.title}</p>`;
      cardBody.innerHTML = `<p>${this.body}</p>`;
      localStorage.setItem(this.id, JSON.stringify(this));
      submit.removeEventListener("click", handleEditing);
      submit.addEventListener("click", handleForm);
      submit.innerHTML = "Add Task";
      this.editing = false;
      cleanInputs();
    };
    if (this.editing === true || submit.innerHTML === "Edit Task")
      return alert("You are already editing");
    this.editing = true;
    if (this.finished === true) {
      this.editing = false;
      return alert("You cannot edit finished tasks");
    }
    window.scrollTo(0, 0);
    titleInput.value = this.title;
    bodyInput.value = this.body;
    submit.removeEventListener("click", handleForm);
    submit.innerHTML = "Edit Task";
    submit.addEventListener("click", handleEditing);
  }
}

window.onload = function () {
  for (let i = 0; i < localStorage.length; i++) {
    const obj = localStorage.getItem(i);
    const { id, title, body, finished } = JSON.parse(obj);
    new Task(id, title, body, finished).addTask();
  }
};

function cleanInputs() {
  titleInput.value = "";
  bodyInput.value = "";
}

function formValidation() {
  if (titleInput.value.length <= 2) {
    alert("Title must be at least 3 characters");
    return false;
  } else if (bodyInput.value.length <= 4) {
    alert("Body must be at least 5 characters");
    return false;
  }
}
submit.addEventListener("click", handleForm);

function handleForm(e) {
  e.preventDefault();
  if (formValidation() === false) return;
  const cardLength = document.querySelector(".card-container").children.length;
  const newTask = new Task(cardLength, titleInput.value, bodyInput.value);
  localStorage.setItem(newTask.id, JSON.stringify(newTask));
  newTask.addTask();
  cleanInputs();
}
