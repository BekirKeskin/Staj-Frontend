let count =0;

const counter = document.querySelector("#counter");
const increaseBtn = document.querySelector("#increase");
const decreaseBtn = document.querySelector("#decrease");
const resetBtn = document.querySelector("#reset");

function updateUI() {
    counter.textContent = count;
}

increaseBtn.addEventListener("click", function(){
    count++;
    updateUI();
})

decreaseBtn.addEventListener("click", function(){
    count--;
    updateUI();
})

resetBtn.addEventListener("click", function(){
    count = 0;
    updateUI();
})
