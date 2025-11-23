"use client";

import { useState, useEffect } from "react";

export const dynamic = "force-dynamic";

export default function AdminCompanyPage() {
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [values, setValues] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      const response = await fetch("/api/admin/company");
      const data = await response.json();
      if (data) {
        setMission(data.mission || "");
        setVision(data.vision || "");
        setValues(data.values || "");
      }
    } catch (error) {
      console.error("Failed to fetch company info:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mission, vision, values }),
      });

      if (response.ok) {
        setMessage("Company information updated successfully!");
      } else {
        setMessage("Failed to update company information.");
      }
    } catch (error) {
      setMessage("Error updating company information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-white mb-8">Edit Company Information</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Mission</label>
          <textarea
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 h-32"
            placeholder="Enter company mission..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Vision</label>
          <textarea
            value={vision}
            onChange={(e) => setVision(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 h-32"
            placeholder="Enter company vision..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Values</label>
          <textarea
            value={values}
            onChange={(e) => setValues(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 h-40"
            placeholder="Enter company values (one per line)..."
          />
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.includes("success")
                ? "bg-green-500/10 border border-green-500/20 text-green-400"
                : "bg-red-500/10 border border-red-500/20 text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors font-medium"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
