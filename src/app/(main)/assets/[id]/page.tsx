"use client"

import { useParams } from "next/navigation"

export default function AssetPage() {
  const { id } = useParams()

  return <h1>Asset {id}</h1>
}
