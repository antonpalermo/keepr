import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

import { db } from "@/db"
import { tenant } from "@/db/schemas/tenant"

import TenantToggle from "./tenant-toggle"

async function getTenants(email: string) {
  const data = await db.select().from(tenant).where(eq(tenant.owner, email))

  return data
}

export default async function Navbar() {
  const session = await getServerSession()
  const tenants = await getTenants(session?.user.email ?? "")

  if (!tenants) {
    throw new Error("tenants is null")
  }

  return (
    <nav className="container mx-auto px-5">
      <div className="flex w-full py-5">
        <TenantToggle tenants={tenants} />
        <span className="grow" />
      </div>
    </nav>
  )
}
