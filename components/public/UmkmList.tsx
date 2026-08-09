"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

interface Gallery {
  id: string;
  imageUrl: string;
}

interface Umkm {
  id: string;
  name: string;
  owner: string;
  category: string | null;
  coverImage: string | null;
  galleries: Gallery[];
}

export default function UmkmList({
  umkms,
}: {
  umkms: Umkm[];
}) {
  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("Semua");

  const filtered = useMemo(() => {
    return umkms.filter((item) => {
      const searchMatch =
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const categoryMatch =
        category === "Semua"
          ? true
          : item.category ===
            category;

      return (
        searchMatch &&
        categoryMatch
      );
    });
  }, [
    search,
    category,
    umkms,
  ]);

  return (
    <>
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari UMKM..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Filter */}
      <div className="mb-8">
        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="w-full border rounded-lg p-3"
        >
          <option value="Semua">
            Semua Kategori
          </option>

          <option value="Kuliner">
            Kuliner
          </option>

          <option value="Kerajinan">
            Kerajinan
          </option>

          <option value="Fashion">
            Fashion
          </option>

          <option value="Jasa">
            Jasa
          </option>

          <option value="Pertanian">
            Pertanian
          </option>

          <option value="Perikanan">
            Perikanan
          </option>

          <option value="Lainnya">
            Lainnya
          </option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 border rounded-lg">
          <p className="text-lg font-semibold">
            UMKM tidak ditemukan
          </p>

          <p className="text-slate-500 mt-2">
            Coba gunakan kata kunci
            lain.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map(
            (item) => (
              <Link
                key={item.id}
                href={`/umkm/${item.id}`}
                className="border rounded-xl overflow-hidden hover:shadow-lg transition duration-200"
              >
                <img
                  src={
                    item.coverImage ??
                    "https://placehold.co/600x400?text=UMKM"
                  }
                  alt={item.name}
                  className="w-full h-52 object-cover"
                />

                <div className="p-4">
                  <h2 className="font-bold text-lg">
                    {item.name}
                  </h2>

                  <p className="text-slate-600 mt-1">
                    {item.owner}
                  </p>

                  <div className="mt-2">
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                      {item.category ??
                        "Tanpa Kategori"}
                    </span>
                  </div>

                  <div className="mt-4 text-sm text-slate-500">
                    {
                      item.galleries
                        .length
                    }{" "}
                    Foto
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      )}
    </>
  );
}