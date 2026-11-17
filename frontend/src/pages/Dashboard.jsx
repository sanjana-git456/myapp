import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Sidebar from '../components/Sidebar';
import client from '../api/client';
import { Book, Users, Star, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['analytics-summary'],
    queryFn: () => client.get('/analytics/summary').then(res => res.data)
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-slate-50">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Organization Dashboard</h1>
          <p className="text-slate-600">Overview of your learning impact and active curricula.</p>
        </header>

        {isLoading ? (
          <div>Loading stats...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard icon={<Book className="text-blue-600" />} label="Active Curricula" value={stats?.total_curricula || 0} />
            <StatCard icon={<Users className="text-emerald-600" />} label="Total Students" value={stats?.total_students || 0} />
            <StatCard icon={<Star className="text-amber-600" />} label="Avg. Assessment Score" value={`${stats?.average_score || 0}%`} />
            <StatCard icon={<TrendingUp className="text-purple-600" />} label="Completion Rate" value={`${(stats?.completion_rate * 100).toFixed(0) || 0}%`} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-indigo-50 text-indigo-700 rounded-lg font-medium hover:bg-indigo-100 transition-colors text-left">
                Create New Curriculum
              </button>
              <button className="p-4 bg-emerald-50 text-emerald-700 rounded-lg font-medium hover:bg-emerald-100 transition-colors text-left">
                Browse Marketplace
              </button>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-600">API Connection</span>
                <span className="text-emerald-600 font-medium">Healthy</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-600">Database</span>
                <span className="text-emerald-600 font-medium">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
    <div className="flex items-center gap-4 mb-2">
      <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      <span className="text-sm font-medium text-slate-500">{label}</span>
    </div>
    <div className="text-2xl font-bold text-slate-900">{value}</div>
  </div>
);

export default Dashboard;