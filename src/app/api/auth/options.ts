import { type AuthOptions, type DefaultSession } from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"

import GoogleProvider from "next-auth/providers/google"

import { db } from "@/db"
import { user } from "@/db/schemas/user"
import { account } from "@/db/schemas/account"
import { session } from "@/db/schemas/session"
import { authenticator } from "@/db/schemas/authenticator"
import { verificationToken } from "@/db/schemas/verification-token"

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
    usersTable: user,
    accountsTable: account,
    sessionsTable: session,
    authenticatorsTable: authenticator,
    verificationTokensTable: verificationToken
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
