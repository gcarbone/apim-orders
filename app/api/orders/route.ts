import { NextResponse } from "next/server"

export async function GET() {
  // Simulate API delay
  //await new Promise((resolve) => setTimeout(resolve, 1000))

  const apikey = 'a45de33b-d092-4b85-aa79-c9b1e8283e6a';
  let res;
  try {
    res = await fetch('https://production-celigo-labs-ent.gateway.apim.integrator.io/ordermaster/orders', {
      headers: {
        'x-celigo-api-key': apikey
      }
    });
  
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    res = await res.json();

  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
  // console.log(res);

  /*const orders = [
    {
      id: "1",
      orderNumber: "ORD-2023-001",
      customerId: "CUST-001",
      orderDate: "2023-05-15T10:30:00Z",
      totalAmount: 249.97,
      status: "Completed",
      shippingAddress: "123 Main St, Anytown, CA 12345",
      paymentMethod: "Credit Card",
    },
    {
      id: "2",
      orderNumber: "ORD-2023-002",
      customerId: "CUST-002",
      orderDate: "2023-05-18T14:45:00Z",
      totalAmount: 149.99,
      status: "Processing",
      shippingAddress: "456 Oak Ave, Somewhere, NY 67890",
      paymentMethod: "PayPal",
    },
    {
      id: "3",
      orderNumber: "ORD-2023-003",
      customerId: "CUST-003",
      orderDate: "2023-05-20T09:15:00Z",
      totalAmount: 79.99,
      status: "Shipped",
      shippingAddress: "789 Pine Rd, Elsewhere, TX 54321",
      paymentMethod: "Credit Card",
    },
    {
      id: "4",
      orderNumber: "ORD-2023-004",
      customerId: "CUST-001",
      orderDate: "2023-05-22T16:20:00Z",
      totalAmount: 199.98,
      status: "Cancelled",
      shippingAddress: "123 Main St, Anytown, CA 12345",
      paymentMethod: "Credit Card",
    },
  ]
*/
  //return NextResponse.json(orders)
  return NextResponse.json(res.orders)
}

