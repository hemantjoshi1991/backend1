import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './sub-products/add-product/add-product.component';
import { ProductListComponent } from './sub-products/product-list/product-list.component';

const routes: Routes = [
  {path :'', children : [
    {path : 'sub-product/add-product',component : AddProductComponent},
    {path : 'sub-product/product-list',component : ProductListComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
