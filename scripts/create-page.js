#!/usr/bin/env node

/**
 * Create a new page with boilerplate
 * Usage: npm run create:page
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function createPage() {
  console.log("\n🚀 Create New Page\n");

  const pageName = await question("Page name (e.g., Tenants): ");
  const routePath = await question("Route path (e.g., /penyewa): ");
  const needsAuth = await question("Requires authentication? (yes/no): ");

  const pageFileName = pageName.replace(/\s+/g, "");
  const pagePath = path.join(__dirname, "..", "src", "pages", `${pageFileName}.tsx`);

  if (fs.existsSync(pagePath)) {
    console.error(`❌ Page ${pageFileName}.tsx already exists!`);
    rl.close();
    process.exit(1);
  }

  // Template based on auth requirement
  const authImports = needsAuth.toLowerCase() === "yes"
    ? `import { AuthGuard } from "@/guards/AuthGuard";\n`
    : "";

  const template = `import React from "react";

${authImports}/**
 * ${pageFileName} Page
 * Route: ${routePath}
 */
export function ${pageFileName}Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">${pageName}</h1>
        <p className="text-muted-foreground">
          Mulai develop halaman ${pageName} di sini
        </p>
      </div>

      {/* TODO: Add your content here */}
      <div className="rounded-lg border border-border p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Halaman ini siap untuk di-develop dengan mock data!
        </p>
      </div>
    </div>
  );
}

export default ${pageFileName}Page;
`;

  // Write file
  fs.writeFileSync(pagePath, template);

  console.log(`\n✅ Created: src/pages/${pageFileName}.tsx`);
  console.log(`\n📝 Next steps:`);
  console.log(`1. Add route to src/routes/${needsAuth.toLowerCase() === "yes" ? "private" : "public"}.routes.ts:`);
  console.log(`\n   {`);
  console.log(`     path: "${routePath}",`);
  console.log(`     element: <${pageFileName}Page />,`);
  console.log(`   },\n`);
  console.log(`2. Add navigation link if needed`);
  console.log(`3. Start using mock data hooks:\n`);
  console.log(`   import { useTenants } from "@/hooks/use-queries";\n`);

  rl.close();
}

createPage().catch((err) => {
  console.error("❌ Error:", err.message);
  rl.close();
  process.exit(1);
});
