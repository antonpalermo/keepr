import { Inter } from "next/font/google"
import { getServerSession } from "next-auth"

import { cn } from "@/lib/utils"

import SessionProvider from "@/components/providers/session"
import QueryClientProvider from "@/components/providers/query-client"

import { options } from "@/app/api/auth/options"

import "./global.css"

export const metadata = {
  title: "Welcome to keepr",
  description: "Generated by create-nx-workspace"
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
})

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(options)

  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen")}>
        <SessionProvider session={session}>
          <QueryClientProvider>{children}</QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
