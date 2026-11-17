import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Sidebar from '../components/Sidebar';
import client from '../api/client';
import { Plus, BookOpen } from 'lucide-react';

const CurriculaList = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setModalOpen] = useState(false);
  const [newCurr, setNewCurr] = useState({ title: '', description: '' });

  const { data: curricula, isLoading } = useQuery({
    queryKey: ['curricula'],
    queryFn: () => client.get('/curricula/').then(res => res.data)
  });

  const createMutation = useMutation({
    mutationFn: (data) => client.post('/curricula/', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['curricula']);
      setModalOpen(false);
      setNewCurr({ title: '', description: '' });
    }
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-slate-50">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Curricula</h1>
            <p className="text-slate-600">Manage your educational programs.</p>
          </div>
          <button 
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <Plus size={20} />
            New Curriculum
          </button>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(curricula ?? []).length === 0 ? (
              <div className="col-span-full py-20 text-center bg-white rounded-xl border-2 border-dashed border-slate-200">
                <p className="text-slate-500">No curricula found. Create your first one!</p>
              </div>
            ) : (
              curricula.map(c => (
                <div key={c.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-colors cursor-pointer">
                  <BookOpen className="text-indigo-600 mb-4" size={24} />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{c.title}</h3>
                  <p className="text-slate-600 text-sm line-clamp-2">{c.description}</p>
                  <div className="mt-4 text-xs text-slate-400">
                    Created: {new Date(c.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-2xl w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6">New Curriculum</h2>
              <form onSubmit={(e) => { e.preventDefault(); createMutation.mutate(newCurr); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input 
                    className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newCurr.title}
                    onChange={(e) => setNewCurr({...newCurr, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea 
                    className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    rows="4"
                    value={newCurr.description}
                    onChange={(e) => setNewCurr({...newCurr, description: e.target.value})}
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setModalOpen(false)}
                    className="flex-1 py-3 border rounded-lg hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700"
                    disabled={createMutation.isPending}
                  >
                    {createMutation.isPending ? 'Saving...' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CurriculaList;