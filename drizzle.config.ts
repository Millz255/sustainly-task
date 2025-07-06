// NO import 'dotenv/config'; here
import type { Config } from 'drizzle-kit';

const url = process.env.POSTGRES_URL; // Remove the '!' as we'll handle the undefined case explicitly

if (!url) {
  throw new Error('POSTGRES_URL is not defined in the environment variables.');
}

// A safer, more flexible regex for PostgreSQL URLs
const regex = /^postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)$/;
const match = url.match(regex);

if (!match) {
  throw new Error('Invalid POSTGRES_URL format. It does not match the expected pattern.');
}

const [, user, password, host, port, database] = match;

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host,
    port: Number(port),
    user,
    password: decodeURIComponent(password),
    database,
  },
} satisfies Config;

console.log('POSTGRES_URL (from config):', process.env.POSTGRES_URL);