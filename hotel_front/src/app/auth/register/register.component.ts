import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

registerForm!:FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService){}

   ngOnInit(): void {
      this.registerForm = this.fb.group({
        name: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        rpassword: ['', [Validators.required]],
        
      });
    }

  onSubmit(){

    this.authService.register(this.registerForm.value).subscribe(res =>{
      

    }, error =>{

    } );
  }

}
