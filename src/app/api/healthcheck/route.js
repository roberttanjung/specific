import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  await dbConnect();
  
  const connectionState = mongoose.connection.readyState;
  
  if (connectionState === 1) {
    return NextResponse.json({ status: "OK", message: "Database terhubung dengan baik." }, { status: 200 });
  } else {
    return NextResponse.json({ status: "ERROR", message: `Status koneksi: ${connectionState}` }, { status: 500 });
  }
}