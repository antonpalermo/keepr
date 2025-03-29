import axios from "axios"
import { Asset } from "@/models/assets"

type AssetSchema = Omit<Asset, "id" | "dateCreated" | "dateUpdated">

export async function getAsset(id: string) {
  try {
    const request = await axios.get(`/api/assets/${id}`)
    return request.data
  } catch (error) {
    throw new Error(`unable to get asset ${id}`, { cause: error })
  }
}

export async function getAssets() {
  try {
    const request = await axios.get(`/api/assets`)
    return request.data
  } catch (error) {
    throw new Error(`unable to get all available assets`, { cause: error })
  }
}

export async function createAsset(asset: AssetSchema) {
  try {
    const request = await axios.post("/api/assets", asset)
    return request.data
  } catch (error) {
    throw new Error(`unable to create new asset`, { cause: error })
  }
}

export async function updateAsset(id: string, asset: AssetSchema) {
  try {
    const request = await axios.patch(`/api/assets/${id}`, asset)
    return request.data
  } catch (error) {
    throw new Error(`unable to update asset ${id}`, { cause: error })
  }
}
