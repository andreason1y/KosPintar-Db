# 🚀 KosPintar Development Skill

> Complete development environment setup with npm scripts, documentation, and Claude Code integration

## What's Included?

### 📚 Documentation
- **DEVELOPMENT.md** - Comprehensive development guide
- **CLAUDE.md** - Project architecture and conventions
- **settings.json** - Claude Code configuration

### 🛠️ Helper Scripts

```bash
npm run create:page    # Generate new page with boilerplate
npm run add:route      # Add route to appropriate routes file
npm run add:mock       # Generate mock data entity + hook
```

### 🔄 Development Commands

```bash
npm run dev            # Start dev server
npm run dev:quick      # Install deps + start dev
npm run dev:check      # Full quality check (type + lint + test)
npm run check          # Type-check + lint
npm run type-check     # TypeScript checking
npm run lint           # ESLint checking
npm run lint:fix       # Auto-fix linting issues
npm run test           # Run tests
npm run test:watch     # Watch test files
```

### 🎯 Claude Code Hooks

**Pre-commit Hook** (`.claude/hooks/pre-commit.sh`)
- Runs type-check and lint before commits
- Auto-fixes linting issues
- Prevents bad code from being committed

**Session Start Hook** (`.claude/hooks/session-start.sh`)
- Installs dependencies if needed
- Shows quick command reference
- Displays development tips

---

## Quick Start

### First Time Setup
```bash
npm run dev:quick    # Install + start dev server
```

### Daily Development
```bash
npm run dev          # Start dev server
# Open http://localhost:5173
```

### Before Pushing
```bash
npm run dev:check    # Type-check + lint + test
git push origin <branch>
```

---

## Common Workflows

### Create New Page
```bash
npm run create:page
# Follow prompts to generate boilerplate

# Add to routes if not auto-added
npm run add:route
```

### Add New Data Entity
```bash
npm run add:mock
# Follow prompts to get interface/mock data/hook templates

# Manually add to:
# 1. src/lib/mock-data.ts (interface + data)
# 2. src/hooks/use-queries.ts (hook)
```

### Check Code Quality
```bash
# Just types
npm run type-check

# Just linting
npm run lint

# Both + test
npm run dev:check
```

---

## Project Structure

```
.
├── .claude/
│   ├── settings.json        # Claude Code config
│   ├── hooks/              # Automation hooks
│   └── README.md           # This file
├── scripts/
│   ├── create-page.js      # Page generator
│   ├── add-route.js        # Route helper
│   └── add-mock.js         # Mock data helper
├── DEVELOPMENT.md          # Full dev guide
├── CLAUDE.md              # Architecture guide
├── src/
│   ├── lib/mock-data.ts   # 📦 All mock data
│   ├── hooks/use-queries.ts # 🎯 Data hooks
│   └── ...
└── package.json           # Scripts + dependencies
```

---

## Key Concepts

### Mock Data Strategy
- ✅ All mock data centralized in `src/lib/mock-data.ts`
- ✅ Hooks in `src/hooks/use-queries.ts` serve mock data
- ✅ **Easy swap to API later** - same hook signatures!

### Development Flow
```
Component
  ↓
useQueries() hook
  ↓
Mock Data (lib/mock-data.ts)
  ↓
Display

→ When API ready, just update hook implementation!
```

### Quality Workflow
```
Type-Check → Lint → Test → Commit
```

---

## Integration with Claude Code

### Automatic Setup
On session start, the environment is automatically prepared:
1. Dependencies installed if needed
2. Quick command reference shown
3. Ready to develop

### Pre-commit Checks
Before each commit:
1. TypeScript type-checking
2. ESLint validation
3. Auto-fixes linting issues

### Development Integration
- Type-checking on file save (via settings)
- Linting suggestions in editor
- Test execution on demand

---

## Tips & Tricks

### 🚀 Fastest Setup
```bash
npm run dev:quick    # One command to start everything
```

### ✅ Before Pushing Code
```bash
npm run dev:check    # One command to verify everything
```

### 🔍 Debug Mock Data
```bash
// In any component:
const { data } = useTenants();
console.log('Mock data:', data);
```

### 📝 Add New Entity
1. `npm run add:mock` - get templates
2. Paste to `src/lib/mock-data.ts`
3. Paste to `src/hooks/use-queries.ts`
4. Use in components

### 🧪 Test New Feature
Mock data is always available:
```tsx
const { data } = useTenants();
// Instantly test with realistic data!
```

---

## When Ready for API

### 1. Create API Service
```ts
// src/services/api.ts
export const api = { /* ... */ };
```

### 2. Update Hook
```ts
// src/hooks/use-queries.ts
export function useTenants() {
  return {
    data: await api.tenants.list(),
    // ... same signature!
  };
}
```

### 3. No Component Changes Needed!
Components already use `useTenants()` - they don't care where data comes from.

---

## Troubleshooting

### Dependencies not installing?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 5173 in use?
```bash
npm run dev -- --port 3000
```

### TypeScript errors?
```bash
npm run type-check    # See detailed errors
```

### Linting issues?
```bash
npm run lint:fix      # Auto-fix
```

---

## Next Steps

1. ✅ Run `npm run dev` to start developing
2. 📖 Read DEVELOPMENT.md for detailed patterns
3. 📚 Check CLAUDE.md for architecture details
4. 🎯 Create first page: `npm run create:page`
5. 🧪 Test with mock data

---

**Happy coding! 🚀**

For questions, check:
- DEVELOPMENT.md - Development patterns
- CLAUDE.md - Architecture & conventions
- Existing code - Real examples
