import { z } from "zod"

export function toErrorMap(error: z.ZodError) {
  return error.errors.map(e => ({ field: e.path[0], message: e.message }))
}
