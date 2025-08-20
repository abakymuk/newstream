"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const isResetFlow = searchParams.get("type") === "recovery";

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send reset email");
      }

      setSuccess(true);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to send reset email"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target as HTMLFormElement);
    const password = formData.get("password") as string;

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        throw new Error(error.message);
      }

      setSuccess(true);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Success!</CardTitle>
            <CardDescription>
              {isResetFlow
                ? "Your password has been updated successfully. You can now sign in with your new password."
                : "Password reset email sent successfully. Check your email for further instructions."}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/auth/login">
              <Button>Back to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>
            {isResetFlow ? "Update Password" : "Reset Password"}
          </CardTitle>
          <CardDescription>
            {isResetFlow
              ? "Enter your new password below"
              : "Enter your email address and we will send you a reset link"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isResetFlow ? (
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your new password"
                  required
                  minLength={6}
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          )}
          <div className="mt-4 text-center text-sm">
            Remember your password?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
