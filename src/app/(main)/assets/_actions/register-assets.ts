"use server"

import { revalidatePath } from "next/cache"

import Assets from "@/models/assets"
import connect from "@/lib/database"

import assetSchema from "../form-schema"

export interface FormState {
  message: string
  fields?: Record<string, string>
}

export async function onRegisterAsset(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = Object.fromEntries(formData)

  try {
    await connect()
    await Assets.create({ ...data })

    revalidatePath("/assets")

    return { message: "success" }
  } catch (error) {
    console.log("registerAsset action error: ", error)
    return { message: "error" }
  }
}
