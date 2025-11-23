"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface WikiPage {
  id: string;
  title: string;
  slug: string;
  category: string;
  author?: string;
  updatedAt: string;
}

export default function WikiPage() {
  const [pages, setPages] = useState<WikiPage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch("/api/wiki");
      const data = await response.json();
      setPages(data);
    } catch (error) {
      console.error("Failed to fetch wiki pages:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(pages.map((p: any) => p.category))];

  let filteredPages = pages;
  if (selectedCategory) {
    filteredPages = filteredPages.filter((p: any) => p.category === selectedCategory);
  }
  if (searchTerm) {
    filteredPages = filteredPages.filter(
      (p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Engineering Wiki</h1>

      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Search wiki..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === null
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            All Pages
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
        <div className="text-slate-400">Loading wiki...</div>
      ) : filteredPages.length === 0 ? (
        <div className="bg-slate-700 rounded-lg p-8 text-center">
          <p className="text-slate-400">
            {searchTerm ? "No pages match your search." : "No wiki pages found."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPages.map((page: any) => (
            <Link
              key={page.id}
              href={`/wiki/${page.slug}`}
              className="block bg-slate-700 hover:bg-slate-600 rounded-lg p-6 transition-colors group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-400">
                    {page.title}
                  </h3>
                  <p className="text-blue-400 text-sm mt-1">{page.category}</p>
                  {page.author && (
                    <p className="text-slate-400 text-xs mt-2">By {page.author}</p>
                  )}
                </div>
                <span className="text-slate-500 text-xs whitespace-nowrap ml-4">
                  {new Date(page.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
