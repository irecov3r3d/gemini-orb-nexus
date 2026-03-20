import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AudioOrb } from './components/AudioOrb';
import { MiniAppContainer } from './components/MiniAppContainer';
import { AppDrawer } from './components/AppDrawer';
import { geminiService } from './services/gemini';
import { HubState, MiniApp } from './types';
import { MINI_APPS } from './miniApps';
import { LayoutGrid, Mic2, Settings, Layers, Plus } from 'lucide-react';

export default function App() {
  const [state, setState] = useState<HubState>({
    activeApps: [],
    currentTask: '',
    isOrbMode: true,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);

  const [themeColor, setThemeColor] = useState('blue');
  const [customApps, setCustomApps] = useState<Record<string, MiniApp>>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const ALL_APPS = { ...MINI_APPS, ...customApps };

  const handleTaskSubmit = useCallback(async (task: string) => {
    setIsProcessing(true);
    
    // Check for theme change command
    if (task.toLowerCase().includes('theme') || task.toLowerCase().includes('ui')) {
      const colors = ['blue', 'emerald', 'red', 'purple'];
      const newColor = colors.find(c => task.toLowerCase().includes(c)) || colors[Math.floor(Math.random() * colors.length)];
      setThemeColor(newColor);
    }

    // 1. Determine apps
    const availableAppsList = Object.values(ALL_APPS).map(a => `- ${a.id}: ${a.title} - ${a.description}`).join('\n');
    const appIds = await geminiService.determineApps(task, availableAppsList);
    
    // 2. Generate response speech
    const speech = await geminiService.generateSpeech(`Initializing your workspace for: ${task}. I've prepared the ${appIds.map(id => ALL_APPS[id]?.title || id).join(', ')} modules.`);
    if (speech) setAudioBase64(speech);

    setState(prev => ({
      ...prev,
      activeApps: appIds,
      currentTask: task,
      isOrbMode: false
    }));
    
    setIsProcessing(false);
  }, [ALL_APPS]);

  useEffect(() => {
    if (audioBase64) {
      const playAudio = async () => {
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
          const binaryString = window.atob(audioBase64);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const int16Array = new Int16Array(bytes.buffer);
          const float32Array = new Float32Array(int16Array.length);
          for (let i = 0; i < int16Array.length; i++) {
            float32Array[i] = int16Array[i] / 32768.0;
          }
          const audioBuffer = audioContext.createBuffer(1, float32Array.length, 24000);
          audioBuffer.getChannelData(0).set(float32Array);
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);
          source.start();
        } catch (err) {
          console.error("Failed to play audio", err);
        }
      };
      playAudio();
      setAudioBase64(null);
    }
  }, [audioBase64]);

  return (
    <div className="h-screen w-screen relative overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />

      <AnimatePresence mode="wait">
        {state.isOrbMode ? (
          <motion.div
            key="orb-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            className="h-full w-full flex items-center justify-center"
          >
            <AudioOrb 
              onTaskSubmit={handleTaskSubmit} 
              isProcessing={isProcessing} 
              onOrbClick={() => setIsDrawerOpen(true)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="hub-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-full w-full flex flex-col p-6 max-w-7xl mx-auto"
          >
            {/* Hub Header */}
            <header className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <motion.div 
                  layoutId="orb"
                  onClick={() => setState(s => ({ ...s, isOrbMode: true }))}
                  className="w-12 h-12 rounded-full glass-panel flex items-center justify-center cursor-pointer fiber-glow-blue hover:scale-110 transition-transform"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 animate-pulse" />
                </motion.div>
                <div>
                  <h1 className="text-xl font-semibold tracking-tight text-white/90">Nexus Hub</h1>
                  <p className="text-xs text-white/40 uppercase tracking-widest">{state.currentTask}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => setIsDrawerOpen(true)} className="glass-button p-2.5 text-white/60 hover:text-blue-400" title="App Library">
                  <LayoutGrid size={20} />
                </button>
                <button className="glass-button p-2.5 text-white/60 hover:text-purple-400">
                  <Layers size={20} />
                </button>
                <button className="glass-button p-2.5 text-white/60">
                  <Settings size={20} />
                </button>
              </div>
            </header>

            {/* Grid of Mini Apps */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 -mr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-28 auto-rows-[350px] md:auto-rows-[400px]">
                {state.activeApps.map((appId, index) => {
                  const app = ALL_APPS[appId];
                  if (!app) return null;
                  return (
                    <MiniAppContainer
                      key={`${appId}-${index}`}
                      title={app.title}
                      icon={<app.icon size={18} />}
                      color={themeColor}
                      onClose={() => {
                        setState(s => ({
                          ...s,
                          activeApps: s.activeApps.filter((_, i) => i !== index)
                        }));
                      }}
                    >
                      <app.component />
                    </MiniAppContainer>
                  );
                })}
                
                {/* Add More Slot */}
                <button 
                  className="glass-panel border-dashed border-white/10 flex flex-col items-center justify-center hover:bg-white/5 transition-colors group h-full"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Plus className="text-white/20 group-hover:text-blue-400" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-white/20 group-hover:text-white/40">Add Module</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Controls Overlay */}
      {!state.isOrbMode && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 glass-panel px-4 md:px-6 py-3 flex items-center gap-4 md:gap-8 fiber-glow-blue z-30 w-[95%] md:w-auto max-w-2xl overflow-x-auto no-scrollbar"
        >
          <div className="flex items-center gap-2 text-blue-400 shrink-0">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            <span className="text-[10px] uppercase font-bold tracking-tighter">System Online</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10 shrink-0" />
          <div className="flex gap-4 md:gap-6 shrink-0">
            <button className="text-[10px] md:text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">Sequential</button>
            <button className="text-[10px] md:text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">Parallel</button>
            <button className="text-[10px] md:text-xs uppercase tracking-widest text-blue-400 font-bold">Auto-Optimize</button>
          </div>
        </motion.div>
      )}

      {/* App Drawer */}
      <AppDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        allApps={ALL_APPS}
        onSelectApp={(appId) => {
          setState(s => ({ ...s, activeApps: [...s.activeApps, appId], isOrbMode: false }));
          setIsDrawerOpen(false);
        }}
        onCreateCustomApp={(app) => {
          setCustomApps(prev => ({ ...prev, [app.id]: app }));
          setState(s => ({ ...s, activeApps: [...s.activeApps, app.id], isOrbMode: false }));
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
}
