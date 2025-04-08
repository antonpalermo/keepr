import { type AuthOptions, type DefaultSession } from "next-auth"
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

declare module "next-auth" {
  interface User {
    role?: string
  }

  interface Session {
    user: {
      role?: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string
    role?: string
  }
}

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
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile, tokens) {
        return {
          id: profile.sub,
          name: profile.name,
          image: profile.picture,
          email: profile.email,
          role: profile.role ?? "user"
        }
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    session({ session, token }) {
      session.user.role = token.role
      return session
    }
  },
  session: {
    strategy: "jwt"
  }
}
