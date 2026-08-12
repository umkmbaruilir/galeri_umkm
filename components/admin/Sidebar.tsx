import Link from "next/link";
import LogoutButton from "./LogoutButton";

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

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white p-4">
      <h2 className="font-bold mb-6">
        Admin UMKM
      </h2>

      <nav className="space-y-3">
        <Link
         href="/admin/dashboard"
        className="block px-4 py-2 rounded hover:bg-slate-400"
        >
          Dashboard
        </Link>

        <Link
         href="/admin/umkm"
        className="block px-4 py-2 rounded hover:bg-blue-400"
        >
          UMKM
        </Link>

        <Link
         href="/admin/news"
        className="block px-4 py-2 rounded hover:bg-blue-400"
        >
        Berita KKN
        </Link>

        <div className="mt-8">
          <LogoutButton />
        </div>
      </nav>
    </aside>
  );
}