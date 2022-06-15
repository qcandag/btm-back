import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Body, Controller, Post, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User, UserDocument } from '../../../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { LoginCreditentialsDto } from './dto/login-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';


// export interface AuthResult {
//     user: Record<string, any>,
//     accessToken: string
// }

type PayloadType = {
    accessToken: ObjectId;
}

// SUPERADMIN _id = 62a387eabae3b19520350df4
@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
                @InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createUser(authCredentialsDto: AuthCredentialsDto, req) {

        const jwt = req.headers.authorization.slice(7);

        const decodedJwtAccessToken = this.jwtService.decode(jwt);

        const jwtUserId = decodedJwtAccessToken['_id']
       
        const userStatus = await (await this.userModel.findOne({ _id: jwtUserId })).status;

        if (userStatus === 'SUPERADMIN' || userStatus === 'ADMIN') {
            const password = authCredentialsDto.password;

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            authCredentialsDto.password = hashedPassword;


            const CreatedUser = new this.userModel(authCredentialsDto);
            return await CreatedUser.save();

        } else {
            throw new InternalServerErrorException('You are not authorized to create a user');
        }
    }
    
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmEzODdlYWJhZTNiMTk1MjAzNTBkZjQiLCJpYXQiOjE2NTQ4OTE0NDYsImV4cCI6MTY1NDg5NTA0Nn0.wVY_nNLd92GUzg4PGvJEfEibPHRSqIFGbtKu8TYaRDo

    // Promise<AuthResult> : Promise<{accessToken:string}>
    
    async login(loginDto: LoginCreditentialsDto) {

       const userPhone = await this.userModel.findOne({ phone: loginDto.phone });
       console.log(userPhone);
       const userPass = await this.userModel.findOne({ password: userPhone.password });
       const userID = await this.userModel.findOne({ _id: userPhone._id}); 
       const phone = userPhone.phone;
       const id = userID._id.toString();

        if (userPhone && (await bcrypt.compare(loginDto.password, userPass.password))) {
            const payload: JwtPayload = { phone: phone, _id: id };
            const accessToken: string = this.jwtService.sign(payload);
            return {accessToken};
        }else {
            throw new InternalServerErrorException('Invalid credentials');
        }
    }

    async validateUser(payload: any): Promise<any> {
        return { email: payload.email, sub: payload.sub };
    }

    

    



}
