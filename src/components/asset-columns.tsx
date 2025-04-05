"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Asset } from "@/lib/types"

import AssetMenu from "@/components/asset-menu"

const assetColumns: ColumnDef<Asset>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <Button variant={"link"} asChild className="mx-0 px-0">
          <Link href={`/assets/${row.original.id}`}>{row.original.name}</Link>
        </Button>
      )
    }
  },
  {
    accessorKey: "quantity",
    header: "Quantity"
  },
  {
    accessorKey: "assignee",
    header: "Assignee"
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",
    cell: ({ row }) => {
      const createdDate = new Date(row.original.dateCreated)
      return Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        createdDate
      )
    }
  },
  {
    accessorKey: "dateUpdated",
    header: "Date Updated",
    cell: ({ row }) => {
      const dateUpdated = new Date(row.original.dateUpdated)
      return Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        dateUpdated
      )
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const asset = row.original
      return <AssetMenu asset={asset} />
    }
  }
]

export default assetColumns
