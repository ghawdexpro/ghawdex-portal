import { auth } from "@/auth";
import { Sidebar } from "@/components/Sidebar";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex">
      <Sidebar role={session?.user?.role || "EMPLOYEE"} />
      <main className="flex-1 bg-gradient-to-br from-slate-900 to-slate-800">
        {children}
      </main>
    </div>
  );
}
