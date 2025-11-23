"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getDB } from "@/lib/db";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [session, setSession] = useState<any>(null);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          router.push("/login");
          return;
        }

        setSession(session);

        // Fetch announcements
        try {
          const response = await fetch("/api/calendar");
          if (response.ok) {
            const data = await response.json();
            // For now, we'll just set empty announcements since the API structure changed
            setAnnouncements([]);
          }
        } catch (err) {
          console.error("Failed to fetch announcements:", err);
        }

        setLoading(false);
      } catch (err) {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome, {session.user.email}!
        </h1>
        <p className="text-slate-400">
          You're logged in as <span className="font-semibold">{session.user.email}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Link
          href="/company"
          className="p-6 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors group"
        >
          <div className="text-3xl mb-2">🏢</div>
          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400">
            Company Info
          </h3>
          <p className="text-slate-400 text-sm">Mission, vision & organization</p>
        </Link>

        <Link
          href="/team"
          className="p-6 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors group"
        >
          <div className="text-3xl mb-2">👥</div>
          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400">
            Team Directory
          </h3>
          <p className="text-slate-400 text-sm">Meet your colleagues</p>
        </Link>

        <Link
          href="/policies"
          className="p-6 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors group"
        >
          <div className="text-3xl mb-2">📋</div>
          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400">
            Policies
          </h3>
          <p className="text-slate-400 text-sm">Employee handbook & guidelines</p>
        </Link>

        <Link
          href="/goals"
          className="p-6 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors group"
        >
          <div className="text-3xl mb-2">🎯</div>
          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400">
            Goals
          </h3>
          <p className="text-slate-400 text-sm">Company & team objectives</p>
        </Link>

        <Link
          href="/procedures"
          className="p-6 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors group"
        >
          <div className="text-3xl mb-2">📝</div>
          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400">
            Procedures
          </h3>
          <p className="text-slate-400 text-sm">Workflows & best practices</p>
        </Link>

        <Link
          href="/wiki"
          className="p-6 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors group"
        >
          <div className="text-3xl mb-2">📚</div>
          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400">
            Engineering Wiki
          </h3>
          <p className="text-slate-400 text-sm">Project documentation</p>
        </Link>

        <Link
          href="/calendar"
          className="p-6 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors group"
        >
          <div className="text-3xl mb-2">📅</div>
          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400">
            Master Calendar
          </h3>
          <p className="text-slate-400 text-sm">Events & important dates</p>
        </Link>

        <Link
          href="/culture"
          className="p-6 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors group"
        >
          <div className="text-3xl mb-2">🎯</div>
          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400">
            Company Culture
          </h3>
          <p className="text-slate-400 text-sm">Tools & philosophies</p>
        </Link>
      </div>

      {announcements.length > 0 && (
        <div className="bg-slate-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Recent Announcements</h2>
          <div className="space-y-4">
            {announcements.map((announcement: any) => (
              <div
                key={announcement.id}
                className="p-4 bg-slate-800 rounded-lg border-l-4 border-blue-500"
              >
                <h3 className="text-lg font-semibold text-white">{announcement.title}</h3>
                <p className="text-slate-300 text-sm mt-1">{announcement.content}</p>
                <p className="text-slate-500 text-xs mt-2">
                  By {announcement.author} • {new Date(announcement.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
