import React from 'react';
import { motion } from 'motion/react';
import { Maximize2, X, RotateCcw } from 'lucide-react';

interface MiniAppContainerProps {
  title: string;
  icon: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
  color?: string;
}

export const MiniAppContainer: React.FC<MiniAppContainerProps> = ({ 
  title, 
  icon, 
  onClose, 
  children,
  color = 'blue'
}) => {
  const glowClass = `fiber-glow-${color}`;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`glass-panel h-full flex flex-col overflow-hidden group relative transition-all duration-500 hover:${glowClass}`}
    >
      {/* Fiber Optic Edge */}
      <div className={`absolute top-0 left-0 w-full h-[1px] fiber-edge opacity-0 group-hover:opacity-100 transition-opacity`} 
           style={{ background: `linear-gradient(90deg, transparent, var(--color-accent-${color}), transparent)` }} />
      
      {/* Header */}
      <div className="smoky-header px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-lg bg-${color}-500/20 text-${color}-400`}>
            {icon}
          </div>
          <h3 className="font-medium text-sm tracking-wide text-white/80">{title}</h3>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 text-white/30 hover:text-white transition-colors">
            <RotateCcw size={14} />
          </button>
          <button className="p-1.5 text-white/30 hover:text-white transition-colors">
            <Maximize2 size={14} />
          </button>
          <button 
            onClick={onClose}
            className="p-1.5 text-white/30 hover:text-red-400 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 relative">
        {children}
      </div>

      {/* Footer / Action Hints */}
      <div className="px-4 py-2 bg-white/5 flex justify-end gap-2">
        <button className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white/60 transition-colors">
          Standalone Mode
        </button>
      </div>
    </motion.div>
  );
};
