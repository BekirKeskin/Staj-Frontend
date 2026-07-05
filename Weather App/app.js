const input = document.querySelector("#cityInput");
const button = document.querySelector("#searchBtn");
const app = document.querySelector("#App");

const API_KEY = "YOUR_API_KEY";

button.addEventListener("click", async function () {
    const city = input.value;

    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const res = await fetch(url);
        if (!res.ok){
            console.log("Hata oluştu.");
            return;
        }
        const data = await res.json();
        app.innerHTML = `<h2>${data.name}</h2><p>${data.main.temp} °C</p><p>${data.weather[0].description}</p>`;
        console.log(data);
    }
    catch (error) {
        app.innerHTML = "<p>Bir hata oluştu.</p>";
        console.log(error);
    }
});

button.addEventListener("click",function(){
    const city = input.value;
    console.log(city);
});