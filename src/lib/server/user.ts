import { AuthUser } from "@/types";
import { getDb } from "@/lib/server/db";

export interface DbUser extends AuthUser {
  passwordHash?: string;
}

export const ensureUser = async (user: AuthUser) => {
  try {
    const db = await getDb();
    const collection = db.collection<AuthUser>("users");
    await collection.updateOne(
      { email: user.email },
      { $setOnInsert: user },
      { upsert: true }
    );
  } catch (error) {
    console.warn("Failed to persist user record:", error);
  }
};

export const findUserByEmail = async (email: string) => {
  const db = await getDb();
  const collection = db.collection<DbUser>("users");
  return collection.findOne({ email: email.toLowerCase() });
};
