'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { OAuthButtons } from './oauth-buttons';
import { signInWithPassword, signInWithMagicLink } from '@/app/(auth)/actions';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Loading...' : children}
    </Button>
  );
}

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordSubmit = async (formData: FormData) => {
    const result = await signInWithPassword(formData);
    if (result?.error) {
      toast.error(result.error);
    }
  };

  const handleMagicLinkSubmit = async (formData: FormData) => {
    const result = await signInWithMagicLink(formData);
    if (result?.error) {
      toast.error(result.error);
    } else if (result?.success) {
      toast.success(result.message);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="password" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="magic-link">Magic Link</TabsTrigger>
        </TabsList>

        <TabsContent value="password">
          <form action={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <SubmitButton>Sign In</SubmitButton>
          </form>
        </TabsContent>

        <TabsContent value="magic-link">
          <form action={handleMagicLinkSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="magic-email">Email</Label>
              <Input
                id="magic-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <p className="text-sm text-muted-foreground">
              We'll send you a magic link to sign in without a password.
            </p>
            <SubmitButton>Send Magic Link</SubmitButton>
          </form>
        </TabsContent>
      </Tabs>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <OAuthButtons />
    </div>
  );
}
