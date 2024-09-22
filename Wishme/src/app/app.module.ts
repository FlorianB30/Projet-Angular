import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { ErrorComponent } from './shared/error/error.component';
import { HeaderComponent } from './interface/header/header.component';
import { FooterComponent } from './interface/footer/footer.component';
import { HomeComponent } from './interface/home/home.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AboutComponent } from './interface/about/about.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ItemComponent } from './catalogue/item/item.component';
import { AddItemComponent } from './catalogue/add-item/add-item.component';
import { EditItemComponent } from './catalogue/edit-item/edit-item.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    CatalogueComponent,
    ItemComponent,
    AddItemComponent,
    EditItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
