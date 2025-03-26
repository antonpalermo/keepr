"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl } from "./ui/form"

import { Asset } from "@/models/assets"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const assetSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Asset name must be at least 3 characters long" })
    .max(220, { message: "Asset name exceed the required limit" })
})

type AssetSchema = z.infer<typeof assetSchema>

export type AssetFormProps = {
  asset?: Asset
}

export default function AssetForm({ asset }: AssetFormProps) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (options: {
      values: Omit<Asset, "id" | "dateCreated" | "dateUpdated">
      isEdit?: boolean
    }) => {
      if (asset && options.isEdit) {
        const request = await fetch(`/api/assets/${asset.id}`, {
          method: "PATCH",
          body: JSON.stringify(options.values)
        })

        if (!request.ok) {
          throw new Error("unable to edit asset")
        }
      }

      const request = await fetch(`/api/assets`, {
        method: "POST",
        body: JSON.stringify(options.values)
      })

      if (!request.ok) {
        throw new Error("unable to edit asset")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] })
    }
  })

  const form = useForm<AssetSchema>({
    defaultValues: asset ? { name: asset.name } : { name: "" },
    resolver: zodResolver(assetSchema)
  })

  async function onSubmit(values: AssetSchema) {
    if (asset) {
      console.log("edit block: ")
      mutation.mutate({
        isEdit: true,
        values
      })
      return
    }

    console.log("create block: ")
    mutation.mutate({ values })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset name</FormLabel>
              <FormControl>
                <Input placeholder="AOC Monitor" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">{asset ? "Update" : "Create"}</Button>
      </form>
    </Form>
  )
}
