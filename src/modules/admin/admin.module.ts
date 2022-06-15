import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User, UserSchema } from '../../schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { CrewMemberReq, CrewMemberReqSchema } from 'src/schemas/addcrew-member.schema';

@Module({
  imports: [JwtModule.register({ secret: 'topSecret51', signOptions: { expiresIn: 3600 } }),
            MongooseModule.forFeature([{ name: CrewMemberReq.name, schema: CrewMemberReqSchema }]),
            MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class PanelModule {}
