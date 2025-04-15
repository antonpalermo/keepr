import Link from "next/link"
import { cookies } from "next/headers"
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
import { organizations } from "@/db/schema"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

import { db } from "@/db"
import { cn } from "@/lib/utils"

export default async function OrganizationToggle() {
  const cookieStore = await cookies()
  const orgs = await db.select().from(organizations)

  const defaultOrganization = cookieStore.get("organization")?.value

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-80 justify-between">
          {orgs.find(org => org.id === defaultOrganization)?.name ||
            "Select an organization"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 px-0 py-0">
        <Command>
          <CommandList>
            <CommandEmpty>No organization available</CommandEmpty>
            <CommandGroup heading="Organizations">
              {orgs.map(org => (
                <CommandItem key={org.id}>
                  {org.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      defaultOrganization === org.id
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
