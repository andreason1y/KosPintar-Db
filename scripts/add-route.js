#!/usr/bin/env node

/**
 * Add a new route to appropriate routes file
 * Usage: npm run add:route
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

async function addRoute() {
  console.log("\n🚀 Add New Route\n");

  const routePath = await question("Route path (e.g., /penyewa): ");
  const componentName = await question("Component name (e.g., TenantsPage): ");
  const routeType = await question(
    "Route type (public/private/admin)? [default: private]: "
  ) || "private";

  if (!["public", "private", "admin"].includes(routeType)) {
    console.error("❌ Invalid route type. Must be public, private, or admin.");
    rl.close();
    process.exit(1);
  }

  const routeFile = path.join(
    __dirname,
    "..",
    "src",
    "routes",
    `${routeType}.routes.ts`
  );

  if (!fs.existsSync(routeFile)) {
    console.error(`❌ Routes file not found: ${routeFile}`);
    rl.close();
    process.exit(1);
  }

  // Read current routes file
  let content = fs.readFileSync(routeFile, "utf-8");

  // Create new route entry
  const newRoute = `  {
    path: "${routePath}",
    element: <${componentName} />,
  },`;

  // Find the end of the routes array and add the new route
  const routesArrayEnd = content.lastIndexOf("]");
  if (routesArrayEnd === -1) {
    console.error("❌ Could not find routes array in file");
    rl.close();
    process.exit(1);
  }

  // Insert new route before the closing bracket
  content = content.slice(0, routesArrayEnd) + "  " + newRoute + "\n" + content.slice(routesArrayEnd);

  // Write updated file
  fs.writeFileSync(routeFile, content);

  console.log(`\n✅ Route added to src/routes/${routeType}.routes.ts`);
  console.log(`\n📝 Make sure to import ${componentName} at the top of the file!`);
  console.log(`\n   import ${componentName} from "@/pages/${componentName}";\n`);

  rl.close();
}

addRoute().catch((err) => {
  console.error("❌ Error:", err.message);
  rl.close();
  process.exit(1);
});
