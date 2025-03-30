"use client"

import {
  SessionProvider as NextSessionProvider,
  SessionProviderProps as NextSessionProviderProps
} from "next-auth/react"

export default function SessionProvider({
  ...props
}: NextSessionProviderProps) {
  return <NextSessionProvider {...props} />
}
