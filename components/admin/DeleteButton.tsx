"use client";

export default function DeleteButton({
  id,
}: {
  id: string;
}) {
  async function remove() {
    const confirmed = confirm(
      "Yakin ingin menghapus UMKM ini?"
    );

    if (!confirmed) return;

    const response = await fetch(
      `/api/umkm/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      location.reload();
    } else {
      alert("Gagal menghapus data");
    }
  }

  return (
    <button
      onClick={remove}
      className="text-red-600 hover:underline"
    >
      Hapus
    </button>
  );
}