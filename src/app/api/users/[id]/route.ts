import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { isValidObjectId } from "mongoose";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/users/[id] — get single user
export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ _id: id, status: { $ne: 0 } })
      .populate("superintendent", "name email")
      .populate("directReports", "name email")
      .lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: user });
  } catch (error) {
    console.error("[GET /api/users/[id]]", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id] — full update
export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    await connectDB();

    const body = await request.json();
    const { name, email, division, department, superintendent, directReports } = body;

    // Check email uniqueness (excluding current user)
    if (email) {
      const conflict = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: id },
      });
      if (conflict) {
        return NextResponse.json(
          { error: "A user with this email already exists" },
          { status: 409 }
        );
      }
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        division,
        department,
        superintendent: superintendent || null,
        directReports: directReports ?? [],
      },
      { new: true, runValidators: true }
    )
      .populate("superintendent", "name email")
      .populate("directReports", "name email");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: user });
  } catch (error) {
    console.error("[PUT /api/users/[id]]", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// PATCH /api/users/[id] — partial update (used for soft delete: status -> 0)
export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    await connectDB();

    const body = await request.json();

    // Only allow patching safe fields (status, role)
    const allowedFields: Record<string, unknown> = {};
    if (body.status !== undefined) allowedFields.status = body.status;
    if (body.role !== undefined) allowedFields.role = body.role;

    const user = await User.findByIdAndUpdate(
      id,
      { $set: allowedFields },
      { new: true, runValidators: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: user });
  } catch (error) {
    console.error("[PATCH /api/users/[id]]", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
