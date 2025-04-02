import { NextRequest } from "next/server"

import { db } from "@/db"
import { asset } from "@/db/schema"
import { toErrorMap } from "@/lib/error-map"
import { assetSchema } from "@/lib/zod-schema/asset"

export async function GET() {
  try {
    const data = await db.select().from(asset)

    return Response.json({
      success: true,
      data,
      message: "susccessfully retrieved assets"
    })
  } catch (error) {
    console.log(error)
    return Response.json("unable to retrieve all asset data", { status: 500 })
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
