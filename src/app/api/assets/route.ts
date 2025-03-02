import connect from "@/lib/database"
import Assets from "@/models/assets"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  await connect()

  try {
    const asset = await Assets.create(body)
    return NextResponse.json({ success: true, data: asset }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
