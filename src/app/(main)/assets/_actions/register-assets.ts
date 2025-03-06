"use server"

import { revalidatePath } from "next/cache"

import Assets from "@/models/assets"
import connect from "@/lib/database"

import schema from "../form-schema"

export interface FormState {
  success: boolean
  message: string
  fields?: Record<string, string>
  issues?: string[]
}

export async function onRegisterAsset(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = Object.fromEntries(formData)

  try {
    const parsed = schema.safeParse(data)

    if (!parsed.success) {
      const fields: Record<string, string> = {}

      for (const key of Object.keys(formData)) {
        fields[key] = data[key].toString()
      }

      return {
        success: false,
        fields,
        message: "Error in asset registration.",
        issues: parsed.error.issues.map(issue => issue.message)
      }
    }

    await connect()
    await Assets.create({ ...data })

    revalidatePath("/assets")

    return { success: true, message: "Device successfully registered" }
  } catch (error) {
    console.log("registerAsset action error: ", error)
    return { success: false, message: "error" }
  }
}
