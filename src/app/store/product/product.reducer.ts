import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { Product } from '../../../shared/type';


export interface ProductState {
  products: Product[];
  loading: boolean;
  error: any;
  favorites: Product[];
}

export const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  favorites: []
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => ({ ...state, loading: true })),
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products,
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

   on(ProductActions.addToFavorites, (state, { product }) => ({
    ...state,
    favorites: [...state.favorites, product]
  })),
  on(ProductActions.removeFromFavorites, (state, { productId }) => ({
    ...state,
    favorites: state.favorites.filter(p => p.id !== productId)
  }))
);
