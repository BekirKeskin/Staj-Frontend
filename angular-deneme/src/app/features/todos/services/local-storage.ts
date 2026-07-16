import { Service } from '@angular/core';

@Service()
export class LocalStorageService {

    save(key: string, value: unknown):void{
        const data = JSON.stringify(value); // dönüştürme
        localStorage.setItem(key,data); // kaydetme 
    }
    
    load<T>(key: string): T | null{ // T = type mış aslına istediğimiz şey olabilir sadece belli olan bir kısaltmaymış
        const data = localStorage.getItem(key);
        if (!data){
            return null;
        }
        try{
        const result = JSON.parse(data);
        return result; // as T de eklenebilir belirtme amaçlı
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
