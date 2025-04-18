import CustomerList from "@/components/CustomerList"

export default function CustomersPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <a
          href="/customers/new"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
        >
          Add New Customer
        </a>
      </div>
      <CustomerList />
    </div>
  )
} 