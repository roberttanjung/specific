import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

// GET /api/users — list active users (status != 0)
export async function GET() {
  try {
    await connectDB();

    const users = await User.find({ status: { $ne: 0 } })
      .select("name email division department superintendent directReports status role")
      .populate("superintendent", "name")
      .populate("directReports", "name")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ data: users });
  } catch (error) {
    console.error("[GET /api/users]", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST /api/users — create a new user
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, division, department, superintendent, directReports, status, role } = body;

    const existing = await User.findOne({ email: email?.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 }
      );
    }

    const user = await User.create({
      name,
      email,
      division,
      department,
      superintendent: superintendent || null,
      directReports: directReports ?? [],
      status: status ?? 2,
      role: role ?? "member",
    });

    return NextResponse.json({ data: user }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/users]", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
