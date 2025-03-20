"use client"

import * as React from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import assetSchema, { AssetFormSchema } from "../schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"

export default function EditAssetForm() {
  const router = useRouter()
  const params = useParams()

  const qClient = useQueryClient()
  const mutate = useMutation({
    mutationFn: async (values: AssetFormSchema) => {
      try {
        const request = await fetch(`/api/assets/${params.id}`, {
          method: "PATCH",
          body: JSON.stringify(values)
        })

        if (!request.ok) {
          throw new Error("unable to update " + params.id)
        }

        router.back()
      } catch (error) {
        console.log(error)
      }
    },
    onSuccess: () => {
      qClient.invalidateQueries({ queryKey: ["assets"] })
    }
  })

  const form = useForm<AssetFormSchema>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      name: ""
    }
  })

  async function handleUpdate(values: AssetFormSchema) {
    mutate.mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdate)}>
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
        <Button type="submit">Update</Button>
      </form>
    </Form>
  )
}
