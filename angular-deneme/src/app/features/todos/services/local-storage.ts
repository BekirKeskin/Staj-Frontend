import { Service } from '@angular/core';

@Service()
export class LocalStorageService {

    save(key: string, value: unknown):void{
        const data = JSON.stringify(value); // dönüştürme
        localStorage.setItem(key,data); // kaydetme 
    }
    
    load(key: string): unknown | null{
        const data = localStorage.getItem(key);
        if (!data){
            return null;
        }
        try{
        const result = JSON.parse(data);
        return result;
        }catch(error){
            return null
        }
    }

    remove(key: string):void{
        localStorage.removeItem(key);
    }

    clear():void{
        localStorage.clear();
    }
}
