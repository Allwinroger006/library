// ============================================================
// RFID Library Management System — Known RFID Mappings
// ============================================================
// These are used as fallback labels when Firebase doesn't yet
// have the student/book name for a given UID.

export const KNOWN_STUDENTS: Record<string, string> = {
  "0D2E4302": "Arun",
  "F3DBFFE3": "Priya",
};

export const KNOWN_BOOKS: Record<string, { title: string; author: string }> = {
  "E14A8D02": { title: "C Programming",    author: "Dennis Ritchie" },
  "96098E02": { title: "Data Structures",   author: "Yashavant Kanetkar" },
};
