import { db } from "@/db"
import OrganizationToggle from "./organization-toggle"
import { organizations } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { setCookie } from "@/lib/actions/set-cookie"

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
        <OrganizationToggle organizations={orgs} onSelect={setCookie} />
        <span className="grow" />
      </div>
    </nav>
  )
}
