"use client"

import { useEffect, useState } from "react"
import { Building2, Check, ChevronsUpDown } from "lucide-react"

import Link from "next/link"

import { Button } from "./ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator
} from "./ui/command"

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

import { cn } from "@/lib/utils"
import { useParams, useRouter } from "next/navigation"

export default function OrganizationToggle({
  organizations
}: {
  organizations: {
    id: string
    name: string | null
    owner: string | null
    dateCreated: Date | null
    dateUpdated: Date | null
  }[]
}) {
  const [mounted, setMounted] = useState(false)

  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-80 justify-between">
          {organizations.find(org => org.id === params.org)?.name ||
            "Select an organization"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 px-0 py-0">
        <Command>
          <CommandList>
            <CommandEmpty>No organization available</CommandEmpty>
            <CommandGroup heading="Organizations">
              {organizations.map(org => (
                <CommandItem
                  key={org.id}
                  onSelect={() => router.push(`/${org.id}`)}
                >
                  {org.name}{" "}
                  <Check
                    className={cn(
                      "ml-auto",
                      params.org === org.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem asChild>
                <Link href={"/organizations/new"} className="cursor-pointer">
                  <Building2 />
                  Create new organization
                </Link>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
