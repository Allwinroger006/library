// ============================================================
// Firebase Hooks
// ============================================================

import { useState, useEffect } from "react";
import { ref, onValue, query, orderByChild, limitToLast } from "firebase/database";
import { db } from "@/lib/firebase";
import {
  CurrentStatus,
  BookRecord,
  StudentRecord,
  TransactionRecord,
  LogRecord,
  DashboardStats,
} from "@/lib/types";

// ── hook: useCurrentStatus ──────────────────────────────────
export function useCurrentStatus() {
  const [status, setStatus] = useState<CurrentStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const statusRef = ref(db, "library/currentStatus");
    const unsubscribe = onValue(statusRef, (snapshot) => {
      if (snapshot.exists()) {
        setStatus(snapshot.val());
      } else {
        // Default state if nothing is there
        setStatus({
          mode: "Offline",
          lastScannedUID: "—",
          currentUser: "—",
          currentBook: "—",
          lastAction: "—",
          message: "Waiting for connection...",
          timestamp: Date.now(),
        });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { status, loading };
}

// ── hook: useBooks ──────────────────────────────────────────
export function useBooks() {
  const [books, setBooks] = useState<Record<string, BookRecord>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const booksRef = ref(db, "library/books");
    const unsubscribe = onValue(booksRef, (snapshot) => {
      if (snapshot.exists()) {
        setBooks(snapshot.val());
      } else {
        setBooks({});
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Return as array sorted by title for easy rendering
  const booksList = Object.entries(books).map(([uid, data]) => ({
    uid,
    ...data,
  })).sort((a, b) => a.title.localeCompare(b.title));

  return { books, booksList, loading };
}

// ── hook: useStudents ───────────────────────────────────────
export function useStudents() {
  const [students, setStudents] = useState<Record<string, StudentRecord>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const studentsRef = ref(db, "library/students");
    const unsubscribe = onValue(studentsRef, (snapshot) => {
      if (snapshot.exists()) {
        setStudents(snapshot.val());
      } else {
        setStudents({});
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const studentsList = Object.entries(students).map(([uid, data]) => ({
    uid,
    ...data,
  })).sort((a, b) => a.name.localeCompare(b.name));

  return { students, studentsList, loading };
}

// ── hook: useTransactions ───────────────────────────────────
export function useTransactions(limit = 100) {
  const [transactions, setTransactions] = useState<Record<string, TransactionRecord>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Let's get the most recent ones
    const txQuery = query(ref(db, "library/transactions"), orderByChild("timestamp"), limitToLast(limit));
    const unsubscribe = onValue(txQuery, (snapshot) => {
      if (snapshot.exists()) {
        setTransactions(snapshot.val());
      } else {
        setTransactions({});
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [limit]);

  // Return sorted descending (newest first)
  const transactionsList = Object.entries(transactions).map(([id, data]) => ({
    id,
    ...data,
  })).sort((a, b) => b.timestamp - a.timestamp);

  return { transactions, transactionsList, loading };
}

// ── hook: useLogs ───────────────────────────────────────────
export function useLogs(limit = 100) {
  const [logs, setLogs] = useState<Record<string, LogRecord>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logsQuery = query(ref(db, "library/logs"), orderByChild("timestamp"), limitToLast(limit));
    const unsubscribe = onValue(logsQuery, (snapshot) => {
      if (snapshot.exists()) {
        setLogs(snapshot.val());
      } else {
        setLogs({});
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [limit]);

  const logsList = Object.entries(logs).map(([id, data]) => ({
    id,
    ...data,
  })).sort((a, b) => b.timestamp - a.timestamp); // newest first

  return { logs, logsList, loading };
}

// ── hook: useFirebaseStats ──────────────────────────────────
export function useFirebaseStats() {
  const { booksList, loading: bLoad } = useBooks();
  const { studentsList, loading: sLoad } = useStudents();
  const { transactionsList, loading: tLoad } = useTransactions(1000); // larger limit for total calculation if possible

  const loading = bLoad || sLoad || tLoad;

  const totalBooks = booksList.length;
  let booksIssued = 0;
  booksList.forEach(b => {
    if (b.issued) booksIssued++;
  });
  
  const stats: DashboardStats = {
    totalBooks,
    totalStudents: studentsList.length,
    booksIssued,
    booksAvailable: totalBooks - booksIssued,
    totalTransactions: transactionsList.length,
  };

  return { stats, loading };
}
