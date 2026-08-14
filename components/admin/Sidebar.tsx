"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  Newspaper,
  X,
} from "lucide-react";

import LogoutButton from "./LogoutButton";
import { useSidebar } from "./SidebarContext";

export default function Sidebar() {
  const pathname = usePathname();

  const { open, setOpen } =
    useSidebar();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Data UMKM",
      href: "/admin/umkm",
      icon: Store,
    },
    {
      name: "Berita",
      href: "/admin/news",
      icon: Newspaper,
    },
  ];

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed
            inset-0
            bg-black/40
            z-40
          "
        />
      )}

      <aside
        className={`
          fixed
          left-0
          top-0
          w-64
          h-screen
          bg-white
          dark:bg-coreui-darkCard
          border-r
          border-gray-200
          dark:border-gray-800
          flex
          flex-col
          shadow-sm
          z-50
          transition-transform
          duration-300
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800">
          <span className="text-xl font-bold text-coreui-primary dark:text-white">
            Admin Panel
          </span>

          <button
            onClick={() =>
              setOpen(false)
            }
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() =>
                  setOpen(false)
                }
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-coreui-primary/10 text-coreui-primary font-semibold dark:bg-coreui-primary/20 dark:text-white"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}