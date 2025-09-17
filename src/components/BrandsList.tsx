"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

type Brand = {
  _id: string;
  name: string;
  image?: string;
};

export default function BrandsList({
  apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`,
}: {
  apiUrl?: string;
}) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setBrands(data?.data ?? data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
  }, [apiUrl]);

  if (loading) return <p className="p-6 text-center"> Loading </p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {brands.map((b) => (
        <Card
          key={b._id}
          className="overflow-hidden shadow-sm hover:shadow-md transition"
        >
          {b.image ? (
            <img
              src={b.image}
              alt={b.name}
              className="h-40 w-full object-contain bg-white p-4"
            />
          ) : (
            <div className="h-40 w-full flex items-center justify-center bg-gray-100 text-gray-500">dont found Image</div>
          )}
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold">{b.name}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
