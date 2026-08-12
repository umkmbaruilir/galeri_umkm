"use client";

import { useState } from "react";

interface Props {
  onUpload: (url: string) => void;
}

export default function NewsImageUpload({
  onUpload,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setLoading(true);

    const formData =
      new FormData();

    formData.append("file", file);

    const res = await fetch(
      "/api/upload/image",
      {
        method: "POST",
        body: formData,
      }
    );

    const data =
      await res.json();

    onUpload(data.url);

    setLoading(false);
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />

      {loading && (
        <p>Mengupload...</p>
      )}
    </div>
  );
}