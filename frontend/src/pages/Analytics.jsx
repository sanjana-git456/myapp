import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Sidebar from '../components/Sidebar';
import client from '../api/client';
import { BarChart, PieChart, TrendingUp } from 'lucide-react';

const Analytics = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['analytics-full'],
    queryFn: () => client.get('/analytics/summary').then(res => res.data)
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-slate-50">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Impact Analytics</h1>
          <p className="text-slate-600">Detailed breakdown of cohort performance.</p>
        </header>

        {isLoading ? (
          <p>Loading analytics...</p>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h4 className="text-sm font-medium text-slate-500 mb-4">Student Engagement</h4>
                <div className="text-3xl font-bold">{stats?.total_students || 0}</div>
                <p className="text-xs text-emerald-600 mt-2">+12% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h4 className="text-sm font-medium text-slate-500 mb-4">Average Score</h4>
                <div className="text-3xl font-bold">{stats?.average_score || 0}%</div>
                <p className="text-xs text-slate-400 mt-2">Based on all modules</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h4 className="text-sm font-medium text-slate-500 mb-4">Completion Rate</h4>
                <div className="text-3xl font-bold">{((stats?.completion_rate || 0) * 100).toFixed(0)}%</div>
                <p className="text-xs text-amber-600 mt-2">Needs attention in Unit 4</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold">Performance Over Time</h3>
                <select className="text-sm border rounded-lg p-2 outline-none">
                  <option>Last 30 Days</option>
                  <option>Last 6 Months</option>
                </select>
              </div>
              <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-200">
                <div className="text-center">
                  <BarChart className="mx-auto text-slate-300 mb-2" size={40} />
                  <p className="text-slate-400 text-sm">Interactive chart visualization would render here.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Analytics;