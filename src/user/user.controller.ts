import { Body, Controller, Patch, Post, Request } from '@nestjs/common';
import { UpdateDetailsDto } from './dto/update-detail.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService){}
    
    @Post('addMemberRequest')
    async addMemberRequest(@Body() addCrewCreditionalDto, @Request() req){
        return this.userService.addMemberRequest(addCrewCreditionalDto, req)
    }
    @Patch('updateMemberRequest')
    async updateMemberRequest(@Body() updateDetails: UpdateDetailsDto, @Request() req){
        return this.userService.updateDetails(updateDetails, req)
    }
}