"use client";

import { useState, useEffect } from "react";
import bcryptjs from "bcryptjs";

export const dynamic = "force-dynamic";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  department?: string;
  active: boolean;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("EMPLOYEE");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const hashedPassword = await bcryptjs.hash(password, 10);

      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password: hashedPassword,
          name,
          role,
          department,
        }),
      });

      if (response.ok) {
        setEmail("");
        setPassword("");
        setName("");
        setRole("EMPLOYEE");
        setDepartment("");
        setMessage("User created successfully!");
        fetchUsers();
      } else {
        setMessage("Failed to create user.");
      }
    } catch (error) {
      setMessage("Error creating user.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string, active: boolean) => {
    try {
      await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !active }),
      });
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this user?")) return;
    try {
      await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">User Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="bg-slate-700 rounded-lg p-6 space-y-4 h-fit">
          <h2 className="text-lg font-semibold text-white">Create User</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400"
            required
          />

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400"
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white"
          >
            <option>EMPLOYEE</option>
            <option>MANAGER</option>
            <option>ADMIN</option>
          </select>

          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400"
          />

          {message && (
            <div className={`p-3 rounded text-sm ${
              message.includes("success")
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium"
          >
            Create User
          </button>
        </form>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-4">Users ({users.length})</h2>
          {users.map((user) => (
            <div
              key={user.id}
              className={`rounded-lg p-4 ${
                user.active ? "bg-slate-700" : "bg-slate-800 opacity-60"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{user.name}</h3>
                  <p className="text-slate-400 text-sm">{user.email}</p>
                  <div className="flex gap-2 mt-2 text-xs">
                    <span className={`px-2 py-1 rounded ${
                      user.role === "ADMIN"
                        ? "bg-red-500/20 text-red-400"
                        : user.role === "MANAGER"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}>
                      {user.role}
                    </span>
                    {user.department && (
                      <span className="bg-slate-600 text-slate-300 px-2 py-1 rounded">
                        {user.department}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleToggleActive(user.id, user.active)}
                    className="text-sm px-2 py-1 bg-slate-600 hover:bg-slate-500 rounded text-white"
                  >
                    {user.active ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-sm px-2 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
