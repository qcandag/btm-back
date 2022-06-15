import { Body, Controller, Post, Request } from '@nestjs/common';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import {AuthCredentialsDto} from './dto/auth-credentials.dto';
import console from 'console';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthService } from './auth.service';
import {LoginCreditentialsDto} from './dto/login-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async createUser(@Body() registerDto: AuthCredentialsDto, @Request() req) {
        return this.authService.createUser(registerDto, req)
    }

    @Post('login')
    async login(@Body() loginDto: LoginCreditentialsDto) {
        return this.authService.login(loginDto)
    }
}
