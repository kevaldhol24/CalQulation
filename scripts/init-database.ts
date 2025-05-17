#!/usr/bin/env tsx

// This script is specifically designed for initializing a new database in staging/production
// It tries Prisma migrations first, but falls back to prisma db push if migrations fail
// This is particularly useful for the first deployment to a new database

import { execSync } from 'child_process';
import * as fs from 'fs';

function logStep(message: string) {
  console.log(`\n=== ${message} ===\n`);
}

async function initializeDatabase() {
  logStep('Starting database initialization');
  
  try {
    // Try normal migration deploy first
    logStep('Attempting standard migration deploy');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    logStep('Migration deploy successful!');
    return true;
  } catch (error) {
    logStep('Migration deploy failed, falling back to db push');
    console.error('Migration error details:');
    console.error(error);
    
    try {
      // If migrations fail, try db push as a fallback for new databases
      logStep('Attempting db push as fallback');
      execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });
      logStep('Database initialization with db push successful!');
      
      // Create a marker in migrations to indicate we used db push
      const migrationDir = './prisma/migrations';
      if (!fs.existsSync(`${migrationDir}/db_push_used.txt`)) {
        fs.writeFileSync(
          `${migrationDir}/db_push_used.txt`, 
          `This database was initially set up with 'prisma db push' on ${new Date().toISOString()}\n` +
          `This was done because the normal migration process failed during initial deployment.\n` +
          `Future schema changes should use proper migrations.`
        );
      }
      
      return true;
    } catch (pushError) {
      logStep('Database initialization failed completely');
      console.error('db push error details:');
      console.error(pushError);
      return false;
    }
  }
}

// Run the initialization
initializeDatabase()
  .then((success) => {
    if (success) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('Unexpected error during database initialization:', error);
    process.exit(1);
  });
