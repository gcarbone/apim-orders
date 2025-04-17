import { NextResponse } from "next/server"

const apikey = 'a45de33b-d092-4b85-aa79-c9b1e8283e6a';
// This is a mock database. In a real application, you would use a proper database.
let products = [
  {
    id: "3",
    name: "Sample Product 1",
    description: "This is a sample product description",
    price: 99.99,
    stock: 10,
    category: "Electronics",
    status: "Active",
  },
  {
    id: "2",
    name: "Sample Product 2",
    description: "Another sample product description",
    price: 149.99,
    stock: 5,
    category: "Clothing",
    status: "Active",
  },
]

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
    console.log('starting product info request');
    const { id } = await params;
    let res;
    try {
      res = await fetch('https://production-celigo-labs-ent.gateway.apim.integrator.io/ordermaster/products/' + id, {
        headers: {
          'x-celigo-api-key': apikey
        }
      });
    
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      res = await res.json();
  
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
    console.log(res);
  return NextResponse.json(res)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const index = products.findIndex((p) => p.id === params.id)
    
    if (index === -1) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    products[index] = {
      ...products[index],
      ...body,
    }

    return NextResponse.json(products[index])
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = products.findIndex((p) => p.id === params.id)
  
  if (index === -1) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    )
  }

  products = products.filter((p) => p.id !== params.id)
  return NextResponse.json({ success: true })
} 