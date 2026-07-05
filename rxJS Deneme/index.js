console.log("index.js çallıştı");
console.log(rxjs.operators);

const input = document.querySelector("#search");
rxjs.fromEvent(input,"input")
    .pipe(rxjs.operators.debounceTime(1500))
    .subscribe(value => {
        console.log(value.target.value);
    });



/*
const { of,map } = require("rxjs");

of(1, 2, 3)                                     // observablemış (hazır veri burdaki)
    .pipe(map (x => x *10))                    // pipe veriyi ara işlemden geçirir / map her değeri dönüştürür, gelen değeri değiştirir
    .subscribe(value =>{                      // abonelik gibi veri geldikçe haber ver bir nevi dinleme, beni bu akışa bağla diyor
        console.log (value);
    });    
*/

/*
const {interval, map } = require("rxjs");

interval(1000)                               // interval zamanlayıcı veri üreticisi (sürekli veri üretir)
    .pipe(map(x => x + 1))
    .subscribe(value => {
        console.log("Saniye tick:", value);
    });
*/

/*                                                    // sınırlı değer veriliyor akış belli bir şartı yerine getirince duruyor (TAKE streami durdurma)
const {interval, take} = require("rxjs")

interval(1000)
    .pipe(take(5))
    .subscribe(value =>{
        console.log(value);
    });
*/

/*                                                    // çiftli sayılar var sadece yani filtreliyor
const{interval, filter} = require("rxjs")

interval(500)
    .pipe(filter(x => x % 2 === 0))
    .subscribe(value =>{
        console.log("çift sayı:", value);
    });
*/

/*                                                    // filtre var ama sonsuza kadar gitmiyor sınır çekildi 
const {interval, take, filter} = require("rxjs");

interval(500)
    .pipe(filter(x => x % 2 === 0),take(5))
    .subscribe(value =>{
        console.log(value);
    });
*/

/*                                                    // pipetaki her operatör kendinde önceki operatörden gelen veriyi işler bu nedenle sıralama önemli
const {interval, take, filter} = require("rxjs")

interval(500)
    .pipe(filter(x => x % 2 === 0),take(6))
    .subscribe(value =>{
        console.log(value);
    });
*/

/*                                              // from diziyi gezip elemanları ayrı ayrı yazıyor
const {from} = require("rxjs");
const numbers = [10,20,30,40];                  // from(numbers)olmadan bu da olur from([10,20,30,40])
from(numbers)
    .subscribe(value =>{
        console.log(value);
    });
*/

/*                                              // of la da çalışıyor of verilen değeri tek bir durum olarak algılayıp öyle çalıştırıyor  
const {of} = require("rxjs");
const numbers = [10,20,30,40];
of(numbers)
    .subscribe(value=>{
        console.log(value)
    })
*/

/*                                              // tap kullanımı
const {from, tap, map} = require("rxjs");
const numbers = [1,2,3,4,5];
from(numbers)
    .pipe(tap(
        x =>{
            console.log("Map'ten önce: ", x);
        }),
        map(x=> x*2),
        tap(x=>{
            console.log("Map'ten sonra: ", x);
        })
    )
    .subscribe(value => {
        console.log("Subscribe:", value);
    });
*/

