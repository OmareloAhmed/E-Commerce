"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

type Category = {
  _id: string;
  name: string;
  image?: string;
};

export default function CategoriesList({
  apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`,

}: {
  apiUrl?: string;
}) {
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCats() {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        
        setCats(data?.data ?? data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCats();
  }, [apiUrl]);

  if (loading) return <p className="p-6 text-center"> Loading</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {cats.map((c) => (
        <Card
          key={c._id}
          className="overflow-hidden shadow-sm hover:shadow-md transition"
        >
          {c.image ? (
            <img
              src={c.image}
              alt={c.name}
              className="h-full w-full object-cover "
            />
          ) : (
            <div className="h-48 w-full flex items-center justify-center bg-gray-100 text-gray-500"> when Image </div>
          )}
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold">{c.name}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
