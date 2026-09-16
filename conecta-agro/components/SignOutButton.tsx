"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="mt-4 w-full rounded-2xl border-2 border-red-400 bg-white hover:bg-red-50/70 active:bg-red-100 py-3.5 text-center text-sm font-bold text-red-500 shadow-xs transition-all active:scale-[0.99]"
    >
      Sair
    </button>
  );
}
