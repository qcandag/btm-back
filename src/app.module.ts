import { Module } from '@nestjs/common';
//import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PanelModule } from './modules/admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth/auth.module';
import { UserModule } from './user/user.module';
import { User, UserSchema } from './schemas/user.schema';



@Module({
  imports: [UserModule, AuthModule, PanelModule ,MongooseModule.forRoot('mongodb://localhost/btm-back-last'), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
