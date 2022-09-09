const taskInput = document.querySelector(".task-input input");
taskbox = document.querySelector(".task-box");
let todos = JSON.parse(localStorage.getItem("todo-list"));

function showToDo() {
    let li = "";
    if (todos) {
        todos.forEach((todo, id) => {
            let isCompleted = todo.status == "completed" ? "checked" : "";
            li += `<li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted} />
                            <p class="${isCompleted}">${todo.name}</p>
                        </label>
                        <div class="settings">
                            <div onclick="showMenu(this)">...</div>
                            <ul class="task-menu">
                                <li><i class="material-icons">edit</i></li>
                                <li><i class="material-icons">delete</i></li>
                            </ul>
                        </div>
                    </li>`;
        });
    }

    taskbox.innerHTML = li;
}

showToDo();

function showMenu(selectedTask) {
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", (e) => {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            taskMenu.classList.remove("show");
        }
    });
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
        if (!todos) {
            todos = [];
        }
        taskInput.value = "";
        let taskInfo = { name: userTask, status: "pending" };
        todos.push(taskInfo);
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showToDo();
    }
});
