// This file helps diagnose database connection issues during deployment
// It tries to connect to the database and logs detailed error information

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

async function testConnection() {
  console.log('Testing database connection...');
  const startTime = Date.now();
  
  try {
    const prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
    
    // Try basic connection
    console.log('Attempting database connection...');
    await prisma.$connect();
    console.log('Successfully connected to database!');
    
    // Try a simple query
    console.log('Attempting to run test query...');
    const result = await prisma.$executeRaw`SELECT 1 as test`;
    console.log('Query result:', result);
    
    await prisma.$disconnect();
    console.log(`Database connection test successful! (${Date.now() - startTime}ms)`);
    return true;
  } catch (error) {
    console.error('Database connection failed:');
    console.error(error);
    
    // Log more details about the error
    if (error.message) {
      console.error('Error message:', error.message);
    }
    
    if (error.code) {
      console.error('Error code:', error.code);
      
      // Common error codes and their meanings
      const errorCodes = {
        'P1001': 'Cannot reach database server',
        'P1002': 'Database server rejected the connection',
        'P1003': 'Database does not exist',
        'P1009': 'Database already exists',
        'P1010': 'User does not exist',
        'P1011': 'Incorrect password',
        'P1012': 'Insufficient permissions',
        'P1013': 'Database already exists',
        'P1014': 'Underlying database not found',
        'P1015': 'Database server is timing out',
      };
      
      if (errorCodes[error.code]) {
        console.error('Error meaning:', errorCodes[error.code]);
      }
    }
    
    console.error(`Database connection test failed after ${Date.now() - startTime}ms`);
    return false;
  }
}

// Run the test
testConnection()
  .then((success) => {
    if (success) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('Unexpected error during connection test:', error);
    process.exit(1);
  });
