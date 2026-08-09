"use client";

import { useState } from "react";

export default function CreateUmkmForm() {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] =
    useState("");
  const [address, setAddress] =
    useState("");
  const [whatsapp, setWhatsapp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await fetch("/api/umkm", {
          method: "POST",
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
        });

      if (!response.ok) {
        throw new Error(
          "Gagal menambahkan UMKM"
        );
      }

      alert(
        "UMKM berhasil ditambahkan"
      );

      window.location.href =
        "/admin/umkm";
    } catch (error) {
      console.error(error);

      alert(
        "Terjadi kesalahan saat menyimpan data"
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
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
          className="w-full border rounded-lg p-3"
          placeholder="Masukkan nama UMKM"
        />
      </div>

      {/* Pemilik */}
      <div>
        <label className="block mb-2 font-medium">
          Nama Pemilik
        </label>

        <input
          type="text"
          value={owner}
          onChange={(e) =>
            setOwner(e.target.value)
          }
          required
          className="w-full border rounded-lg p-3"
          placeholder="Masukkan nama pemilik"
        />
      </div>

      {/* Kategori */}
      <div>
        <label className="block mb-2 font-medium">
          Kategori UMKM
        </label>

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          required
          className="w-full border rounded-lg p-3"
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
          Deskripsi UMKM
        </label>

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          required
          rows={5}
          className="w-full border rounded-lg p-3"
          placeholder="Masukkan deskripsi UMKM"
        />
      </div>

      {/* Alamat */}
      <div>
        <label className="block mb-2 font-medium">
          Alamat
        </label>

        <textarea
          value={address}
          onChange={(e) =>
            setAddress(
              e.target.value
            )
          }
          required
          rows={3}
          className="w-full border rounded-lg p-3"
          placeholder="Masukkan alamat UMKM"
        />
      </div>

      {/* WhatsApp */}
      <div>
        <label className="block mb-2 font-medium">
          Nomor WhatsApp
        </label>

        <input
          type="text"
          value={whatsapp}
          onChange={(e) =>
            setWhatsapp(
              e.target.value
            )
          }
          required
          className="w-full border rounded-lg p-3"
          placeholder="628xxxxxxxxxx"
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
          : "Simpan UMKM"}
      </button>
    </form>
  );
}