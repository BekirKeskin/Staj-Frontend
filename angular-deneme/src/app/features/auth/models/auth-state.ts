import { User } from "./user";

export type AuthState = {
    user: User | null;
    token: string | null;
}