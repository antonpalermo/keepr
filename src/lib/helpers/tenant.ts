import axios from "axios"

import { TenantInsertDTO } from "@/db/schemas/tenant"

type Tenant = Pick<TenantInsertDTO, "name">

export async function createTenant(data: Tenant) {
  try {
    const request = await axios.post("/api/tenants", data)
    return request.data
  } catch (error) {
    throw new Error(`unable to create new organization`, { cause: error })
  }
}
