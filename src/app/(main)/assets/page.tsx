"use client"

import * as React from "react"

import columns from "./_components/columns"
import { DataTable } from "./_components/data-table"

import Shell from "@/components/shell"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AssetsPage() {
  const { data: assets, isPending } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const request = await fetch("/api/assets")

      if (!request.ok) {
        throw new Error("unable to get all assets")
      }

      return await request.json()
    }
  })

  if (isPending) return <h1>loading</h1>

  return (
    <Shell>
      <div className="flex flex-row justify-between items-center">
        <Shell.Heading>Assets</Shell.Heading>
        <Button asChild>
          <Link href={"/assets/new"}>Asset Registration</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={assets.data} />
    </Shell>
  )
}
