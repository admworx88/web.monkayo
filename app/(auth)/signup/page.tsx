import Link from 'next/link';
import { SignUpForm } from '@/components/auth/signup-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | SaaS Platform',
  description: 'Create a new account',
};

export default function SignUpPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-muted-foreground">
          Get started with your free account today
        </p>
      </div>

      <SignUpForm />

      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link href="/signin" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
