import { prisma } from "@/lib/prisma";

export default async function CompanyPage() {
  const companyInfo = await prisma.companyInfo.findFirst();

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-white mb-8">Company Information</h1>

      <div className="space-y-8">
        <div className="bg-slate-700 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-3">Mission</h2>
          <p className="text-slate-300">
            {companyInfo?.mission || "Mission statement not yet added."}
          </p>
        </div>

        <div className="bg-slate-700 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-3">Vision</h2>
          <p className="text-slate-300">
            {companyInfo?.vision || "Vision statement not yet added."}
          </p>
        </div>

        <div className="bg-slate-700 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-3">Values</h2>
          <div className="text-slate-300 whitespace-pre-wrap">
            {companyInfo?.values || "Company values not yet added."}
          </div>
        </div>
      </div>
    </div>
  );
}
