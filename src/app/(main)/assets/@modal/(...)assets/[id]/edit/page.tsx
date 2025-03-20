"use client"

import { useRouter } from "next/navigation"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import EditAssetForm from "@/app/(main)/assets/_components/edit-asset"

export default function EditAssetModal() {
  const router = useRouter()

  function handleOnOpenChange() {
    router.back()
  }

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOnOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Asset</DialogTitle>
          <DialogDescription>
            Creates a new record for specific asset.
          </DialogDescription>
        </DialogHeader>
        <EditAssetForm />
      </DialogContent>
    </Dialog>
  )
}
