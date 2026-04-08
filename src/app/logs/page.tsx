"use client";
import { useLogs } from "@/hooks/useFirebase";
import { Activity, Loader2, Terminal } from "lucide-react";

const levelStyles: Record<string, string> = {
  info: "text-slate-300",
  success: "text-emerald-400 font-medium",
  warning: "text-amber-400 font-medium",
  error: "text-rose-400 font-bold",
  system: "text-indigo-400",
};

export default function LogsPage() {
  const { logsList, loading } = useLogs(500); // 500 most recent logs

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[.06] bg-[#0c1017] p-5 shadow-2xl relative">
      <div className="mb-4 flex items-center justify-between border-b border-white/[.06] pb-4">
        <div className="flex items-center gap-3">
          <Terminal className="h-5 w-5 text-emerald-500" />
          <h2 className="text-lg font-bold text-white tracking-tight">System Activity Logs</h2>
        </div>
        <div className="flex gap-2 items-center">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-emerald-500/70">Live Connection</span>
        </div>
      </div>

      <div className="h-[70vh] overflow-y-auto font-mono text-[13px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-800 pr-4">
        {logsList.length === 0 && (
          <div className="py-12 text-center text-slate-600">
            Waiting for activity logs...
          </div>
        )}
        
        <div className="space-y-1.5 flex flex-col">
            {logsList.map((log) => {
               // Render logs newest first (they are already sorted by the hook)
               const date = new Date(log.timestamp);
               const timeString = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}.${date.getMilliseconds().toString().padStart(3, '0')}`;
               
               return (
                  <div
                    key={log.id}
                    className="flex gap-4 border-b border-white/[.02] py-1.5 hover:bg-white/[.02] px-2 rounded -mx-2 transition-colors group"
                  >
                    <span className="shrink-0 text-slate-600 select-none group-hover:text-slate-500 transition-colors">
                      [{timeString}]
                    </span>
                    <div className="flex flex-col sm:flex-row sm:gap-3 flex-1">
                        <span className={`w-16 shrink-0 uppercase text-[10px] mt-0.5 tracking-wider ${levelStyles[log.type]}`}>
                            {log.type}
                        </span>
                        <span className={levelStyles[log.type]}>
                            {log.message} {log.uid && <span className="text-slate-500 ml-2 text-xs">UID: {log.uid}</span>}
                        </span>
                    </div>
                  </div>
               );
            })}
        </div>
      </div>
    </div>
  );
}
