'use client';
import '../globals.css';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { gilroy, inter } from '../fonts';
import { SWRConfig } from 'swr';
import { ThemeProvider } from '@/lib/theme-context';
import { useActionState } from 'react';
import { signOut } from '@/app/(login)/actions';
import useSWR from 'swr';

interface UserSession {
  id: string;
  name?: string | null;
  email?: string | null;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: user } = useSWR<UserSession | null>('/api/user', fetcher);
  const isAuthenticated = !!user;
  const [signoutState, signoutAction, isSignoutPending] = useActionState(signOut, null);

  return (
    <html lang="en" className={`${inter.variable} ${gilroy.variable}`} suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === 'production' && (
          <>
            <link
              rel="preload"
              href="/fonts/Gilroy-Bold.woff2"
              as="font"
              type="font/woff2"
              crossOrigin="anonymous"
            />
            <link
              rel="preload"
              href="/fonts/Gilroy-SemiBold.woff2"
              as="font"
              type="font/woff2"
              crossOrigin="anonymous"
            />
          </>
        )}
      </head>
      <body className={`font-body min-h-[100dvh]`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SWRConfig
            value={{
              fallback: {},
              revalidateOnFocus: false,
            }}
          >
            <section className="flex flex-col min-h-screen">
              <header className="border-b border-border bg-primary-dark-blue text-primary-foreground">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                  <Link className="flex items-center" href="/">
                    <Image
                      src="/images/sustainly-logo.png"
                      alt="Sustainly Logo"
                      width={160}
                      height={40}
                      className="h-auto"
                      priority
                    />
                  </Link>
                  <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                      <form action={signoutAction}>
                        <Button
                          type="submit"
                          variant="outline"
                          className="bg-primary-white text-primary-dark-blue border-primary-white hover:bg-gray-100 hover:text-primary-dark-blue font-semibold rounded-full"
                          disabled={isSignoutPending}
                        >
                          {isSignoutPending ? 'Signing Out...' : 'Sign Out'}
                        </Button>
                      </form>
                    ) : (
                      <Link href="/sign-in" passHref>
                        <Button
                          variant="outline"
                          className="bg-primary-white text-primary-dark-blue border-primary-white hover:bg-gray-100 hover:text-primary-dark-blue font-semibold rounded-full"
                        >
                          Sign Up
                        </Button>
                      </Link>
                    )}
                    {isAuthenticated && (
                      <button type="button" id="radix-avatar-trigger" aria-haspopup="menu" aria-expanded="false" data-state="closed" data-slot="dropdown-menu-trigger">
                        <span data-slot="avatar" className="relative flex shrink-0 overflow-hidden rounded-full cursor-pointer size-9">
                          <span data-slot="avatar-fallback" className="bg-muted flex size-full items-center justify-center rounded-full text-muted-foreground">
                            {user?.name ? user.name[0].toUpperCase() : (user?.email ? user.email[0].toUpperCase() : 'U')}
                          </span>
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </header>
              {children}
            </section>
          </SWRConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
