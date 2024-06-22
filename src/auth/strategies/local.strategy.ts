import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UsersService } from "src/users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    logger: Logger = new Logger('LocalStrategy');

    constructor(private readonly userService : UsersService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string) {
        return this.userService.validateUser( email, password );
    }
}