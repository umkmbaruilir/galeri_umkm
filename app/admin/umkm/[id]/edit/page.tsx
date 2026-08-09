import { prisma } from "../../../../../lib/prisma";
import EditUmkmForm from "../../../../../components/forms/EditUmkmForm";

export default async function EditPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const umkm =
    await prisma.umkm.findUnique({
      where: {
        id,
      },
    });

  if (!umkm) {
    return <div>Data tidak ditemukan</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">
        Edit UMKM
      </h1>

      <EditUmkmForm umkm={umkm} />
    </>
  );
}