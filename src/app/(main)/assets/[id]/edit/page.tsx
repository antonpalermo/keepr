"use client"

import AssetForm from "@/components/asset-form"

export default function EditAssetPage() {
  return (
    <div>
      <h1>Edit Asset Page</h1>
      <AssetForm
        asset={{
          id: "sample",
          name: "sample",
          dateCreated: new Date(),
          dateUpdated: new Date()
        }}
      />
    </div>
  )
}
