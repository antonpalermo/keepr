"use client"

import { useQuery } from "@tanstack/react-query"

import AssetForm from "@/components/asset-form"
import { useParams } from "next/navigation"

export default function EditAssetPage() {
  const params = useParams()
  const { data: asset, isPending } = useQuery({
    queryKey: ["asset"],
    queryFn: async () => {
      try {
        const request = await fetch(`/api/assets/${params.id}`)

        if (!request.ok) {
          throw new Error("uanble to fetch " + params.id)
        }

        return await request.json()
      } catch (error) {
        console.log("error: ", error, "unable to fetch " + params.id)
      }
    }
  })

  if (isPending) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <h1>Edit Asset Page</h1>
      <AssetForm asset={asset.data} />
    </div>
  )
}
