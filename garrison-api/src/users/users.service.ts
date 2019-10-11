import { Injectable } from "@nestjs/common";

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      name: "Matt Richards",
      username: "matt_richards",
      password: "password",
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(u => u.username === username);
  }
}
