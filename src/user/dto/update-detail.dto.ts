import  {IsNotEmpty, IsString, Matches, MaxLength, MinLength} from 'class-validator';


export class UpdateDetailsDto {

    @IsNotEmpty()
    @IsString()
    salary: string;

    @IsNotEmpty()
    @IsString()
    jobtitle: string;


    @IsNotEmpty()
    @IsString()
    age: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(11)
    @MaxLength(11)
    phone: string;

    @IsNotEmpty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password too weak'})
    password: string;



}