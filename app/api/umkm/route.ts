import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const data =
    await prisma.umkm.findMany({
      include: {
        galleries: true,
      },
    });

  return NextResponse.json(data);
}

export async function POST(
  request: Request
) {
  const body =
    await request.json();

const umkm =
  await prisma.umkm.create({
    data: {
      name: body.name,
      owner: body.owner,
      category: body.category,
      description:  body.description,
      address: body.address,
      whatsapp: body.whatsapp,
    },
  });

  return NextResponse.json(umkm);
}