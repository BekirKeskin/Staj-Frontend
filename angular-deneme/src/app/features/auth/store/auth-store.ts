import { Service, signal, effect, inject } from "@angular/core";
import { User } from "../models/user";
import { LocalStorageService } from "../../todos/services/local-storage";
import { AuthState } from "../models/auth-state";


@Service()

export class AuthStore{

    private readonly localStorageService = inject(LocalStorageService)

    private _user = signal <User | null>(null);
    private _token = signal<string | null>(null);
    private _loading = signal(false);
    private _error = signal<string | null>(null);

    readonly user = this._user.asReadonly();
    readonly token = this._token.asReadonly();
    readonly loading = this._loading.asReadonly();
    readonly error = this._error.asReadonly();

    constructor(){
        const auth = this.localStorageService.load<AuthState>("auth")
        // 3 yerde aynı veri yapısını kullandığım için AuthState oluşturdum !!!
        if(auth){
           this._user.set(auth.user); // bunlar yerine restore session konulabilirmiş böylece
           this._token.set(auth.token); // doğrudan değiştirmek yerine storeun actionunu kullanırmış
        }

        effect(()=> {
            const auth: AuthState = {
                user: this._user(),
                token: this._token()
            };
            if(auth.user && auth.token){
                this.localStorageService.save("auth", auth);
            }else{
                this.localStorageService.remove("auth");
            }
        });
    }

    // ACTIONS

    login(user: User, token: string){
        this._user.set(user);
        this._token.set(token);
        this._loading.set(false);
        this._error.set(null);
    }
    logout(){
        this._user.set(null);
        this._token.set(null);
        this._loading.set(false);
        this._error.set(null);
    }
    restoreSession(user: User, token: string){
        this.login(user,token);
    }
    setLoading(isLoading: boolean){
        this._loading.set(isLoading);
    }
    setError(message: string | null){
        this._error.set(message);
    }
}