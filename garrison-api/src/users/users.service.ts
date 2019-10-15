import { Injectable } from "@nestjs/common";

export type User = any;

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      userId: 1,
      name: "Matt Richards",
      username: "matt_richards",
      password: "password",
    },
  ];

  async newUser(username: string, password: string): Promise<User | undefined> {
    const newUser: User = {
      userId: 3,
      name: "test testerson",
      username,
      password,
    };

    this.users.push(newUser);
    return newUser;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(u => u.username === username);
  }
}
