import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { UserStoreService } from "src/store/user-service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public accessToken$ = this.userStore
    .get()
    .pipe(map(u => (!!u ? u.accessToken : null)));

  constructor(
    private readonly userStore: UserStoreService,
    private readonly http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get("/profile").subscribe(a => {
      console.log(a);
    });
  }
}
