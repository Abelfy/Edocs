import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";

export const getCurrentUserByContext = (context : ExecutionContext) : User => {
    if(context.getType() === 'http') {
        return context.switchToHttp().getRequest().user;
    }
}

export const CurrentUser = createParamDecorator((_data : unknown, context: ExecutionContext) => 
getCurrentUserByContext(context));