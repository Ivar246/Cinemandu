import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { Public } from '../common/decorator';

@Public()
@ApiTags("auth")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }
    @HttpCode(HttpStatus.CREATED)
    @Post("/signup")
    @ApiOperation({ summary: 'signup user' })
    @ApiResponse({ status: 200, description: 'signup  successfull.' })
    @ApiResponse({ status: 403, description: 'forbidden, credendial taken' })
    signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto)
    }

    @HttpCode(HttpStatus.OK)
    @Post("/login")
    @ApiOperation({ summary: 'login user.' })
    @ApiResponse({ status: 200, description: 'login successfull' })
    login(@Body() LoginDto: LoginDto) {
        return this.authService.login(LoginDto)
    }
}
