import { notFound } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";

export const dynamic =
  "force-dynamic";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const news =
    await prisma.news.findUnique({
      where: {
        id,
      },
    });

  if (!news) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <img
        src={news.imageUrl}
        alt={news.title}
        className="w-full h-[500px] object-cover rounded-xl mb-8"
      />

      <div className="text-sm text-slate-500 mb-3">
        {new Date(
          news.createdAt
        ).toLocaleDateString(
          "id-ID",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        )}
      </div>

      <h1 className="text-4xl font-bold mb-6">
        {news.title}
      </h1>

      <article className="text-slate-700 leading-relaxed whitespace-pre-line">
        {news.content}
      </article>
    </main>
  );
}