"use client"

import * as React from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

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

export default function RegisterAssetForm() {
  const router = useRouter()

  const form = useForm<AssetFormSchema>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      name: ""
    }
  })

  async function handleSubmit(values: AssetFormSchema) {
    try {
      const request = await fetch("/api/assets", {
        method: "POST",
        body: JSON.stringify(values)
      })

      if (!request.ok) {
        throw new Error("unable to create asset")
      }

      router.back()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
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
          Register
        </Button>
      </form>
    </Form>
  )
}
