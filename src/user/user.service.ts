import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberCredentialsDto } from 'src/modules/auth/auth/dto/member-authc.dto';
import { CrewMemberReq, CrewMemberReqDocument } from 'src/schemas/addcrew-member.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { AddCrewCredentialsDto } from './dto/addcrew-member.dto';
import { UpdateDetailsDto } from './dto/update-detail.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(CrewMemberReq.name) private crewMemberModel: Model<CrewMemberReqDocument>){}

    async addMemberRequest(addCrewCreditionalDto: AddCrewCredentialsDto, req) {
        const jwt = req.headers.authorization.slice(7);

        const decodedJwtAccessToken = this.jwtService.decode(jwt);

        const jwtUserId = decodedJwtAccessToken['_id']
       
        const userStatus = await (await this.userModel.findOne({ _id: jwtUserId })).status;
        const crewStat = await (await this.userModel.findOne({ _id: jwtUserId })).crewstat;

        if (userStatus === 'SUPERADMIN' || userStatus === 'ADMIN' || crewStat === 'FOUNDER' ) {
            const CrewMemberReq = new this.crewMemberModel(addCrewCreditionalDto);
            const stringJWT = jwtUserId.toString();
            CrewMemberReq.from = stringJWT;
            return await CrewMemberReq.save();
        }else {
            throw new InternalServerErrorException('You are not authorized to create a user');
        }

    }

    async updateDetails(updateDetails: UpdateDetailsDto, req){

        const reqPass = updateDetails.password;

        const userPhone = await this.userModel.findOne({ phone: updateDetails.phone });
        console.log(userPhone);
        const userPass = await this.userModel.findOne({ password: userPhone.password });

        const jwt = req.headers.authorization.slice(7);

        const decodedJwtAccessToken = this.jwtService.decode(jwt);

        const jwtUserId = decodedJwtAccessToken['_id']
       
        const userStatus = await (await this.userModel.findOne({ _id: jwtUserId })).status;
        const crewStat = await (await this.userModel.findOne({ _id: jwtUserId })).crewstat;

        if (userStatus === 'SUPERADMIN' || userStatus === 'ADMIN' || crewStat === 'FOUNDER' ||  (await bcrypt.compare(reqPass, userPass.password)) ){
            const user = await this.userModel.findOne({ phone: updateDetails.phone });
            const ID = user._id;
            console.log(ID);
            const updatedUser = await this.userModel.findByIdAndUpdate(ID, updateDetails, { new: true });
            return updatedUser;
        }
    }
}