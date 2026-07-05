import { Component, signal, computed } from '@angular/core';
type Todo = { // görevlerin alabileceği değişken türleri belirlenir
  id: number;
  text: string;
  done: boolean;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

// GENEL AKIŞ:  Kullanıcı yazar -> (input event) -> onInput() -> signalUpdate -> UI Refresh

export class App {
  // ADIM 1 SIGNAL MANTIĞI // Kullanıcı yazacak, biz state içinde göreceğiz, henüz liste ve add yok, sadece input var
  // STATE OLUŞTURMA   // () -> değeri oku
  input = signal(''); // signal('') inputta reaktif değişken oluşturuyormuş signal olunca angular bunu anlıyormuş
  onInput(event:Event){ // kullanıcı bir şey yazınca onu yakalar her inputta çalışır
    const value = (event.target as HTMLInputElement).value; // input kutusunun içis
    this.input.set(value); // TS State değiştirir neden input.set() -> değeri değiştirir
  }

  // ADIM 2 ToDo List + Add Mantığı // inputa yaz, butona bas, listeye ekle, ekranda gör
  list = signal<Todo[]>([]); // VERİ BURADA, Todo[] = listenin içinde todo objeleri olacak, []=başlangıçta liste yok
  // ADD
  addTodo(){ //Veri değişir
    const value = this.input().trim(); // trim baştaki ve sondaki boşlukları siler yani boşsa bomboş olur
    if(!value) return; // sonra bura çalışır ve boş todo eklenmez, !value = değer yoksa/boşsa

    const newTodo: Todo ={
      id: Date.now(), //her anı tutuyor, id veriyor, normalde veritabanı işi ama şuan kullanmıyoruz
      text: value,
      done: false
    };
    this.list.set([    // this.list() = listenin şu anki hali ...this.list() = elemanları çıkar,
      ...this.list(), // newTodo eklenince yeni liste oluşuyor, set()= eski listeyi bunla değiştir diyor.
      newTodo        // sonuç: Eski listenin sonuna yeni todo ekle ve bunu yeni state yap
    ]);
    this.input.set(''); // bir şey ekledikten sonra inputu temizliyor 
  }

  changeFilter(value: 'all' | 'active' | 'completed') {
    this.filter.set(value);
  }
  
  filter=signal('all')
  filteredList = computed(()=>{

    if(this.filter() === 'all'){
      return this.list(); // this.list() = gerçek liste    this.list = signal
    }

    if(this.filter() === 'active'){
      return this.list().filter(todo => todo.done === false);
    }

    if(this.filter() === 'completed'){
      return this.list().filter(todo => todo.done === true);
    }
    return this.list();
  });

  deleteTodo(id:number){
    this.list.set(
      this.list().filter(todo => todo.id !== id)
    );
  }

  toggleTodo(id:number){
    this.list.set(
      this.list().map(todo =>{
        if(todo.id === id){
          return {...todo, done: !todo.done};
        }
        return todo;
      })
    );
  }
}
