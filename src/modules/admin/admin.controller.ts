import {Param , Body, Controller, Get, Query, Request, Post, Delete } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService){}


    @Get('users')
    async getUsers(@Request() req){
        return this.adminService.getUsers(req)
    }

    @Post('users')
    async createMemberUser(@Body() memberCreditionalDto, @Request() req){
        return this.adminService.createMemberUser(memberCreditionalDto, req)
    }

    @Get('crews')
    async getcrews(@Request() req){
        return this.adminService.getcrews(req)
    }

    @Get('crews/:crewname')
    async getCrewDetails(@Param('crewname') crewname: string, @Request() req){
        return this.adminService.getCrewDetails(crewname, req)
    }

    @Delete('users')
    async deleteMemberUser(@Body() memberDeleteCredentialsDto, @Request() req){
        return this.adminService.createMemberUser(memberDeleteCredentialsDto, req)
    } 
    
    @Delete('admin')
    async deleteAdminUser(@Body() adminDeleteCredentialsDto, @Request() req){
        return this.adminService.createMemberUser(adminDeleteCredentialsDto, req)
    } 
    
    @Get('crewREQ')
    async getaddcrewrequests(@Request() req){
        return this.adminService.getaddcrewrequests(req)
    }
}
