import OrderDetails from "@/components/OrderDetails"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function OrderPage({ params }: { params: { id: string } }) {
  return (
    <main className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderDetails orderId={params.id} />
        </CardContent>
      </Card>
    </main>
  )
}

