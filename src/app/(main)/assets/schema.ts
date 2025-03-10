import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(1)
})

export type AssetFormSchema = z.infer<typeof formSchema>

export default formSchema
