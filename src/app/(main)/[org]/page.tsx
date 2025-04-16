import { getServerSession } from "next-auth"

export default async function OrganizationPage({
  params
}: {
  params: Promise<{ org: string }>
}) {
  const { org } = await params
  const session = await getServerSession()

  return (
    <h1>
      org: {org} {JSON.stringify(session?.user)}
    </h1>
  )
}
