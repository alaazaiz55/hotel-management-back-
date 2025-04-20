import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor( private authService: AuthService, private fb: FormBuilder, private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
   if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(response => {
        const user = {
          id: response.id,
           role: response.role
          }
        this.router.navigate(['/home']);
        console.log(response)
        this.storageService.saveUser(user);
        this.storageService.saveToken(response.token);
        
      }, error => {
        
      });
    }
  }

}
