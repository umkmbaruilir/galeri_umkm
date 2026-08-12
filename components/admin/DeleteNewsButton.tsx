"use client";

import { useState } from "react";

export default function DeleteNewsButton({
  id,
}: {
  id: string;
}) {
  const [loading, setLoading] =
    useState(false);

  async function handleDelete() {
    const ok = confirm(
      "Yakin ingin menghapus berita ini?"
    );

    if (!ok) return;

    try {
      setLoading(true);

      const response = await fetch(
        `/api/news/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        alert(
          "Gagal menghapus berita"
        );
        return;
      }

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert(
        "Terjadi kesalahan saat menghapus berita"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:underline disabled:opacity-50"
    >
      {loading
        ? "Menghapus..."
        : "Hapus"}
    </button>
  );
}