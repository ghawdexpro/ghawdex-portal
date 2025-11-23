"use client";

import { useEffect, useState } from "react";

interface Tool {
  id: string;
  name: string;
  description: string;
  url?: string;
  category: string;
}

export default function CulturePage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await fetch("/api/tools");
      const data = await response.json();
      setTools(data);
    } catch (error) {
      console.error("Failed to fetch tools:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(tools.map((t: any) => t.category))];
  const filteredTools = selectedCategory
    ? tools.filter((t: any) => t.category === selectedCategory)
    : tools;

  return (
    <div className="p-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Company Culture & Philosophy</h1>
        <div className="bg-slate-700 rounded-lg p-6">
          <p className="text-slate-300">
            At GhawdeX Engineering, we believe in innovation, collaboration, and excellence. Our
            culture is built on transparency, continuous learning, and delivering exceptional
            results for our clients.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-white mb-6">Tools & Software</h2>

        {categories.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === null
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                All Tools
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
        )}

        {loading ? (
          <div className="text-slate-400">Loading tools...</div>
        ) : filteredTools.length === 0 ? (
          <div className="bg-slate-700 rounded-lg p-8 text-center">
            <p className="text-slate-400">No tools found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool: any) => (
              <div key={tool.id} className="bg-slate-700 rounded-lg p-6 hover:bg-slate-600 transition-colors">
                <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                <p className="text-blue-400 text-sm mt-1">{tool.category}</p>
                <p className="text-slate-300 text-sm mt-3">{tool.description}</p>
                {tool.url && (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                  >
                    Visit →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
