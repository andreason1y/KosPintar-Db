# KosPintar Development Guide

> 🚀 Guide lengkap untuk mengembangkan KosPintar dengan mock data setup

## Table of Contents
- [Quick Start](#quick-start)
- [Architecture Overview](#architecture-overview)
- [Development Workflows](#development-workflows)
- [Adding Features](#adding-features)
- [Working with Mock Data](#working-with-mock-data)
- [Testing & Quality](#testing--quality)
- [Useful Commands](#useful-commands)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

```bash
# Setup project
npm install

# Start development server
npm run dev

# Check code quality
npm run check

# Full development check (type-check + lint + test)
npm run dev:check
```

Server berjalan di `http://localhost:5173`

---

## Architecture Overview

### Project Structure
```
src/
├── app/                    # Root app setup
│   ├── App.tsx            # Root component
│   ├── providers.tsx      # Context providers stack
│   └── router.tsx         # Route configuration
├── lib/                   # Core utilities & context
│   ├── mock-data.ts       # 📦 All mock data lives here
│   ├── auth-context.tsx   # Auth provider
│   ├── property-context.tsx
│   ├── plan-context.tsx
│   ├── demo-context.tsx
│   └── utils.ts           # Utility functions
├── component/             # UI components
│   ├── ui/               # shadcn/ui components
│   └── AppShell.tsx      # Main app layout
├── hooks/                # Custom React hooks
│   ├── use-queries.ts    # 🎯 Mock data hooks (easy to replace with API)
│   └── use-toast.ts
├── pages/                # Full pages
├── routes/               # Route definitions
│   ├── public.routes.ts
│   ├── private.routes.ts
│   └── admin.routes.ts
└── main.tsx             # Entry point
```

### Data Flow
```
Component
  ↓
useQueries() hook (from use-queries.ts)
  ↓
Mock data (from lib/mock-data.ts)
  ↓
Display

---
🔄 When API is ready, just update use-queries.ts to call API instead!
```

---

## Development Workflows

### 1️⃣ Starting Development

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2 (optional): Watch tests
npm run test:watch

# Terminal 3 (optional): Check types in real-time
npm run type-check
```

### 2️⃣ Creating a New Page

```bash
# Create boilerplate page
npm run create:page
# Prompts: page name, route path, needs auth?
# Creates: src/pages/YourPage.tsx + adds to routes

# Manually:
# 1. Create file: src/pages/YourPage.tsx
# 2. Add route to src/routes/private.routes.ts (or public/admin)
# 3. Import and use hooks like useTenants(), useRooms(), etc.
```

### 3️⃣ Adding Mock Data for New Entity

```bash
npm run add:mock
# Prompts: entity name, fields, relationships
# Creates: type + mock data in lib/mock-data.ts

# Manually:
# 1. Define interface in lib/mock-data.ts
# 2. Create MOCK_ENTITY_NAME constant
# 3. Export from mock-data.ts
# 4. Create hook in hook/use-queries.ts
```

### 4️⃣ Adding New Route

```bash
npm run add:route
# Prompts: route path, route type (public/private/admin)
# Adds to appropriate routes file

# Manually:
# Add RouteObject to src/routes/{public|private|admin}.routes.ts
```

---

## Adding Features

### Pattern: New Tenant Feature

```tsx
// 1. Check mock data exists in lib/mock-data.ts
// ✅ Already have: MOCK_TENANTS, Tenant interface

// 2. Create page component
// src/pages/TenantsPage.tsx
import { useTenants } from "@/hooks/use-queries";

export function TenantsPage() {
  const { data: tenants, isLoading } = useTenants();
  
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <div>
      {tenants.map(tenant => (
        <TenantCard key={tenant.id} tenant={tenant} />
      ))}
    </div>
  );
}

// 3. Add to routes
// src/routes/private.routes.ts
export const privateRoutes: RouteObject[] = [
  {
    path: "/penyewa",
    element: <TenantsPage />,
  },
];

// 4. Add to navigation (when ready)
// Components will pick up the route automatically
```

### Pattern: New Data Entity

```ts
// 1. Add interface & mock data
// src/lib/mock-data.ts

export interface MyEntity {
  id: string;
  name: string;
  // ... other fields
}

export const MOCK_MY_ENTITIES: MyEntity[] = [
  { id: "me-001", name: "Example" },
  // ...
];

// 2. Create hook
// src/hooks/use-queries.ts

export function useMyEntities() {
  const { activeProperty } = useProperty();
  
  if (!activeProperty) {
    return { data: [], isLoading: false, error: null };
  }
  
  const data = MOCK_MY_ENTITIES.filter(
    e => e.property_id === activeProperty.id
  );
  
  return { data, isLoading: false, error: null };
}

// 3. Use in components
const { data } = useMyEntities();
```

---

## Working with Mock Data

### Overview

Mock data in `src/lib/mock-data.ts`:
- ✅ Realistic test data for all features
- ✅ Same structure as future API responses
- ✅ Includes relationships (tenant → room → property)
- ✅ Ready for integration testing

### Available Mock Data

```typescript
// Users & Auth
MOCK_USER              // Regular user
MOCK_ADMIN_USER        // Admin user

// Properties & Rooms
MOCK_PROPERTIES        // Multiple properties
MOCK_ROOM_TYPES        // Room type categories
MOCK_ROOMS             // Individual rooms

// Business Data
MOCK_TENANTS           // Tenant list
MOCK_TRANSACTIONS      // Payment history (with overdue data)
MOCK_EXPENSES          // Operating expenses
MOCK_DEPOSITS          // Security deposits
MOCK_REMINDERS         // Payment reminders (unread)
MOCK_BROADCASTS        // System announcements

// Settings
MOCK_SETTINGS          // App configuration
MOCK_SETTINGS_TEXT     // Text announcements
```

### Modifying Mock Data

```ts
// src/lib/mock-data.ts

// Add new entry
export const MOCK_TENANTS = [
  // ... existing
  {
    id: "tenant-005",
    property_id: "prop-001",
    nama: "New Tenant",
    // ... other fields
  },
];

// Hook automatically picks it up - no code changes needed!
```

### Testing with Mock Data

```tsx
// Component automatically uses mock data
const { data: tenants } = useTenants();

// No API calls, instant feedback
// Perfect for UI development!
```

---

## Testing & Quality

### Type Checking
```bash
npm run type-check        # Check types once
npm run check            # Type-check + lint
```

### Linting
```bash
npm run lint            # Show issues
npm run lint:fix        # Auto-fix issues
```

### Testing
```bash
npm run test            # Run tests once
npm run test:watch      # Watch mode
```

### Full Quality Check
```bash
npm run dev:check       # Type-check + lint + test
```

---

## Useful Commands

### Development

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (http://localhost:5173) |
| `npm run dev:quick` | Quick setup: install + dev |
| `npm run preview` | Preview production build |

### Code Quality

| Command | Purpose |
|---------|---------|
| `npm run check` | Type-check + lint in one command |
| `npm run type-check` | TypeScript type checking |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | Auto-fix linting issues |

### Testing

| Command | Purpose |
|---------|---------|
| `npm run test` | Run tests once |
| `npm run test:watch` | Watch test files for changes |

### Generators (Coming Soon)

| Command | Purpose |
|---------|---------|
| `npm run create:page` | Generate new page |
| `npm run add:route` | Add route configuration |
| `npm run add:mock` | Add mock data entity |

### Build

| Command | Purpose |
|---------|---------|
| `npm run build` | Production build |
| `npm run build:dev` | Dev build with source maps |

---

## Integrating Real API

When you're ready to add the real backend:

### 1. Create API Service

```ts
// src/services/api.ts
export const api = {
  tenants: {
    list: (propertyId: string) => 
      fetch(`/api/properties/${propertyId}/tenants`),
    create: (data) => 
      fetch('/api/tenants', { method: 'POST', body: JSON.stringify(data) }),
  },
  // ... other endpoints
};
```

### 2. Update Hooks

```ts
// src/hooks/use-queries.ts
// Replace mock data with API calls

export function useTenants() {
  const { activeProperty } = useProperty();
  
  // ✅ Same signature, different source!
  return {
    data: await api.tenants.list(activeProperty.id),
    isLoading: false,
    error: null,
  };
}
```

### 3. No Component Changes Needed!
Components already call `useTenants()` - they don't care where data comes from.

---

## Troubleshooting

### Port 5173 already in use?
```bash
# Kill process using port
lsof -ti :5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### TypeScript errors won't go away?
```bash
# Clear cache and restart
rm -rf node_modules/.vite
npm run type-check
```

### Mock data not showing up?
```bash
# Check useQueries hook is using correct property
const { activeProperty } = useProperty();
console.log('Active property:', activeProperty);

// Check data matches property_id
const data = MOCK_TENANTS.filter(t => t.property_id === activeProperty.id);
```

### Styling looks weird?
```bash
# Rebuild Tailwind
npm run build:dev

# Clear browser cache (Ctrl+Shift+R on most browsers)
```

---

## Best Practices

### ✅ Do
- Use mock data for UI development
- Keep components focused and reusable
- Use TypeScript for type safety
- Check with `npm run dev:check` before committing
- Break down components into smaller pieces
- Use existing UI components from shadcn/ui

### ❌ Don't
- Make API calls in components directly
- Create huge monolithic components (>300 lines)
- Ignore TypeScript errors
- Commit without running `npm run lint:fix`
- Duplicate mock data - update in one place
- Hardcode values - use mock data instead

---

## Tips & Tricks

### Debugging Mock Data
```tsx
// Check what hook returns
const tenants = useTenants();
console.log('Tenants:', tenants);

// Check if hook is working
const { activeProperty } = useProperty();
console.log('Property:', activeProperty);
```

### Quick Property Switch
Mock data has multiple properties - change active property in PropertyProvider to test different data sets.

### Testing Overdue Logic
`MOCK_TRANSACTIONS` includes overdue entries - use for testing payment alerts.

---

## Getting Help

1. Check CLAUDE.md for project architecture
2. Check this file for development patterns
3. Look at existing pages/components for examples
4. Review mock-data.ts for available data structures
5. Check use-queries.ts for hook patterns

---

**Happy coding! 🚀 UI development dengan mock data lebih cepat dan fokus!**
