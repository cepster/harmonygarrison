import { Injectable } from "@angular/core";
import { UserStoreService } from "src/store/user-service";
import { User } from "../store/store-state";

@Injectable()
export class AppInitializerService {
  constructor(private readonly userStore: UserStoreService) {}

  initializeApp(): Promise<any> {
    return new Promise((res, rej) => {
      const user: User = JSON.parse(localStorage.getItem("user"));
      if (!!user) {
        this.userStore.login(user);
      }
      res();
    });
  }
}
