import { NextResponse } from "next/server"

const apikey = 'a45de33b-d092-4b85-aa79-c9b1e8283e6a';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('starting customer info request');
  const { id } = params;
  let res;
  try {
    res = await fetch('https://production-celigo-labs-ent.gateway.apim.integrator.io/ordermaster/customers/' + id, {
      headers: {
        'x-celigo-api-key': apikey
      }
    });
  
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    res = await res.json();

  } catch (error) {
    console.error('Error fetching customer:', error);
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
    const { id } = params;
    
    console.log('Updating customer:', id);
    let res;
    const apiRequest = new Request('https://production-celigo-labs-ent.gateway.apim.integrator.io/ordermaster/customers/' + id, {
      method: "PUT",
      headers: {
        'x-celigo-api-key': apikey
      },
      body: JSON.stringify(body)
    });

    try {
      res = await fetch(apiRequest);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      res = await res.json();
  
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
    console.log(res);

    return NextResponse.json(body)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update customer" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    console.log('Deleting customer:', id);
    let res;
    const apiRequest = new Request('https://production-celigo-labs-ent.gateway.apim.integrator.io/ordermaster/customers/' + id, {
      method: "DELETE",
      headers: {
        'x-celigo-api-key': apikey
      }
    });

    try {
      res = await fetch(apiRequest);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete customer" },
      { status: 500 }
    )
  }
} 