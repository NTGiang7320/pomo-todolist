window.onload = function () {
    let startButton = document.getElementById("start");
    let resetButton = document.getElementById("reset");
    let timerElememt = document.getElementById("timer");
    let breakButton = document.getElementById("break");

    startButton.addEventListener("click", startTimer);
    resetButton.addEventListener("click", resetTimer);
    breakButton.addEventListener("click", breakTimer);

    function startTimer() {
        startButton.disabled = true;
        resetButton.disabled = false;
        breakButton.disabled = false;

        let timeLeft = 25 * 60;

        timer = setInterval(function () {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;

            timerElememt.innerHTML = formatTime(minutes) + ":" + formatTime(seconds);
            if (timeLeft === 0) {
                clearInterval(timer);
                startButton.disabled = false;
                resetButton.disabled = true;
                pauseButton.disabled = true;
            }
            timeLeft--;
        }, 1000);
    }

    function breakTimer() {
        clearInterval(timer);
        timerElememt.innerHTML = "05:00";
        startButton.disabled = true;
        resetButton.disabled = false;
        breakButton.disabled = true;
        let timeLeft1 = 5 * 60;

        timer1 = setInterval(function () {
            let minutes1 = Math.floor(timeLeft1 / 60);
            let seconds1 = timeLeft1 % 60;

            timerElememt.innerHTML =
                formatTime(minutes1) + ":" + formatTime(seconds1);
            if (timeLeft1 === 0) {
                clearInterval(timer1);
                startButton.disabled = true;
                resetButton.disabled = true;
                breakButton.disabled = false;
            }
            timeLeft1--;
        }, 1000);
    }
    // function reset timer
    function resetTimer() {
        clearInterval(timer);
        clearInterval(timer1);
        timerElememt.innerHTML = "25:00";
        startButton.disabled = false;
        resetButton.disabled = true;
        breakButton.disabled = false;
    }
    //real time
    let realTime = document.querySelector(".clock");
    function updateClock() {
        let now = new Date();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        realTime.innerHTML =
            formatTime(hour) + ":" + formatTime(minute) + ":" + formatTime(second);
        setTimeout(updateClock, 1000);
    }
    updateClock();
    function formatTime(time) {
        return time < 10 ? "0" + time : time;
    }
};

// to do list
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

function addTodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //ADDING TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("slide");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></li>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
