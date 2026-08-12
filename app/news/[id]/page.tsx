import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const news = await prisma.news.findUnique({
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
        className="w-full h-[450px] object-cover rounded-xl mb-8"
      />

      <div className="mb-3 text-sm text-slate-500">
        {new Date(news.createdAt).toLocaleDateString(
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

      <div className="text-slate-700 leading-relaxed whitespace-pre-line">
        {news.content}
      </div>
    </main>
  );
}