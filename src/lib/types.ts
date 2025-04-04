export type Asset = {
  id: string
  name: string
  quantity: number
  assignee: string[]
  dateCreated: Date
  dateUpdated: Date
}

export type Role = "admin" | "user"
