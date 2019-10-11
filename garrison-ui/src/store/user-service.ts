import { Injectable } from "@angular/core";
import { ObservableStore } from "@codewithdan/observable-store";
import { of } from "rxjs";
import { StoreState, User, UserStoreActions } from "./store-state";

@Injectable()
export class UserStoreService extends ObservableStore<StoreState> {
  constructor() {
    const initialState: StoreState = {
      currentUser: null
    };
    super({ trackStateHistory: true });
    this.setState(initialState, "init_state");
  }

  get() {
    return of(this.getState().currentUser);
  }

  login(user: User) {
    const state: StoreState = this.getState();
    state.currentUser = user;
    this.setState(state, UserStoreActions.Login);
  }

  logout() {
    const state: StoreState = this.getState();
    state.currentUser = null;
    this.setState(state, UserStoreActions.Logout);
  }
}
