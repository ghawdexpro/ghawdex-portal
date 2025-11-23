"use client";

import { useState, useEffect } from "react";

export const dynamic = "force-dynamic";

interface Policy {
  id: string;
  title: string;
  category: string;
  content: string;
  version: number;
}

export default function AdminPoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const response = await fetch("/api/admin/policies");
      const data = await response.json();
      setPolicies(data);
    } catch (error) {
      console.error("Failed to fetch policies:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/policies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, content }),
      });

      if (response.ok) {
        setTitle("");
        setCategory("");
        setContent("");
        setMessage("Policy created!");
        fetchPolicies();
      }
    } catch (error) {
      setMessage("Error creating policy.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this policy?")) return;
    try {
      await fetch(`/api/admin/policies/${id}`, { method: "DELETE" });
      fetchPolicies();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Manage Policies</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="bg-slate-700 rounded-lg p-6 space-y-4 h-fit">
          <h2 className="text-lg font-semibold text-white">New Policy</h2>

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
            required
          >
            <option value="">Select Category</option>
            <option>Employee Manual</option>
            <option>Vacation Policy</option>
            <option>Time-Off Policy</option>
            <option>Benefits</option>
            <option>Expense & Reimbursement</option>
          </select>

          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400 h-32"
            required
          />

          {message && (
            <div className="p-3 rounded text-sm bg-green-500/10 text-green-400">{message}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium"
          >
            Create Policy
          </button>
        </form>

        <div className="lg:col-span-2 space-y-4">
          {policies.map((policy) => (
            <div key={policy.id} className="bg-slate-700 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{policy.title}</h3>
                  <p className="text-blue-400 text-sm">{policy.category}</p>
                  <p className="text-slate-300 text-sm mt-2 line-clamp-2">{policy.content}</p>
                </div>
                <button
                  onClick={() => handleDelete(policy.id)}
                  className="text-red-400 hover:text-red-300 text-sm ml-4"
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
