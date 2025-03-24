"use client"

import { z } from "zod"
import { useRouter } from "next/navigation"
import { useQueryClient, useMutation } from "@tanstack/react-query"

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription
} from "@/components/ui/dialog"

import assetSchema from "@/lib/schemas/asset"
import AssetMutation from "@/lib/mutations/assets"

import AssetForm from "@/components/asset-form"

type Asset = z.infer<typeof assetSchema>

export default function NewAssetModal() {
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

  function handleOnOpenChange() {
    router.back()
  }

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOnOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register new assets</DialogTitle>
          <DialogDescription>
            Creates a new record for specific asset.
          </DialogDescription>
        </DialogHeader>
        <AssetForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}
