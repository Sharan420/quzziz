import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const resId = searchParams.get("resId");

    if (!resId) {
      return NextResponse.json(
        { error: "Result ID is required" },
        { status: 400 }
      );
    }

    // Fetch all results for the quiz
    const results = await prisma.results.findUnique({
      where: { id: resId as string },
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
