import connect from "@/lib/database"
import RegisterAssetForm from "./_components/form"
import asset from "@/models/assets"

async function getAssets() {
  await connect()
  return await asset.find()
}

export default async function AssetsPage() {
  const assets = await getAssets()

  return (
    <div>
      <h1>Assets</h1>
      <RegisterAssetForm />
      {JSON.stringify(assets)}
    </div>
  )
}
