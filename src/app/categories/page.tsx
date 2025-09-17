import CategoriesList from "@/components/CategoriesList";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-background">
      <h1 className="text-2xl font-bold p-6">Category</h1>
      <CategoriesList apiUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`} />
    </main>
  );
}
