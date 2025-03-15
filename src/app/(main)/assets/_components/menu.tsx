"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react"

export default function TableMenu({ asset }: { asset: any }) {
  const options = [
    {
      label: "Edit",
      icon: <PencilIcon />,
      onClick: () => {
        console.log("edit" + asset.id)
      }
    },
    {
      label: "Delete",
      icon: <Trash2Icon />,
      onClick: () => {
        console.log("delete" + asset.id)
      }
    }
  ]

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
        {options.map(option => (
          <DropdownMenuItem key={option.label} onClick={option.onClick}>
            {option.icon && option.icon}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
