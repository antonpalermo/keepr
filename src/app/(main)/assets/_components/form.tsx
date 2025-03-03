import connect from "@/lib/database"
import Assets from "@/models/assets"
import { revalidatePath } from "next/cache"

export default function AssetRegistrationForm() {
  async function registerAsset(formData: FormData) {
    "use server"

    const name = formData.get("asset-name")

    await connect()

    try {
      await Assets.create({ name })
      revalidatePath("/assets")
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <form action={registerAsset}>
      <div>
        <label htmlFor="asset-name">Asset Name</label>
        <input type="text" name="asset-name" id="asset-name" />
      </div>
      <button>Register</button>
    </form>
  )
}
