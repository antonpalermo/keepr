import { Building2, ChevronsUpDown } from "lucide-react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator
} from "./ui/command"
import { organizations } from "@/db/schema"
import { db } from "@/db"
import Link from "next/link"

export default async function OrganizationToggle() {
  const orgs = await db.select().from(organizations)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-80 justify-between">
          Select Organization
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 px-0 py-0">
        <Command>
          <CommandList>
            <CommandEmpty>No organization available</CommandEmpty>
            <CommandGroup heading="Organizations">
              {orgs.map(org => (
                <CommandItem key={org.id}>{org.name}</CommandItem>
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
