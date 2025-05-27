export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: Rating;
  image: string;
  title:string;
  description:string
}

export interface Rating {
  count: number
 rate:number
}