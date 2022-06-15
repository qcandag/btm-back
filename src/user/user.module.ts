
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CrewMemberReq, CrewMemberReqSchema } from 'src/schemas/addcrew-member.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [JwtModule.register({ secret: 'topSecret51', signOptions: { expiresIn: 3600 } }),
   MongooseModule.forFeature([{ name: CrewMemberReq.name, schema: CrewMemberReqSchema }]),
   MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
