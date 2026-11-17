import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Sidebar from '../components/Sidebar';
import client from '../api/client';
import { ShoppingBag, ShieldCheck, Zap } from 'lucide-react';

const Marketplace = () => {
  const { data: modules, isLoading } = useQuery({
    queryKey: ['marketplace-modules'],
    queryFn: () => client.get('/marketplace/modules').then(res => res.data)
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-slate-50">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Module Marketplace</h1>
          <p className="text-slate-600">Reusable assessment tools for your programs.</p>
        </header>

        {isLoading ? (
          <p>Loading marketplace...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(modules ?? []).length === 0 ? (
              <div className="col-span-full py-20 text-center bg-white rounded-xl border border-slate-200">
                <p className="text-slate-500">No modules available in the marketplace yet.</p>
              </div>
            ) : (
              modules.map(m => (
                <div key={m.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                        <Zap size={20} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{m.module_type}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{m.name}</h3>
                    <p className="text-slate-600 text-sm">{m.description}</p>
                  </div>
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                    <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                      <ShieldCheck size={14} />
                      Verified
                    </div>
                    <button className="text-indigo-600 font-bold text-sm hover:underline">
                      Add to Curriculum
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Marketplace;