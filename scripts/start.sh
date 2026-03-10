#!/bin/bash

# Push schema to database on startup (NODE_ENV=development bypasses production guard)
if [ -n "$DATABASE_URI" ]; then
  echo "Initializing database schema..."
  NODE_ENV=development npx tsx scripts/init-db.ts 2>&1 || echo "Schema push skipped or already up to date."
fi

# Start Next.js
echo "Starting Next.js..."
exec npm start
