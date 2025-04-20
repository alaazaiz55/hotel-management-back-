import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  private isLoggedIn = false;
  loggedIn: boolean = false;
  form: any = null;
  user!: number;
  role!: String;
 
  
USER_KEY = "auth-user";
  constructor(
   private authService: AuthService, private storageService: StorageService,
   private activatedRoute: ActivatedRoute
  
    // private keycloakService: KeycloakService
   ) {
    
   }
     ngOnInit(): void {
       

     this.user = this.storageService.getUserId();
     this.role = this.storageService.getUserRole()
      console.log(this.user)

      this.checkLoginStatus();
       const linkColor = document.querySelectorAll('.nav-link');
       linkColor.forEach(link => {
         if (window.location.href.endsWith(link.getAttribute('href') || '')) {
           link.classList.add('active');
         }
         link.addEventListener('click', () => {
           linkColor.forEach(l => l.classList.remove('active'));
           link.classList.add('active');
         });
       });



       
     }

   
 
  /* async logout() {
    // await this.keycloakService.logout();
   }*/

    checkLoginStatus() {
      // Exemple : Vérifiez si un token est présent dans le stockage local
      const token = this.storageService.getToken();
      if (token) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    }
  
    onLogout() {
      // Logique pour se déconnecter (par exemple, supprimer le token du localStorage)
      this.storageService.logout();
      this.loggedIn = false;
    }
    
    

 /* logout() {
    this.authService.logout();
  }*/

 
 }
 

