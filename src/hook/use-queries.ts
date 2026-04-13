/**
 * Mock Query Hooks
 * These hooks return mock data instead of making API calls
 * Structure matches the original Supabase queries for easy API integration later
 *
 * When ready to add real API:
 * 1. Create /src/services/api.ts with real API calls
 * 2. Replace mock data returns with actual API calls
 * 3. No component changes needed - same hook signatures!
 */

import { useProperty } from "@/lib/property-context";
import {
  MOCK_ROOM_TYPES,
  MOCK_ROOMS,
  MOCK_TENANTS,
  MOCK_TRANSACTIONS,
  MOCK_EXPENSES,
  MOCK_DEPOSITS,
  MOCK_REMINDERS,
  MOCK_BROADCASTS,
  MOCK_USER,
  getMockDataByProperty,
} from "@/lib/mock-data";

// Standard return type for all hooks
interface QueryResult<T> {
  data: T;
  isLoading: boolean;
  error: null;
}

// ---- Room & Room Type Hooks ----

export function useRoomTypesAndRooms() {
  const { activeProperty } = useProperty();

  if (!activeProperty) {
    return {
      data: { roomTypes: [], rooms: [] },
      isLoading: false,
      error: null,
    };
  }

  const roomTypes = MOCK_ROOM_TYPES.filter((rt) => rt.property_id === activeProperty.id);
  const rooms = MOCK_ROOMS.filter((r) => r.property_id === activeProperty.id);

  return {
    data: { roomTypes, rooms },
    isLoading: false,
    error: null,
  } as QueryResult<{ roomTypes: any[]; rooms: any[] }>;
}

// ---- Tenant Hooks ----

export function useTenants() {
  const { activeProperty } = useProperty();

  if (!activeProperty) {
    return {
      data: [],
      isLoading: false,
      error: null,
    };
  }

  const tenants = MOCK_TENANTS.filter((t) => t.property_id === activeProperty.id).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return {
    data: tenants,
    isLoading: false,
    error: null,
  } as QueryResult<any[]>;
}

// ---- Transaction Hooks ----

export function useTransactions() {
  const { activeProperty } = useProperty();

  if (!activeProperty) {
    return {
      data: [],
      isLoading: false,
      error: null,
    };
  }

  const transactions = MOCK_TRANSACTIONS.filter((tx) => tx.property_id === activeProperty.id).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return {
    data: transactions,
    isLoading: false,
    error: null,
  } as QueryResult<any[]>;
}

// ---- Expense Hooks ----

export function useExpenses(bulan: number, tahun: number) {
  const { activeProperty } = useProperty();

  if (!activeProperty) {
    return {
      data: [],
      isLoading: false,
      error: null,
    };
  }

  const expenses = MOCK_EXPENSES.filter((exp) => {
    if (exp.property_id !== activeProperty.id) return false;
    const expDate = new Date(exp.tanggal);
    return expDate.getMonth() + 1 === bulan && expDate.getFullYear() === tahun;
  }).sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());

  return {
    data: expenses,
    isLoading: false,
    error: null,
  } as QueryResult<any[]>;
}

// ---- Deposit Hooks ----

export function useDeposits() {
  const { activeProperty } = useProperty();

  if (!activeProperty) {
    return {
      data: [],
      isLoading: false,
      error: null,
    };
  }

  const deposits = MOCK_DEPOSITS.filter((dep) => dep.property_id === activeProperty.id);

  return {
    data: deposits,
    isLoading: false,
    error: null,
  } as QueryResult<any[]>;
}

// ---- Reminder Hooks ----

export function useReminders(bulan: number, tahun: number) {
  const { activeProperty } = useProperty();

  if (!activeProperty) {
    return {
      data: [],
      isLoading: false,
      error: null,
    };
  }

  const reminders = MOCK_REMINDERS.filter(
    (rem) =>
      rem.property_id === activeProperty.id &&
      rem.periode_bulan === bulan &&
      rem.periode_tahun === tahun &&
      !rem.is_read
  );

  return {
    data: reminders,
    isLoading: false,
    error: null,
  } as QueryResult<any[]>;
}

// ---- Broadcast Hooks ----

export function useBroadcasts() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const broadcasts = MOCK_BROADCASTS.filter((b) => new Date(b.created_at) >= sevenDaysAgo).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return {
    data: broadcasts,
    isLoading: false,
    error: null,
  } as QueryResult<any[]>;
}

// ---- Profile Hooks ----

export function useProfile(userId: string | undefined) {
  if (!userId) {
    return {
      data: null,
      isLoading: false,
      error: null,
    };
  }

  // For mock data, return the mock user's profile
  const profile = userId === MOCK_USER.id ? { nama: MOCK_USER.nama, no_hp: MOCK_USER.no_hp } : null;

  return {
    data: profile,
    isLoading: false,
    error: null,
  } as QueryResult<any>;
}

// ---- Overdue Payment Stats Hooks ----

export function useOverduePaymentStats() {
  const { activeProperty } = useProperty();

  if (!activeProperty) {
    return {
      data: { count: 0, totalDays: 0 },
      isLoading: false,
      error: null,
    };
  }

  const overduePayments = MOCK_TRANSACTIONS.filter(
    (tx) => tx.property_id === activeProperty.id && tx.is_overdue
  );

  return {
    data: {
      count: overduePayments.length,
      totalDays: overduePayments.reduce((sum, tx) => sum + tx.overdue_days, 0),
    },
    isLoading: false,
    error: null,
  } as QueryResult<{ count: number; totalDays: number }>;
}

// ---- Invalidation helpers ----
export function useInvalidate() {
  // Mock implementation - no-op since we're not using React Query caching
  return {
    rooms: () => {},
    tenants: () => {},
    transactions: () => {},
    overdueStats: () => {},
    expenses: () => {},
    deposits: () => {},
    profile: () => {},
    all: () => {},
  };
}

// ---- Prefetching ----
export function usePrefetchRoutes() {
  // Mock implementation - no-op since we're not using React Query prefetch
  return () => {};
}
