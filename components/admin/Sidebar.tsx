import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white p-4">
      <h2 className="font-bold mb-6">
        Admin UMKM
      </h2>

      <nav className="space-y-3">
        <Link
          href="/admin/dashboard"
          className="block"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/umkm"
          className="block"
        >
          UMKM
        </Link>

        <div className="mt-8">
          <LogoutButton />
        </div>
      </nav>
    </aside>
  );
}