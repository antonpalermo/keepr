"use client"

import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import assetSchema from "@/lib/schemas/asset"
import AssetForm from "@/components/asset-form"

import AssetMutation from "@/lib/mutations/assets"
import { useRouter } from "next/navigation"

type Asset = z.infer<typeof assetSchema>

export default function NewAssetPage() {
  const router = useRouter()

  const qClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (values: Asset) => await AssetMutation.create(values),
    onSuccess() {
      qClient.invalidateQueries({ queryKey: ["assets"] })
      // navigate back to previous page.
      router.back()
    }
  })

  async function onSubmit(values: Asset) {
    mutation.mutate(values)
  }

  return (
    <div>
      <h1 className="text-lg font-semibold leading-none tracking-tight">
        Register new asset
      </h1>
      <AssetForm onSubmit={onSubmit} />
    </div>
  )
}
