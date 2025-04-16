import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const client = await pool.connect();
    await client.query("SET client_encoding = 'UTF8';");

    // First query to get all products
    const productsQuery = `
      SELECT 
      id,
      name,
      rating,
      image_filename,
      category,
      quantity,
      price,
      description
      FROM public.solardb
      ORDER BY id ASC
    `;

    // Second query to get category counts
    const categoryCountQuery = `
      SELECT 
        category,
        COUNT(*) as count
      FROM public.solardb
      GROUP BY category
    `;

    const [productsResult, categoryCountResult] = await Promise.all([
      client.query(productsQuery),
      client.query(categoryCountQuery)
    ]);

    client.release();

    return NextResponse.json({
      products: productsResult.rows || [],
      categoryCounts: categoryCountResult.rows || []
    });
  } catch (error) {
    console.error("Database error: ", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
