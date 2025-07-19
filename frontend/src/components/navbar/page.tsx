"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Register", href: "/register" },
  { label: "Find match", href: "/matchform" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (!mounted) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("?")[0]);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#9D6D7A]">
          🌸 Rhistaé
        </Link>

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-[#9D6D7A] text-2xl"
        >
          ☰
        </button>

        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-bold relative group ${
                isActive(item.href) ? "text-[#9D6D7A]" : "text-gray-700"
              }`}
            >
              {item.label}
              <span
                className={`absolute left-0 bottom-0 h-0.5 bg-[#9D6D7A] transition-all duration-300 ${
                  isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </div>
      </div>

      <div className={`fixed inset-0 z-40 ${menuOpen ? "block" : "hidden"}`}>
        <div
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0 bg-black/40 transition-opacity duration-300"
        ></div>

        <div
          className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg p-6 transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-[#9D6D7A] absolute top-4 right-4"
          >
            ✕
          </button>
          <nav className="mt-10 flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`text-base font-bold relative group ${
                  isActive(item.href) ? "text-[#9D6D7A]" : "text-gray-700"
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 bottom-0 h-0.5 bg-[#9D6D7A] transition-all duration-300 ${
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
