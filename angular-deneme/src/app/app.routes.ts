import { Routes } from '@angular/router';
import { Layout } from './layout/layout/layout';
import { NotFound } from './features/not-found/not-found';
import { Anasayfa } from './features/anasayfa/anasayfa';
import { Ayarlar } from './features/ayarlar/ayarlar';
import { Takvim } from './features/takvim/takvim';
import { Login } from './features/auth/login/login';
import { authGuard } from './features/auth/guards/auth-guard';
import { guestGuard } from './features/auth/guards/guest-guard';


export const routes: Routes = [
    {
        path: "",
        redirectTo: "anasayfa",
        pathMatch: 'full'
    },

    {
        path: "login",
        component: Login,
        canActivate: [guestGuard]
    },

    {
        path: "",
        component: Layout,
        canActivate:[authGuard],
        children:[
            {
                path: "anasayfa",
                component: Anasayfa
            },
            {
                path: "todos",
                loadChildren: () => // () gerektiğinde çalştır     import dosyayı o anda yükle 
                    import ('./features/todos/todos.routes').then(module => module.todoRoutes) // .then todoRutesi al   m rastgele isim
            },
            {
                path: "takvim",
                component: Takvim
            },
            {
                path: "ayarlar",
                component: Ayarlar
            },
            {
                path: "**",
                component: NotFound
            }
        ]
    }
]
