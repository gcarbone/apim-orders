import { NextResponse } from "next/server"

const apikey = 'a45de33b-d092-4b85-aa79-c9b1e8283e6a';

export async function GET() {
  // Simulate API delay
  //await new Promise((resolve) => setTimeout(resolve, 1000))


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

  return NextResponse.json(res.orders)
}

