"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface News {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
}

export default function NewsCarousel({
  news,
}: {
  news: News[];
}) {
const [emblaRef, emblaApi] =
  useEmblaCarousel(
    {
      loop: true,
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
      }),
    ]
  );

  if (news.length === 0) {
    return null;
  }

  <div className="flex justify-center gap-3 mt-6">
  <button
    onClick={() => emblaApi?.scrollPrev()}
    className="px-4 py-2 border rounded"
  >
    ←
  </button>

  <button
    onClick={() => emblaApi?.scrollNext()}
    className="px-4 py-2 border rounded"
  >
    →
  </button>
</div>

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Berita & Dokumentasi KKN
          </h2>

          <p className="text-slate-500 mt-2">
            Dokumentasi kegiatan KKN
            Kelurahan Baru Ilir
          </p>
        </div>

        <div
          className="overflow-hidden"
          ref={emblaRef}
        >
          <div className="flex">
            {news.map((item) => (
              <div
                key={item.id}
                className="min-w-full"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-[400px] object-cover rounded-xl"
                  />

                  <div>
                    <p className="text-sm text-slate-500 mb-2">
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>

                    <h3 className="text-3xl font-bold mb-4">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 mb-6 line-clamp-4">
                      {item.content}
                    </p>

                    <Link
                      href={`/news/${item.id}`}
                      className="inline-block bg-black text-white px-5 py-3 rounded-lg"
                    >
                      Baca Selengkapnya
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}