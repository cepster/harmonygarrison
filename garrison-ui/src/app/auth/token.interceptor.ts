import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { StoreState } from "src/store/store-state";
import { UserStoreService } from "src/store/user-service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private accessToken: string;

  constructor(
    private readonly userStore: UserStoreService,
    private readonly router: Router
  ) {
    this.userStore.stateChanged.subscribe((s: StoreState) => {
      if (!!s && s.currentUser != null) {
        this.accessToken = s.currentUser.accessToken;
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Add user's bearer token to request
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });

    return next.handle(request).pipe(
      // If a 401 is detected redirect to the login screen
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(["login"]);
          }
          return of(null);
        }
      })
    );
  }
}
