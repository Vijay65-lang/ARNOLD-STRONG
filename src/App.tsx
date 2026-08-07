/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GymDataDisplay } from './components/GymDataDisplay';
import { OwnerAuth } from './components/OwnerAuth';
import { OwnerUploadForm } from './components/OwnerUploadForm';
import { GymContentItem } from './types';

export default function App() {
  const [data, setData] = useState<GymContentItem[]>([]);
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('gym_data');
    if (savedData) setData(JSON.parse(savedData));
  }, []);

  const handleUpload = (newItem: Omit<GymContentItem, 'id' | 'date'>) => {
    const dataItem: GymContentItem = {
      ...newItem,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
    };
    const updatedData = [...data, dataItem];
    setData(updatedData);
    localStorage.setItem('gym_data', JSON.stringify(updatedData));
  };

  const handleDelete = (id: string) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
    localStorage.setItem('gym_data', JSON.stringify(updatedData));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100 font-sans">
      <header className="p-10 text-center">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Gym Portal</h1>
      </header>

      <motion.section
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="p-12 text-center"
      >
        <h2 className="text-6xl font-black uppercase tracking-tighter mb-4 italic text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Elevate Your Fitness</h2>
        <p className="text-xl text-slate-400">Premium training facilities in your neighborhood.</p>
      </motion.section>

      <GymDataDisplay data={data} showDelete={isOwnerAuthenticated} onDelete={handleDelete} />

      <footer className="p-12 text-center border-t border-white/10 mt-12">
        {isOwnerAuthenticated ? (
          <OwnerUploadForm onUpload={handleUpload} />
        ) : (
          <button 
            onClick={() => setShowAuth(!showAuth)}
            className="text-slate-500 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
          >
            Owner Access
          </button>
        )}
        {showAuth && !isOwnerAuthenticated && (
          <div className="mt-4 max-w-sm mx-auto">
            <OwnerAuth onAuthSuccess={() => setIsOwnerAuthenticated(true)} onClose={() => setShowAuth(false)} />
          </div>
        )}
      </footer>
    </div>
  );
}
