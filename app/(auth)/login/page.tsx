"use client";

import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={signInWithGoogle}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Sign in with Google
      </button>
    </div>
  );
}