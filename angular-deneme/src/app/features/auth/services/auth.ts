import { Service, inject } from '@angular/core';
import { AuthStore } from "../store/auth-store";
import { User } from "../models/user";
import { LoginRequest } from '../models/login-request';

type FakeUser = User & {
    password: string;
};

@Service()
export class AuthService {
    private authStore = inject(AuthStore);

    private users: FakeUser[] = [
        {
            id: 1,
            name: "Admin",
            email: "admin@test.com",
            password: "123456"
        },
        {
            id: 2,
            name: "Ali",
            email: "ali@test.com",
            password: "123456"
        }
    ];

    login(data: LoginRequest): boolean {
        this.authStore.setLoading(true);
        const user = this.users.find(user=> user.email === data.email);
        if(!user){
            this.authStore.setError("kullanıcı bulunamadı");
            this.authStore.setLoading(false);
            return false;
        }if(user.password !== data.password){
            this.authStore.setError("hatalı şifre");
            this.authStore.setLoading(false);
            return false;
        }
        const currentUser = {
            id: user.id,
            name: user.name,
            email: user.email
        }
        const token = this.generateToken();
        this.authStore.setError(null);
        this.authStore.login(currentUser,token);
        this.authStore.setLoading(false);
        return true;
    }

    logout() {
        this.authStore.logout();
    }

    private generateToken():string {
        return "fake-token";
    }
}
