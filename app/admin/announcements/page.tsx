"use client";

import { useState, useEffect } from "react";

export const dynamic = "force-dynamic";

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  priority: string;
  createdAt: string;
}

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [priority, setPriority] = useState("normal");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("/api/admin/announcements");
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, author, priority }),
      });

      if (response.ok) {
        setTitle("");
        setContent("");
        setAuthor("");
        setPriority("normal");
        setMessage("Announcement created successfully!");
        fetchAnnouncements();
      } else {
        setMessage("Failed to create announcement.");
      }
    } catch (error) {
      setMessage("Error creating announcement.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/admin/announcements/${id}`, { method: "DELETE" });
      fetchAnnouncements();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Manage Announcements</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-slate-700 rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white">New Announcement</h2>

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400"
              required
            />

            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400 h-24"
              required
            />

            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400"
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white"
            >
              <option>normal</option>
              <option>high</option>
              <option>urgent</option>
            </select>

            {message && (
              <div
                className={`p-3 rounded text-sm ${
                  message.includes("success")
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="space-y-4">
            {announcements.map((ann: any) => (
              <div key={ann.id} className="bg-slate-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-white font-semibold">{ann.title}</h3>
                    <p className="text-slate-400 text-sm">{ann.content}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(ann.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-slate-500 text-xs">
                  By {ann.author} • {new Date(ann.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
