"use server"

import connect from "@/lib/database"
import assets from "@/models/assets"

import { Schema } from "mongoose"
import { revalidatePath } from "next/cache"

export interface FormState {
  success: boolean
  message: string
  fields?: Record<string, string>
  issues?: string[]
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
