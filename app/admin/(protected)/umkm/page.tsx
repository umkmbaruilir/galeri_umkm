export const dynamic = "force-dynamic";

import Link from "next/link";

import { prisma } from "../../../../lib/prisma";

import DeleteButton from "../../../../components/admin/DeleteButton";

export default async function UmkmPage() {
  const umkms = await prisma.umkm.findMany({
    include: {
      galleries: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalUmkm =
    await prisma.umkm.count();

  const totalGallery =
    await prisma.gallery.count();

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Data UMKM
          </h1>

          <p className="text-slate-500">
            Kelola seluruh UMKM
            Kelurahan Baru Ilir
          </p>
        </div>

        <Link
          href="/admin/umkm/create"
          className="bg-black text-white px-5 py-3 rounded-lg"
        >
          Tambah UMKM
        </Link>
      </div>

      {/* STATISTIK */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border rounded-xl p-6">
          <p className="text-slate-500">
            Total UMKM
          </p>

          <h2 className="text-4xl font-bold">
            {totalUmkm}
          </h2>
        </div>

        <div className="border rounded-xl p-6">
          <p className="text-slate-500">
            Total Foto
          </p>

          <h2 className="text-4xl font-bold">
            {totalGallery}
          </h2>
        </div>
      </div>

      {/* TABEL */}
      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">
                Cover
              </th>

              <th className="p-4 text-left">
                Nama UMKM
              </th>

              <th className="p-4 text-left">
                Kategori
              </th>

              <th className="p-4 text-left">
                Pemilik
              </th>

              <th className="p-4 text-left">
                WhatsApp
              </th>

              <th className="p-4 text-center">
                Foto
              </th>

              <th className="p-4 text-left">
                Dibuat
              </th>

              <th className="p-4 text-center">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
  {umkms.length === 0 ? (
    <tr>
      <td
        colSpan={8}
        className="p-8 text-center"
      >
        Belum ada data UMKM
      </td>
    </tr>
  ) : (
    umkms.map((item: any) => (
      <tr
        key={item.id}
        className="border-t"
      >
        <td className="p-4">
          <img
            src={
              item.coverImage ??
              "https://placehold.co/100x100?text=UMKM"
            }
            alt={item.name}
            className="w-16 h-16 rounded object-cover"
          />
        </td>

        <td className="p-4 font-medium">
          {item.name}
        </td>

        <td className="p-4">
          <span className="bg-slate-100 px-2 py-1 rounded text-sm">
            {item.category ??
              "Belum Ada"}
          </span>
        </td>

        <td className="p-4">
          {item.owner}
        </td>

        <td className="p-4">
          {item.whatsapp}
        </td>

        <td className="p-4 text-center">
          {item.galleries.length}
        </td>

        <td className="p-4">
          {new Date(
            item.createdAt
          ).toLocaleDateString(
            "id-ID"
          )}
        </td>

        <td className="p-4">
          <div className="flex gap-3 justify-center">
            <Link
              href={`/admin/umkm/${item.id}`}
              className="text-green-600 hover:underline"
            >
              Foto
            </Link>

            <Link
              href={`/admin/umkm/${item.id}/edit`}
              className="text-blue-600 hover:underline"
            >
              Edit
            </Link>

            <DeleteButton
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