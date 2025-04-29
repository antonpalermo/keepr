import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import Shell from "@/components/shell"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

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
