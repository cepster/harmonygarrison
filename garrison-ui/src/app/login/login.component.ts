import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StoreState } from "src/store/store-state";
import { UserStoreService } from "src/store/user-service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;

  constructor(
    private readonly http: HttpClient,
    private readonly userStore: UserStoreService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.userStore.stateChanged.subscribe((state: StoreState) => {
      if (state.currentUser !== null) {
        localStorage.setItem("user", JSON.stringify(state.currentUser));
      }
    });
  }

  authenticate() {
    this.http
      .post("/auth/login", {
        username: this.username,
        password: this.password
      })
      .subscribe(r => {
        this.userStore.login({ name: "Test", accessToken: r["access_token"] });
        this.router.navigate(["home"]);
      });
  }
}
