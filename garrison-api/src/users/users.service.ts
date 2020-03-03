import { Injectable } from "@nestjs/common";
import { User } from "../models/user";

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      userId: 1,
      firstName: "Matt",
      lastName: "Richards",
      username: "matt_richards",
      password: "password",
    },
  ];

  async newUser(user: User): Promise<User | undefined> {
    this.users.push(user);
    return user;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(u => u.username === username);
  }
}
