import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { PoolClient } from "pg";

export async function GET() {
  let client;
  try {
    // Set a timeout for the database connection
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Database connection timeout')), 5000);
    });

    // Race between the database connection and the timeout
    client = await Promise.race([
      pool.connect(),
      timeoutPromise
    ]) as PoolClient;

    await client.query("SET client_encoding = 'UTF8';");
    await client.query("SET statement_timeout = '5000';"); // 5 second query timeout

    const query = `
      SELECT
      id,
      english_name,
      turkish_name,
      image_filename,
      category,
      quantity,
      price,
      description
      FROM public.main
      ORDER BY id ASC
    `;

    // Set cache headers
    const headers = new Headers();
    headers.set('Cache-Control', 'public, max-age=300, s-maxage=600, stale-while-revalidate=86400'); // Cache for 5 minutes, CDN for 10 minutes, stale for 24 hours
    headers.set('Surrogate-Control', 'max-age=600'); // For CDNs
    headers.set('Vary', 'Accept-Encoding, Accept'); // Vary header for proper caching

    const result = await client.query(query);

    // Add a small delay to ensure we're not hitting rate limits
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json(result.rows || [], { headers });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Database error: ", error);

    // Specific error handling
    if (err.message && err.message.includes('timeout')) {
      return NextResponse.json(
        { error: "Database request timed out. Please try again." },
        { status: 504 } // Gateway Timeout
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch products", details: err.message || 'Unknown error' },
      { status: 500 }
    );
  } finally {
    // Make sure to release the client back to the pool
    if (client) {
      try {
        client.release(true); // Force release in case of errors
      } catch (e) {
        console.error("Error releasing client", e);
      }
    }
  }
}
