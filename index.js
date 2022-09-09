const taskInput = document.querySelector(".task-input input");
taskbox = document.querySelector(".task-box");

clearAll = document.querySelector(".clear-btn");

filters = document.querySelectorAll(".filters span");

let editId;
let isEditedTask = false;

let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showToDo(btn.id);
    });
});

function showToDo(filter) {
    let li = "";
    if (todos) {
        todos.forEach((todo, id) => {
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all") {
                li += `<li class="task">
                <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted} />
                    <p class="${isCompleted}">${todo.name}</p>
                </label>
                <div class="settings">
                    <div onclick="showMenu(this)">...</div>
                    <ul class="task-menu">
                        <li onclick="editTask(${id}, '${todo.name}')"><i class="material-icons">edit</i></li>
                        <li onclick="deleteTask(${id})"><i class="material-icons">delete</i></li>
                    </ul>
                </div>
            </li>`;
            }
        });
    }

    taskbox.innerHTML = li || `Any new Task's?`;
}

showToDo("all");

function showMenu(selectedTask) {
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", (e) => {});
}

function editTask(taskId, taskName) {
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
}

clearAll.addEventListener("click", () => {
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showToDo("all");
});

function deleteTask(deleteId) {
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showToDo("all");
}

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

taskInput.addEventListener("keyup", (e) => {
    let userTask = taskInput.value.trim();
    if (e.key == "Enter" && userTask) {
        if (!isEditedTask) {
            if (!todos) {
                todos = [];
            }

            let taskInfo = { name: userTask, status: "pending" };
            todos.push(taskInfo);
        } else {
            isEditedTask = false;
            todos[editId].name = userTask;
        }

        taskInput.value = "";

        localStorage.setItem("todo-list", JSON.stringify(todos));
        showToDo("all");
    }
});
