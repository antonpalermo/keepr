"use client"

import { getAsset } from "@/lib/helpers/asset"
import { useQuery } from "@tanstack/react-query"
import Shell from "@/components/shell"
import { useParams } from "next/navigation"
import AssetForm from "@/components/asset-form"

export default function AssetPage() {
  const { id } = useParams()

  const { data: asset, isPending } = useQuery({
    queryKey: ["asset"],
    queryFn: async () => getAsset(id as string)
  })

  if (isPending) {
    return <h1>Loading...</h1>
  }

  return (
    <Shell>
      <div className="flex flex-row justify-between items-center">
        <Shell.Heading>Assets</Shell.Heading>
      </div>
      <AssetForm asset={asset.data} />
    </Shell>
  )
}
