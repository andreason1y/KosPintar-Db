#!/bin/bash

# Pre-commit hook for KosPintar
# Runs quality checks before allowing commits

echo "🔍 Running pre-commit checks..."

# Check TypeScript
echo "📝 Type checking..."
npm run type-check || {
  echo "❌ TypeScript errors found"
  exit 1
}

# Check linting
echo "🔧 Linting..."
npm run lint || {
  echo "⚠️  Linting issues found. Auto-fixing..."
  npm run lint:fix
}

echo "✅ Pre-commit checks passed!"
exit 0
