"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

interface SidebarProps {
  role: string;
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const isActive = (path: string) => pathname === path;

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      setIsSigningOut(false);
    }
  };

  const baseLinks = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/company", label: "Company Info", icon: "🏢" },
    { href: "/team", label: "Team Directory", icon: "👥" },
    { href: "/policies", label: "Policies", icon: "📋" },
    { href: "/goals", label: "Goals", icon: "🎯" },
    { href: "/procedures", label: "Procedures", icon: "📝" },
    { href: "/culture", label: "Culture & Tools", icon: "🛠" },
    { href: "/wiki", label: "Engineering Wiki", icon: "📚" },
  ];

  const adminLinks = role === "ADMIN" ? [
    { href: "/admin", label: "Admin Panel", icon: "⚙️" },
  ] : [];

  const allLinks = [...baseLinks, ...adminLinks];

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 h-screen overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white">GhawdeX Portal</h2>
      </div>

      <nav className="px-4 space-y-2">
        {allLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2 rounded-lg transition-colors ${
              isActive(link.href)
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            <span className="mr-2">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg transition-colors text-sm font-medium"
        >
          {isSigningOut ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    </aside>
  );
}
