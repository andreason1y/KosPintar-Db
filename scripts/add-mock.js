#!/usr/bin/env node

/**
 * Add a new mock data entity
 * Usage: npm run add:mock
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

async function addMock() {
  console.log("\n🚀 Add Mock Data Entity\n");

  const entityName = await question("Entity name (e.g., Tenant, Room): ");
  const pluralName = await question("Plural name (e.g., Tenants, Rooms): ");
  const hasPropertyFilter = await question(
    "Filter by property_id? (yes/no) [default: yes]: "
  ) || "yes";

  const mockFile = path.join(__dirname, "..", "src", "lib", "mock-data.ts");

  if (!fs.existsSync(mockFile)) {
    console.error("❌ mock-data.ts not found!");
    rl.close();
    process.exit(1);
  }

  const entityNameCamelCase = entityName.charAt(0).toUpperCase() + entityName.slice(1);
  const mockConstName = `MOCK_${entityName.toUpperCase()}S`;
  const interfaceName = entityNameCamelCase;

  // Create interface template
  const interfaceTemplate = `export interface ${interfaceName} {
  id: string;
  ${hasPropertyFilter.toLowerCase() === "yes" ? "property_id: string;" : ""}
  name: string;
  created_at: string;
  // TODO: Add more fields
}`;

  // Create mock data template
  const mockDataTemplate = `export const ${mockConstName}: ${interfaceName}[] = [
  {
    id: "${entityName.toLowerCase()}-001",
    ${hasPropertyFilter.toLowerCase() === "yes" ? 'property_id: "prop-001",' : ""}
    name: "Example ${entityName}",
    created_at: new Date().toISOString(),
  },
  // TODO: Add more entries
];`;

  // Create hook template
  const hookTemplate = `export function use${pluralName}() {
  const { activeProperty } = useProperty();
  ${hasPropertyFilter.toLowerCase() === "yes"
      ? `
  if (!activeProperty) {
    return { data: [], isLoading: false, error: null };
  }

  const data = ${mockConstName}.filter(e => e.property_id === activeProperty.id);`
      : `
  const data = ${mockConstName};`
    }

  return {
    data,
    isLoading: false,
    error: null,
  };
}`;

  console.log(`\n📝 Add this to src/lib/mock-data.ts:\n`);
  console.log("--- INTERFACE ---");
  console.log(interfaceTemplate);
  console.log("\n--- MOCK DATA ---");
  console.log(mockDataTemplate);

  console.log(`\n\n📝 Add this to src/hooks/use-queries.ts:\n`);
  console.log("--- HOOK ---");
  console.log(hookTemplate);

  console.log(`\n\n✅ Done! Manual steps:`);
  console.log(`1. Copy interface to lib/mock-data.ts`);
  console.log(`2. Copy mock data to lib/mock-data.ts`);
  console.log(`3. Copy hook to hooks/use-queries.ts`);
  console.log(`4. Use in components: const { data } = use${pluralName}();\n`);

  rl.close();
}

addMock().catch((err) => {
  console.error("❌ Error:", err.message);
  rl.close();
  process.exit(1);
});
