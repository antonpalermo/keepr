"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl } from "./ui/form"

import { Asset } from "@/lib/types"
import { assetSchema } from "@/lib/zod-schema/asset"
import { createAsset, updateAsset } from "@/lib/helpers/asset"
import UserAutocomplete from "./user-autocomplete"

type AssetSchema = z.infer<typeof assetSchema>

export type AssetFormProps = {
  asset?: Asset
}

export default function AssetForm({ asset }: AssetFormProps) {
  const router = useRouter()

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (options: { isEdit?: boolean; values: AssetSchema }) => {
      if (asset && options.isEdit) {
        return await updateAsset(asset.id, options.values)
      }

      return await createAsset(options.values)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] })
      router.back()
    }
  })

  const form = useForm<AssetSchema>({
    defaultValues: asset
      ? { name: asset.name, quantity: asset.quantity, assignee: asset.assignee }
      : { name: "", quantity: 1, assignee: [] },
    resolver: zodResolver(assetSchema)
  })

  async function onSubmit(values: AssetSchema) {
    if (asset) {
      mutation.mutate({
        isEdit: true,
        values
      })
      return
    }

    mutation.mutate({ values })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <UserAutocomplete />
        <Button type="submit">{asset ? "Update" : "Create"}</Button>
      </form>
    </Form>
  )
}
