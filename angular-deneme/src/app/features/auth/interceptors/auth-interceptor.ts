import { HttpInterceptorFn } from "@angular/common/http";
import { AuthStore } from "../store/auth-store";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const authStore = inject(AuthStore);

    const token = authStore.token();
    let newReq = req;

    if(token){
        newReq = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${token}`)
        });
    }

    return next(newReq).pipe(
        catchError((error)=>{
            if(error.status === 401){
                authStore.logout();
            }
            return throwError(()=> error);
        })
    );
};