"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl } from "./ui/form"

import { Asset } from "@/models/assets"

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
  const form = useForm<AssetSchema>({
    defaultValues: asset ? { name: asset.name } : { name: "" },
    resolver: zodResolver(assetSchema)
  })

  async function onSubmit(values: AssetSchema) {
    if (asset) {
      console.log("edit: ", values)
      return
    }

    console.log("create: ", values)
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
