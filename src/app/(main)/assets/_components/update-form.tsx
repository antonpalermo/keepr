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

import assetSchema, { AssetFormSchema } from "../form-schema"
import { updateAsset } from "../actions"

export default function UpdateForm({
  asset
}: {
  asset: { id: string; name: string }
}) {
  const onUpdateAsset = updateAsset.bind(null, asset.id)

  const [isPending, startTransition] = React.useTransition()
  const [state, formAction] = React.useActionState(
    async (_: any, formData: FormData) => await onUpdateAsset(formData),
    {
      success: false,
      message: ""
    }
  )

  const form = useForm<AssetFormSchema>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      name: asset.name
    }
  })

  const formRef = React.useRef<HTMLFormElement>(null)

  return (
    <Form {...form}>
      {JSON.stringify(state)}
      <form
        ref={formRef}
        action={formAction}
        onSubmit={e => {
          e.preventDefault()
          form.handleSubmit(async () => {
            startTransition(async () => {
              if (formRef.current) {
                formAction(new FormData(formRef.current))
              }
            })
          })(e)
        }}
      >
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
        <Button type="submit" disabled={isPending}>
          Update
        </Button>
      </form>
    </Form>
  )
}
