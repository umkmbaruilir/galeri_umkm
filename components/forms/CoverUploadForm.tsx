"use client";

import { useState } from "react";

export default function CoverUploadForm({
  umkmId,
}: {
  umkmId: string;
}) {
  const [file, setFile] =
    useState<File | null>(null);

  async function upload() {
    if (!file) return;

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    const upload =
      await fetch(
        "/api/upload/image",
        {
          method: "POST",
          body: formData,
        }
      );

    const image =
      await upload.json();

    await fetch(
      `/api/umkm/${umkmId}/cover`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          coverImage:
            image.url,
        }),
      }
    );

    location.reload();
  }

  return (
    <div className="space-y-2">
      <input
        type="file"
        onChange={(e) =>
          setFile(
            e.target.files?.[0] ??
              null
          )
        }
      />

      <button
        onClick={upload}
        className="bg-black text-white px-4 py-2"
      >
        Upload Cover
      </button>
    </div>
  );
}