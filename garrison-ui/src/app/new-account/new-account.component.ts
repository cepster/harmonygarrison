import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserStoreService } from "src/store/user-service";

@Component({
  selector: "app-new-account",
  templateUrl: "./new-account.component.html",
  styleUrls: ["./new-account.component.scss"]
})
export class NewAccountComponent implements OnInit {
  public username: string;
  public password: string;

  constructor(
    private readonly http: HttpClient,
    private readonly userStore: UserStoreService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  newAccount() {
    this.http
      .post("/auth/newAccount", {
        username: this.username,
        password: this.password
      })
      .subscribe(r => {
        this.userStore.login({ name: "Test", accessToken: r["access_token"] });
        this.router.navigate(["home"]);
      });
  }
}
