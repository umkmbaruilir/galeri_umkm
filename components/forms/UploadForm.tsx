"use client";

import { useState } from "react";

export default function UploadForm({
  umkmId,
}: {
  umkmId: string;
}) {
  const [files, setFiles] =
    useState<FileList | null>(null);

  const [loading, setLoading] =
    useState(false);

  async function upload() {
    if (!files) return;

    try {
      setLoading(true);

      for (const file of Array.from(files)) {
        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        const uploadResponse =
          await fetch(
            "/api/upload/image",
            {
              method: "POST",
              body: formData,
            }
          );

        if (!uploadResponse.ok) {
          throw new Error(
            "Upload gagal"
          );
        }

        const uploaded =
          await uploadResponse.json();

        await fetch(
          "/api/gallery",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              imageUrl:
                uploaded.url,
              umkmId,
            }),
          }
        );
      }

      alert(
        "Semua foto berhasil diupload"
      );

      location.reload();
    } catch (error) {
      console.error(error);

      alert(
        "Terjadi kesalahan saat upload"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        multiple
        onChange={(e) =>
          setFiles(
            e.target.files
          )
        }
        className="block"
      />

      {files && (
        <div className="text-sm text-slate-500">
          {files.length} file dipilih
        </div>
      )}

      <button
        onClick={upload}
        disabled={
          loading || !files
        }
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading
          ? "Mengupload..."
          : "Upload Foto"}
      </button>
    </div>
  );
}