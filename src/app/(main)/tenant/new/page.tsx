import { type Metadata } from "next"

import Shell from "@/components/shell"
import TenantForm from "@/components/tenant-form"

export const metadata: Metadata = {
  title: "Create new tenant"
}

export default function CreateNewTenantPage() {
  return (
    <Shell>
      <Shell.Heading>Create new tenant</Shell.Heading>
      <TenantForm />
    </Shell>
  )
}
