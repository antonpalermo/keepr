import { useActionState } from "react"
import { removeAsset } from "../actions"
import { Button } from "@/components/ui/button"

export default function TableMenu({ asset }: { asset: any }) {
  return (
    <form action={removeAsset.bind(null, asset.id)}>
      <Button type="submit" variant={"destructive"}>
        Remove
      </Button>
    </form>
  )
}
