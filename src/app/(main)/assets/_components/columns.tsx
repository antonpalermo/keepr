"use client"

import { ColumnDef } from "@tanstack/react-table"

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
  { accessorKey: "dateUpdated", header: "Date Updated" }
]

export default columns
