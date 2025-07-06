'use client';
import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { signIn, signUp } from './actions';
import { ActionState } from '@/lib/auth/middleware';

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signin' ? signIn : signUp,
    { error: '' }
  );
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
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
        </div>
      </header>
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-card p-8 rounded-xl shadow-2xl border border-border transition-all duration-300 ease-in-out hover:shadow-3xl">
          <div className="flex justify-center mb-8">
            <Image
              src="/images/SustainlySymbol.png"
              alt="Sustainly Symbol"
              width={64}
              height={64}
              className="rounded-full shadow-md bg-white p-1"
              priority
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-heading font-bold text-primary-dark-blue">
            {mode === 'signin'
              ? 'Sign in to your account'
              : 'Create your account'}
          </h2>
          <form className="mt-8 space-y-6" action={formAction}>
            <input type="hidden" name="redirect" value={redirect || ''} />
            <input type="hidden" name="priceId" value={priceId || ''} />
            <input type="hidden" name="inviteId" value={inviteId || ''} />
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-body text-muted-foreground mb-1"
              >
                Email
              </Label>
              <div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={state.email}
                  required
                  maxLength={50}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-input placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring focus:z-10 sm:text-sm bg-input transition-all duration-200 ease-in-out"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-body text-muted-foreground mb-1"
              >
                Password
              </Label>
              <div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={
                    mode === 'signin' ? 'current-password' : 'new-password'
                  }
                  defaultValue={state.password}
                  required
                  minLength={8}
                  maxLength={100}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-input placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring focus:z-10 sm:text-sm bg-input transition-all duration-200 ease-in-out"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            {state && state.error && (
              <div className="text-destructive text-sm font-body mt-2">{state.error}</div>
            )}
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-full shadow-lg text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
                disabled={pending}
              >
                {pending ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Loading...
                  </>
                ) : mode === 'signin' ? (
                  'Sign in'
                ) : (
                  'Sign up'
                )}
              </Button>
            </div>
          </form>
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground font-body">
                  {mode === 'signin'
                    ? 'New to our platform?'
                    : 'Already have an account?'}
                </span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}${
                  redirect ? `?redirect=${redirect}` : ''
                }${priceId ? `&priceId=${priceId}` : ''}`}
                className="w-full flex justify-center py-2 px-4 border border-border rounded-full shadow-md text-sm font-semibold text-primary-dark-blue bg-primary-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
              >
                {mode === 'signin'
                  ? 'Create an account'
                  : 'Sign in to existing account'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
