import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { eq, isNull } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const userResult = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .limit(1);

        const user = userResult[0];

        if (!user || user.deletedAt !== null) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!passwordMatch) return null;

        return {
          id: user.id.toString(), 
          name: user.name ?? undefined,
          email: user.email
        };
      }
    })
  ],

  pages: {
    signIn: '/sign-in'
  },

  session: {
    strategy: 'jwt'
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    }
  },

  secret: process.env.AUTH_SECRET
};
