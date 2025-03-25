"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// import assetSchema from "@/lib/schemas/asset"
import { Button } from "./ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription
} from "./ui/form"
import { Input } from "./ui/input"
import { Asset } from "@/models/assets"

const assetSchema = z.object({
  name: z.string().min(1)
})

type AssetSchema = z.infer<typeof assetSchema>

export type AssetFormProps = {
  asset?: Asset
}

export default function AssetForm({ asset }: AssetFormProps) {
  const form = useForm<AssetSchema>({
    defaultValues: asset ? { name: asset.name } : undefined,
    resolver: zodResolver(assetSchema)
  })

  async function onSubmit(values: AssetSchema) {
    if (asset) {
      console.log("edit: ", values)
    }

    console.log("create: ", values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset Name</FormLabel>
              <FormControl>
                <Input placeholder="Mouse" {...field} />
              </FormControl>
              <FormDescription>Give your asset awesome name!</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {asset ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  )
}
