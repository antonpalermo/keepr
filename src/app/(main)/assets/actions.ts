"use server"

import connect from "@/lib/database"
import assets from "@/models/assets"

import { revalidatePath } from "next/cache"

export interface FormState {
  success: boolean
  message: string
  fields?: Record<string, string>
  issues?: string[]
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
