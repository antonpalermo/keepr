import { AuthOptions } from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"

import { db } from "@/db"

import GoogleProvider from "next-auth/providers/google"
import {
  users,
  accounts,
  sessions,
  authenticators,
  verificationTokens
} from "@/db/schema"

export const options: AuthOptions = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    authenticatorsTable: authenticators,
    verificationTokensTable: verificationTokens
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  session: {
    strategy: "jwt"
  }
}
