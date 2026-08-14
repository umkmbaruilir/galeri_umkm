"use client";

import {
  Menu,
  Moon,
  Sun,
  User,
} from "lucide-react";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { useSidebar } from "./SidebarContext";

export default function Header() {
  const { theme, setTheme } =
    useTheme();

  const { setOpen } =
    useSidebar();

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-16 bg-white dark:bg-coreui-darkCard border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between shadow-sm sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Menu className="w-5 h-5 dark:text-white" />
        </button>

        <div className="hidden md:flex text-sm text-gray-500 dark:text-gray-400">
          Admin /
          <span className="text-gray-900 dark:text-white ml-1 font-medium">
            Dashboard
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {mounted && (
          <button
            onClick={() =>
              setTheme(
                theme === "dark"
                  ? "light"
                  : "dark"
              )
            }
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        )}

        <div className="flex items-center gap-2 cursor-pointer bg-gray-50 dark:bg-gray-800 py-1.5 px-3 rounded-full border border-gray-200 dark:border-gray-700">
          <div className="w-8 h-8 rounded-full bg-coreui-primary flex items-center justify-center text-white">
            <User className="w-4 h-4" />
          </div>

          <span className="text-sm font-medium hidden sm:block dark:text-white">
            Admin Baru Ilir
          </span>
        </div>
      </div>
    </header>
  );
}