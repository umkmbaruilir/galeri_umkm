"use client";

import { useState } from "react";
import NewsImageUpload from "./NewsImageUpload";

export default function EditNewsForm({
  news,
}: {
  news: any;
}) {
  const [title, setTitle] =
    useState(news.title);

  const [content, setContent] =
    useState(news.content);

  const [imageUrl, setImageUrl] =
    useState(news.imageUrl);

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    await fetch(
      `/api/news/${news.id}`,
      {
        method: "PUT",
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

    window.location.href =
      "/admin/news";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <input
        type="text"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="w-full border p-3 rounded-lg"
      />

      <NewsImageUpload
        onUpload={setImageUrl}
      />

      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          className="w-full max-w-md rounded-lg"
        />
      )}

      <textarea
        rows={10}
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        className="w-full border p-3 rounded-lg"
      />

      <button
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        {loading
          ? "Menyimpan..."
          : "Simpan Perubahan"}
      </button>
    </form>
  );
}