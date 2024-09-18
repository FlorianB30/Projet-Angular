import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ItemComponent } from './catalogue/item/item/item.component';

const routes: Routes = [
  {
    path: 'catalogue',
    component: CatalogueComponent
  },
  {
    path: 'item/:id',
    component: ItemComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
