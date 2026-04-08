"use client";
import { CurrentStatus } from "@/lib/types";
import { KNOWN_STUDENTS, KNOWN_BOOKS } from "@/lib/data";
import { ScanLine, User as UserIcon, BookOpen, Loader2, Hourglass, CheckCircle2, AlertCircle } from "lucide-react";

interface Props {
  status: CurrentStatus;
  loading: boolean;
}

export default function CurrentActivity({ status, loading }: Props) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-white/[.06] bg-slate-900/40 p-10 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
      </div>
    );
  }

  // Fallbacks using our known data mappings if Firebase hasn't resolved names yet
  const studentName = status.currentUser || KNOWN_STUDENTS[status.lastScannedUID] || "Unknown";
  const bookName = status.currentBook || KNOWN_BOOKS[status.lastScannedUID]?.title || "Unknown Book";

  // Determine visual style based on mode
  const isIdle = status.mode.includes("Offline") || status.mode === "Idle";
  const isWaitingStudent = status.mode.includes("Student");
  const isWaitingBook = status.mode.includes("Book");
  const isSuccess = status.message.toLowerCase().includes("success") || !!status.lastAction;
  const isError = status.message.toLowerCase().includes("invalid") || status.message.toLowerCase().includes("error");

  return (
    <div className="rounded-2xl border border-white/[.06] bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-5 shadow-2xl backdrop-blur-sm relative overflow-hidden">
      
      {/* Background flare based on status */}
      {isSuccess && <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />}
      {isError && <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl" />}

      {/* Mode Header */}
      <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          {isWaitingStudent && <ScanLine className="h-5 w-5 text-violet-400 animate-pulse" />}
          {isWaitingBook && <Hourglass className="h-5 w-5 text-amber-400 animate-pulse" />}
          {isIdle && <ScanLine className="h-5 w-5 text-slate-500" />}
          {isSuccess && !isWaitingStudent && !isWaitingBook && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-300">
            {status.mode}
          </span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">
          {new Date(status.timestamp).toLocaleTimeString()}
        </span>
      </div>

      {/* Message Banner if active */}
      {status.message && status.message !== "Waiting for connection..." && (
        <div className={`mb-5 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium animate-in slide-in-from-top-2 ${
          isError ? "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20" :
          isSuccess ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20" :
          "bg-white/5 text-slate-300 ring-1 ring-white/10"
        }`}>
          {isError && <AlertCircle className="h-4 w-4 shrink-0" />}
          {isSuccess && <CheckCircle2 className="h-4 w-4 shrink-0" />}
          {status.message}
        </div>
      )}

      {/* User + Book Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Student Card */}
        <div className={`rounded-xl border p-4 transition-all duration-300 ${
            status.currentUser !== "—" || (isWaitingBook && studentName !== "Unknown")
              ? "border-violet-500/30 bg-violet-500/5 shadow-[0_0_15px_rgba(139,92,246,0.05)]"
              : "border-white/[.06] bg-white/[.02]"
          }`}
        >
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-500">
            <UserIcon className="h-3.5 w-3.5" />
            Active Student
          </div>
          {status.currentUser !== "—" || (isWaitingBook && studentName !== "Unknown") ? (
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-lg shadow-lg shadow-violet-500/20">
                🧑‍🎓
              </span>
              <div>
                <p className="font-semibold text-white">{studentName}</p>
                <p className="mt-0.5 font-mono text-[10px] text-slate-500">
                  UID: {status.lastAction === "" && !isWaitingBook ? status.lastScannedUID : "—"}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-600 py-2">No student scanned</p>
          )}
        </div>

        {/* Book Card */}
        <div className={`rounded-xl border p-4 transition-all duration-300 ${
            status.currentBook !== "—" 
              ? "border-amber-500/30 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.05)]"
              : "border-white/[.06] bg-white/[.02]"
          }`}
        >
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-500">
            <BookOpen className="h-3.5 w-3.5" />
            Current Book
          </div>
          {status.currentBook !== "—" ? (
            <div>
               <p className="font-semibold text-white">{bookName}</p>
               <div className="flex items-center gap-2 mt-1.5">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    status.lastAction === "Returned"
                      ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
                      : status.lastAction === "Issued"
                      ? "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20"
                      : "bg-slate-500/10 text-slate-400 ring-1 ring-slate-500/20"
                  }`}>
                    {status.lastAction || "Scanned"}
                  </span>
               </div>
            </div>
          ) : (
             <p className="text-sm text-slate-600 py-2">No book scanned</p>
          )}
        </div>
      </div>
    </div>
  );
}
