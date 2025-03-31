import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const apikey = 'a45de33b-d092-4b85-aa79-c9b1e8283e6a';

  let res;
  try {
    res = await fetch('https://production-celigo-labs-ent.gateway.apim.integrator.io/ordermaster/orders/' + params.id, {
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
  // Mock order data based on ID
  /*const orderData: Record<string, any> = {
    "1": {
      id: "1",
      orderNumber: "ORD-2023-001",
      customerId: "CUST-001",
      orderDate: "2023-05-15T10:30:00Z",
      totalAmount: 249.97,
      status: "Completed",
      shippingAddress: "123 Main St, Anytown, CA 12345",
      paymentMethod: "Credit Card",
      orderDetails: [
        {
          orderDetailId: "101",
          orderId: "1",
          productId: "PROD-A1",
          productName: "Product A",
          quantity: 2,
          unitPrice: 49.99,
          lineTotal: 99.98,
        },
        {
          orderDetailId: "102",
          orderId: "1",
          productId: "PROD-B2",
          productName: "Product B",
          quantity: 1,
          unitPrice: 149.99,
          lineTotal: 149.99,
        },
      ],
    },
    "2": {
      id: "2",
      orderNumber: "ORD-2023-002",
      customerId: "CUST-002",
      orderDate: "2023-05-18T14:45:00Z",
      totalAmount: 149.99,
      status: "Processing",
      shippingAddress: "456 Oak Ave, Somewhere, NY 67890",
      paymentMethod: "PayPal",
      orderDetails: [
        {
          orderDetailId: "201",
          orderId: "2",
          productId: "PROD-C3",
          productName: "Product C",
          quantity: 3,
          unitPrice: 29.99,
          lineTotal: 89.97,
        },
        {
          orderDetailId: "202",
          orderId: "2",
          productId: "PROD-D4",
          productName: "Product D",
          quantity: 2,
          unitPrice: 30.01,
          lineTotal: 60.02,
        },
      ],
    },
    "3": {
      id: "3",
      orderNumber: "ORD-2023-003",
      customerId: "CUST-003",
      orderDate: "2023-05-20T09:15:00Z",
      totalAmount: 79.99,
      status: "Shipped",
      shippingAddress: "789 Pine Rd, Elsewhere, TX 54321",
      paymentMethod: "Credit Card",
      orderDetails: [
        {
          orderDetailId: "301",
          orderId: "3",
          productId: "PROD-E5",
          productName: "Product E",
          quantity: 1,
          unitPrice: 79.99,
          lineTotal: 79.99,
        },
      ],
    },
    "4": {
      id: "4",
      orderNumber: "ORD-2023-004",
      customerId: "CUST-001",
      orderDate: "2023-05-22T16:20:00Z",
      totalAmount: 199.98,
      status: "Cancelled",
      shippingAddress: "123 Main St, Anytown, CA 12345",
      paymentMethod: "Credit Card",
      orderDetails: [
        {
          orderDetailId: "401",
          orderId: "4",
          productId: "PROD-F6",
          productName: "Product F",
          quantity: 2,
          unitPrice: 99.99,
          lineTotal: 199.98,
        },
      ],
    },
  }
*/
  //const order = orderData[params.id]
  const order = res;
  if (!order) {
    return new Response("Order not found", { status: 404 })
  }

  return NextResponse.json(order)
}

