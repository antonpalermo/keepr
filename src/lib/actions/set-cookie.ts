"use server"

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"

export async function setCookie(
  name: string,
  data: string,
  options?: Partial<ResponseCookie>
) {
  const cookieStore = await cookies()
  cookieStore.set(name, data, { maxAge: 1000 * 60 * 60 * 24 * 365, ...options })
}
