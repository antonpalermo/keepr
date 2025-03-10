import { removeAsset } from "../actions"
import { Button } from "@/components/ui/button"
import UpdateForm from "./update-form"

export default function TableMenu({ asset }: { asset: any }) {
  return (
    <div className="inline-flex space-x-3">
      <UpdateForm asset={asset} />
      <Button type="submit" variant={"link"}>
        Update
      </Button>
      <form action={removeAsset.bind(null, asset.id)}>
        <Button type="submit" variant={"destructive"}>
          Remove
        </Button>
      </form>
    </div>
  )
}
