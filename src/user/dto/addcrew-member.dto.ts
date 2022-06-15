import  {IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from 'class-validator';
import { CrewStat } from 'src/modules/enum/crew-stat.enum';
import { UserAct } from 'src/modules/enum/user-act.enum';
import { UserStatus } from 'src/modules/enum/user-status.enum';


export class AddCrewCredentialsDto {

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
    status: UserStatus

    useract: UserAct.ACTIVE;

    @IsNotEmpty()
    @IsString()
    crewstat: CrewStat;

    @IsNotEmpty()
    @IsString()
    salary: string;

    @IsNotEmpty()
    @IsString()
    jobtitle: string;


    @IsNotEmpty()
    @IsString()
    age: string;



}