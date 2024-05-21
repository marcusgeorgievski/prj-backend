import postgres from "postgres"

const db = postgres({
  host: "ep-soft-heart-a5ddfij6.us-east-2.aws.neon.tech",
  database: "neondb",
  user: "neondb_owner",
  password: "ucMQx63oSziB",
})

export default db
