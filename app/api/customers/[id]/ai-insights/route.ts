import { NextResponse } from "next/server"

const apikey = 'a45de33b-d092-4b85-aa79-c9b1e8283e6a';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('starting customer info request');
    const { id } = params;
    let res;
    try {
      res = await fetch('https://production-celigo-labs-ent.gateway.apim.integrator.io/ordermaster/cust360/' + id, {
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
    
    //return NextResponse.json({ insights: res.output })
  } catch (error) {
    console.error("Error generating AI insights:", error)
    return NextResponse.json(
      { error: "Failed to generate AI insights" },
      { status: 500 }
    )
  }
} 