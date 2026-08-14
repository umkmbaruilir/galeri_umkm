import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  // Tambah view terlebih dahulu
  await prisma.umkm.update({
    where: {
      id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  // Ambil data terbaru setelah view bertambah
  const umkm = await prisma.umkm.findUnique({
    where: {
      id,
    },
    include: {
      galleries: true,
    },
  });

  if (!umkm) {
    return notFound();
  }

  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      {/* COVER */}
      <img
        src={
          umkm.coverImage ??
          "https://placehold.co/1200x500?text=UMKM"
        }
        alt={umkm.name}
        className="w-full h-[400px] object-cover rounded-xl"
      />

      {/* INFORMASI */}
      <div className="mt-8">
        <h1 className="text-4xl font-bold">
          {umkm.name}
        </h1>

        {umkm.category && (
          <span className="inline-block mt-3 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
            {umkm.category}
          </span>
        )}

        <p className="mt-6 text-slate-700 leading-relaxed">
          {umkm.description}
        </p>

        <div className="mt-8 space-y-3 border rounded-xl p-6">
          <p>
            <strong>Pemilik:</strong>{" "}
            {umkm.owner}
          </p>

          <p>
            <strong>Alamat:</strong>{" "}
            {umkm.address}
          </p>

          <p>
            <strong>WhatsApp:</strong>{" "}
            {umkm.whatsapp}
          </p>

          <p>
            <strong>Dilihat:</strong>{" "}
            {umkm.views} kali
          </p>
        </div>

        <a
          href={`https://wa.me/${umkm.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
        >
          Hubungi UMKM
        </a>
      </div>

      {/* GALERI */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold mb-6">
          Galeri Foto
        </h2>

        {umkm.galleries.length === 0 ? (
          <div className="border rounded-xl p-8 text-center text-slate-500">
            Belum ada foto galeri.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {umkm.galleries.map(
              (gallery) => (
                <div
                  key={gallery.id}
                  className="overflow-hidden rounded-xl border shadow-sm"
                >
                  <img
                    src={gallery.imageUrl}
                    alt={umkm.name}
                    className="w-full h-72 object-cover hover:scale-105 transition duration-300"
                  />
                </div>
              )
            )}
          </div>
        )}
      </section>
    </main>
  );
}