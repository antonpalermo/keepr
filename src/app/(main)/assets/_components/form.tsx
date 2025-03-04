"use client"

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

import { onRegisterAsset } from "../_actions/register-assets"
import assetSchema, { AssetFormSchema } from "../_lib/asset-form-schema"
import { useFormState } from "react-dom"

export default function RegisterAssetForm() {


  const defaultValues: AssetFormSchema = {
    name: ""
  }

  const form = useForm<AssetFormSchema>({
    defaultValues,
    resolver: zodResolver(assetSchema)
  })

  async function onSubmit(values: AssetFormSchema) {
    console.log(values)
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
        <Button type="submit">Register</Button>
      </form>
    </Form>
  )
}
