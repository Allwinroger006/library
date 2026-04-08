"use client";
import { useStudents } from "@/hooks/useFirebase";
import { Users, Loader2 } from "lucide-react";

export default function StudentsPage() {
  const { studentsList, loading } = useStudents();

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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Registered Students</h2>
            <p className="text-xs text-slate-400">View student activity and issued books</p>
          </div>
        </div>
        <span className="rounded-full bg-slate-700/50 px-3 py-1 text-xs font-semibold text-slate-300">
          {studentsList.length} Students
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/[.06] text-xs uppercase tracking-wider text-slate-500">
              <th className="pb-3 pl-2 pr-4 font-medium">UID</th>
              <th className="pb-3 pr-4 font-medium">Student Name</th>
              <th className="pb-3 pr-4 font-medium text-center">Currently Issued</th>
              <th className="pb-3 font-medium text-right pr-2">Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {studentsList.map((student) => (
              <tr
                key={student.uid}
                className="border-b border-white/[.04] transition hover:bg-white/[.02]"
              >
                <td className="py-4 pl-2 pr-4 font-mono text-xs text-slate-500">
                  {student.uid}
                </td>
                <td className="py-4 pr-4 font-medium text-white flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-300 ring-1 ring-white/10">
                    {student.name.charAt(0)}
                  </div>
                  {student.name}
                </td>
                <td className="py-4 pr-4 text-center">
                  <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${
                    student.totalIssued > 0 ? "bg-amber-500/20 text-amber-400" : "bg-slate-500/20 text-slate-400"
                  }`}>
                    {student.totalIssued}
                  </span>
                </td>
                <td className="py-4 font-mono text-xs text-slate-500 text-right pr-2">
                  {student.lastSeen ? new Date(student.lastSeen).toLocaleString() : "Never"}
                </td>
              </tr>
            ))}
            {studentsList.length === 0 && (
              <tr>
                <td colSpan={4} className="py-12 text-center text-slate-500">
                  No students registered yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
