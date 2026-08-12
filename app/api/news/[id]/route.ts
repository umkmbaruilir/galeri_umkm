import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();

  const news = await prisma.news.update({
    where: {
      id,
    },
    data: {
      title: body.title,
      content: body.content,
      imageUrl: body.imageUrl,
    },
  });

  return NextResponse.json(news);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.news.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}