import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"

import { db } from "@/db"
import { tenant } from "@/db/schemas/tenant"

import { toErrorMap } from "@/lib/error-map"
import { organizationSchema } from "@/lib/zod-schema/organization"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = organizationSchema.safeParse(body)

  const session = await getServerSession()

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
      .insert(tenant)
      .values({ ...parsed.data, owner: session?.user.email ?? "" })
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
