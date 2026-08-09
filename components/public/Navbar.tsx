import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link
          href="/"
          className="font-bold text-lg"
        >
          Galeri UMKM
        </Link>

        <nav className="flex gap-6">
          <Link href="/">
            Beranda
          </Link>

          <Link href="/umkm">
            UMKM
          </Link>
        </nav>
      </div>
    </header>
  );
}