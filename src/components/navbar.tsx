import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

import { db } from "@/db"
import { organizations } from "@/db/schemas/organization"

import OrganizationToggle from "./organization-toggle"

async function getOrganization(email: string) {
  const data = await db
    .select()
    .from(organizations)
    .where(eq(organizations.owner, email))

  return data
}

export default async function Navbar() {
  const session = await getServerSession()

  const orgs = await getOrganization(session?.user.email || "")

  if (!orgs) {
    throw new Error("orgs is null")
  }

  return (
    <nav className="container mx-auto px-5">
      <div className="flex w-full py-5">
        <OrganizationToggle organizations={orgs} />
        <span className="grow" />
      </div>
    </nav>
  )
}
