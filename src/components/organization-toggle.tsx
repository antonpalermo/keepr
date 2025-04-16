"use client"

import Link from "next/link"
import { Building2, Check, ChevronsUpDown } from "lucide-react"

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

import useCookies from "@/lib/hooks/use-cookies"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useParams } from "next/navigation"

export default function OrganizationToggle({
  organizations,
  onSelect
}: {
  organizations: {
    id: string
    name: string | null
    owner: string | null
    dateCreated: Date | null
    dateUpdated: Date | null
  }[]
  onSelect: (id: string, value: string) => void
}) {
  const { getCookie } = useCookies()
  const [mounted, setMounted] = useState(false)
  const params = useParams()

  const defaultOrg = getCookie("organization")

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
          {organizations.find(
            org => org.id === defaultOrg || org.id === params.org
          )?.name || "Select an organization"}
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
                  onSelect={() => onSelect("organization", org.id)}
                >
                  {org.name}{" "}
                  <Check
                    className={cn(
                      "ml-auto",
                      defaultOrg === org.id || params.org === org.id
                        ? "opacity-100"
                        : "opacity-0"
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
