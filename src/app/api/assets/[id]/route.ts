import { NextRequest } from "next/server"

import { db } from "@/db"
import { asset } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function GET(
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
          message: `unable to locate ${id}`
        },
        { status: 404 }
      )
    }

    return Response.json({
      success: true,
      data: result,
      message: `${id} successfully fetched`
    })
  } catch (error) {
    console.log(error)
    return Response.json("unable to insert data", { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const body = await request.json()

  try {
    const selectAsset = db
      .$with("selectAsset")
      .as(db.select().from(asset).where(eq(asset.id, id)))

    const [result] = await db
      .with(selectAsset)
      .update(asset)
      .set(body)
      .where(eq(asset.id, id))
      .returning()

    if (!result) {
      return Response.json(
        {
          success: false,
          errors: `${id} not exist`
        },
        { status: 404 }
      )
    }

    return Response.json({
      success: true,
      data: result,
      message: `${id} successfully updated`
    })
  } catch (error) {
    console.log(error)
    return Response.json("unable to insert data", { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const selectAsset = db
      .$with("selectAsset")
      .as(db.select().from(asset).where(eq(asset.id, id)))

    const [result] = await db
      .with(selectAsset)
      .delete(asset)
      .where(eq(asset.id, id))
      .returning({
        id: asset.id
      })

    if (!result) {
      return Response.json(
        {
          success: false,
          errors: `${id} not exist`
        },
        { status: 404 }
      )
    }

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
