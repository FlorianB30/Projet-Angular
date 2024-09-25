import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ItemComponent } from './catalogue/item/item.component';
import { CommonModule } from '@angular/common';
import { AddItemComponent } from './catalogue/add-item/add-item.component';
import { EditItemComponent } from './catalogue/edit-item/edit-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list/list-item/list-item.component';
import { ListPageComponent } from './list/list-page/list-page.component';
import { ListSharedComponent } from './list/list-shared/list-shared.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogueComponent,
    ItemComponent,
    AddItemComponent,
    EditItemComponent,
    ListComponent,
    ListItemComponent,
    ListPageComponent,
    ListSharedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
