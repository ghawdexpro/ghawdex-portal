import { Sidebar } from "@/components/Sidebar";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth checking is done in the page component
  const role = "EMPLOYEE"; // Default role, overridden in pages

  return (
    <div className="flex">
      <Sidebar role={role} />
      <main className="flex-1 bg-gradient-to-br from-slate-900 to-slate-800">
        {children}
      </main>
    </div>
  );
}
