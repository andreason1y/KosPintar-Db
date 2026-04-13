#!/bin/bash

# Session start hook for KosPintar
# Initializes development environment

echo "🚀 KosPintar Development Environment"
echo "===================================="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Check Node version
echo "✅ Node version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Show quick commands
echo ""
echo "📚 Quick Commands:"
echo "  npm run dev          - Start dev server"
echo "  npm run type-check   - Check types"
echo "  npm run lint         - Check linting"
echo "  npm run test         - Run tests"
echo "  npm run dev:check    - Full quality check"
echo ""
echo "🎯 Generators:"
echo "  npm run create:page  - Create new page"
echo "  npm run add:route    - Add route"
echo "  npm run add:mock     - Add mock data"
echo ""
echo "📖 Documentation:"
echo "  DEVELOPMENT.md       - Development guide"
echo "  CLAUDE.md           - Architecture guide"
echo ""
echo "✨ Ready to develop! Run: npm run dev"
