import { IsEnum, IsDefined, IsString, IsDateString, IsDate } from 'class-validator';

export enum Gender {
    "Male" = "M",
    "Female" = "F"  
}
export class Person {
    @IsDefined()
    @IsEnum(Gender)
    gender: string;
    
    @IsDefined()
    @IsDateString({ strict: true, strictSeparator: false })
    dob: string;
} 