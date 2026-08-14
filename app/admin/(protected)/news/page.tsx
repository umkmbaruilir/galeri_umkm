import { prisma } from "@/lib/prisma";

export default async function NewsPage() {
  try {
    const news = await prisma.news.findMany();

    return (
      <pre>
        {JSON.stringify(news, null, 2)}
      </pre>
    );
  } catch (error) {
    console.error(error);

    return (
      <div>
        ERROR:
        {String(error)}
      </div>
    );
  }
}