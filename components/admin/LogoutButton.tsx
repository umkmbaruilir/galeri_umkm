"use client";

export default function LogoutButton() {
  async function logout() {
    await fetch(
      "/api/auth/logout",
      {
        method: "POST",
      }
    );

    window.location.href =
      "/admin/login";
  }

  return (
    <button
      onClick={logout}
      className="bg-red-600 text-white px-3 py-2 rounded"
    >
      Logout
    </button>
  );
}