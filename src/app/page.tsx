import { db } from "@/db"
import { organizations } from "@/db/schemas/organization"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const session = await getServerSession()

  const cookieStore = await cookies()
  const currentOrganization = cookieStore.get("organization")?.value

  if (!currentOrganization) {
    console.log("database call")

    // only query database if no org found in cookies
    const orgs = await db
      .select()
      .from(organizations)
      .where(eq(organizations.owner, session?.user.email || ""))

    // if no orgs for this user throw a not found
    // but much better if we redirect them to create
    // a new organization.
    if (!orgs[0]) {
      return redirect("/organizations/new")
    }

    // then redirect to the first organization available.
    return redirect(`/${orgs[0].id}`)
  }

  console.log("no database call")

  // if cookie is available then do not perform a dabase trip
  // just return the available cookie.
  return redirect(`/${currentOrganization}`)
}
