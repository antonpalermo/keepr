import { z } from "zod"

export const assetSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Asset name must be at least 3 characters long" })
    .max(220, { message: "Asset name exceed the required limit" })
})
