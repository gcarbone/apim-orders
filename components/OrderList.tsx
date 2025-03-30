"use client"

import Link from "next/link"
import useSWR from "swr"
import LoadingSpinner from "./LoadingSpinner"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function OrderList() {
  const { data: orders, error } = useSWR("/api/orders", fetcher)
  const router = useRouter()

  if (error) return <div className="text-destructive">Failed to load orders</div>
  if (!orders) return <LoadingSpinner />

  const handleRowClick = (orderId: string) => {
    router.push(`/order/${orderId}`)
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 text-left font-medium">Order ID</th>
              <th className="p-2 text-left font-medium">Order Number</th>
              <th className="p-2 text-left font-medium">Customer ID</th>
              <th className="p-2 text-left font-medium">Order Date</th>
              <th className="p-2 text-left font-medium">Total Amount</th>
              <th className="p-2 text-left font-medium">Status</th>
              <th className="p-2 text-left font-medium">Shipping Address</th>
              <th className="p-2 text-left font-medium">Payment Method</th>
              <th className="p-2 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr
                key={order.id}
                className="border-b border-muted hover:bg-accent hover:text-accent-foreground cursor-pointer"
                onClick={() => handleRowClick(order.id)}
              >
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.orderNumber}</td>
                <td className="p-2">{order.customerId}</td>
                <td className="p-2">{order.orderDate.split('T')[0]}</td>
                <td className="p-2 text-right">${parseFloat(order.totalAmount).toFixed(2)}</td>
                <td className="p-2 text-center">
                  <Badge
                    variant={
                      order.status === "Delivered"
                        ? "default"
                        : order.status === "Processing"
                          ? "secondary"
                          : order.status === "Shipped"
                            ? "secondary"
                            : order.status === "Pending"
                              ? "outline"
                              : order.status === "Cancelled"
                                ? "destructive"
                        : "default"
                    }
                  >
                    {order.status}
                  </Badge>
                </td>
                <td className="p-2 max-w-[200px] truncate" title={order.shippingAddress}>
                  {order.shippingAddress}
                </td>
                <td className="p-2">{order.paymentMethod}</td>
                <td className="p-2">
                  <Link
                    href={`/order/${order.id}`}
                    className="text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()} // Prevent row click from triggering
                  >
                    View Details
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

