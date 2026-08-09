"use client";

import { useState } from "react";

interface EditUmkmFormProps {
  umkm: {
    id: string;
    name: string;
    owner: string;
    category?: string | null;
    description: string;
    address: string;
    whatsapp: string;
  };
}

export default function EditUmkmForm({
  umkm,
}: EditUmkmFormProps) {
  const [name, setName] =
    useState(umkm.name);

  const [owner, setOwner] =
    useState(umkm.owner);

  const [category, setCategory] =
    useState(
      umkm.category ?? ""
    );

  const [description, setDescription] =
    useState(
      umkm.description
    );

  const [address, setAddress] =
    useState(
      umkm.address
    );

  const [whatsapp, setWhatsapp] =
    useState(
      umkm.whatsapp
    );

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await fetch(
          `/api/umkm/${umkm.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              name,
              owner,
              category,
              description,
              address,
              whatsapp,
            }),
          }
        );

      if (!response.ok) {
        throw new Error(
          "Gagal mengupdate UMKM"
        );
      }

      alert(
        "Data UMKM berhasil diperbarui"
      );

      window.location.href =
        "/admin/umkm";
    } catch (error) {
      console.error(error);

      alert(
        "Terjadi kesalahan saat menyimpan perubahan"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Nama UMKM */}
      <div>
        <label className="block mb-2 font-medium">
          Nama UMKM
        </label>

        <input
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="border p-3 rounded-lg w-full"
          required
        />
      </div>

      {/* Pemilik */}
      <div>
        <label className="block mb-2 font-medium">
          Nama Pemilik
        </label>

        <input
          value={owner}
          onChange={(e) =>
            setOwner(
              e.target.value
            )
          }
          className="border p-3 rounded-lg w-full"
          required
        />
      </div>

      {/* Kategori */}
      <div>
        <label className="block mb-2 font-medium">
          Kategori
        </label>

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="border p-3 rounded-lg w-full"
        >
          <option value="">
            Pilih Kategori
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

      {/* Deskripsi */}
      <div>
        <label className="block mb-2 font-medium">
          Deskripsi
        </label>

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="border p-3 rounded-lg w-full"
          rows={5}
          required
        />
      </div>

      {/* Alamat */}
      <div>
        <label className="block mb-2 font-medium">
          Alamat
        </label>

        <input
          value={address}
          onChange={(e) =>
            setAddress(
              e.target.value
            )
          }
          className="border p-3 rounded-lg w-full"
          required
        />
      </div>

      {/* WhatsApp */}
      <div>
        <label className="block mb-2 font-medium">
          Nomor WhatsApp
        </label>

        <input
          value={whatsapp}
          onChange={(e) =>
            setWhatsapp(
              e.target.value
            )
          }
          className="border p-3 rounded-lg w-full"
          placeholder="628xxxxxxxxxx"
          required
        />
      </div>

      {/* Tombol */}
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-5 py-3 rounded-lg disabled:opacity-50"
      >
        {loading
          ? "Menyimpan..."
          : "Simpan Perubahan"}
      </button>
    </form>
  );
}