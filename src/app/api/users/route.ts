import { db } from "@/db"
import { users } from "@/db/schema"
import { sql } from "drizzle-orm"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")

  try {
    if (query) {
      const result = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          image: users.image
        })
        .from(users)
        .where(sql`email % ${query}`)

      return Response.json({
        success: true,
        data: result,
        message: `susccessfully retrieved user ${query}`
      })
    }

    return Response.json({
      success: true,
      data: await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          image: users.image
        })
        .from(users),
      message: "susccessfully retrieved users"
    })
  } catch (error) {
    console.log(error)
    return Response.json(`unable to retrieve all users with query ${query}`, {
      status: 500
    })
  }
}
