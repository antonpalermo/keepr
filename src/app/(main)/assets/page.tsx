"use client"

import * as React from "react"

import Shell from "@/components/shell"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import asset from "@/lib/mutations/assets"
import assetColumns from "@/components/asset-columns"
import { AssetDataTable } from "@/components/asset-table"

export default function AssetsPage() {
  const { data: assets, isPending } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => await asset.get()
  })

  return (
    <Shell>
      <div className="flex flex-row justify-between items-center">
        <Shell.Heading>Assets</Shell.Heading>
        <Button asChild>
          <Link href={"/assets/new"}>Asset Registration</Link>
        </Button>
      </div>
      {!isPending && (
        <AssetDataTable columns={assetColumns} data={assets.data} />
      )}
    </Shell>
  )
}
