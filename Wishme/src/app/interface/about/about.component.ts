import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  constructor(
    private authService: AuthService
  ) {
    this.authService.verifyToken()
  }
  tokenIsVerified = false
  verifyToken(){
    this.authService.verifyToken().subscribe(isValid => {
      this.tokenIsVerified = isValid
  });
  }
}
