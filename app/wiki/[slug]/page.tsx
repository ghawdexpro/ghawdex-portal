import { getDB } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface WikiPageDetailProps {
  params: {
    slug: string;
  };
}

export default async function WikiPageDetail({ params }: WikiPageDetailProps) {
  const db = await getDB();
  const page = await db.wikiPage.findUnique({
    where: { slug: params.slug },
  });

  if (!page || !page.published) {
    notFound();
  }

  return (
    <div className="p-8 max-w-4xl">
      <Link
        href="/wiki"
        className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block"
      >
        ← Back to Wiki
      </Link>

      <h1 className="text-4xl font-bold text-white mb-2">{page.title}</h1>
      <div className="flex gap-4 mb-8 text-slate-400 text-sm">
        <span>{page.category}</span>
        {page.author && <span>By {page.author}</span>}
        <span>{new Date(page.updatedAt).toLocaleDateString()}</span>
      </div>

      <div className="bg-slate-700 rounded-lg p-8 text-slate-300 whitespace-pre-wrap leading-relaxed">
        {page.content}
      </div>
    </div>
  );
}
