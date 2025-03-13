"use client"

import * as React from "react"

import columns from "./_components/columns"
import { DataTable } from "./_components/data-table"

import Shell from "@/components/shell"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"

export default function AssetsPage() {
  const { data: assets } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const request = await fetch("/api/assets")
      return await request.json()
    }
  })

  return (
    <Shell>
      <div className="flex flex-row justify-between items-center">
        <Shell.Heading>Assets</Shell.Heading>
        <Button>Asset Registration</Button>
      </div>
      <DataTable columns={columns} data={assets.data} />
    </Shell>
  )
}
