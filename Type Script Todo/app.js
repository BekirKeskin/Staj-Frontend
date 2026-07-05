"use strict";
let currentFilter = "all";
let todos = [];
let editingId = null;
function loadTodos() {
    const data = localStorage.getItem("todos");
    if (data) {
        todos = JSON.parse(data);
    }
}
const input = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const allBtn = document.querySelector("#allBtn");
const activeBtn = document.querySelector("#activeBtn");
const completedBtn = document.querySelector("#completedBtn");
const editInput = document.querySelector("#editInput");
const saveEditBtn = document.querySelector("#saveEditBtn");
const list = document.querySelector("#todoList");
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getFilteredTodos() {
    switch (currentFilter) {
        case "active":
            return todos.filter(todo => !todo.completed);
        case "completed":
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
}
function addTodo(title) {
    const newTodo = {
        id: Date.now(),
        title: title,
        completed: false,
        createdAt: new Date().toISOString()
    };
    todos.push(newTodo);
}
function updateTodo(id, newTitle) {
    todos = todos.map(todo => todo.id === id
        ? { ...todo, title: newTitle }
        : todo);
}
function getCompletedTodos() {
    return todos.filter(todo => todo.completed);
}
function getActiveTodos() {
    return todos.filter(todo => !todo.completed);
}
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
}
function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return {
                ...todo,
                completed: !todo.completed
            };
        }
        return todo;
    });
}
function renderTodos() {
    list.innerHTML = "";
    const filtered = getFilteredTodos();
    filtered.forEach(todo => {
        const li = document.createElement("li");
        const text = document.createElement("span");
        text.textContent = `${todo.title} - ${todo.completed ? "✔" : "❌"}`;
        text.addEventListener("click", () => {
            toggleTodo(todo.id);
            saveTodos();
            renderTodos();
        });
        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.addEventListener("click", () => {
            editingId = todo.id;
            editInput.value = todo.title;
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Sil";
        deleteBtn.addEventListener("click", () => {
            deleteTodo(todo.id);
            saveTodos();
            renderTodos();
        });
        li.appendChild(text);
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        list.appendChild(li);
    });
}
addBtn.addEventListener("click", () => {
    const value = input.value;
    if (!value)
        return;
    addTodo(value);
    input.value = "";
    saveTodos();
    renderTodos();
});
allBtn.addEventListener("click", () => {
    currentFilter = "all";
    renderTodos();
});
activeBtn.addEventListener("click", () => {
    currentFilter = "active";
    renderTodos();
});
completedBtn.addEventListener("click", () => {
    currentFilter = "completed";
    renderTodos();
});
saveEditBtn.addEventListener("click", () => {
    if (!editingId)
        return;
    const newTitle = editInput.value;
    if (!newTitle)
        return;
    updateTodo(editingId, newTitle);
    editingId = null;
    editInput.value = "";
    saveTodos();
    renderTodos();
});
loadTodos();
renderTodos();
// TEST ALANI
/*
todos = [];

addTodo("TypeScript öğren");
addTodo("JavaScript tekrar");
addTodo("Todo app yap");

console.log("Başlangıç:", todos);

// ilk elemanı al (güvenli testmiş)
const firstId = todos[0].id;

toggleTodo(firstId);
console.log("Toggle sonrası:", todos);

deleteTodo(firstId);
console.log("Silme sonrası:", todos);
*/ 
