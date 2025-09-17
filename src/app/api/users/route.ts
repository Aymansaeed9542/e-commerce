
import { NextRequest , NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    const {data}= await res.json()



    return NextResponse.json({data})

}