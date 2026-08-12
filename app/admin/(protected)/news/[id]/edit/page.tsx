import { prisma } from "../../../../../../lib/prisma";
import EditNewsForm from "../../../../../../components/forms/EditNewsForm";

export const dynamic =
  "force-dynamic";

export default async function EditNewsPage({
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
    return (
      <div className="p-10">
        Berita tidak ditemukan
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Berita
        </h1>

        <p className="text-slate-500">
          Perbarui berita kegiatan KKN
        </p>
      </div>

      <EditNewsForm news={news} />
    </div>
  );
}