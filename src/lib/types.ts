// ============================================================
// RFID Library Management System — Type Definitions
// All types mirror the Firebase Realtime Database structure
// ============================================================

// ── /library/currentStatus ───────────────────────────────────
export interface CurrentStatus {
  mode: string;              // "Waiting for Student Card" | "Waiting for Book Tag" | "Processing" | "Idle"
  lastScannedUID: string;
  currentUser: string;       // student name or ""
  currentBook: string;       // book title or ""
  lastAction: string;        // "Issued" | "Returned" | "Invalid Card" | ""
  message: string;           // human-readable status message
  timestamp: number;         // epoch ms
}

// ── /library/books/{uid} ─────────────────────────────────────
export interface BookRecord {
  title: string;
  author?: string;
  issued: boolean;
  issuedTo: string;          // student name or ""
  issuedToUID?: string;      // student UID
  lastUpdated: number;       // epoch ms
}

// ── /library/students/{uid} ──────────────────────────────────
export interface StudentRecord {
  name: string;
  department?: string;
  lastSeen: number;          // epoch ms
  totalIssued: number;       // count of currently issued books
}

// ── /library/transactions/{pushId} ───────────────────────────
export interface TransactionRecord {
  studentUID: string;
  studentName: string;
  bookUID: string;
  bookName: string;
  action: "Issued" | "Returned";
  status: string;            // "Success" | "Failed"
  timestamp: number;         // epoch ms
}

// ── /library/logs/{pushId} ───────────────────────────────────
export interface LogRecord {
  type: "info" | "success" | "warning" | "error" | "system";
  message: string;
  uid?: string;              // related RFID UID if any
  timestamp: number;         // epoch ms
}

// ── UI helpers ───────────────────────────────────────────────
export interface DashboardStats {
  totalBooks: number;
  totalStudents: number;
  booksIssued: number;
  booksAvailable: number;
  totalTransactions: number;
}
