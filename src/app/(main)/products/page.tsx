import React from "react";
import Link from "next/link";
import { ProductItem } from "src/types/productDetails.type";

export default async function ProductsPage() {
  // 1. جيب الداتا من API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Faild Loading ");
  }

  const data = await res.json();
  const products: ProductItem[] = data.data; // API بيرجع منتجات

  //  عرض المنتجات
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link
          key={product._id}
          href={`/products/${product._id}`} // يفتح صفحة التفاصيل
          className="border rounded-lg p-4 shadow hover:shadow-lg transition block"
        >
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full h-48 object-cover rounded"
          />
          <h2 className="text-lg font-bold mt-2">{product.title}</h2>
          <p className="text-main font-semibold mt-1">
            {product.price} EG
          </p>
        </Link>
      ))}
    </div>
  );
}
