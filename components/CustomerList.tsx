"use client"

import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { AICustomerModal } from "./AICustomerModal"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function CustomerList() {
  const router = useRouter()
  const { data: customers, error, isLoading, mutate } = useSWR("/api/customers", fetcher)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer?")) return

    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete customer")

      toast.success("Customer deleted successfully")
      mutate()
    } catch (error) {
      toast.error("Failed to delete customer")
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading customers</div>

  return (
    <div className="rounded-md border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-muted">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
              Customer ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {customers.map((customer: any) => (
            <tr key={customer.id} className="hover:bg-muted/50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white-500">
                <div className="flex items-center space-x-2 text-blue-500">
                  <AICustomerModal customerId={customer.id} customerName={customer.name} />
                  <span className="px-6 py-4 whitespace-nowrap text-sm ">{customer.id}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white-900">
                {customer.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white-500">
                {customer.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white-500">
                {customer.phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white-500">
                {`${customer.street}, ${customer.city}, ${customer.state} ${customer.zipCode}`}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge
                  variant={customer.status === "Active" ? "default" : "secondary"}
                >
                  {customer.status}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Button
                  variant="ghost"
                  onClick={() => router.push(`/customers/${customer.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  className="text-destructive hover:text-destructive/90"
                  onClick={() => handleDelete(customer.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 