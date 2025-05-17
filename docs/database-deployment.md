# Database Deployment with Vercel

This document outlines how to handle database migrations when deploying to staging and production environments using Vercel.

## Environment Setup

The application uses PostgreSQL with Prisma ORM. The database connection string is set via the `CALQULATION_DB_POSTGRES_PRISMA_URL` environment variable.

For different environments:
- Development: Local PostgreSQL or development database
- Staging: Automatically deployed when merging to the stage branch
- Production: Automatically deployed when merging the stage branch to main

## How Migrations Work in Vercel

Prisma migrations are managed in the `prisma/migrations` folder. The process is:

1. **New migrations are created in development** with `npx prisma migrate dev`
2. **Migrations are applied automatically** during Vercel builds via the modified build script:
   ```json
   "build": "prisma generate && npm run db:init && next build"
   ```

This ensures that:
- Prisma client is generated fresh
- Database schema is properly set up (even for new databases)
- Then the Next.js application is built

## First-Time Database Setup

When deploying to a brand new database (like your initial staging or production deployment), the application will:

1. Try to apply existing migrations using `prisma migrate deploy`
2. If that fails, it will fall back to `prisma db push` to set up the initial schema
3. This is handled automatically by the `db:init` script in package.json

**Note about First Deployments**:
- For completely new databases, the first deployment might take longer as it creates all tables
- The `scripts/init-database.ts` script handles automatic fallback for new databases
- Future schema changes will then use the normal migration process

## Handling Schema Changes

When making changes to the database schema:

1. Always make changes in development first
2. Run `npx prisma migrate dev --name descriptive_name` to create a migration
3. Test the changes thoroughly
4. Commit the new migration files to your repository
5. When you merge to stage/main, Vercel will automatically:
   - Run the migrations during build
   - Deploy the updated application

## Troubleshooting Migration Issues

If migrations are timing out during deployment:

1. **Test your database connection**:
   ```bash
   npm run test:db
   ```
   This runs a script that tests connectivity to your database and provides detailed error information.

2. **Common issues**:
   - **Database access restrictions**: Make sure Vercel's IP addresses are allowed to access your database
   - **Connection timeouts**: Check if your database is in a region far from your Vercel deployment
   - **Permission issues**: Ensure your database user has permission to create and alter tables

3. **Working around migration issues**:
   - If migrations consistently fail during build, you can run them manually:
     ```bash
     npx prisma migrate deploy
     ```
   - Then update your `package.json` to skip migrations during build:
     ```json
     "build": "prisma generate && next build"
     ```

## Database Permissions

For Prisma migrations to work, your database user needs the following permissions:
- `CREATE TABLE`
- `ALTER TABLE`
- `DROP TABLE`
- `CREATE INDEX`
- `DROP INDEX`
- `INSERT`, `SELECT`, `UPDATE`, `DELETE`

## Network Access for Supabase

If you're using Supabase, you might need to add Vercel's IPs to your allowed IP list:
1. Go to your Supabase project dashboard
2. Navigate to Settings > Database
3. Scroll to "Network Restrictions"
4. Add Vercel's IP addresses (check Vercel documentation for current IPs)

## Vercel Environment Variables

Make sure to set the following environment variables in your Vercel project:
- `CALQULATION_DB_POSTGRES_PRISMA_URL` - Set different values for Production, Preview (staging), and Development

## Important Notes

- **Never run `prisma migrate dev` in production** - it can reset your database
- The automated process uses `prisma migrate deploy` which only applies existing migrations
- Always back up your production database before merging to main
- The migration process is fully automated - you don't need to run any manual migration commands
