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
   "build": "prisma generate && prisma migrate deploy && next build"
   ```

This ensures that:
- Prisma client is generated fresh
- Database migrations are applied 
- Then the Next.js application is built

## Handling Schema Changes

When making changes to the database schema:

1. Always make changes in development first
2. Run `npx prisma migrate dev --name descriptive_name` to create a migration
3. Test the changes thoroughly
4. Commit the new migration files to your repository
5. When you merge to stage/main, Vercel will automatically:
   - Run the migrations during build
   - Deploy the updated application

## Vercel Environment Variables

Make sure to set the following environment variables in your Vercel project:
- `CALQULATION_DB_POSTGRES_PRISMA_URL` - Set different values for Production, Preview (staging), and Development

## Important Notes

- **Never run `prisma migrate dev` in production** - it can reset your database
- The automated process uses `prisma migrate deploy` which only applies existing migrations
- Always back up your production database before merging to main
- The migration process is fully automated - you don't need to run any manual migration commands
