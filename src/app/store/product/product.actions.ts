import { createAction, props } from '@ngrx/store';
import { Product } from '../../../shared/type';

export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction('[Product] Load Success', props<{ products: Product[] }>());
export const loadProductsFailure = createAction('[Product] Load Failure', props<{ error: any }>());

export const addToFavorites = createAction(
    '[Product] Add to Favorites',
    props<{ product: Product }>()
);

export const removeFromFavorites = createAction(
    '[Product] Remove from Favorites',
    props<{ productId: number }>()
);
