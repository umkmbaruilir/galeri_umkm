import { prisma } from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await params;

  const body =
    await request.json();

  const updated =
    await prisma.umkm.update({
      where: {
        id,
      },
      data: {
        coverImage:
          body.coverImage,
      },
    });

  return NextResponse.json(
    updated
  );
}