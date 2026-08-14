import { prisma } from "../../lib/prisma";
import UmkmList from "../../components/public/UmkmList";

export const dynamic = "force-dynamic";

export default async function PublicUmkmPage() {
  const umkms = await prisma.umkm.findMany({
    include: {
      galleries: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="max-w-7xl mx-auto py-10 px-4">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Galeri UMKM Kelurahan Baru Ilir
        </h1>

        <p className="text-slate-600 mt-2">
          Temukan berbagai UMKM unggulan yang ada di
          Kelurahan Baru Ilir, Kecamatan Balikpapan Barat.
        </p>
      </div>

      <UmkmList umkms={umkms} />
    </main>
  );
}