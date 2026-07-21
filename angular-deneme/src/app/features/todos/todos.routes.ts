import { Routes} from "@angular/router";
import { TodosPage } from "./todos-page/todos-page";
import { TodoDetail } from "./todo-detail/todo-detail";

export const todoRoutes: Routes = [

    {
        path: "",
        component: TodosPage
    },
    {
        path: ":id",
        component: TodoDetail
    },
]