import "./globals.css";

import Navbar from "../components/public/Navbar";
import Footer from "../components/public/Footer";

export const metadata = {
  title:
    "Galeri UMKM Kelurahan Baru Ilir",

  description:
    "Sistem informasi galeri UMKM Kelurahan Baru Ilir",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}