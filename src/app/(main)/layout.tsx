import * as React from "react"

export interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <h1>Dashboard Layout</h1>
      {children}
    </div>
  )
}
