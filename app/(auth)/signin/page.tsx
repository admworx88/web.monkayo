import Link from 'next/link';
import { SignInForm } from '@/components/auth/signin-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | SaaS Platform',
  description: 'Sign in to your account',
};

export default function SignInPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      <SignInForm />

      <div className="text-center text-sm">
        Don't have an account?{' '}
        <Link href="/signup" className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
