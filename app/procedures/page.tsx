"use client";

import { useEffect, useState } from "react";

interface Procedure {
  id: string;
  title: string;
  category: string;
  content: string;
  priority: string;
}

export default function ProceduresPage() {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProcedures();
  }, []);

  const fetchProcedures = async () => {
    try {
      const response = await fetch("/api/procedures");
      const data = await response.json();
      setProcedures(data);
    } catch (error) {
      console.error("Failed to fetch procedures:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(procedures.map((p: any) => p.category))];
  const filteredProcedures = selectedCategory
    ? procedures.filter((p: any) => p.category === selectedCategory)
    : procedures;

  const priorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "text-red-400 bg-red-500/10";
      case "high":
        return "text-orange-400 bg-orange-500/10";
      case "normal":
        return "text-blue-400 bg-blue-500/10";
      default:
        return "text-slate-400 bg-slate-500/10";
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Procedures & Best Practices</h1>

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
            All Procedures
          </button>
          {categories.map((category: any) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {category.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-slate-400">Loading procedures...</div>
      ) : filteredProcedures.length === 0 ? (
        <div className="bg-slate-700 rounded-lg p-8 text-center">
          <p className="text-slate-400">No procedures found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredProcedures.map((procedure: any) => (
            <div key={procedure.id} className="bg-slate-700 rounded-lg p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{procedure.title}</h3>
                  <p className="text-blue-400 text-sm mt-1 capitalize">
                    {procedure.category.replace("-", " ")}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${priorityColor(
                    procedure.priority
                  )}`}
                >
                  {procedure.priority}
                </span>
              </div>
              <p className="text-slate-300 whitespace-pre-wrap">{procedure.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
