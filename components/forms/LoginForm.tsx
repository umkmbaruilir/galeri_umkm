"use client";

import { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const response = await fetch(
      "/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    if (response.ok) {
      window.location.href =
        "/admin/dashboard";
    } else {
      alert("Login gagal");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(
            e.target.value
          )
        }
        className="border p-2 w-full"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        className="border p-2 w-full"
      />

      <button
        type="submit"
        className="bg-black text-white px-4 py-2"
      >
        Login
      </button>
    </form>
  );
}