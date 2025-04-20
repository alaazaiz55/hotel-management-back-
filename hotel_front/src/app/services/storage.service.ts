import { Injectable } from '@angular/core';


const USER_KEY = "auth-user";
const TOKEN ="token";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  
  public clean(): void {
    window.sessionStorage.clear();
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN);
    window.sessionStorage.setItem(TOKEN, token);
  }
 
  

  public getUserId(): number{
    const userId = this.getUser();
    
    return userId.id
  }

  /*public getUserRole(): number{
    const userId = this.getUser();
    
    return userId.role
  }*/

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    
  }

public getToken() {
  return window.sessionStorage.getItem(TOKEN);
}
   
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public getUserRole():string{
    const user = this.getUser();
    if(user == null ) return "";
    return user.role;
  }

 public isAdminLoggedIn(): boolean {
  console.log("aaaaaa")
    if (this.getToken() == null ) return false ;
    const role: string = this.getUserRole();
    return role == "ADMIN"
  }

  public isEmployeeLoggedIn(): boolean {
    if (this.getToken() == null ) return false ;
    const role: string = this.getUserRole();
    return role == "EMPLOYEE"
  }
  public isManagerLoggedIn(): boolean {
    if (this.getToken() == null ) return false ;
    const role: string = this.getUserRole();
    return role == "MANAGER"
  }

 public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
   
  public logout() :void {
    window.sessionStorage.removeItem(TOKEN);
    window.sessionStorage.removeItem(USER_KEY);
  }

}
