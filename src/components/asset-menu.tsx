"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { EllipsisVerticalIcon, Pencil } from "lucide-react"
import AssetDeleteModal from "./delete-modal"
import Link from "next/link"

import { Asset } from "@/lib/types"

export default function AssetMenu({ asset }: { asset: Asset }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <EllipsisVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Asset Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/assets/${asset.id}/edit`}>
            <Pencil />
            <span>Edit</span>
          </Link>
        </DropdownMenuItem>

        <AssetDeleteModal asset={asset} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
