import { config } from "dotenv"
import { Config, defineConfig } from "drizzle-kit"

config({ path: ".env" })

const drizzleConfig: Config = {
  dialect: "postgresql",
  out: "./migrations",
  schema: "./src/db/schemas/*",
  dbCredentials: {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    url: process.env.DATABASE_URL!
  }
}

export default defineConfig(drizzleConfig)
