"use client";
import StatsCards from "./StatsCards";
import CurrentActivity from "./CurrentActivity";
import { useCurrentStatus, useFirebaseStats } from "@/hooks/useFirebase";

export default function Dashboard() {
  const { status, loading: statusLoading } = useCurrentStatus();
  const { stats, loading: statsLoading } = useFirebaseStats();

  return (
    <div className="space-y-6">
      <StatsCards stats={stats} loading={statsLoading} />
      
      {/* We use CurrentActivity as the Live Session Panel */}
      <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mt-8 mb-2">
        Live Session Panel
      </h2>
      {status && <CurrentActivity status={status} loading={statusLoading} />}
    </div>
  );
}
