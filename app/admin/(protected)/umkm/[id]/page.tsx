export const dynamic = "force-dynamic";

import { prisma } from "../../../../../lib/prisma";

import UploadForm from "../../../../../components/forms/UploadForm";
import CoverUploadForm from "../../../../../components/forms/CoverUploadForm";

import DeleteGalleryButton from "../../../../../components/admin/DeleteGalleryButton";

export default async function DetailAdminPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const umkm = await prisma.umkm.findUnique({
    where: {
      id,
    },
    include: {
      galleries: true,
    },
  });

  if (!umkm) {
    return (
      <div className="max-w-5xl mx-auto py-20 px-4">
        <h1 className="text-3xl font-bold">
          UMKM tidak ditemukan
        </h1>
      </div>
    );
  }
  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          {umkm.name}
        </h1>

        <p className="text-slate-600">
          Pemilik: {umkm.owner}
        </p>
      </div>

      {/* COVER */}
      <section className="border rounded-lg p-6">
        <h2 className="font-bold mb-4">
          Foto Cover
        </h2>

        {umkm.coverImage ? (
          <img
            src={umkm.coverImage}
            alt={umkm.name}
            className="w-full max-w-md rounded-lg mb-4"
          />
        ) : (
          <p className="mb-4">
            Belum ada cover.
          </p>
        )}

        <CoverUploadForm
          umkmId={umkm.id}
        />
      </section>

      {/* GALERI */}
      <section className="border rounded-lg p-6">
        <h2 className="font-bold mb-4">
          Upload Foto Galeri
        </h2>

        <UploadForm umkmId={umkm.id} />
      </section>

      {/* FOTO */}
      <section>
        <h2 className="font-bold text-xl mb-4">
          Foto Galeri
        </h2>

        {umkm.galleries.length === 0 ? (
          <p>Belum ada foto galeri.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
  {umkm.galleries.map(
    (gallery: any) => (
      <div
        key={gallery.id}
        className="border rounded-lg overflow-hidden"
      >
        <img
          src={gallery.imageUrl}
          alt=""
          className="w-full h-56 object-cover"
        />

        <div className="p-3">
          <DeleteGalleryButton
            id={gallery.id}
          />
        </div>
      </div>
    )
  )}
</div>
        )}
      </section>
    </main>
  );
} 