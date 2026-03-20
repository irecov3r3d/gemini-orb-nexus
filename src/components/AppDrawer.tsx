import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Search, Wrench } from 'lucide-react';
import { MiniApp } from '../types';

interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectApp: (appId: string) => void;
  onCreateCustomApp: (app: MiniApp) => void;
  allApps: Record<string, MiniApp>;
}

export const AppDrawer: React.FC<AppDrawerProps> = ({ isOpen, onClose, onSelectApp, onCreateCustomApp, allApps }) => {
  const [tab, setTab] = useState<'library' | 'create'>('library');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Create form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    
    const id = newTitle.toLowerCase().replace(/\s+/g, '-');
    
    const newApp: MiniApp = {
      id,
      title: newTitle,
      description: newDesc || 'Custom user-created tool.',
      icon: Wrench,
      category: 'Misc',
      component: () => (
        <div className="flex flex-col items-center justify-center h-full text-white/40 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Wrench className="animate-pulse" />
          </div>
          <p className="text-sm font-light italic text-center">{newTitle} is ready.</p>
          <button className="glass-button px-4 py-2 text-xs fiber-glow-blue text-blue-400">
            Execute Custom Logic
          </button>
        </div>
      )
    };
    
    onCreateCustomApp(newApp);
    setNewTitle('');
    setNewDesc('');
    setTab('library');
  };

  const filteredApps = Object.values(allApps).filter(app => 
    app.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    app.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-gray-900/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">App Library</h2>
              <button onClick={onClose} className="p-2 text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                <X size={20} />
              </button>
            </div>

            <div className="flex border-b border-white/10">
              <button 
                onClick={() => setTab('library')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${tab === 'library' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-white/50 hover:text-white'}`}
              >
                Library
              </button>
              <button 
                onClick={() => setTab('create')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${tab === 'create' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-white/50 hover:text-white'}`}
              >
                Create Tool
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {tab === 'library' ? (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                    <input 
                      type="text"
                      placeholder="Search tools..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <div className="grid gap-3">
                    {filteredApps.map(app => (
                      <button 
                        key={app.id}
                        onClick={() => onSelectApp(app.id)}
                        className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-left group"
                      >
                        <div className="p-2 rounded-lg bg-white/5 text-white/60 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                          <app.icon size={20} />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white/90 mb-1">{app.title}</h4>
                          <p className="text-xs text-white/50 line-clamp-2">{app.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCreate} className="space-y-6">
                  <div>
                    <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-2">Tool Name</label>
                    <input 
                      type="text"
                      required
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      placeholder="e.g. Data Scraper"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-2">Description</label>
                    <textarea 
                      required
                      value={newDesc}
                      onChange={e => setNewDesc(e.target.value)}
                      placeholder="What does this tool do?"
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={18} />
                    Create & Add to Hub
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
