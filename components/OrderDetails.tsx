'use client'
import useSWR from "swr/immutable"
import LoadingSpinner from "./LoadingSpinner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function OrderDetails({ orderId }: { orderId: string }) {
  const { data: order, error } = useSWR(`/api/orders/${orderId}`, fetcher)

  if (error) return <div className="text-destructive">Failed to load order details</div>
  if (!order) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/orders">
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to Orders
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-card text-card-foreground p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Order Information</h2>
          <dl className="grid grid-cols-2 gap-2">
            <dt className="font-medium">Order ID:</dt>
            <dd>{order.id}</dd>

            <dt className="font-medium">Order Number:</dt>
            <dd>{order.orderNumber}</dd>

            <dt className="font-medium">Customer ID:</dt>
            <dd>{order.customerId}</dd>

            <dt className="font-medium">Order Date:</dt>
            <dd>{new order.orderDate.split('T')[0]}</dd>

            <dt className="font-medium">Total Amount:</dt>
            <dd>${parseFloat(order.totalAmount).toFixed(2)}</dd>
  
            <dt className="font-medium">Status:</dt>
            <dd>
              <Badge
                variant={
                  order.status === "Completed"
                    ? "default"
                    : order.status === "Processing"
                      ? "secondary"
                      : order.status === "Shipped"
                        ? "outline"
                        : "destructive"
                }
              >
                {order.status}
              </Badge>
            </dd>
          </dl>
        </div>

        <div className="bg-card text-card-foreground p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Shipping & Payment</h2>
          <dl className="grid gap-2">
            <dt className="font-medium">Shipping Address:</dt>
            <dd className="break-words">{order.shippingAddress}</dd>

            <dt className="font-medium">Payment Method:</dt>
            <dd>{order.paymentMethod}</dd>
          </dl>
        </div>
      </div>

      <div className="bg-card text-card-foreground p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Order Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left font-medium">Detail ID</th>
                <th className="p-2 text-left font-medium">Order ID</th>
                <th className="p-2 text-left font-medium">Product ID</th>
                <th className="p-2 text-left font-medium">Product Name</th>
                <th className="p-2 text-left font-medium">Quantity</th>
                <th className="p-2 text-left font-medium">Unit Price</th>
                <th className="p-2 text-left font-medium">Line Total</th>
              </tr>
            </thead>
            <tbody>
              {order.orderDetails.map((detail: any) => (
                <tr key={detail.orderDetailId} className="border-b border-muted">
                  <td className="p-2">{detail.orderDetailId}</td>
                  <td className="p-2">{detail.orderId}</td>
                  <td className="p-2">{detail.productId}</td>
                  <td className="p-2">{detail.productName}</td>
                  <td className="p-2">{detail.quantity}</td>
                  <td className="p-2 text-right">${parseFloat(detail.unitPrice).toFixed(2)}</td>
                  <td className="p-2 text-right">${parseFloat(detail.lineTotal).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-medium">
                <td colSpan={6} className="p-2 text-right">
                  Total:
                </td>
                <td className="p-2 text-right">${parseFloat(order.totalAmount).toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

