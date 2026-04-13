/**
 * Mock Data for KosPintar
 * Replace with real API calls when backend is ready
 * Structure mirrors database schema for easy API integration
 */

// User Types
export interface User {
  id: string;
  email: string;
  nama: string;
  no_hp?: string;
  role: "user" | "admin";
  last_login?: string;
}

// Property Types
export interface Property {
  id: string;
  user_id: string;
  nama: string;
  alamat: string;
  kota: string;
  nomor_telp?: string;
  created_at: string;
}

// Room Type
export interface RoomType {
  id: string;
  property_id: string;
  nama: string;
  created_at: string;
}

// Room
export interface Room {
  id: string;
  property_id: string;
  room_type_id: string;
  nomor: string;
  harga_sewa: number;
  status: "kosong" | "terisi" | "renovasi";
  created_at: string;
}

// Tenant
export interface Tenant {
  id: string;
  property_id: string;
  nama: string;
  no_hp: string;
  email?: string;
  room_id?: string;
  status: "aktif" | "nonaktif" | "checkout";
  tanggal_masuk: string;
  created_at: string;
}

// Transaction
export interface Transaction {
  id: string;
  property_id: string;
  tenant_id: string;
  bulan: number;
  tahun: number;
  jumlah: number;
  status: "belum_bayar" | "lunas" | "sebagian";
  tanggal_bayar?: string;
  metode_pembayaran?: string;
  is_overdue: boolean;
  overdue_days: number;
  created_at: string;
}

// Expense
export interface Expense {
  id: string;
  property_id: string;
  kategori: string;
  deskripsi: string;
  jumlah: number;
  tanggal: string;
  created_at: string;
}

// Deposit
export interface Deposit {
  id: string;
  property_id: string;
  tenant_id: string;
  jumlah: number;
  status: "aktif" | "dikembalikan";
  created_at: string;
}

// Reminder
export interface Reminder {
  id: string;
  property_id: string;
  tenant_id?: string;
  type: string;
  message: string;
  wa_link?: string;
  periode_bulan: number;
  periode_tahun: number;
  is_read: boolean;
  created_at: string;
}

// Broadcast
export interface Broadcast {
  id: string;
  message: string;
  created_at: string;
}

// Settings
export interface Setting {
  key: string;
  value: any;
}

export interface SettingText {
  key: string;
  value: string;
}

// ===== MOCK DATA =====

// Mock User
export const MOCK_USER: User = {
  id: "user-001",
  email: "user@example.com",
  nama: "John Doe",
  no_hp: "081234567890",
  role: "user",
  last_login: new Date().toISOString(),
};

export const MOCK_ADMIN_USER: User = {
  id: "admin-001",
  email: "admin@example.com",
  nama: "Admin",
  no_hp: "081234567891",
  role: "admin",
  last_login: new Date().toISOString(),
};

// Mock Properties
export const MOCK_PROPERTIES: Property[] = [
  {
    id: "prop-001",
    user_id: "user-001",
    nama: "Kos Sentosa",
    alamat: "Jl. Merdeka No. 10",
    kota: "Jakarta",
    nomor_telp: "021-1234567",
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "prop-002",
    user_id: "user-001",
    nama: "Kos Bersama",
    alamat: "Jl. Ahmad Yani No. 25",
    kota: "Bandung",
    nomor_telp: "022-1234567",
    created_at: "2024-02-20T00:00:00Z",
  },
];

// Mock Room Types
export const MOCK_ROOM_TYPES: RoomType[] = [
  {
    id: "rt-001",
    property_id: "prop-001",
    nama: "Ekonomi",
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "rt-002",
    property_id: "prop-001",
    nama: "Standar",
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "rt-003",
    property_id: "prop-001",
    nama: "Premium",
    created_at: "2024-01-15T00:00:00Z",
  },
];

// Mock Rooms
export const MOCK_ROOMS: Room[] = [
  {
    id: "room-001",
    property_id: "prop-001",
    room_type_id: "rt-001",
    nomor: "101",
    harga_sewa: 1500000,
    status: "terisi",
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "room-002",
    property_id: "prop-001",
    room_type_id: "rt-001",
    nomor: "102",
    harga_sewa: 1500000,
    status: "terisi",
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "room-003",
    property_id: "prop-001",
    room_type_id: "rt-001",
    nomor: "103",
    harga_sewa: 1500000,
    status: "kosong",
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "room-004",
    property_id: "prop-001",
    room_type_id: "rt-002",
    nomor: "201",
    harga_sewa: 2000000,
    status: "terisi",
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "room-005",
    property_id: "prop-001",
    room_type_id: "rt-002",
    nomor: "202",
    harga_sewa: 2000000,
    status: "terisi",
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "room-006",
    property_id: "prop-001",
    room_type_id: "rt-003",
    nomor: "301",
    harga_sewa: 3000000,
    status: "kosong",
    created_at: "2024-01-15T00:00:00Z",
  },
];

// Mock Tenants
export const MOCK_TENANTS: Tenant[] = [
  {
    id: "tenant-001",
    property_id: "prop-001",
    nama: "Budi Santoso",
    no_hp: "085123456789",
    email: "budi@example.com",
    room_id: "room-001",
    status: "aktif",
    tanggal_masuk: "2023-06-01",
    created_at: "2023-06-01T00:00:00Z",
  },
  {
    id: "tenant-002",
    property_id: "prop-001",
    nama: "Siti Nurhaliza",
    no_hp: "085123456790",
    email: "siti@example.com",
    room_id: "room-002",
    status: "aktif",
    tanggal_masuk: "2023-08-15",
    created_at: "2023-08-15T00:00:00Z",
  },
  {
    id: "tenant-003",
    property_id: "prop-001",
    nama: "Ahmad Hidayat",
    no_hp: "085123456791",
    email: "ahmad@example.com",
    room_id: "room-004",
    status: "aktif",
    tanggal_masuk: "2024-01-10",
    created_at: "2024-01-10T00:00:00Z",
  },
  {
    id: "tenant-004",
    property_id: "prop-001",
    nama: "Rina Wijaya",
    no_hp: "085123456792",
    email: "rina@example.com",
    room_id: "room-005",
    status: "aktif",
    tanggal_masuk: "2024-02-01",
    created_at: "2024-02-01T00:00:00Z",
  },
];

// Mock Transactions
export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-001",
    property_id: "prop-001",
    tenant_id: "tenant-001",
    bulan: 3,
    tahun: 2025,
    jumlah: 1500000,
    status: "lunas",
    tanggal_bayar: "2025-03-01T00:00:00Z",
    metode_pembayaran: "transfer",
    is_overdue: false,
    overdue_days: 0,
    created_at: "2025-03-01T00:00:00Z",
  },
  {
    id: "tx-002",
    property_id: "prop-001",
    tenant_id: "tenant-002",
    bulan: 3,
    tahun: 2025,
    jumlah: 1500000,
    status: "lunas",
    tanggal_bayar: "2025-03-02T00:00:00Z",
    metode_pembayaran: "transfer",
    is_overdue: false,
    overdue_days: 0,
    created_at: "2025-03-02T00:00:00Z",
  },
  {
    id: "tx-003",
    property_id: "prop-001",
    tenant_id: "tenant-003",
    bulan: 3,
    tahun: 2025,
    jumlah: 2000000,
    status: "belum_bayar",
    is_overdue: true,
    overdue_days: 5,
    created_at: "2025-03-01T00:00:00Z",
  },
  {
    id: "tx-004",
    property_id: "prop-001",
    tenant_id: "tenant-004",
    bulan: 3,
    tahun: 2025,
    jumlah: 2000000,
    status: "lunas",
    tanggal_bayar: "2025-03-05T00:00:00Z",
    metode_pembayaran: "transfer",
    is_overdue: false,
    overdue_days: 0,
    created_at: "2025-03-05T00:00:00Z",
  },
];

// Mock Expenses
export const MOCK_EXPENSES: Expense[] = [
  {
    id: "exp-001",
    property_id: "prop-001",
    kategori: "Perbaikan",
    deskripsi: "Perbaikan AC kamar 101",
    jumlah: 500000,
    tanggal: "2025-03-05",
    created_at: "2025-03-05T00:00:00Z",
  },
  {
    id: "exp-002",
    property_id: "prop-001",
    kategori: "Utilitas",
    deskripsi: "Tagihan listrik",
    jumlah: 1200000,
    tanggal: "2025-03-10",
    created_at: "2025-03-10T00:00:00Z",
  },
  {
    id: "exp-003",
    property_id: "prop-001",
    kategori: "Kebersihan",
    deskripsi: "Pembersihan kamar mandi",
    jumlah: 300000,
    tanggal: "2025-03-08",
    created_at: "2025-03-08T00:00:00Z",
  },
];

// Mock Deposits
export const MOCK_DEPOSITS: Deposit[] = [
  {
    id: "dep-001",
    property_id: "prop-001",
    tenant_id: "tenant-001",
    jumlah: 1500000,
    status: "aktif",
    created_at: "2023-06-01T00:00:00Z",
  },
  {
    id: "dep-002",
    property_id: "prop-001",
    tenant_id: "tenant-002",
    jumlah: 1500000,
    status: "aktif",
    created_at: "2023-08-15T00:00:00Z",
  },
];

// Mock Reminders
export const MOCK_REMINDERS: Reminder[] = [
  {
    id: "rem-001",
    property_id: "prop-001",
    tenant_id: "tenant-003",
    type: "payment_reminder",
    message: "Pengingat pembayaran sewa bulan Maret",
    periode_bulan: 3,
    periode_tahun: 2025,
    is_read: false,
    created_at: "2025-03-05T00:00:00Z",
  },
];

// Mock Broadcasts
export const MOCK_BROADCASTS: Broadcast[] = [
  {
    id: "broadcast-001",
    message: "Sistem sedang dalam pemeliharaan. Terima kasih atas kesabaran Anda.",
    created_at: "2025-03-10T00:00:00Z",
  },
  {
    id: "broadcast-002",
    message: "Fitur baru: Export laporan keuangan dalam format Excel",
    created_at: "2025-03-08T00:00:00Z",
  },
];

// Mock Settings
export const MOCK_SETTINGS: Setting[] = [
  {
    key: "maintenance_mode",
    value: 0,
  },
  {
    key: "in_app_announcement_active",
    value: 1,
  },
];

// Mock Settings Text
export const MOCK_SETTINGS_TEXT: SettingText[] = [
  {
    key: "in_app_announcement_text",
    value: "Selamat datang di KosPintar! Kami terus berinovasi untuk melayani Anda lebih baik.",
  },
];

// Helper function to get mock data by property
export function getMockDataByProperty(propertyId: string) {
  return {
    rooms: MOCK_ROOMS.filter((r) => r.property_id === propertyId),
    roomTypes: MOCK_ROOM_TYPES.filter((rt) => rt.property_id === propertyId),
    tenants: MOCK_TENANTS.filter((t) => t.property_id === propertyId),
    transactions: MOCK_TRANSACTIONS.filter((tx) => tx.property_id === propertyId),
    expenses: MOCK_EXPENSES.filter((exp) => exp.property_id === propertyId),
    deposits: MOCK_DEPOSITS.filter((dep) => dep.property_id === propertyId),
    reminders: MOCK_REMINDERS.filter((rem) => rem.property_id === propertyId),
  };
}
