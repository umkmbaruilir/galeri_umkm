export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "../../../../lib/prisma";
import StatsCard from "../../../../components/admin/StatsCard";
import DashboardChart from "../../../../components/admin/DashboardChart";

import {
  Store,
  Image as ImageIcon,
  Newspaper,
  Users,
  BarChart3,
  List,
  Trophy,
  Eye,
  Activity,
} from "lucide-react";

export default async function Dashboard() {
  let totalUmkm = 0;
  let totalGallery = 0;
  let totalBerita = 0;
  let latestUmkm: any[] = [];
  let totalViews = 0;
  let topUmkm: any = null;

  try {
    const result = await Promise.all([
      prisma.umkm.count(),
      prisma.gallery.count(),
      prisma.news.count(),

      prisma.umkm.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.umkm.aggregate({
        _sum: {
          views: true,
        },
      }),

      prisma.umkm.findFirst({
        orderBy: {
          views: "desc",
        },
      }),
    ]);

    totalUmkm = result[0];
    totalGallery = result[1];
    totalBerita = result[2];
    latestUmkm = result[3];
    totalViews = result[4]._sum.views ?? 0;
    topUmkm = result[5];
  } catch (error) {
    console.error(
      "Dashboard Query Error:",
      error
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Dashboard
      </h1>

      {/* STAT CARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total UMKM"
          value={totalUmkm}
          subtitle="Jumlah keseluruhan UMKM terdaftar"
          icon={Store}
          bgClass="bg-[#5e5ce6]"
        />

        <StatsCard
          title="Total Foto Galeri"
          value={totalGallery}
          subtitle="Dokumentasi foto produk & kegiatan"
          icon={ImageIcon}
          bgClass="bg-[#32c5ff]"
        />

        <StatsCard
          title="Total Berita"
          value={totalBerita}
          subtitle="Artikel berita KKN"
          icon={Newspaper}
          bgClass="bg-[#ff9f43]"
        />

        <StatsCard
          title="Total Pengunjung"
          value={totalViews}
          subtitle="Akumulasi seluruh kunjungan UMKM"
          icon={Users}
          bgClass="bg-[#28c76f]"
        />
      </div>

      {/* CHART + AKTIVITAS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#5e5ce6]" />
            Pertumbuhan UMKM
          </h3>

          <div className="h-[300px]">
            <DashboardChart />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#32c5ff]" />
            Aktivitas Terbaru
          </h3>

          <div className="space-y-5">
            {latestUmkm.length > 0 ? (
              latestUmkm.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3"
                >
                  <div className="w-3 h-3 rounded-full bg-[#32c5ff] mt-2" />

                  <div>
                    <p className="text-sm font-medium">
                      <span className="text-[#5e5ce6]">
                        {item.name}
                      </span>{" "}
                      ditambahkan
                    </p>

                    <p className="text-xs text-slate-500">
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
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                Belum ada aktivitas.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* TABEL + TOP UMKM */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
            <List className="w-5 h-5 text-[#ff9f43]" />
            UMKM Terbaru
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3">
                    Nama UMKM
                  </th>
                  <th className="pb-3">
                    Tanggal
                  </th>
                  <th className="pb-3 text-right">
                    Views
                  </th>
                </tr>
              </thead>

              <tbody>
                {latestUmkm.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b"
                  >
                    <td className="py-4">
                      {item.name}
                    </td>

                    <td className="py-4">
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString(
                        "id-ID"
                      )}
                    </td>

                    <td className="py-4 text-right font-medium">
                      {item.views ?? 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#5e5ce6] rounded-xl shadow-lg p-8 text-white relative overflow-hidden">
          <Trophy className="absolute -right-10 -bottom-10 w-48 h-48 opacity-10" />

          <div className="relative z-10">
            <div className="bg-yellow-400/20 p-4 rounded-full w-fit mb-4">
              <Trophy className="w-10 h-10 text-yellow-300" />
            </div>

            <p className="text-xs tracking-[0.2em] uppercase text-white/70">
              UMKM Terpopuler
            </p>

            <h2 className="text-2xl font-bold mt-3">
              {topUmkm?.name ??
                "Belum ada UMKM"}
            </h2>

            <p className="mt-4 text-lg">
              Total Pengunjung ={" "}
              {topUmkm?.views ?? 0}
            </p>

            {topUmkm && (
              <Link
                href={`/umkm/${topUmkm.id}`}
                target="_blank"
                className="inline-flex mt-6 bg-white text-[#5e5ce6] px-5 py-3 rounded-lg font-semibold items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Lihat Detail
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}