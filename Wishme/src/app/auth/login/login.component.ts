import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ){}
  myForm!: FormGroup;

  ngOnInit(): void {
    this.myForm = this.fb.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)])
      }
    );
  }
  onSubmit(): void {
    if (this.myForm.valid) {

      if(
          typeof( this.myForm.value.email) == "string"
          && typeof( this.myForm.value.password) == "string"
      ){
        this.authService.login({
          name: this.myForm.value.name,
          email: this.myForm.value.email,
          password: this.myForm.value.password
        }).subscribe((user: User) => {
          console.log(user.email)
          console.log(this.myForm.value.email)
          if (
            user.email != this.myForm.value.email
            || user.password != this.myForm.value.password
          ) alert('Erreur dans le pseudo ou le mot de passe');
          else{
            this.router.navigate(['/']);
          }
        }
      )
      }
     
    } else {
      console.log('invalid');
    }
  }
  connect(){
    this.authService.connect()
    console.log(this.authService.isConnected())
  }
  disconnect(){
    this.authService.disconnect()
    console.log(this.authService.isConnected())
  }
}
