"use client";
import { useTransactions } from "@/hooks/useFirebase";
import { History, Loader2, Search } from "lucide-react";
import { useState, useMemo } from "react";

export default function TransactionsPage() {
  const { transactionsList, loading } = useTransactions(500); // fetch last 500
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAction, setFilterAction] = useState<"All" | "Issued" | "Returned">("All");

  const filteredList = useMemo(() => {
    return transactionsList.filter(tx => {
      const matchSearch = searchTerm === "" || 
        tx.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tx.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.studentUID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.bookUID.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchAction = filterAction === "All" || tx.action === filterAction;

      return matchSearch && matchAction;
    });
  }, [transactionsList, searchTerm, filterAction]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[.06] bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-5 shadow-2xl backdrop-blur-sm">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400 ring-1 ring-pink-500/20">
            <History className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Transaction History</h2>
            <p className="text-xs text-slate-400">All issue and return events</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
           <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search name, book, UID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950/50 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-pink-500/50 transition-all"
              />
           </div>
           <select 
             value={filterAction}
             onChange={(e) => setFilterAction(e.target.value as any)}
             className="w-full sm:w-auto bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-pink-500/50 transition-all appearance-none cursor-pointer"
           >
             <option value="All">All Actions</option>
             <option value="Issued">Issued Only</option>
             <option value="Returned">Returned Only</option>
           </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/[.06] text-xs uppercase tracking-wider text-slate-500">
              <th className="pb-3 pl-2 pr-4 font-medium">Time (Recent First)</th>
              <th className="pb-3 pr-4 font-medium">Student</th>
              <th className="pb-3 pr-4 font-medium">Book</th>
              <th className="pb-3 pr-4 font-medium">Action</th>
              <th className="pb-3 font-medium text-right pr-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-white/[.04] transition hover:bg-white/[.02] animate-in fade-in"
              >
                <td className="py-4 pl-2 pr-4 font-mono text-xs text-slate-400">
                  {new Date(tx.timestamp).toLocaleString()}
                </td>
                <td className="py-4 pr-4">
                  <div className="font-medium text-white">{tx.studentName}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">{tx.studentUID}</div>
                </td>
                <td className="py-4 pr-4">
                  <div className="text-slate-200">{tx.bookName}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">{tx.bookUID}</div>
                </td>
                <td className="py-4 pr-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      tx.action === "Issued"
                        ? "bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20"
                        : "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
                    }`}
                  >
                    {tx.action}
                  </span>
                </td>
                <td className="py-4 font-medium text-right pr-2">
                  <span className={tx.status === "Success" ? "text-emerald-400" : "text-rose-400"}>
                     {tx.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredList.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-500">
                  {transactionsList.length === 0 ? "No transactions recorded yet." : "No transactions match your search."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
