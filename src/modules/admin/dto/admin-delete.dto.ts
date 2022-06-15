import  {IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from 'class-validator';
import { UserStatus } from 'src/modules/enum/user-status.enum';

export class AdminDeleteCredentialsDto {

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

    @IsNotEmpty()
    @IsString()
    userstatus: UserStatus;

}