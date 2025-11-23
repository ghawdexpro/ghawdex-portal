import Link from "next/link";

export default function AdminPage() {
  const sections = [
    { href: "/admin/company", label: "Company Info", icon: "🏢" },
    { href: "/admin/announcements", label: "Announcements", icon: "📢" },
    { href: "/admin/team", label: "Team Members", icon: "👥" },
    { href: "/admin/policies", label: "Policies", icon: "📋" },
    { href: "/admin/goals", label: "Goals", icon: "🎯" },
    { href: "/admin/procedures", label: "Procedures", icon: "📝" },
    { href: "/admin/tools", label: "Tools & Software", icon: "🛠" },
    { href: "/admin/wiki", label: "Wiki Pages", icon: "📚" },
    { href: "/admin/users", label: "User Management", icon: "⚙️" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
      <p className="text-slate-400 mb-12">Manage all portal content and settings</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section: any) => (
          <Link
            key={section.href}
            href={section.href}
            className="p-6 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors group border border-slate-600"
          >
            <div className="text-3xl mb-3">{section.icon}</div>
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400">
              {section.label}
            </h3>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-slate-700 rounded-lg border border-blue-500">
        <h2 className="text-xl font-semibold text-white mb-2">Quick Stats</h2>
        <p className="text-slate-300 text-sm">
          Admin panel is ready. Start by adding company information and team members.
        </p>
      </div>
    </div>
  );
}
