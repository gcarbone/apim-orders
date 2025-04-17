"use client"

import Link from "next/link"
import useSWR from "swr"
import LoadingSpinner from "./LoadingSpinner"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProductList() {
  const { data: products, error } = useSWR("/api/products", fetcher)
  const router = useRouter()

  if (error) return <div className="text-destructive">Failed to load products</div>
  if (!products) return <LoadingSpinner />

  const handleRowClick = (productId: string) => {
    router.push(`/products/${productId}`)
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 text-left font-medium">Product ID</th>
              <th className="p-2 text-left font-medium">Name</th>
              <th className="p-2 text-left font-medium">Description</th>
              <th className="p-2 text-left font-medium">Price</th>
              <th className="p-2 text-left font-medium">Stock</th>
              <th className="p-2 text-left font-medium">Category</th>
              <th className="p-2 text-left font-medium">Status</th>
              <th className="p-2 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr
                key={product.id}
                className="border-b border-muted hover:bg-accent hover:text-accent-foreground cursor-pointer"
                onClick={() => handleRowClick(product.id)}
              >
                <td className="p-2">{product.id}</td>
                <td className="p-2">{product.name}</td>
                <td className="p-2 max-w-[200px] truncate" title={product.description}>
                  {product.description}
                </td>
                <td className="p-2 text-right">${parseFloat(product.price).toFixed(2)}</td>
                <td className="p-2 text-center">
                  <Badge
                    variant={
                      product.stock > 10
                        ? "default"
                        : product.stock > 0
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {product.stock} units
                  </Badge>
                </td>
                <td className="p-2">{product.category}</td>
                <td className="p-2">
                  <Badge
                    variant={
                      product.status === "Active"
                        ? "default"
                        : product.status === "Discontinued"
                          ? "destructive"
                          : "outline"
                    }
                  >
                    {product.status}
                  </Badge>
                </td>
                <td className="p-2">
                  <Link
                    href={`/products/${product.id}`}
                    className="text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()} // Prevent row click from triggering
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 