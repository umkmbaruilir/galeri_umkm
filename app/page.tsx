import Link from "next/link";

import { prisma } from "../lib/prisma";
import NewsCarousel from "../components/public/NewsCarousel";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const totalUmkm =
    await prisma.umkm.count();

  const totalGallery =
    await prisma.gallery.count();

  const news =
    await prisma.news.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <main>
      {/* HERO */}
      <section className="bg-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <h1 className="text-5xl font-bold mb-6">
            Galeri UMKM
            <br />
            Kelurahan Baru Ilir
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl">
            Platform digital untuk
            memperkenalkan UMKM
            Kelurahan Baru Ilir kepada
            masyarakat luas.
          </p>

          <Link
            href="/umkm"
            className="inline-block mt-8 bg-black text-white px-6 py-3 rounded-lg"
          >
            Jelajahi UMKM
          </Link>
        </div>
      </section>

      {/* STATISTIK */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-xl p-8">
            <h2 className="text-5xl font-bold">
              {totalUmkm}
            </h2>

            <p className="text-slate-500 mt-2">
              UMKM Terdaftar
            </p>
          </div>

          <div className="border rounded-xl p-8">
            <h2 className="text-5xl font-bold">
              {totalGallery}
            </h2>

            <p className="text-slate-500 mt-2">
              Foto Produk
            </p>
          </div>
        </div>
      </section>

      {/* BERITA KKN */}
      <NewsCarousel news={news} />

      {/* TENTANG */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold mb-5">
          Tentang Sistem
        </h2>

        <p className="text-slate-600 leading-relaxed">
          Sistem Galeri UMKM
          Kelurahan Baru Ilir dibuat
          sebagai sarana promosi
          digital untuk memperkenalkan
          produk dan usaha masyarakat
          kepada publik secara lebih
          luas.
        </p>
      </section>
    </main>
  );
}