import OrderList from "@/components/OrderList"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      <OrderList />
    </main>
  )
}

