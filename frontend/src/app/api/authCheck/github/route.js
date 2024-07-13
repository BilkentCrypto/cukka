import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(req) {
    let res = NextResponse.next()
     
    return NextResponse.json({ error: 'Pong!' }, { status: 200 })
}