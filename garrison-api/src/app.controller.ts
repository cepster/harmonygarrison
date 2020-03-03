import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth/auth.service";
import { User } from "./models/user";

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post("/auth/login")
  @UseGuards(AuthGuard("local"))
  async login(@Body() user: User) {
    return this.authService.login(user);
  }

  @Post("/auth/newAccount")
  async newAccount(@Body() user: User) {
    return this.authService.newAccount(user);
  }

  @Get("/profile")
  @UseGuards(AuthGuard("jwt"))
  async getProfile(@Request() req) {
    return req.user;
  }
}
