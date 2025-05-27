import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/product/product.effects';
import { Product } from '../shared/type';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { Store } from '@ngrx/store';
import { loadProducts } from './store/product/product.actions';
import { Observable } from 'rxjs';
import { selectAllProducts } from './store/product/product.selectors';
import { ProductsComponent } from './products/products.component';

@Component({
  selector: 'app-root',
  imports: [ CommonModule, MatCardModule  , ProductsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce';

  // products : Product[] = []
   products$: Observable<Product[]>;

  constructor(private productService:ProductService , private store: Store){

    this.store.dispatch(loadProducts());

     this.products$ = this.store.select(selectAllProducts);

    // this.loadAllProducts();
    

  }

  // loadAllProducts(){
  //   this.productService.getProducts().subscribe(res=>{
  //     console.log(res)
  //     this.products = res ;
      
  //   })
  // }
}
