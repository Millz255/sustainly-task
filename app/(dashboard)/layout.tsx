'use client';
import '../globals.css';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { gilroy, inter } from '../fonts';
import { SWRConfig } from 'swr';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { useActionState } from 'react';
import { signOut } from '@/app/(login)/actions';
import useSWR from 'swr';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Users, Settings, Shield, Activity, LayoutDashboard, LogOut } from 'lucide-react'; 
import React from 'react';

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

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/team', icon: Users, label: 'Team' },
    { href: '/dashboard/general', icon: Settings, label: 'General' },
    { href: '/dashboard/activity', icon: Activity, label: 'Activity' },
    { href: '/dashboard/security', icon: Shield, label: 'Security' },
    { href: '#', icon: LogOut, label: 'Sign Out', type: 'signout' },
  ];

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
                    {isAuthenticated && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button type="button" id="radix-avatar-trigger" aria-haspopup="menu" aria-expanded="false" data-state="closed" data-slot="dropdown-menu-trigger">
                            <span data-slot="avatar" className="relative flex shrink-0 overflow-hidden rounded-full cursor-pointer size-9">
                              <span data-slot="avatar-fallback" className="bg-muted flex size-full items-center justify-center rounded-full text-muted-foreground">
                                {user?.name ? user.name[0].toUpperCase() : (user?.email ? user.email[0].toUpperCase() : 'U')}
                              </span>
                            </span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                          {navItems.map((item, index) => (
                            <React.Fragment key={item.label}>
                              {item.type === 'signout' ? (
                                <form action={signoutAction}>
                                  <DropdownMenuItem asChild>
                                    <button type="submit" disabled={isSignoutPending} className="w-full flex items-center justify-start text-left">
                                      <item.icon className="mr-2 h-4 w-4" />
                                      {isSignoutPending ? 'Signing Out...' : 'Sign Out'}
                                    </button>
                                  </DropdownMenuItem>
                                </form>
                              ) : (
                                <Link href={item.href} passHref>
                                  <DropdownMenuItem>
                                    <item.icon className="mr-2 h-4 w-4" />
                                    <span>{item.label}</span>
                                  </DropdownMenuItem>
                                </Link>
                              )}
                              {item.label === 'Dashboard' && <DropdownMenuSeparator />}
                              {index === navItems.length - 2 && <DropdownMenuSeparator />}
                            </React.Fragment>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
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
