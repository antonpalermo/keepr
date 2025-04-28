import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { db } from "@/db"
import { tenant } from "@/db/schemas/tenant"

export default async function HomePage() {
  const session = await getServerSession()

  // only query database if no org found in cookies
  const tenants = await db
    .select()
    .from(tenant)
    .where(eq(tenant.owner, session?.user.email || ""))

  // if no orgs for this user throw a not found
  // but much better if we redirect them to create
  // a new organization.
  if (!tenants[0]) {
    return redirect("/tenants/new")
  }

  // then redirect to the first organization available.
  return redirect(`/${tenants[0].id}`)
}
