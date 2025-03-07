import connect from "@/lib/database"
import RegisterAssetForm from "./_components/form"
import asset from "@/models/assets"

import columns from "./_components/columns"
import { DataTable } from "./_components/data-table"

async function getAssets() {
  await connect()
  const assets = await asset.find()

  return JSON.stringify(assets)
}

export default async function AssetsPage() {
  const assets = await getAssets()

  return (
    <div>
      <h1>Assets</h1>
      <RegisterAssetForm />
      <DataTable columns={columns} data={JSON.parse(assets)} />
    </div>
  )
}
