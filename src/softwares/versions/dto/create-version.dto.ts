import { ApiProperty } from "@nestjs/swagger";

export class CreateVersionDto {

    @ApiProperty()
    description: string;

    @ApiProperty()
    major: number;

    @ApiProperty()
    minor: number;

    @ApiProperty()
    patch: number;
    
    
    @ApiProperty()
    softwaresId: number;
    
   /*  @ApiProperty()
    items?: number[];

    @ApiProperty()
    functionnalities?: number[]; */

}
