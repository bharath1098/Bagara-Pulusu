import fs from "fs";
import path from "path";

function loadEnvFiles() {
  for (const name of [".env", ".env.local"]) {
    const file = path.join(process.cwd(), name);
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      if (process.env[m[1]] == null) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
      }
    }
  }
}

loadEnvFiles();

if (!process.env.TURSO_DATABASE_URL?.startsWith("libsql://")) {
  console.error("TURSO_DATABASE_URL not set in .env");
  process.exit(1);
}

const { resetStore, getTables } = await import("../src/lib/store");
const store = await resetStore();
const tables = await getTables();
console.log(
  `Seeded Turso with ${tables.length} tables:`,
  tables.map((t) => t.label).join(", "),
);
console.log(`Menu items: ${store.menu.length}, staff: ${store.staff.length}`);
