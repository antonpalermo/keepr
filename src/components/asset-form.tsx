import { AssetSchema } from "@/lib/schemas/asset"
import { Form, useForm } from "react-hook-form"
import { Button } from "./ui/button"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription
} from "./ui/form"
import { Input } from "./ui/input"

export type AssetFormProps = {
  onSubmit: (values: AssetSchema) => void
}

export default function AssetForm({ onSubmit }: AssetFormProps) {
  const form = useForm<AssetSchema>({
    defaultValues: {
      name: ""
    }
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
          Register
        </Button>
      </form>
    </Form>
  )
}
