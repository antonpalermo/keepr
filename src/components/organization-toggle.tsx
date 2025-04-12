import { ChevronsUpDown } from "lucide-react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "./ui/command"
import { organization } from "@/db/schema"
import { db } from "@/db"

export default async function OrganizationToggle() {
  const organizations = await db.select().from(organization)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-80 justify-between">
          Select Organization
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 px-2 py-2">
        <Command>
          <CommandList>
            <CommandEmpty>No organization available</CommandEmpty>
            <CommandGroup>
              {organizations.map(org => (
                <CommandItem key={org.id}>{org.name}</CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
