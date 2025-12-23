"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="max-w-md w-full glass border-destructive/20 rounded-2xl">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>

          <h2 className="text-2xl font-bold text-foreground">
            Authentication Error
          </h2>
          <p className="text-muted-foreground">
            We encountered an issue while verifying your account. The link may
            have expired or is invalid.
          </p>

          <Button asChild className="w-full h-12">
            <Link href="/login">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Return to Login
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
