"use client"

import { useRouter } from "next/navigation"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import RegisterAssetForm from "../../_components/form"

export default function NewAssetModal() {
  const router = useRouter()

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
        <RegisterAssetForm />
      </DialogContent>
    </Dialog>
  )
}
