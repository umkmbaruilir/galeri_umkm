"use client";

import { useState } from "react";
import NewsImageUpload from "./NewsImageUpload";

export default function CreateNewsForm() {
  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [imageUrl, setImageUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!title || !content || !imageUrl) {
      alert(
        "Judul, isi berita, dan gambar wajib diisi"
      );
      return;
    }

    setLoading(true);

    const response = await fetch(
      "/api/news",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          imageUrl,
        }),
      }
    );

    setLoading(false);

    if (!response.ok) {
      alert("Gagal membuat berita");
      return;
    }

    window.location.href =
      "/admin/news";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="block mb-2 font-medium">
          Judul Berita
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border rounded-lg p-3"
          placeholder="Masukkan judul berita"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Foto Kegiatan
        </label>

        <NewsImageUpload
          onUpload={setImageUrl}
        />

        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            className="mt-4 w-full max-w-md rounded-lg"
          />
        )}
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Isi Berita
        </label>

        <textarea
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          rows={10}
          className="w-full border rounded-lg p-3"
          placeholder="Tulis isi berita..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        {loading
          ? "Menyimpan..."
          : "Simpan Berita"}
      </button>
    </form>
  );
}