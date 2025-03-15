"use client"

import { ColumnDef } from "@tanstack/react-table"
import TableMenu from "./menu"

interface Asset {
  id: string
  name: string
  dateCreated: any
  dateUpdated: any
}

const columns: ColumnDef<Asset>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
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
