"use server"

import connect from "@/lib/database"
import assets from "@/models/assets"

import schema from "./schema"

import { revalidatePath } from "next/cache"

export interface FormState {
  success: boolean
  message: string
  fields?: Record<string, string>
  issues?: string[]
}

export async function registerAsset(
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
    await assets.create({ ...data })

    revalidatePath("/assets")

    return { success: true, message: "Device successfully registered" }
  } catch (error) {
    console.log("registerAsset action error: ", error)
    return { success: false, message: "error" }
  }
}

export async function updateAsset(id: string, formData: FormData) {
  try {
    const data = Object.fromEntries(formData)

    if (!id) {
      return { success: false, message: "id is required" }
    }

    await connect()
    await assets.findByIdAndUpdate(id, { ...data })

    revalidatePath("/assets")
    return { success: true, message: "asset successfully updated" }
  } catch (e) {
    return {
      success: false,
      message: "unable to remove asset"
    }
  }
}

export async function removeAsset(id: string) {
  try {
    if (!id) {
      return { succsess: false, message: "id is required" }
    }

    await connect()
    await assets.findByIdAndDelete(id)

    revalidatePath("/assets")

    return { success: true, message: "asset successfully removed" }
  } catch (error) {
    return {
      success: false,
      message: "unable to remove asset"
    }
  }
}
