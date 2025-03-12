"use client"

import * as React from "react"

import columns from "./_components/columns"
import { DataTable } from "./_components/data-table"

import Shell from "@/components/shell"

export default function AssetsPage() {
  const [assets, setAssets] = React.useState([])

  React.useEffect(() => {
    async function getAssets() {
      const request = await fetch("/api/assets")
      const payload = await request.json()

      setAssets(payload.data)
    }

    getAssets()
  }, [])

  return (
    <Shell>
      <Shell.Heading>Assets</Shell.Heading>
      <DataTable columns={columns} data={assets} />
    </Shell>
  )
}
