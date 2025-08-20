import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to NewStream
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A modern SaaS platform built with Next.js 15, Supabase, and Vercel
            <br />
            <span className="text-sm text-green-600">
              ✅ CI/CD Pipeline Active
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>🚀 Next.js 15</CardTitle>
              <CardDescription>
                Latest React framework with App Router
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Built with TypeScript, Tailwind CSS, and modern React patterns
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>⚡ Supabase</CardTitle>
              <CardDescription>Backend as a Service</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Database, authentication, and real-time subscriptions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎨 shadcn/ui</CardTitle>
              <CardDescription>Beautiful UI components</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Re-usable components built with Radix UI and Tailwind CSS
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12 space-x-4">
          <Button asChild size="lg">
            <Link href="/auth/login">Get Started</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/auth/register">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
