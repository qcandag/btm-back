import  {IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from 'class-validator';
import { UserAct } from 'src/modules/enum/user-act.enum';
import { UserStatus } from 'src/modules/enum/user-status.enum';


export class AuthCredentialsDto {

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


    @IsNotEmpty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    mail: string;

    @IsNotEmpty()
    @IsString()
    status: UserStatus

    useract: UserAct.ACTIVE;
}