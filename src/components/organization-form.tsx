"use client"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import { organizationSchema } from "@/lib/zod-schema/organization"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { createOrganization } from "@/lib/helpers/organization"

type OrganizationSchema = z.infer<typeof organizationSchema>

export default function OrganizationForm() {
  const mutation = useMutation({
    mutationFn: async (data: OrganizationSchema) => {
      return await createOrganization(data)
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
