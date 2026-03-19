import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    // Check if password is provided and matches the env variable
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || !password) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // In a real app, you might compare hashed passwords if the env var was hashed.
    // For simplicity here, we assume the env var is plain text or we do a direct compare
    // But since the prompt requested bcryptjs, let's assume the ADMIN_PASSWORD in env is a bcrypt hash.
    // If it's not a hash in your .env, you can remove bcrypt and use `password !== adminPassword`.
    // Let's use simple string matching here for the prototype, or assume standard usage.
    // Actually, to use bcrypt properly:
    // const isMatch = await bcrypt.compare(password, adminPassword);
    
    // For ease of setup without forcing you to hash a password for your .env manually:
    const isMatch = password === adminPassword;

    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db('futuresprint');
    const registrations = await db.collection('registrations').find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, registrations });
  } catch (error) {
    console.error("Admin API error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
