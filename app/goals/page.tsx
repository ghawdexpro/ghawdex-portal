"use client";

import { useEffect, useState } from "react";

interface Goal {
  id: string;
  title: string;
  description: string;
  period: string;
  department?: string;
  owner?: string;
  progress: number;
  status: string;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await fetch("/api/goals");
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error("Failed to fetch goals:", error);
    } finally {
      setLoading(false);
    }
  };

  const periods = [...new Set(goals.map((g) => g.period))];
  const filteredGoals = selectedPeriod
    ? goals.filter((g) => g.period === selectedPeriod)
    : goals;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Goals & Objectives</h1>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Filter by Period</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedPeriod(null)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedPeriod === null
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            All Goals
          </button>
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                selectedPeriod === period
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-slate-400">Loading goals...</div>
      ) : filteredGoals.length === 0 ? (
        <div className="bg-slate-700 rounded-lg p-8 text-center">
          <p className="text-slate-400">No goals found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredGoals.map((goal) => (
            <div key={goal.id} className="bg-slate-700 rounded-lg p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white">{goal.title}</h3>
                <p className="text-blue-400 text-sm mt-1">{goal.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                {goal.owner && (
                  <div>
                    <p className="text-slate-400">Owner</p>
                    <p className="text-white font-medium">{goal.owner}</p>
                  </div>
                )}
                {goal.department && (
                  <div>
                    <p className="text-slate-400">Department</p>
                    <p className="text-white font-medium">{goal.department}</p>
                  </div>
                )}
                <div>
                  <p className="text-slate-400">Period</p>
                  <p className="text-white font-medium capitalize">{goal.period}</p>
                </div>
                <div>
                  <p className="text-slate-400">Status</p>
                  <p className="text-white font-medium capitalize">{goal.status}</p>
                </div>
              </div>

              <div className="mb-2 flex justify-between items-center text-sm">
                <p className="text-slate-400">Progress</p>
                <p className="text-white font-medium">{goal.progress}%</p>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
