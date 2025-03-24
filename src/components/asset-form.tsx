"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import assetSchema from "@/lib/schemas/asset"
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

type Asset = z.infer<typeof assetSchema>

export type AssetFormProps = {
  onSubmit: (values: Asset) => void
}

export default function AssetForm({ onSubmit }: AssetFormProps) {
  const form = useForm<Asset>({
    defaultValues: {
      name: ""
    },
    resolver: zodResolver(assetSchema)
  })

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
          Submit
        </Button>
      </form>
    </Form>
  )
}
