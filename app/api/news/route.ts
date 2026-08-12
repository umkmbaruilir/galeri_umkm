import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(news);
  } catch {
    return NextResponse.json(
      { message: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const news = await prisma.news.create({
      data: {
        title: body.title,
        content: body.content,
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json(news);
  } catch {
    return NextResponse.json(
      { message: "Gagal membuat berita" },
      { status: 500 }
    );
  }
}