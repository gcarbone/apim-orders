import OrderList from "@/components/OrderList"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function OrdersPage() {
  return (
    <main className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderList />
        </CardContent>
      </Card>
    </main>
  )
}

