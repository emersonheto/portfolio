#!/bin/bash

# Run migrations if DATABASE_URI is set
if [ -n "$DATABASE_URI" ]; then
  echo "Running Payload migrations..."
  npm run db:migrate || echo "Migration failed or not needed, continuing..."
fi

# Start Next.js
echo "Starting Next.js..."
exec npm start
