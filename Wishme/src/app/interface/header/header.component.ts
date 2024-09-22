import { Component } from '@angular/core';
import { StorageService } from 'src/app//shared/services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private storageService: StorageService,
    private translateService: TranslateService,
    private authService: AuthService
  ) { 

  }
  langages = ["en","fr"]
  selectedLangage = this.translateService.getBrowserLang()
  name: string | null = null;
  ngOnInit(): void {
    this.authService.userName$.subscribe(name => {
      this.name = name;
    });
  }
  disconnect(){
    this.authService.disconnect();
    this.router.navigate(['/login']);
  }
  connect(){
    this.router.navigate(['/login']);
  }
  changeLangage(): void {
    if(this.selectedLangage){
      this.translateService.use(this.selectedLangage);
    }
  }
}
