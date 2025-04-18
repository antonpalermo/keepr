import OrganizationForm from "@/components/organization-form"
import Shell from "@/components/shell"

export default function NewOrganizationPage() {
  return (
    <Shell>
      <Shell.Heading>Create new organization</Shell.Heading>
      <OrganizationForm />
    </Shell>
  )
}
