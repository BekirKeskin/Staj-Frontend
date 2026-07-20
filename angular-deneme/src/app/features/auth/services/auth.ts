import { Service, inject } from '@angular/core';
import { User } from "../models/user";
import { LoginRequest } from '../models/login-request';

type FakeUser = User & {
    password: string;
};

@Service()
export class AuthService {

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

    login(data: LoginRequest): string | null {

        const user = this.users.find(user=> user.email === data.email);

        if(!user){
            return null;
        }
        if(user.password !== data.password){
            return null;
        }
        return this.generateToken(user.id);
    }

    private generateToken(userId: number):string {
        return `fake-token-${userId}`;
    }

    getMe(token: string ): User | null {

        const userId = Number(
            token.replace("fake-token-", "")
        );

        const user = this.users.find(
            user => user.id === userId
        );

        if(!user){
            return null;
        }
        
        return{
            id: user.id,
            name: user.name,
            email: user.email
        };
    }
}
