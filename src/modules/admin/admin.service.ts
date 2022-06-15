import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ObjectId } from 'src/pipes/parse-object-id.pipe';
import { User, UserDocument } from '../../schemas/user.schema'
import { MemberCredentialsDto } from '../auth/auth/dto/member-authc.dto';
import * as bcrypt from 'bcrypt';
import { MemberDeleteCredentialsDto } from './dto/member-delete.dto';
import { AdminDeleteCredentialsDto } from './dto/admin-delete.dto';
import { CrewMemberReq, CrewMemberReqDocument } from 'src/schemas/addcrew-member.schema';


@Injectable()
export class AdminService {
    constructor(private readonly jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(CrewMemberReq.name) private crewMemberModel: Model<CrewMemberReqDocument>) {}


    async getUsers(req){

        const jwt = req.headers.authorization.slice(7);

        const decodedJwtAccessToken = this.jwtService.decode(jwt);

        const jwtUserId = decodedJwtAccessToken['_id']
       
        const userStatus = await (await this.userModel.findOne({ _id: jwtUserId })).status;

        if (userStatus === 'SUPERADMIN' || userStatus === 'ADMIN') {

            return await this.userModel.find({ status: { $ne: 'SUPERADMIN' } });

        }
    }

    async createMemberUser(memberCreditionalDto: MemberCredentialsDto, req) {

        const jwt = req.headers.authorization.slice(7);

        const decodedJwtAccessToken = this.jwtService.decode(jwt);

        const jwtUserId = decodedJwtAccessToken['_id']
       
        const userStatus = await (await this.userModel.findOne({ _id: jwtUserId })).status;

        if (userStatus === 'SUPERADMIN' || userStatus === 'ADMIN') {
            const password = memberCreditionalDto.password;
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            memberCreditionalDto.password = hashedPassword;

            const phoneNumber = memberCreditionalDto.phone;

            if (phoneNumber) {
                const deleted = await this.crewMemberModel.deleteOne({ phone: phoneNumber });
                console.log(deleted);
            }

            const CreatedUser = new this.userModel(memberCreditionalDto);
            return await CreatedUser.save();


        } else {
            throw new InternalServerErrorException('You are not authorized to create a user');
        }
    }

    async deleteMemberUser(MemberDeleteCredentialsDto: MemberDeleteCredentialsDto, req) {

        const jwt = req.headers.authorization.slice(7);

        const decodedJwtAccessToken = this.jwtService.decode(jwt);

        const jwtUserId = decodedJwtAccessToken['_id']
       
        const userStatus = await (await this.userModel.findOne({ _id: jwtUserId })).status;

        if (userStatus === 'SUPERADMIN' || userStatus === 'ADMIN') {
            const user = await this.userModel.findOne({ mail: MemberDeleteCredentialsDto.mail });
            if (user && user.status !== 'SUPERADMIN' && user.status !== 'ADMIN') {
                await this.userModel.deleteOne({ mail: MemberDeleteCredentialsDto.mail });
                return { message: 'User deleted successfully' };
            } else {
                throw new UnauthorizedException('User not found');
            }
        }
    }

    async deleteAdminUser(adminDeleteCredentialsDto: AdminDeleteCredentialsDto, req) {

        const jwt = req.headers.authorization.slice(7);

        const decodedJwtAccessToken = this.jwtService.decode(jwt);

        const jwtUserId = decodedJwtAccessToken['_id']
       
        const userStatus = await (await this.userModel.findOne({ _id: jwtUserId })).status;

        if (userStatus === 'SUPERADMIN' && adminDeleteCredentialsDto.userstatus === 'ADMIN') {
            const user = await this.userModel.findOne({ mail: adminDeleteCredentialsDto.mail });
            if (user && user.status !== 'SUPERADMIN') {
                await this.userModel.deleteOne({ mail: adminDeleteCredentialsDto.mail });
                return { message: 'User deleted successfully' };
            } else {
                throw new UnauthorizedException('User not found');
            }
        }else{
            throw new UnauthorizedException('You are not authorized to delete an admin');
        }

    }

    async getcrews(req){
            
        const jwt = req.headers.authorization.slice(7);

        const decodedJwtAccessToken = this.jwtService.decode(jwt);

        const jwtUserId = decodedJwtAccessToken['_id']
    
        const userStatus = await (await this.userModel.findOne({ _id: jwtUserId })).status;

        if (userStatus === 'SUPERADMIN' || userStatus === 'ADMIN') {
 
            const crews =  await this.userModel.find({ crewname : { $ne: null } });
            const crewsA = crews.map(crew => {
                return {
                    _id: crew._id,
                    crewname: crew.crewname,
                }
            })
            // const crewmembers =  await this.userModel.find({ crewname : { $ne: null } });
            return {crewsA};

        }
    }

    async getCrewDetails(crewName, req){

        const jwt = req.headers.authorization.slice(7);

        const decodedJwtAccessToken = this.jwtService.decode(jwt);

        const jwtUserId = decodedJwtAccessToken['_id']
    
        const userStatus = await (await this.userModel.findOne({ _id: jwtUserId })).status;

        if (userStatus === 'SUPERADMIN' || userStatus === 'ADMIN') {
            const crew =  await this.userModel.find({ crewname : crewName });
            const crewnames = crew.map(crew => {
                return {
                    crewname: crew.crewname
                }
            })

            const crewMembers = crew.map(crew => {
                return {
                    members: crew.mail,
                }
            })

            return {crewnames, crewMembers};
        }
    }

    async getaddcrewrequests(req){
            
            const jwt = req.headers.authorization.slice(7);
    
            const decodedJwtAccessToken = this.jwtService.decode(jwt);
    
            const jwtUserId = decodedJwtAccessToken['_id']
        
            const userStatus = await (await this.userModel.findOne({ _id: jwtUserId })).status;
    
            if (userStatus === 'SUPERADMIN' || userStatus === 'ADMIN') {
                const crew =  await this.crewMemberModel.find({ });
                // const crewnames = crew.map(crew => {
                //     return {
                //         crewname: crew.crewname
                //     }
                // }
                //)
                return {crew};
            }
    }    

}
