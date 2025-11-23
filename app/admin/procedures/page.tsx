"use client";

import { useState, useEffect } from "react";

export const dynamic = "force-dynamic";

export default function AdminProceduresPage() {
  const [procedures, setProcedures] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("how-to");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("normal");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProcedures();
  }, []);

  const fetchProcedures = async () => {
    try {
      const response = await fetch("/api/admin/procedures");
      const data = await response.json();
      setProcedures(data);
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/admin/procedures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, content, priority }),
      });
      setTitle("");
      setContent("");
      fetchProcedures();
    } catch (error) {
      console.error("Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    try {
      await fetch(`/api/admin/procedures/${id}`, { method: "DELETE" });
      fetchProcedures();
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Manage Procedures</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="bg-slate-700 rounded-lg p-6 space-y-4 h-fit">
          <h2 className="text-lg font-semibold text-white">New Procedure</h2>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400"
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white"
          >
            <option value="emergency">Emergency</option>
            <option value="problem-solving">Problem Solving</option>
            <option value="best-practices">Best Practices</option>
            <option value="how-to">How-To</option>
          </select>

          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400 h-32"
            required
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white"
          >
            <option>normal</option>
            <option>high</option>
            <option>critical</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium"
          >
            Create
          </button>
        </form>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-4">Procedures ({procedures.length})</h2>
          {procedures.map((proc) => (
            <div key={proc.id} className="bg-slate-700 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{proc.title}</h3>
                  <p className="text-slate-400 text-sm">{proc.category}</p>
                </div>
                <button
                  onClick={() => handleDelete(proc.id)}
                  className="text-red-400 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
