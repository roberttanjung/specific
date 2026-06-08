import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

// GET /api/users/superintendents?q=...&division=...
// Returns active users in the same division who can be a superintendent (head/spv)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const q = searchParams.get("q")?.trim() ?? "";
    const division = searchParams.get("division")?.trim() ?? "";

    await connectDB();

    const filter: Record<string, unknown> = {
      status: 2,
      role: { $in: ["head", "spv", "superadmin"] },
    };

    if (division) {
      filter.division = division;
    }

    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ];
    }

    const users = await User.find(filter)
      .select("name email")
      .limit(20)
      .lean();

    return NextResponse.json({
      data: users.map((u) => ({ _id: u._id, name: u.name, email: u.email })),
    });
  } catch (error) {
    console.error("[GET /api/users/superintendents]", error);
    return NextResponse.json(
      { error: "Failed to fetch superintendents" },
      { status: 500 }
    );
  }
}
