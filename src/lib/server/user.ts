import { AuthUser } from "@/types";
import { getDb } from "@/lib/server/db";

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
