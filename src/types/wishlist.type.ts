export interface WishlistData {
    status:         string;
    count:         number;
    data:           wishlist;
}
// SubCategory
export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// Category
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Brand
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Product
export interface wishlist {
  sold: number;
  images: string[];
  subcategory: SubCategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number; // ممكن يكون موجود أو مش موجود
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string; 
  updatedAt: string;
  __v: number;
  id: string;
}


