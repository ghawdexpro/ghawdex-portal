import { prisma } from "@/lib/prisma";

export default async function TeamPage() {
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { name: "asc" },
  });

  const departments = [...new Set(teamMembers.map((m: any) => m.department))];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Team Directory</h1>

      {teamMembers.length === 0 ? (
        <div className="bg-slate-700 rounded-lg p-8 text-center">
          <p className="text-slate-400">No team members added yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {departments.map((dept: any) => (
            <div key={dept}>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">{dept}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers
                  .filter((m: any) => m.department === dept)
                  .map((member: any) => (
                    <div key={member.id} className="bg-slate-700 rounded-lg p-6">
                      {member.photo && (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-20 h-20 rounded-full mb-4 object-cover"
                        />
                      )}
                      <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                      <p className="text-blue-400 text-sm font-medium">{member.title}</p>
                      <p className="text-slate-400 text-sm mt-2">{member.bio}</p>
                      <div className="mt-4 space-y-2 text-sm text-slate-300">
                        {member.email && (
                          <div>
                            <a href={`mailto:${member.email}`} className="hover:text-blue-400">
                              📧 {member.email}
                            </a>
                          </div>
                        )}
                        {member.phone && <div>📱 {member.phone}</div>}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
