import { z } from "zod"
import { organizationSchema } from "../zod-schema/organization"
import axios from "axios"

type Organization = z.infer<typeof organizationSchema>

export async function createOrganization(data: Organization) {
  try {
    const request = await axios.post("/api/organizations", data)
    return request.data
  } catch (error) {
    throw new Error(`unable to create new organization`, { cause: error })
  }
}
