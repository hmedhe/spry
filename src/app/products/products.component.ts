import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../shared/type';
import { BehaviorSubject, Observable } from 'rxjs';
import { selectAllProducts, selectFavorites } from '../store/product/product.selectors';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import {MatIconModule} from '@angular/material/icon';
import { addToFavorites, removeFromFavorites } from '../store/product/product.actions';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-products',
  imports: [CommonModule ,MatCardModule,  MatPaginatorModule , MatSelectModule, NgxSpinnerModule , MatIconModule, MatTooltipModule] ,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  paginatedProducts$ = new BehaviorSubject<Product[]>([]);

  pageSize = 10;
  currentPage = 0;

  localCache: Product[] = [];
  filteredCache: Product[] = [];

  selectedSort: string = '';
  selectedCategory: string = '';

  categories: string[] = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
  ];


  favorites$: Observable<Product[]>;
favorites: Product[] = [];

  constructor(private store: Store , private spinner: NgxSpinnerService) {
    this.products$ = this.store.select(selectAllProducts);
      this.favorites$ = this.store.select(selectFavorites);
  }

  ngOnInit(): void {
    this.spinnerAction();
    this.products$.subscribe(allProducts => {
      if (allProducts.length) {
        this.localCache = allProducts;
        this.applyFilters(); // Initial load
      }
    });

      this.favorites$.subscribe(favs => this.favorites = favs);
  }

  onCategoryChange(category: string) {
    this.spinnerAction();
    this.selectedCategory = category;
    this.currentPage = 0; 
    this.applyFilters();
  }

  onSortChange(sortType: string) {
    this.spinnerAction();
    this.selectedSort = sortType;
    this.applyFilters();
  }

  onPageChange(event: any) {
    this.spinnerAction();
    const pageIndex = event.pageIndex !== undefined ? event.pageIndex : event.page;
    this.currentPage = pageIndex;
    this.updatePaginatedProducts();
  }

  applyFilters() {
    
    this.filteredCache = this.selectedCategory
      ? this.localCache.filter(p => p.category === this.selectedCategory)
      : [...this.localCache];

   
    switch (this.selectedSort) {
      case 'rating':
        this.filteredCache.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'priceHighToLow':
        this.filteredCache.sort((a, b) => b.price - a.price);
        break;
      case 'priceLowToHigh':
        this.filteredCache.sort((a, b) => a.price - b.price);
        break;
    }


    const maxPage = Math.floor(this.filteredCache.length / this.pageSize);
    if (this.currentPage > maxPage) {
      this.currentPage = 0;
    }

 
    this.updatePaginatedProducts();
  }

  updatePaginatedProducts() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    const pageData = this.filteredCache.slice(start, end);
    this.paginatedProducts$.next(pageData);
  }

  spinnerAction () {
    
    this.spinner.show();

    setTimeout(() => {
  
      this.spinner.hide();
    }, 1000);
  
  }

addToFav(product: Product) {
  const isFav = this.favorites.some(p => p.id === product.id);
  if (isFav) {
    this.store.dispatch(removeFromFavorites({ productId: product.id }));
  } else {
    this.store.dispatch(addToFavorites({ product }));
  }
}

isFavorite(productId: number): boolean {
  return this.favorites.some(p => p.id === productId);
}

toolTip(productId: number)  {
  if(this.favorites.some(p => p.id === productId)){ 
    return 'Added to fav'
  } else {
    return 'Add to fav'
  }
   
}
}
