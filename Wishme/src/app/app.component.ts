import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private translateService: TranslateService
  ) {
    const browserLang = translateService.getBrowserLang()
    if(typeof(browserLang) == "string"){
      translateService.setDefaultLang(browserLang);
    }else{
      const browserCultLang = translateService.getBrowserCultureLang()
      if(typeof(browserCultLang) == "string"){
        translateService.setDefaultLang(browserCultLang);
      }else{
        translateService.setDefaultLang("en");
      }
    }
  }
  title = 'Wishme';
  
}
