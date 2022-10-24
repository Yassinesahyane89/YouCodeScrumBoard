// those are icon for each task Type
let iconTOdo = "fa-regular fa-circle-question fa-2xl";
let iconInprogress = "fa fa-circle-notch fa-2xl";
let iconDone = "fa-regular fa-circle-check fa-2xl";

// nomber of  tasks in each list
let NbrTodo = document.getElementById("to-do-tasks-count");
let NbrInprogress = document.getElementById("in-progress-tasks-count");
let NbrDone = document.getElementById("done-tasks-count");

//function for creat new Task
function creatTask(count, icon, i, taskStatus) {
  let btn = `
        <button class="d-flex align-items-center border-0 border-top" data-bs-toggle="modal" data-bs-target="#modal" onclick="editTask(this)" data-id="${i}">
            <div class="col-1 text-success">
                <i class="${icon}"></i> 
            </div>
            <div class="col-11 text-start">
                <div class="fw-800" id="taskTitle">${tasks[i].title}</div>
                    <div class="">
                        <div class="fw-100 text-muted d-flex" >#${count} created in <div  style="margin-left:5px" id="taskDate">${tasks[i].date}</div></div>
                        <div class="title1" title="${tasks[i].description}" id="taskDescription">${tasks[i].description}</div>
                    </div>
                    <div class="">
                        <span class="btn btn-primary btn-sm" id="taskPriorty">${tasks[i].priority}</span>
                        <span class="btn btn-secondary btn-sm" id="taskType">${tasks[i].type}</span>
                    </div>
            </div>
            <div id="TaskStatus" hidden>${tasks[i].status}</div>
        </button>
        `;
  return btn;
}
// window.localStorage.clear();s

// take data from table and show it in page
function showTasks() {
  let count = 1;

  let NomberDone = 1;
  let NomberTodo = 1;
  let NomberInprogress = 1;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].status == "To Do") {
      NbrTodo.innerHTML = NomberTodo;
      document.getElementById("to-do-tasks").innerHTML += creatTask(
        count,
        iconTOdo,
        i
      );
      count++;
      NomberTodo++;
    } else if (tasks[i].status == "Done") {
      NbrDone.innerHTML = NomberDone;
      document.getElementById("done-tasks").innerHTML += creatTask(
        count,
        iconDone,
        i
      );
      count++;
      NomberDone++;
    } else if (tasks[i].status == "In Progress") {
      NbrInprogress.innerHTML = NomberInprogress;
      document.getElementById("in-progress-tasks").innerHTML += creatTask(
        count,
        iconInprogress,
        i
      );
      count++;
      NomberInprogress++;
    }
  }
}
showTasks();

// function for add new task
function addNewTask() {
  document.getElementById("BtnSave").addEventListener("click", saveTask);

  function saveTask() {
    // git value from input
    let Newtitle = document.getElementById("recipient-name").value;
    let Newtype = document.querySelector(
      'input[name="flexRadioDefault"]:checked'
    ).value;
    let Newpriority = document.getElementById("Proiority").value;
    let Newstatus = document.getElementById("status").value;
    let Newdate = document.getElementById("date-input").value;
    let Newdescription = document.getElementById("message-text").value;

    // check if all input are fill
    if (
      Newtitle == "" ||
      Newtype == "" ||
      Newpriority == "Please select" ||
      Newstatus == "Please select" ||
      Newdate == "" ||
      Newdescription == ""
    ) {
      alert("Please input all Value");
    } else {
      reloadTasks();

      // Ajoutez object au Array
      tasks.push({
        title: Newtitle,
        type: Newtype,
        priority: Newpriority,
        status: Newstatus,
        date: Newdate,
        description: Newdescription,
      });

      // //save tasks
      // localStorage.setItem("tasks", JSON.stringify(tasks));

      //vide modal
      document.getElementById("addTask").reset();

      // click close for close modal after we save a new  task
      document.getElementById("BtnClose").click();

      // refresh tasks
      showTasks();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your task has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
addNewTask();

function editTask(element) {
  // Initialisez task form

  let infoTask = {
    title: element.querySelector("#taskTitle").innerHTML,
    type: element.querySelector("#taskType").innerHTML,
    priority: element.querySelector("#taskPriorty").innerHTML,
    status: element.querySelector("#TaskStatus").innerHTML,
    date: element.querySelector("#taskDate").innerHTML,
    description: element.querySelector("#taskDescription").innerHTML,
  };

  // initialise for form
  document.getElementById("recipient-name").value = infoTask.title;
  if (infoTask.type === "Bug") {
    document.getElementById("flexRadioDefault2").checked = true;
  } else {
    document.getElementById("flexRadioDefault1").checked = true;
  }
  document.getElementById("Proiority").value = infoTask.priority;
  document.getElementById("status").value = infoTask.status;
  document.getElementById("date-input").value = infoTask.date;
  document.getElementById("message-text").value = infoTask.description;

  //save update
  document.getElementById(
    "buttonsModal"
  ).innerHTML = `<button id="buttonUpdate"class="btn btn-primary" data-bs-dismiss="modal" type="button" onclick="updateTask(this)" data-id="${element.getAttribute(
    "data-id"
  )}">Update</button>
    `;

  // Delete Button
  document.getElementById(
    "buttonsModal"
  ).innerHTML += `<button  class="btn btn-danger" data-bs-dismiss="modal" type = "button" onclick="deleteTask(this)" data-id="${element.getAttribute(
    "data-id"
  )}">Delete</button>`;
}

function updateTask(element) {
  reloadTasks();
  let index = element.getAttribute("data-id");
  let dataForm = {
    title: document.getElementById("recipient-name").value,
    type: document.querySelector('input[type="radio"]:checked').value,
    priority: document.getElementById("Proiority").value,
    status: document.getElementById("status").value,
    date: document.getElementById("date-input").value,
    description: document.getElementById("message-text").value,
  };
  tasks[index] = dataForm;
  document.getElementById("addTask").reset();

  console.log(tasks[index]);
  showTasks();

  //Modal Update successfully
  function updateSuccess() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Update Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  document
    .getElementById("buttonUpdate")
    .addEventListener("click", updateSuccess());
}

function deleteTask(element) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      let index = element.getAttribute("data-id");
      reloadTasks();
      tasks.splice(index, 1);
      showTasks();
      Swal.fire("Deleted!", "Your task has been deleted.", "success");
    }
  });
}

//remove all tasks
function reloadTasks() {
  document.getElementById("to-do-tasks").innerHTML = "";
  document.getElementById("done-tasks").innerHTML = "";
  document.getElementById("in-progress-tasks").innerHTML = "";
}
