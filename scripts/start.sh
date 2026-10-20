#!/bin/bash
set -e

# Apply database migrations (production-safe; replaces the old dev-mode schema push).
if [ -n "$DATABASE_URI" ]; then
  echo "Running database migrations..."
  npm run payload -- migrate
fi

echo "Starting Next.js..."
exec npm start
