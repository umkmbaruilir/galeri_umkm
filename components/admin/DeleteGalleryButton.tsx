"use client";

export default function DeleteGalleryButton({
  id,
}: {
  id: string;
}) {
  async function remove() {
    const ok = confirm(
      "Hapus foto ini?"
    );

    if (!ok) return;

    await fetch(
      `/api/gallery/${id}`,
      {
        method: "DELETE",
      }
    );

    location.reload();
  }

  return (
    <button
      onClick={remove}
      className="text-red-600 text-sm"
    >
      Hapus
    </button>
  );
}