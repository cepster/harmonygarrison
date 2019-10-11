/*
export enum CustomersStoreActions {
        AddCustomer = 'add_customer',
        RemoveCustomer = 'remove_customer',
        GetCustomers = 'get_customers',
        SortCustomers = 'sort_customers'
    }
*/

export enum UserStoreActions {
  Login = "login",
  Logout = "logout"
}

export interface User {
  name: string;
  accessToken: string;
}

export interface StoreState {
  currentUser: User;
}
