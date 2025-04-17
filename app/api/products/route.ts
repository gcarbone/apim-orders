import { NextResponse } from "next/server"

const apikey = 'a45de33b-d092-4b85-aa79-c9b1e8283e6a';
// This is a mock database. In a real application, you would use a proper database.
// let products = [
//   {
//     id: "2",
//     name: "Sample Product 1",
//     description: "This is a sample product description",
//     price: 99.99,
//     stock: 10,
//     category: "Electronics",
//     status: "Active",
//   },
//   {
//     id: "2",
//     name: "Sample Product 2",
//     description: "Another sample product description",
//     price: 149.99,
//     stock: 5,
//     category: "Clothing",
//     status: "Active",
//   },
// ]

export async function GET() {
    console.log('starting request');
    let res;
    try {
      res = await fetch('https://production-celigo-labs-ent.gateway.apim.integrator.io/ordermaster/products', {
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
    console.log(res.products);
  return NextResponse.json(res.products)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newProduct = {
      
      ...body,
      
    }
    console.log(newProduct);
    //console.log('starting request with\n' + JSON.stringify(newProduct));
    let res;
      // const apiRequest = new Request('https://webhook.site/86ada2b4-ce78-4cfe-a63d-bdf7beac06cb',{
        // const apiRequest = new Request('https://production-celigo-labs-ent.gateway.apim.integrator.io/ordermaster/test',{
    const apiRequest = new Request('https://production-celigo-labs-ent.gateway.apim.integrator.io/ordermaster/products',{

    method: "POST",
        headers: {
          'x-celigo-api-key': apikey
        },
        body: JSON.stringify(newProduct)
    });

  
    console.log(newProduct);

    try {
      res = await fetch(apiRequest);

      console.log(JSON.stringify(res.body));

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      res = await res.json();
  
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
    console.log(res);

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    )
  }
} 

async function streamToString(stream) {
  const textStream = stream.pipeThrough(new TextDecoderStream());
  const reader = textStream.getReader();
  let result = '';

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    result += value;
  }

  return result;
}