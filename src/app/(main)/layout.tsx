import * as React from "react"

export interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="container mx-auto px-5">
      <nav className="py-4">
        <h1>Keepr</h1>
      </nav>
      {children}
    </main>
  )
}
