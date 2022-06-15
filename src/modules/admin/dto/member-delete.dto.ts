import  {IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from 'class-validator';

export class MemberDeleteCredentialsDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(11)
    @MaxLength(11)
    phone: string;


    @IsNotEmpty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    mail: string;

}