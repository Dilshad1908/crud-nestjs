import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateStudentDto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    readonly name:string;

    @IsNotEmpty()
    @IsNumber()
    readonly rollNo:number

    @IsNotEmpty()
    @IsNumber()
    readonly class:number

    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    readonly gender:string;

    @IsNotEmpty()
    @IsNumber()
    readonly marks:number
}