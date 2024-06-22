import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../entities/role.entity";

export class CreateUserDto {
    
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    isActive: boolean;
    
}
