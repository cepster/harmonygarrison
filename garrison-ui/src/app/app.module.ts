import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { UserStoreService } from "../store/user-service";
import { AppInitializerService } from "./app-initializer.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TokenInterceptor } from "./auth/token.interceptor";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SongsComponent } from "./songs/songs.component";
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NewAccountComponent } from './new-account/new-account.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, SongsComponent, NewAccountComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonsModule.forRoot(),
    HttpClientModule,
    FormsModule,
    TypeaheadModule.forRoot()
  ],
  providers: [
    UserStoreService,
    AppInitializerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitializer: AppInitializerService) => {
        return () => appInitializer.initializeApp();
      },
      deps: [AppInitializerService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
