import { Routes } from '@angular/router';
import { Layout } from './layout/layout/layout';
import { TodosPage } from './features/todos/todos-page/todos-page';
import { NotFound } from './features/not-found/not-found';
import { Anasayfa } from './features/anasayfa/anasayfa';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "anasayfa",
        pathMatch: 'full'
    },

    {
        path: "",
        component: Layout,
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
                path: "**",
                component: NotFound
            }
        ]
    }
]
