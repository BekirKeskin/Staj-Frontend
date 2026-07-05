interface Todo {
  id: number | string;
  title: string;
  completed: boolean;
  createdAt: string;
}

type FilterType = "all" | "active" | "completed";
let currentFilter: FilterType = "all";

let todos: Todo[] = [];
let editingId: number | string | null = null;

function loadTodos(): void {
  const data = localStorage.getItem("todos");

  if (data) {
    todos = JSON.parse(data);
  }
}

const input = document.querySelector("#todoInput") as HTMLInputElement;
const addBtn = document.querySelector("#addBtn") as HTMLButtonElement;

const allBtn = document.querySelector("#allBtn") as HTMLButtonElement;
const activeBtn = document.querySelector("#activeBtn") as HTMLButtonElement;
const completedBtn = document.querySelector("#completedBtn") as HTMLButtonElement;

const editInput = document.querySelector("#editInput") as HTMLInputElement;
const saveEditBtn = document.querySelector("#saveEditBtn") as HTMLButtonElement;

const list = document.querySelector("#todoList") as HTMLUListElement;



function saveTodos(): void {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getFilteredTodos(): Todo[] {
  switch (currentFilter) {
    case "active":
      return todos.filter(todo => !todo.completed);

    case "completed":
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
}

function addTodo(title: string): void { // yeni todo oluşturup listeye ekleme
  const newTodo: Todo = {
    id: Date.now(),
    title: title,
    completed: false,
    createdAt: new Date().toISOString()
  };

  todos.push(newTodo);
}

function updateTodo(id: number | string, newTitle: string): void {
  todos = todos.map(todo =>
    todo.id === id
      ? { ...todo, title: newTitle }
      : todo
  );
}

function getCompletedTodos(): Todo[] {
  return todos.filter(todo => todo.completed);
}

function getActiveTodos(): Todo[] {
  return todos.filter(todo => !todo.completed);
}

function deleteTodo(id: number | string): void { // silme
  todos = todos.filter(todo => todo.id !== id);
}

function toggleTodo(id: number | string): void { // toggle
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

function renderTodos(): void {
  list.innerHTML = "";

  const filtered = getFilteredTodos();

  filtered.forEach(todo => {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = `${todo.title} - ${todo.completed ? "✔" : "❌"}`;

    text.addEventListener("click", () => { // burda olma nedeni dom elemen sadece render sırasında oluşuyor.
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

  if (!value) return;

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
  if (!editingId) return;

  const newTitle = editInput.value;

  if (!newTitle) return;

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