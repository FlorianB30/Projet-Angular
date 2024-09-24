import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ItemComponent } from './catalogue/item/item.component';
import { EditItemComponent } from './catalogue/edit-item/edit-item.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './interface/home/home.component';
import { AboutComponent } from './interface/about/about.component';
import { AccountComponent } from './user/account/account.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
   {
    path: 'catalogue',
    component: CatalogueComponent
  },
  {
    path: 'catalogue/:id',
    component: ItemComponent
  },
  {
    path: 'editItem/:id',
    component: EditItemComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
