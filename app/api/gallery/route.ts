import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  const body =
    await request.json();

  const gallery =
    await prisma.gallery.create({
      data: {
        imageUrl:
          body.imageUrl,

        umkmId:
          body.umkmId,
      },
    });

  return NextResponse.json(
    gallery
  );
}