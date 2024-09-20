import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ItemComponent } from './catalogue/item/item.component';
import { EditItemComponent } from './catalogue/edit-item/edit-item.component';

const routes: Routes = [
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
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
