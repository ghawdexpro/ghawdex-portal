"use client";

import { useState, useEffect } from "react";

export const dynamic = "force-dynamic";

export default function AdminCalendarPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "meeting",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/admin/calendar");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Event created successfully!");
        setFormData({
          title: "",
          description: "",
          type: "meeting",
          startDate: "",
          endDate: "",
        });
        fetchEvents();
      } else {
        setMessage("Failed to create event.");
      }
    } catch (error) {
      setMessage("Error creating event.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`/api/admin/calendar/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Event deleted successfully!");
        fetchEvents();
      } else {
        setMessage("Failed to delete event.");
      }
    } catch (error) {
      setMessage("Error deleting event.");
    }
  };

  return (
    <div className="p-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-white mb-8">Manage Calendar</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Event Form */}
        <div className="bg-slate-700 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Create Event
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                placeholder="Event title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 h-24"
                placeholder="Event description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Event Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="meeting">Meeting</option>
                <option value="deadline">Deadline</option>
                <option value="holiday">Holiday</option>
                <option value="project">Project</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {message && (
              <div
                className={`p-3 rounded-lg text-sm ${
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
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors font-medium"
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
          </form>
        </div>

        {/* Events List */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">
            All Events ({events.length})
          </h2>

          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {events.length > 0 ? (
              events
                .sort(
                  (a, b) =>
                    new Date(b.startDate).getTime() -
                    new Date(a.startDate).getTime()
                )
                .map((event) => (
                  <div
                    key={event.id}
                    className="bg-slate-700 rounded-lg p-4 flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">
                        {event.title}
                      </h3>
                      <p className="text-xs text-slate-400 mb-2">
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
                      <span className="inline-block text-xs px-2 py-1 bg-slate-600 text-slate-200 rounded">
                        {event.type}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="ml-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                ))
            ) : (
              <p className="text-slate-400">No events yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
