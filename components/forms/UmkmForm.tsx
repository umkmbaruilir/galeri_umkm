"use client";

import { useState } from "react";

export default function UmkmForm() {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [description, setDescription] =
    useState("");
  const [address, setAddress] =
    useState("");
  const [whatsapp, setWhatsapp] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const response = await fetch(
      "/api/umkm",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
          owner,
          description,
          address,
          whatsapp,
        }),
      }
    );

    if (response.ok) {
      window.location.href =
        "/admin/umkm";
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        placeholder="Nama UMKM"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="border p-2 w-full"
      />

      <input
        placeholder="Pemilik"
        value={owner}
        onChange={(e) =>
          setOwner(e.target.value)
        }
        className="border p-2 w-full"
      />

      <textarea
        placeholder="Deskripsi"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        className="border p-2 w-full"
      />

      <input
        placeholder="Alamat"
        value={address}
        onChange={(e) =>
          setAddress(
            e.target.value
          )
        }
        className="border p-2 w-full"
      />

      <input
        placeholder="WhatsApp"
        value={whatsapp}
        onChange={(e) =>
          setWhatsapp(
            e.target.value
          )
        }
        className="border p-2 w-full"
      />

      <button
        type="submit"
        className="bg-black text-white px-4 py-2"
      >
        Simpan
      </button>
    </form>
  );
}