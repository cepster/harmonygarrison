import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Post("/auth/login")
  @UseGuards(AuthGuard("local"))
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get("/profile")
  @UseGuards(AuthGuard("jwt"))
  async getProfile(@Request() req) {
    return req.user;
  }
}
