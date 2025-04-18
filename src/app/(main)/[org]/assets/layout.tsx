import * as React from "react"

export default function AssetLayout({
  modal,
  children
}: {
  modal: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
      {modal}
    </div>
  )
}
