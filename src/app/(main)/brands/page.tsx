import BrandsList from "@/components/BrandsList";

export default function BrandsPage() {
  return (
    <main className="min-h-screen bg-background">
      <h1 className="text-2xl font-bold p-6"> Brands</h1>
      <BrandsList apiUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`} />
    </main>
  );
}
