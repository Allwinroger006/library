"use client";
import { BookOpen, BookCheck, UserCheck, ArrowRightLeft } from "lucide-react";
import { DashboardStats } from "@/lib/types";

interface Props {
  stats: DashboardStats;
  loading: boolean;
}

export default function StatsCards({ stats, loading }: Props) {
  const cards = [
    {
      label: "Total Books",
      value: stats.totalBooks,
      icon: <BookOpen className="h-5 w-5" />,
      gradient: "from-violet-500 to-indigo-500",
      shadow: "shadow-violet-500/20",
    },
    {
      label: "Available",
      value: stats.booksAvailable,
      icon: <BookCheck className="h-5 w-5" />,
      gradient: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-500/20",
    },
    {
      label: "Issued",
      value: stats.booksIssued,
      icon: <UserCheck className="h-5 w-5" />,
      gradient: "from-amber-500 to-orange-500",
      shadow: "shadow-amber-500/20",
    },
    {
      label: "Transactions",
      value: stats.totalTransactions,
      icon: <ArrowRightLeft className="h-5 w-5" />,
      gradient: "from-pink-500 to-rose-500",
      shadow: "shadow-pink-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="group relative overflow-hidden rounded-2xl border border-white/[.06] bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-5 shadow-xl backdrop-blur-sm transition-transform hover:scale-[1.02]"
        >
          {/* Glow */}
          <div
            className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br ${c.gradient} opacity-10 blur-2xl transition-opacity group-hover:opacity-20`}
          />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">
                {c.label}
              </p>
              {loading ? (
                <div className="h-9 w-16 bg-white/10 animate-pulse rounded-md mt-1" />
              ) : (
                 <p className="text-3xl font-bold text-white">{c.value}</p>
              )}
            </div>
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${c.gradient} text-white shadow-lg ${c.shadow}`}
            >
              {c.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
