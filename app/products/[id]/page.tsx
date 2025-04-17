"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        if (!response.ok) throw new Error("Failed to fetch product")
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        toast.error("Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch(`/api/products/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })

      if (!response.ok) throw new Error("Failed to update product")
      
      toast.success("Product updated successfully")
      router.refresh()
    } catch (error) {
      toast.error("Failed to update product")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!product) return <div>Product not found</div>

  return (
    <div className="container mx-auto py-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={product.stock}
              onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              className="w-full p-2 border rounded-md"
              value={product.status}
              onChange={(e) => setProduct({ ...product, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Discontinued">Discontinued</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/products")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 