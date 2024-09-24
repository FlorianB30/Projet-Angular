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
  code: number | null = null
  message: string = ""
  error: boolean = false
  ngOnInit(): void {
    this.myForm = this.fb.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)])
      }
    );
  }
  get getErrorLabel(): string {
    
    if (!!this.myForm.controls?.['email']?.errors?.['email']) return 'Email doit être valide.';
    if (!!this.myForm.controls?.['password']?.errors?.['minlength']) return `La longueur minimal pour votre mot de passe est ${this.myForm.controls?.['password']?.errors?.['minlength']?.requiredLength}`;
    return 'Un problème est survenu';
  }
  checkPasswordsMatch(form: FormGroup): Object | null {
    return form.get('password')?.value === form.get('confirmPassword')?.value
    ? null
    : {missMatch: true}
  }
  onSubmit(): void {
    if (this.myForm.valid) {

      if(
          typeof( this.myForm.value.email) == "string"
          && typeof( this.myForm.value.password) == "string"
      ){
        let data: User = {
          id: null,
          name: "",
          email: this.myForm.value.email,
          password: this.myForm.value.password,
          friends: []
        }
        this.authService.login(data).subscribe((code) => {
          if (this.authService.isConnected()
          )this.router.navigate(['/']);
          else{
            this.code = code
            if(code > 499){
              this.message = "Erreur interne"
            }
            else if( code == 401){
              this.message = "Identifiants incorrects"
            }
            else if(code == 404){
              this.message = "Ressource introuvable"
            }
            else{
              this.message = "Erreur inattendue"
            }
            this.error = true
          }
        }
      )
      }
     
    } else {
      console.log('Formulaire invalide');
    }
  }
}
