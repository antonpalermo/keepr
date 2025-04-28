"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"

import { useToast } from "@/hooks/use-toast"
import { createTenant } from "@/lib/helpers/tenant"
import { organizationSchema } from "@/lib/zod-schema/organization"

type OrganizationSchema = z.infer<typeof organizationSchema>

export default function TenantForm() {
  const router = useRouter()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: async (data: OrganizationSchema) => {
      return await createTenant(data)
    },
    onSuccess: data => {
      toast({
        title: "New organization created 🎉",
        description: `You can now track and monitor assets under ${data.data.name}`
      })
      router.push(`/${data.data.id}`)
    }
  })

  const form = useForm<OrganizationSchema>({
    defaultValues: {
      name: ""
    },
    resolver: zodResolver(organizationSchema)
  })

  async function onSubmit(data: OrganizationSchema) {
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization name</FormLabel>
              <FormControl>
                <Input placeholder="Blue lagoons" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
