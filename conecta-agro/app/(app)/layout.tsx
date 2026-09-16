import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BottomNav from "@/components/BottomNav";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen w-full bg-neutral-900 flex justify-center items-center md:py-6">
      <div className="w-full max-w-md min-h-screen md:min-h-[844px] md:max-h-[920px] bg-white shadow-2xl md:rounded-3xl md:border md:border-neutral-800 flex flex-col overflow-y-auto relative text-neutral-900">
        <div className="flex-1 pb-2">{children}</div>
        <BottomNav />
      </div>
    </div>
  );
}
