import { z } from "zod"

const assetSchema = z.object({
  name: z.string().min(1)
})

/**
 * extended asset schema type
 */
export type AssetSchema = z.infer<typeof assetSchema> & {
  id: string
  dateCreated: Date
  dateUpdated: Date
}

export default assetSchema
