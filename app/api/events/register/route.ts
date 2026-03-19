import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('futuresprint');
    
    // Insert registration data
    const result = await db.collection('registrations').insertOne({
      ...data,
      createdAt: new Date()
    });

    if (result.acknowledged) {
      return NextResponse.json({ success: true, message: "Registration successful" });
    } else {
      return NextResponse.json({ success: false, message: "Failed to register" }, { status: 500 });
    }
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}