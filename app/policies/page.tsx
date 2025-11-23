"use client";

import { useEffect, useState } from "react";

interface Policy {
  id: string;
  title: string;
  category: string;
  content: string;
  version: number;
  updatedAt: string;
}

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const response = await fetch("/api/policies");
      const data = await response.json();
      setPolicies(data);
    } catch (error) {
      console.error("Failed to fetch policies:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(policies.map((p: any) => p.category))];
  const filteredPolicies = selectedCategory
    ? policies.filter((p: any) => p.category === selectedCategory)
    : policies;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Policies & Employee Manual</h1>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === null
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            All Policies
          </button>
          {categories.map((category: any) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-slate-400">Loading policies...</div>
      ) : filteredPolicies.length === 0 ? (
        <div className="bg-slate-700 rounded-lg p-8 text-center">
          <p className="text-slate-400">No policies found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPolicies.map((policy: any) => (
            <div key={policy.id} className="bg-slate-700 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{policy.title}</h3>
                  <p className="text-blue-400 text-sm">{policy.category}</p>
                </div>
                <span className="text-slate-400 text-sm">v{policy.version}</span>
              </div>
              <p className="text-slate-300 whitespace-pre-wrap">{policy.content}</p>
              <p className="text-slate-500 text-xs mt-4">
                Last updated: {new Date(policy.updatedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
