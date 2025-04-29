import TenantForm from "@/components/tenant-form"
import Shell from "@/components/shell"

export default function CreateNewTenantPage() {
  return (
    <Shell>
      <Shell.Heading>Create new tenant</Shell.Heading>
      <TenantForm />
    </Shell>
  )
}
