import Navbar from "@/components/navbar"
import * as React from "react"

export interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-5 my-5">{children}</main>
    </>
  )
}
