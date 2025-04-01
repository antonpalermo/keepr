import { NextRequest } from "next/server"

import assets from "@/models/assets"
import connect from "@/lib/database"

import { db } from "@/db"
import { asset } from "@/db/schema"
import { toErrorMap } from "@/lib/error-map"
import { assetSchema } from "@/lib/zod-schema/asset"

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
  const parsed = assetSchema.safeParse(body)

  if (!parsed.success) {
    return Response.json(
      {
        success: false,
        errors: toErrorMap(parsed.error),
        message: "submitted data contains invalid value"
      },
      { status: 400 }
    )
  }

  try {
    const [data] = await db.insert(asset).values(parsed.data).returning()
    return Response.json({
      success: true,
      data,
      message: "asset susccessfully created"
    })
  } catch (error) {
    console.log(error)
    return Response.json("unable to insert data", { status: 500 })
  }
}
