import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const client = await pool.connect();
    await client.query("SET client_encoding = 'UTF8';");

    const query = `
      SELECT *
      FROM public.arduino
      ORDER BY id ASC
    `;

    const result = await client.query(query);
    client.release();

    return NextResponse.json(result.rows || []);
  } catch (error) {
    console.error("Database error: ", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
