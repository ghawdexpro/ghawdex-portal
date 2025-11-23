"use client";

import { useState, useEffect } from "react";

export const dynamic = "force-dynamic";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone?: string;
  bio?: string;
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch("/api/admin/team");
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, title, department, email, phone, bio }),
      });

      if (response.ok) {
        setName("");
        setTitle("");
        setDepartment("");
        setEmail("");
        setPhone("");
        setBio("");
        setMessage("Team member added!");
        fetchMembers();
      }
    } catch (error) {
      setMessage("Error adding team member.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    try {
      await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
      fetchMembers();
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Manage Team</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="bg-slate-700 rounded-lg p-6 space-y-4 h-fit">
          <h2 className="text-lg font-semibold text-white">Add Team Member</h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400"
            required
          />

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400"
            required
          />

          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400"
            required
          />

          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400"
          />

          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400 h-20"
          />

          {message && (
            <div className="p-3 rounded text-sm bg-green-500/10 text-green-400">{message}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium"
          >
            Add Member
          </button>
        </form>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-4">Team Members ({members.length})</h2>
          {members.map((member: any) => (
            <div key={member.id} className="bg-slate-700 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{member.name}</h3>
                  <p className="text-blue-400 text-sm">{member.title}</p>
                  <p className="text-slate-400 text-sm">{member.department}</p>
                  <p className="text-slate-500 text-xs mt-1">{member.email}</p>
                </div>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="text-red-400 hover:text-red-300 text-sm ml-4"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
