import Link from "next/link";
import { prisma } from "../lib/prisma";
import NewsCarousel from "../components/public/NewsCarousel";

import {
  Store,
  Image as ImageIcon,
  ArrowRight,
  BadgeInfo,
} from "lucide-react";

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
    <main className="bg-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5e5ce6] via-[#6c63ff] to-[#32c5ff]" />

        <div className="absolute inset-0 bg-black/10" />

        <div className="relative max-w-7xl mx-auto px-6 py-28 text-white">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6">
              <BadgeInfo className="w-4 h-4" />
              <span className="text-sm">
                Sistem Informasi UMKM
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Galeri UMKM
              <br />
              Kelurahan Baru Ilir
            </h1>

            <p className="mt-6 text-lg text-white/90 max-w-2xl leading-relaxed">
              Platform digital untuk
              memperkenalkan produk,
              usaha, dan kegiatan UMKM
              Kelurahan Baru Ilir kepada
              masyarakat secara lebih luas.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/umkm"
                className="bg-white text-[#5e5ce6] px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition"
              >
                Jelajahi UMKM
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="#tentang"
                className="border border-white/40 px-6 py-3 rounded-xl backdrop-blur-md hover:bg-white/10 transition"
              >
                Tentang Sistem
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTIK */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#5e5ce6] text-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-5xl font-bold">
                  {totalUmkm}
                </h2>

                <p className="mt-2 text-white/80">
                  UMKM Terdaftar
                </p>
              </div>

              <Store className="w-16 h-16 opacity-30" />
            </div>
          </div>

          <div className="bg-[#32c5ff] text-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-5xl font-bold">
                  {totalGallery}
                </h2>

                <p className="mt-2 text-white/80">
                  Foto Produk
                </p>
              </div>

              <ImageIcon className="w-16 h-16 opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* BERITA */}
      <section className="mt-20">
        <NewsCarousel news={news} />
      </section>

      {/* TENTANG */}
      <section
        id="tentang"
        className="max-w-7xl mx-auto px-6 py-20"
      >
        <div className="bg-white rounded-3xl p-10 shadow-sm border">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">
            Tentang Sistem
          </h2>

          <p className="text-slate-600 leading-8 text-lg">
            Sistem Galeri UMKM
            Kelurahan Baru Ilir dibuat
            sebagai sarana promosi
            digital untuk membantu
            pelaku UMKM memperkenalkan
            produk dan usahanya kepada
            masyarakat secara lebih
            luas. Platform ini juga
            menjadi media dokumentasi
            kegiatan serta publikasi
            berita yang berkaitan
            dengan pengembangan UMKM
            di Kelurahan Baru Ilir.
          </p>
        </div>
      </section>
    </main>
  );
}