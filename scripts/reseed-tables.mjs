import fs from "fs";
import path from "path";
import { createClient } from "@libsql/client";

function loadEnvFiles() {
  const out = {};
  for (const name of [".env", ".env.local"]) {
    const file = path.join(process.cwd(), name);
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      out[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
  return out;
}

const TABLES = Array.from({ length: 5 }, (_, i) => {
  const n = i + 1;
  return {
    id: `bagara-I${n}`,
    label: `Table ${n}`,
    section: "indoor",
    number: n,
  };
});

async function reseed(label, url, authToken) {
  const client = createClient({ url, authToken });
  console.log(`Reseeding tables on ${label}...`);

  const existing = await client.execute(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='tables'",
  );
  if (!existing.rows.length) {
    console.log(`  ${label}: schema not ready — start the app once, then re-run this script.`);
    client.close();
    return;
  }

  await client.executeMultiple(`
    DELETE FROM cart_lines;
    DELETE FROM order_lines;
    DELETE FROM order_batches;
    DELETE FROM session_members;
    DELETE FROM sessions;
    DELETE FROM tables;
  `);

  for (let i = 0; i < TABLES.length; i++) {
    const t = TABLES[i];
    await client.execute({
      sql: `INSERT INTO tables (id, label, section, number, assigned_waiter_id, sort_order)
            VALUES (?, ?, ?, ?, NULL, ?)`,
      args: [t.id, t.label, t.section, t.number, i],
    });
  }

  const count = await client.execute("SELECT COUNT(*) AS c FROM tables");
  console.log(`  ${label}: tables=${count.rows[0].c ?? count.rows[0][0]}`);
  client.close();
}

const env = loadEnvFiles();
const localPath = path.join(process.cwd(), "data", "bagara.db");
const localUrl = `file:${localPath.replace(/\\/g, "/")}`;

if (fs.existsSync(localPath)) {
  await reseed("local file", localUrl);
} else {
  console.log("Local data/bagara.db not found — skipped.");
}

if (env.TURSO_DATABASE_URL?.startsWith("libsql://")) {
  await reseed("Turso", env.TURSO_DATABASE_URL, env.TURSO_AUTH_TOKEN);
} else {
  console.log("Turso URL not set — skipped remote reseed.");
}

console.log("Done. Restart npm run dev so the memory cache reloads.");
