

"use client";

import Image from "next/image";
import React, { JSX, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "src/components/ui/button";
import { WishlistData, wishlist as WishlistItemType } from "src/types/wishlist.type";
import { getWishlistData, removeFromWishlist } from "src/app/WishlistAction/WishlistAction";

export default function Wishlist() {
  const [items, setItems] = useState<WishlistItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    void fetchWishlist();
  }, []);

  async function fetchWishlist(): Promise<void> {
    try {
      setLoading(true);
      const res: WishlistData = await getWishlistData();
      if (res && Array.isArray(res.data)) {
        setItems(res.data);
      } else {
        setItems([]);
        toast.error("Invalid wishlist response", { position: "top-center" });
      }
    } catch (err) {
      console.error("fetchWishlist error:", err);
      toast.error("Failed to load wishlist", { position: "top-center" });
      setItems([]);
    } finally {
      setLoading(false);
    }
  }



async function handleRemove(id: string) {
  try {
    setProcessingId(id);

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in", { position: "top-center" });
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("REMOVE RESPONSE:", data);

    if (data && data.status == "success") {
      setItems((prev) => prev.filter((item) => item._id !== id));
      toast.success("Product removed from wishlist", { position: "top-center" });
    } else {
      toast.error("Failed to remove product", { position: "top-center" });
    }
  } catch (err) {
    console.error("removeFromWishlist error:", err);
    toast.error("Server error", { position: "top-center" });
  } finally {
    setProcessingId(null);
  }
}


  return (
  <div>
    <h1 className="text-3xl mb-4">My Wishlist</h1>

    {loading ? (
      <p className="text-lg">Loading...</p>
    ) : items.length === 0 ? (
      <div
        className="p-4 my-5 mb-4 text-sm text-gray-800 rounded-lg bg-gray-100"
        role="alert"
      >
        Empty Wishlist
      </div>
    ) : (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-16 py-3">Image</th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Favorite</th>
              <th  className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <Image
                    src={item.imageCover}
                    width={100}
                    height={100}
                    alt={item.title}
                    className="w-16 md:w-32 object-cover rounded"
                    unoptimized
                  />
                </td>

                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </td>

                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.priceAfterDiscount ?? item.price} EGP
                </td>

                <td className="px-6 py-4 text-red-500 text-lg">
                  <i className="fa-solid fa-heart" aria-hidden="true" />
                </td>

                <td className="px-6 py-4">
                  <Button
                    type="button"
                    onClick={() => void handleRemove(item._id)}
                    className="bg-red-600 text-white"
                  >
                    {processingId === item._id ? (
                      <i
                        className="fa-solid fa-spinner fa-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <i className="fa-solid fa-trash" aria-hidden="true" />
                    )}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);


}