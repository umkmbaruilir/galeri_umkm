import Link from "next/link";

import { prisma } from "../../../../lib/prisma";

import DeleteNewsButton from "../../../../components/admin/DeleteNewsButton";

export const dynamic =
  "force-dynamic";

export default async function NewsPage() {
  const news =
    await prisma.news.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Berita KKN
          </h1>

          <p className="text-slate-500">
            Kelola dokumentasi dan
            berita kegiatan KKN
          </p>
        </div>

        <Link
          href="/admin/news/create"
          className="bg-black text-white px-5 py-3 rounded-lg"
        >
          Tambah Berita
        </Link>
      </div>

      {/* TABEL */}
      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">
                Foto
              </th>

              <th className="p-4 text-left">
                Judul
              </th>

              <th className="p-4 text-left">
                Tanggal
              </th>

              <th className="p-4 text-center">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {news.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center"
                >
                  Belum ada berita
                </td>
              </tr>
            ) : (
              news.map((item) => (
                <tr
                  key={item.id}
                  className="border-t"
                >
                  <td className="p-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                  </td>

                  <td className="p-4">
                    <div className="font-medium">
                      {item.title}
                    </div>
                  </td>

                  <td className="p-4">
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
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-4">
                      <Link
                        href={`/admin/news/${item.id}/edit`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <DeleteNewsButton
                        id={item.id}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}