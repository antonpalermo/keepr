// import { Asset } from "@/models/assets"

async function get(id?: string) {
  let baseEndpoint = `/api/assets`

  if (id) {
    baseEndpoint = `/api/assets/${id}`
  }

  try {
    const request = await fetch(baseEndpoint)

    if (!request.ok) {
      const response = await request.json()
      throw new Error(response)
    }

    return await request.json()
  } catch (error) {
    throw new Error("error: " + error)
  }
}

// async function create(asset: Asset) {}

// async function update(id: string, asset: Asset) {}

// async function remove(id: string) {}

const fn = {
  get
  // create,
  // update,
  // remove
}

export default fn
