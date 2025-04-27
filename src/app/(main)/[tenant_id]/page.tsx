import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { db } from "@/db"
import { tenant } from "@/db/schemas/tenant"

import Shell from "@/components/shell"

export default async function TenantPage() {
  const session = await getServerSession()
  const assets = await db.select().from(tenant).where(eq(tenant.owner, ""))

  if (!session) {
    return redirect("/something-404")
  }

  return (
    <Shell>
      <div>
        <Shell.Heading>Assets</Shell.Heading>
      </div>
      {JSON.stringify(assets)}
    </Shell>
  )
}
