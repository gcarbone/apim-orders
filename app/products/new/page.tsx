"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function NewProductPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    console.log(product);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...product,
          price: parseFloat(product.price),
          stock: parseInt(product.stock),
        }),
      })

      if (!response.ok) throw new Error("Failed to create product")
      
      toast.success("Product created successfully")
      router.push("/products")
      router.refresh()
    } catch (error) {
      toast.error("Failed to create product")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
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
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={product.stock}
              onChange={(e) => setProduct({ ...product, stock: e.target.value })}
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

          <div className="flex gap-4">
            <Button type="submit" disabled={saving}>
              {saving ? "Creating..." : "Create Product"}
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