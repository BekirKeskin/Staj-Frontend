//STATE
let tasks = [];
let currentFilter = "all";
let isLoading = false;

const loadBtn = document.querySelector("#loadBtn");

const allBtn = document.querySelector("#allBtn");
const activeBtn = document.querySelector("#activeBtn");
const doneBtn = document.querySelector("#doneBtn");

const app = document.querySelector("#app");

//ACTIONS
function setTasks(data) {
    setTasks(data);
    render();
}

function setLoading(value) {
    isLoading = value;
    render();
}

//RENDER 
function render() {
    app.innerHTML = "";
    if (isLoading) {
        app.innerHTML = "<p>Yükleniyor...</p>";
        return;
    }

    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(item => !item.completed);
    }

    if (currentFilter === "done") {
        filteredTasks = tasks.filter(item => item.completed);
    }

    filteredTasks.forEach((item,index) => {

        const div = document.createElement("div");

        // checkbox oluştur
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.completed;

        // tıklanınca state değişsin
        checkbox.addEventListener("change", function () {
            item.completed = checkbox.checked;
            render(); // UI yenile
        });

        // title
        const text = document.createElement("span");
        text.textContent = item.title;

        // tamamlandıysa stil
        if (item.completed) {
            text.style.textDecoration = "line-through";
            text.style.opacity = "0.5";
        }

        // ❌ delete button
        const delBtn = document.createElement("button");
        delBtn.textContent = "X";

        delBtn.addEventListener("click", function () {
            tasks.splice(index, 1); // sil
            render(); // yeniden çiz
        });

        div.appendChild(checkbox);
        div.appendChild(text);
        div.appendChild(delBtn);

        app.appendChild(div);
    });
}

//FETCH
loadBtn.addEventListener("click", async function () {
    try{
    isLoading = true;
    render();
    
    const res = await fetch("https://jsonplaceholder.typicode.com/todos")

    if (!res.ok) {
            throw new Error("API hatası");
    }

    const data = await res.json();

    tasks = data;
    }catch (error){
        app.innerHTML = "<p style= 'color:red'>Bir hata oluştu</p>";
        console.log(error);
    }finally {
        isLoading = false;
        render();
    }
});

allBtn.addEventListener("click", function () {
    currentFilter = "all";
    render();
});

activeBtn.addEventListener("click", function () {
    currentFilter = "active";
    render();
});

doneBtn.addEventListener("click", function () {
    currentFilter = "done";
    render();
});




/*
loadBtn.addEventListener("click",function(){
    fetch("https://jsonplaceholder.typicode.com/todos/1") // tek obje döndürür 1 giderse liste döndürür
        .then(res => res.json())
        .then(data => {
            app.innerHTML = `
                <h3>${data.title}</h3>
                <p>Durum: ${data.completed}</p>
                <p>ID: ${data.id}</p>
            `;

        });
});
*/