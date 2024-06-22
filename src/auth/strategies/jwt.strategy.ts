import {  Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import { Request } from "express";
import { TokenPayload } from "../auth.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService,private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request?.cookies?.Authentication,
            ]),
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate({ userId }: TokenPayload) {
        return this.userService.findOne(userId);
    }
}