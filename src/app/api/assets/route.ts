import { NextRequest } from "next/server"

import assets from "@/models/assets"
import connect from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    await connect()
    const result = await assets.find()

    return Response.json(
      {
        success: true,
        data: result,
        message: "successfully fetched all available assets"
      },
      { status: 200 }
    )
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "failed to fetched all available assets"
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  try {
    await connect()

    const result = await assets.create({ ...body })

    return Response.json(
      {
        success: true,
        data: result,
        message: "assets successfully registered"
      },
      { status: 201 }
    )
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "failed to register new assets"
      },
      { status: 500 }
    )
  }
}
