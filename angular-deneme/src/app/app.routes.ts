import { Routes } from '@angular/router';
import { Layout } from './layout/layout/layout';
import { TodosPage } from './features/todos/todos-page/todos-page';
import { NotFound } from './features/not-found/not-found';
import { Anasayfa } from './features/anasayfa/anasayfa';
import { Ayarlar } from './features/ayarlar/ayarlar';
import { Takvim } from './features/takvim/takvim';
import { TodoDetail } from './features/todos/todo-detail/todo-detail';
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
                component: TodosPage
            },
            {
                path: "todos/:id",
                component: TodoDetail
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
