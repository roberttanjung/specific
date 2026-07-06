import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";
import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const REQUIRED_KEYS = ["email", "name", "password"];

const parseArgs = (argv) => {
  const parsed = {};

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith("--")) {
      parsed[key] = "true";
      continue;
    }

    parsed[key] = value;
    i += 1;
  }

  return parsed;
};

const args = parseArgs(process.argv.slice(2));

const mongoUri = process.env.NEXT_PUBLIC_MONGODB_URI;
const email = (args.email ?? process.env.PRIMARY_USER_EMAIL ?? "").trim().toLowerCase();
const name = (args.name ?? process.env.PRIMARY_USER_NAME ?? "").trim();
const password = (args.password ?? process.env.PRIMARY_USER_PASSWORD ?? "").trim();
const role = (args.role ?? process.env.PRIMARY_USER_ROLE ?? "superadmin").trim().toLowerCase();

const missing = REQUIRED_KEYS.filter((key) => {
  if (key === "email") return !email;
  if (key === "name") return !name;
  if (key === "password") return !password;
  return false;
});

if (!mongoUri) {
  console.error("Missing NEXT_PUBLIC_MONGODB_URI environment variable.");
  process.exit(1);
}

if (missing.length > 0) {
  console.error(
    [
      "Missing required values for seeding primary user.",
      "Provide values via env vars or CLI args:",
      "- PRIMARY_USER_EMAIL / --email",
      "- PRIMARY_USER_NAME / --name",
      "- PRIMARY_USER_PASSWORD / --password",
      "Optional: PRIMARY_USER_ROLE / --role (default: superadmin)",
    ].join("\n")
  );
  process.exit(1);
}

const run = async () => {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();

    const db = client.db();
    const users = db.collection("users");

    await users.createIndex({ email: 1 }, { unique: true });

    const now = new Date();
    const passwordHash = await bcrypt.hash(password, 12);

    const result = await users.updateOne(
      { email },
      {
        $set: {
          name,
          role,
          passwordHash,
          status: 2,
          isPrimary: true,
          updatedAt: now,
        },
        $setOnInsert: {
          id: crypto.randomUUID(),
          email,
          createdAt: now,
        },
      },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      console.log(`Primary account created for ${email} with role ${role}.`);
    } else if (result.modifiedCount > 0) {
      console.log(`Primary account updated for ${email} with role ${role}.`);
    } else {
      console.log(`Primary account already up to date for ${email}.`);
    }
  } finally {
    await client.close();
  }
};

run().catch((error) => {
  console.error("Failed to seed primary user:", error instanceof Error ? error.message : error);
  process.exit(1);
});
