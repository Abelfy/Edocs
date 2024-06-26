import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from 'src/users/entities/user.entity';


export interface TokenPayload {
    userId: number;
    email: string;
    role?: string;
}


@Injectable()
export class AuthService {

    constructor(private readonly configService : ConfigService, private readonly jwtService : JwtService) {}

    async login(user: User, response: Response) {
        const tokenPayload : TokenPayload = {
            userId: user.id,
            email: user.email,
        }

        const expires = new Date();
        expires.setSeconds(expires.getSeconds() + this.configService.get('JWT_EXPIRATION'));

        const token = this.jwtService.sign(tokenPayload);

        response.cookie('Authentication', token, {
            httpOnly: true,
            expires,
        });
    }
}
