import Link from "next/link"

import { redirect } from "next/navigation"
import { PlusCircle } from "lucide-react"
import { getServerSession } from "next-auth"

import Shell from "@/components/shell"
import { Button } from "@/components/ui/button"
import { db } from "@/db"
import { tenant } from "@/db/schemas/tenant"
import { eq } from "drizzle-orm"
import { ResolvingMetadata } from "next"

export default async function TenantPage() {
  const session = await getServerSession()

  if (!session) {
    return redirect("/something-404")
  }

  return (
    <Shell>
      <div className="w-full flex flex-row justify-between">
        <Shell.Heading>Assets</Shell.Heading>
        <Button asChild>
          <Link href={"/asset/new"}>
            <PlusCircle /> New Asset
          </Link>
        </Button>
      </div>
    </Shell>
  )
}

type Props = {
  params: Promise<{ tenant_id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
) {
  const { tenant_id } = await params
  const [data] = await db.select().from(tenant).where(eq(tenant.id, tenant_id))

  return {
    title: data.name
  }
}
