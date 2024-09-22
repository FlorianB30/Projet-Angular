import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms'; 
import { AuthService } from '../auth.service';
import { ErrorComponent } from 'src/app/shared/error/error.component';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  code: number | null = null
  message: string = ""
  error: boolean = false
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }
  myForm!: FormGroup;
  ngOnInit(): void {
    this.myForm = this.fb.group(
      {
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required])
      },
      {validator: this.checkPasswordsMatch}
    );
  }
  get getErrorLabel(): string {
    if (this.myForm.errors?.['required']) return 'Les champs sont obligatoires';
    if (!!this.myForm.controls?.['email']?.errors?.['email']) return 'Email doit être valide.';
    if (!!this.myForm.controls?.['name']?.errors?.['minlength']) return `La longueur minimal pour votre nom est ${this.myForm.controls?.['name']?.errors?.['minlength']?.requiredLength}`;
    if (!!this.myForm.controls?.['password']?.errors?.['minlength']) return `La longueur minimal pour votre mot de passe est ${this.myForm.controls?.['password']?.errors?.['minlength']?.requiredLength}`;
    if (this.myForm.errors?.['missMatch']) return 'Les mots de passe ne correspondent pas';
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
          && typeof( this.myForm.value.name) == "string"
          && typeof( this.myForm.value.password) == "string"
      ){
        let data: User = {
          name: this.myForm.value.name,
          email: this.myForm.value.email,
          password: this.myForm.value.password
        }
        this.authService.register(data).subscribe((code) => {
          if (code == 201){
            this.authService.login(data).subscribe(() => {
              if (this.authService.isConnected()
              )this.router.navigate(['/']);
              else{
                alert("Identifiants incorrect")
              }
            })
          }else{
            this.code = code
            if(code > 499){
              this.message = "Erreur interne"
            }
            else if( code == 409){
              this.message = "Cet email est déja enregistré"
            }
            else if(code == 404){
              this.message = "Ressource introuvable"
            }
            else{
              this.message = "Erreur inattendue"
            }
          }
          this.error = true
        })
      }
    } else {
      console.log('Formulaire invalide');
    }
  }
}
