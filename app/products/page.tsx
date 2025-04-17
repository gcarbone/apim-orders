"use client"
import ProductList from "@/components/ProductList"

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <a
          href="/products/new"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
        >
          Add New Product
        </a>
      </div>
      <ProductList />
    </div>
  )
} 