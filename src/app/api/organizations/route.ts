import { NextRequest } from "next/server"

import { db } from "@/db"
import { organizations } from "@/db/schema"

import { toErrorMap } from "@/lib/error-map"
import { organizationSchema } from "@/lib/zod-schema/organization"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = organizationSchema.safeParse(body)

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
    const [data] = await db
      .insert(organizations)
      .values(parsed.data)
      .returning()

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
