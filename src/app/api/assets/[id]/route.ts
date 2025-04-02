import { NextRequest, NextResponse } from "next/server"

import assets from "@/models/assets"
import connect from "@/lib/database"
import { db } from "@/db"
import { asset } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    await connect()
    const result = await assets.findById(id)

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message: `unable to locate ${id}`
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: result,
        message: `successfully fetched asset ${id}`
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "server is currently unreachable, please try again later."
      },
      {
        status: 500
      }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()

  try {
    await connect()
    const result = await assets.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    )

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message: `unable to locate ${id}`
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: result,
        message: `asset ${id} successfully updated`
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "server is currently unreachable, please try again later."
      },
      {
        status: 500
      }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const [result] = await db.select().from(asset).where(eq(asset.id, id))

    if (!result) {
      return Response.json(
        {
          success: false,
          errors: `${id} not exist`
        },
        { status: 404 }
      )
    }

    await db.delete(asset).where(eq(asset.id, id))

    return Response.json(
      {
        success: true,
        message: `asset ${id} successfully deleted`
      },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return Response.json("unable to insert data", { status: 500 })
  }
}
