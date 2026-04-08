"use client";
import { useBooks } from "@/hooks/useFirebase";
import { BookOpen, Loader2 } from "lucide-react";

export default function BooksPage() {
  const { booksList, loading } = useBooks();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[.06] bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-5 shadow-2xl backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Book Inventory</h2>
            <p className="text-xs text-slate-400">Manage and track all library books</p>
          </div>
        </div>
        <span className="rounded-full bg-slate-700/50 px-3 py-1 text-xs font-semibold text-slate-300">
          {booksList.length} Books
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/[.06] text-xs uppercase tracking-wider text-slate-500">
              <th className="pb-3 pl-2 pr-4 font-medium">UID</th>
              <th className="pb-3 pr-4 font-medium">Title</th>
              <th className="pb-3 pr-4 font-medium">Status</th>
              <th className="pb-3 pr-4 font-medium">Issued To</th>
              <th className="pb-3 font-medium text-right pr-2">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {booksList.map((book) => (
              <tr
                key={book.uid}
                className="border-b border-white/[.04] transition hover:bg-white/[.02]"
              >
                <td className="py-4 pl-2 pr-4 font-mono text-xs text-slate-500">
                  {book.uid}
                </td>
                <td className="py-4 pr-4 font-medium text-white">
                  {book.title}
                </td>
                <td className="py-4 pr-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      !book.issued
                        ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20"
                    }`}
                  >
                    {!book.issued ? "Available" : "Issued"}
                  </span>
                </td>
                <td className="py-4 pr-4 text-slate-300">
                  {book.issuedTo || "—"}
                </td>
                <td className="py-4 font-mono text-xs text-slate-500 text-right pr-2">
                  {new Date(book.lastUpdated).toLocaleString()}
                </td>
              </tr>
            ))}
            {booksList.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-500">
                  No books found in inventory.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
