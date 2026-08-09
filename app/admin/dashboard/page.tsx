import { prisma } from "../../../lib/prisma";

export default async function Dashboard() {
  const totalUmkm =
    await prisma.umkm.count();

  const totalGallery =
    await prisma.gallery.count();

  const latest =
    await prisma.umkm.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="border rounded p-6">
          <h2>Total UMKM</h2>

          <p className="text-4xl font-bold">
            {totalUmkm}
          </p>
        </div>

        <div className="border rounded p-6">
          <h2>Total Foto</h2>

          <p className="text-4xl font-bold">
            {totalGallery}
          </p>
        </div>
      </div>

      <div className="border rounded p-6">
        <h2 className="font-bold mb-4">
          UMKM Terbaru
        </h2>

        <ul className="space-y-2">
          {latest.map((item) => (
            <li key={item.id}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}