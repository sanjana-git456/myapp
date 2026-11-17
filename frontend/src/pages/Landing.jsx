import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, BarChart } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">NGO Learning Network</h1>
        <div className="space-x-4">
          <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium">Log in</Link>
          <Link to="/register" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">Get started</Link>
        </div>
      </nav>
      
      <header className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-extrabold text-slate-900 mb-6">
          Empowering NGOs with <span className="text-indigo-600">Modular Learning</span>
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          The API-first platform for non-profits to publish curricula, manage reusable assessment modules, and track real-time cohort impact.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/register" className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-indigo-700">Start Building</Link>
          <button className="border border-slate-200 text-slate-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-50">View Demo</button>
        </div>
      </header>

      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <BookOpen className="text-indigo-600 mb-4" size={40} />
            <h3 className="text-xl font-bold mb-2">Curriculum Management</h3>
            <p className="text-slate-600">Easily ingest and organize educational content via our robust REST API or intuitive dashboard.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <Users className="text-indigo-600 mb-4" size={40} />
            <h3 className="text-xl font-bold mb-2">Reusable Modules</h3>
            <p className="text-slate-600">Access a marketplace of validated assessment modules to plug directly into your learning paths.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <BarChart className="text-indigo-600 mb-4" size={40} />
            <h3 className="text-xl font-bold mb-2">Impact Analytics</h3>
            <p className="text-slate-600">Deep insights into cohort progress and learning outcomes to satisfy donor reporting requirements.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;