import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User, UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pw: string): Promise<User> {
    const user: User = await this.usersService.findOne(username);
    if (!!user && user.password === pw) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
