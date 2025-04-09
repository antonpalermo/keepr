import { db } from "@/db"
import { users } from "@/db/schema"
import { sql } from "drizzle-orm"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get("email")

  console.log("fired")

  try {
    const result = await db
      .select()
      .from(users)
      .where(
        sql`to_tsvector('english', ${users.email}) @@ to_tsquery('english', ${email})`
      )

    return Response.json({
      success: true,
      data: result,
      message: "susccessfully retrieved assets"
    })
  } catch (error) {
    console.log(error)
    return Response.json(`unable to retrieve all users with email ${email}`, {
      status: 500
    })
  }
}
