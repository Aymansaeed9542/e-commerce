export interface Cart {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: Data;
}

export interface Data {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface CartProduct {
  count: number;
  _id: string;
  product: Product2;
  price: number;
}

export interface Product2 {
  subcategory: Subcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Cart Context Types
export interface CartContextType {
  isLoading: boolean;
  numOfCartItems: number;
  products: Cart['data']['products'];
  totalCartPrice: number;
  deleteProduct: (id: string) => Promise<Cart | undefined>;
  addProduct: (id: string) => Promise<Cart | undefined>;
  updateProductCount:(id: string, count:number) => Promise<Cart | undefined>;
  clearAllProducts: () => Promise<Cart | undefined>;
}