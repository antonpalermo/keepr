"use client"

import { ColumnDef } from "@tanstack/react-table"
import TableMenu from "./menu"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Asset {
  id: string
  name: string
  dateCreated: Date
  dateUpdated: Date
}

const columns: ColumnDef<Asset>[] = [
  { accessorKey: "id", header: "ID" },
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
      return <TableMenu asset={asset} />
    }
  }
]

export default columns
