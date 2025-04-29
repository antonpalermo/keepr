"use client"

import Link from "next/link"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Building2, Check, ChevronsUpDown } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator
} from "./ui/command"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

import { cn } from "@/lib/utils"
import { TenantSelectDTO } from "@/db/schemas/tenant"

export default function TenantToggle({
  tenants
}: {
  tenants: TenantSelectDTO[]
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
          {tenants.find(tenant => tenant.id === params.tenant_id)?.name ||
            "Select Tenant"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 px-0 py-0">
        <Command>
          <CommandList>
            <CommandEmpty>No tenants available</CommandEmpty>
            <CommandGroup heading="Tenants">
              {tenants.map(org => (
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
                <Link href={"/tenants/new"} className="cursor-pointer">
                  <Building2 />
                  Create new tenant
                </Link>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
