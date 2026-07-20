import { Service, signal } from '@angular/core';

@Service()
export class ToastService {

    //STATELER
    private _message = signal<string>('');
    private _type = signal< 'success' | 'error' | 'warning' | 'info' | null >(null);
    private _visible = signal<boolean>(false);

    readonly message = this._message.asReadonly();
    readonly type = this._type.asReadonly();
    readonly visible = this._visible.asReadonly();

    //ACTIONLAR
    show(message:string, type: 'success' | 'error' | 'warning' | 'info'){

        this._message.set(message);
        this._type.set(type);
        this._visible.set(true);

        setTimeout(()=>{
            this.hide();
        },3000);
    }

    hide(){
        this._message.set('');
        this._type.set(null);
        this._visible.set(false);
    }

}
