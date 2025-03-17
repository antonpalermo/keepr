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
        <Button variant={"link"} asChild>
          <Link href={`/assets/${row.original.id}`}>{row.original.name}</Link>
        </Button>
      )
    }
  },
  { accessorKey: "dateCreated", header: "Date Created" },
  { accessorKey: "dateUpdated", header: "Date Updated" },
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
