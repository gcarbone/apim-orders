import { NextResponse } from "next/server"

const apikey = 'a45de33b-d092-4b85-aa79-c9b1e8283e6a';

export async function GET() {
  console.log('starting customer request');
  let res;
  try {
    res = await fetch('https://production-celigo-labs-ent.gateway.apim.integrator.io/ordermaster/customers', {
      headers: {
        'x-celigo-api-key': apikey
      }
    });
  
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    res = await res.json();

  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
  console.log(res.customers);
  return NextResponse.json(res.customers)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newCustomer = {
      ...body,
    }
    
    console.log(newCustomer);
    let res;
    const apiRequest = new Request('https://production-celigo-labs-ent.gateway.apim.integrator.io/ordermaster/customers', {
      method: "POST",
      headers: {
        'x-celigo-api-key': apikey
      },
      body: JSON.stringify(newCustomer)
    });

    try {
      res = await fetch(apiRequest);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      res = await res.json();
  
    } catch (error) {
      console.error('Error adding customer:', error);
      throw error;
    }
    console.log(res);

    return NextResponse.json(newCustomer, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 }
    )
  }
} 