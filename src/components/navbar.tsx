import { db } from "@/db"
import OrganizationToggle from "./organization-toggle"
import { organizations } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"

async function getOrganization(email: string) {
  const data = await db
    .select()
    .from(organizations)
    .where(eq(organizations.owner, email))

  return data
}

async function updateDefaultOrganization(id: string) {
  "use server"
  const cookieStore = await cookies()
  cookieStore.set("organization", id, { maxAge: 1000 * 60 * 60 * 24 * 365 })
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
        <OrganizationToggle
          organizations={orgs}
          onSelect={updateDefaultOrganization}
        />
        <span className="grow" />
      </div>
    </nav>
  )
}
