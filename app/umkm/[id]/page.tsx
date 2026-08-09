import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";

export default async function DetailPage({
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
    return notFound();
  }

  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      <img
        src={
          umkm.coverImage ??
          "https://placehold.co/1200x500?text=UMKM"
        }
        alt={umkm.name}
        className="w-full h-[400px] object-cover rounded-lg"
      />

      <div className="mt-8">
        <h1 className="text-4xl font-bold">
          {umkm.name}
        </h1>

        <p className="mt-4 text-slate-700">
          {umkm.description}
        </p>

        <div className="mt-6 space-y-2">
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
        </div>

        <a
          href={`https://wa.me/${umkm.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 bg-green-600 text-white px-5 py-3 rounded"
        >
          Hubungi UMKM
        </a>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">
          Galeri Foto
        </h2>

        {umkm.galleries.length === 0 ? (
          <p>
            Belum ada foto galeri.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
  {umkm.galleries.map(
    (gallery: any) => (
      <div
        key={gallery.id}
        className="overflow-hidden rounded-xl border"
      >
        <img
          src={gallery.imageUrl}
          alt={umkm.name}
          className="w-full h-72 object-cover"
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