import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const events = await prisma.calendarEvent.findMany({
    orderBy: { startDate: "asc" },
  });

  const upcomingEvents = events.filter(
    (event: any) => new Date(event.startDate) >= new Date()
  );
  const pastEvents = events.filter(
    (event: any) => new Date(event.startDate) < new Date()
  );

  const getEventColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-500/10 border-blue-500";
      case "deadline":
        return "bg-red-500/10 border-red-500";
      case "holiday":
        return "bg-green-500/10 border-green-500";
      case "project":
        return "bg-purple-500/10 border-purple-500";
      default:
        return "bg-slate-500/10 border-slate-500";
    }
  };

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-500 text-white";
      case "deadline":
        return "bg-red-500 text-white";
      case "holiday":
        return "bg-green-500 text-white";
      case "project":
        return "bg-purple-500 text-white";
      default:
        return "bg-slate-500 text-white";
    }
  };

  return (
    <div className="p-8 max-w-6xl">
      <h1 className="text-4xl font-bold text-white mb-8">Master Calendar</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Events */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">
            📅 Upcoming Events
          </h2>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map((event: any) => (
                <div
                  key={event.id}
                  className={`p-4 rounded-lg border-l-4 ${getEventColor(
                    event.type
                  )} bg-slate-800`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {event.title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded ${getEventBadgeColor(
                            event.type
                          )}`}
                        >
                          {event.type.charAt(0).toUpperCase() +
                            event.type.slice(1)}
                        </span>
                      </div>
                      {event.description && (
                        <p className="text-slate-300 text-sm mb-2">
                          {event.description}
                        </p>
                      )}
                      <div className="text-xs text-slate-400">
                        <p>
                          📍{" "}
                          {new Date(event.startDate).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                        {event.endDate && (
                          <p>
                            to{" "}
                            {new Date(event.endDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">No upcoming events scheduled.</p>
          )}
        </div>

        {/* Past Events */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">
            📋 Past Events
          </h2>
          {pastEvents.length > 0 ? (
            <div className="space-y-4">
              {pastEvents.slice(-10).reverse().map((event: any) => (
                <div
                  key={event.id}
                  className={`p-4 rounded-lg border-l-4 ${getEventColor(
                    event.type
                  )} bg-slate-800 opacity-70`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-slate-300">
                          {event.title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded ${getEventBadgeColor(
                            event.type
                          )}`}
                        >
                          {event.type.charAt(0).toUpperCase() +
                            event.type.slice(1)}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">
                        <p>
                          {new Date(event.startDate).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">No past events.</p>
          )}
        </div>
      </div>

      {/* Statistics */}
      {events.length > 0 && (
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-700 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Total Events</p>
            <p className="text-3xl font-bold text-white">{events.length}</p>
          </div>
          <div className="bg-blue-700/20 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Meetings</p>
            <p className="text-3xl font-bold text-blue-400">
              {events.filter((e: any) => e.type === "meeting").length}
            </p>
          </div>
          <div className="bg-red-700/20 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Deadlines</p>
            <p className="text-3xl font-bold text-red-400">
              {events.filter((e: any) => e.type === "deadline").length}
            </p>
          </div>
          <div className="bg-green-700/20 rounded-lg p-4">
            <p className="text-slate-400 text-sm">Upcoming</p>
            <p className="text-3xl font-bold text-green-400">
              {upcomingEvents.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
