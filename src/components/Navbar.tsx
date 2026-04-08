"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Moon, Sun, Home, Book, Users, History, Activity } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/books", label: "Books", icon: Book },
  { href: "/students", label: "Students", icon: Users },
  { href: "/transactions", label: "History", icon: History },
  { href: "/logs", label: "Logs", icon: Activity },
];

export default function Navbar() {
  const [dark, setDark] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      setDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/60 dark:bg-slate-950/80 dark:supports-[backdrop-filter]:bg-slate-950/60 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white hidden sm:block">
              RFID Library
            </h1>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 overflow-x-auto mx-4 no-scrollbar">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive 
                    ? "bg-white/10 text-white font-medium" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Status pill + theme toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>

          <button
            id="theme-toggle"
            onClick={toggle}
            className="group relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 ring-1 ring-white/10 transition hover:bg-white/5 hover:text-white"
            aria-label="Toggle theme"
          >
            {dark ? (
              <Sun className="h-4 w-4 transition group-hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 transition group-hover:-rotate-12" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
