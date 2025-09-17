

import React from "react";
import { ProductDetails, ProductItem } from "src/types/productDetails.type";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(" Faild Loading ");
  }

  const data: ProductDetails = await res.json();
  const product: ProductItem = data.data;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border rounded-lg p-6 shadow">
        {/* الصورة الرئيسية */}
        <img
          src={product.imageCover}
          alt={product.title}
          className="w-full h-96 object-cover rounded"
        />

        {/* تفاصيل المنتج */}
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-xl text-green-600 mt-2">{product.price} ج.م</p>

          <p className="mt-4 text-muted-foreground">{product.description}</p>

          <p className="mt-4 text-sm text-gray-500">
            name: {product.brand?.name}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            category: {product.category?.name}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            ratingsAverage: {product.ratingsAverage} ⭐ ({product.ratingsQuantity} )
          </p>
        </div>
      </div>
    </div>
  );
}

