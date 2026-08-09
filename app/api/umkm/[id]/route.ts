import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const umkm = await prisma.umkm.findUnique({
    where: { id },
    include: {
      galleries: true,
    },
  });

  if (!umkm) {
    return NextResponse.json(
      { message: "UMKM tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json(umkm);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();

  const updated = await prisma.umkm.update({
    where: { id },
data: {
  name: body.name,
  owner: body.owner,
  category: body.category,
  description: body.description,
  address: body.address,
  whatsapp: body.whatsapp,
},
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.umkm.delete({
    where: { id },
  });

  return NextResponse.json({
    success: true,
  });
}