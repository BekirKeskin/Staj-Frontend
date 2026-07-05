// STATE(VERİ) sayfa açılınca eski yeri yükleme yani kalıcılık
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//FILTER STATE  
let currentFilter = "all";


//DOM KISMI
const text = document.querySelector("#text"); //paragrafı seç
const ThemeToggle = document.querySelector("#ThemeToggle");
const body = document.body;

const form = document.querySelector("#taskForm");
const input = document.querySelector("#taskInput");
const message = document.querySelector("#message");

const allBtn = document.querySelector("#allBtn");
const activeBtn = document.querySelector("#activeBtn");
const doneBtn = document.querySelector("#doneBtn");


const activeList = document.querySelector("#activeList");
const doneList = document.querySelector("#doneList");


//Kaydetme
function save(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
/*
input.addEventListener("keydown", function(event) { //enterla eklemeyi sağlıyor
    if (event.key === "Enter") {
        btn.click();
    }
});
*/
function setActive(btn) { //hangi butonun seçili olduğunu gösteriyor
    allBtn.classList.remove("active");
    activeBtn.classList.remove("active");
    doneBtn.classList.remove("active");

    btn.classList.add("active");
}

//UI Component ları
function createTaskElement(task, index) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    checkbox.addEventListener("change", function () {
        task.done = checkbox.checked;
        save();
        render();
    });
    
    const span = document.createElement("span");
        span.textContent = task.text;
        span.style.fontWeight = "bold";
        if (task.done) {
            span.style.textDecoration = "line-through";
        }
    

    const x = document.createElement("span");
    x.textContent = "✖";
    x.style.cursor = "pointer";
            
    x.addEventListener("click", function () {
        tasks.splice(index, 1);
        save();
        render();
    });

    const edit = document.createElement("span");
    edit.textContent = "✏️";
    edit.style.cursor = "pointer";

    edit.addEventListener("click", function () {
        if (li.querySelector("input.edit-input")) return;

        const inputEdit = document.createElement("input");
        inputEdit.type = "text";
        inputEdit.value = task.text;
        inputEdit.classList.add("edit-input");

        span.style.display = "none";
        li.insertBefore(inputEdit, edit);
        inputEdit.focus();

        inputEdit.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                if (inputEdit.value.trim() === "") return;
                task.text = inputEdit.value;
                save();
                render();
            }    
            if (e.key === "Escape") {
                render(); // iptal
            }
        });
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(edit);
    li.appendChild(x);

    return li;
}

// UI Kısmı (Render)
function render(){ //listeyi ekrana çiz
    activeList.innerHTML = "";
    doneList.innerHTML = "";

    tasks
    .filter(task =>{
        if (currentFilter === "active") return !task.done;
        if (currentFilter === "done") return task.done;
        return true;
    })
    .forEach((task,index)=>{
        const li = createTaskElement(task,index);

        if (task.done) {
            doneList.appendChild(li);
        } else {
            activeList.appendChild(li);
        }
    });
}

// ACTIONS (eventler)
    
ThemeToggle.addEventListener("click", function(){
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
        ThemeToggle.textContent = "☀";
    }
    else{
        ThemeToggle.textContent = "🌙";
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const value = input.value;

    if (!value){
        message.textContent = "Lütfen bir şeyler yazınız!";
        setTimeout(() => {
            message.textContent = "";
        }, 2000);
    return;        
}
    tasks.push({
        text: value,
        done: false
    });
    input.value = "";
    save();
    render();
});

/*
btn.addEventListener("click", function(){
    const value = input.value;
    if (!value){
        message.textContent = "Lütfen bir şeyler yazınız!";

    setTimeout(() => {
        message.textContent = "";
    }, 2000);
    return;        
}
message.textContent = "";

tasks.push({
    text: value,
    done: false
});
save();
render();
input.value = "";
});
*/
allBtn.addEventListener("click", () => {    
    currentFilter = "all";
    setActive(allBtn);
    render();
});

activeBtn.addEventListener("click", () => {
    currentFilter = "active";
    setActive(activeBtn);
    render();
});

doneBtn.addEventListener("click", () => {
    currentFilter = "done";
    setActive(doneBtn);
    render();
});

setActive(allBtn);
render(); // yazdırır yani okumayı sağlar
