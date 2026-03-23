import React, { useState } from 'react';
import { 
  Search, FileText, Video, Image as ImageIcon, 
  Cloud, Terminal, History, Camera, 
  Github, Brain, Zap, Music, 
  Dumbbell, MessageSquare, Layout,
  Eye, Code, Map, Mic, Send, Sparkles,
  FolderTree, Wand2, Layers, UserCircle,
  Activity, ArrowRight, Lightbulb, BookOpen,
  PenTool, MonitorPlay
} from 'lucide-react';
import { MiniApp } from './types';

// --- Mini App Components ---

const MultiModelSearch = () => {
  const [query, setQuery] = useState('');
  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex gap-2">
        <input 
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500/50" 
          placeholder="Search across models..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button onClick={() => alert("Searching: " + query)} className="glass-button px-4 py-2 text-blue-400"><Search size={16}/></button>
      </div>
      <div className="flex-1 glass-panel p-3 text-xs text-white/40 overflow-auto">
        <div className="space-y-3">
          <div className="p-2 bg-white/5 rounded border border-white/5">
            <span className="text-blue-400 font-bold">GEMINI 2.0:</span> Awaiting query...
          </div>
          <div className="p-2 bg-white/5 rounded border border-white/5">
            <span className="text-purple-400 font-bold">SEARCH GROUNDING:</span> Ready for live data.
          </div>
        </div>
      </div>
    </div>
  );
};

const VibeCheck = () => {
  const [vibe, setVibe] = useState(50);
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full border-4 border-white/5" />
        <div 
          className="absolute inset-0 rounded-full border-4 border-emerald-500/50 transition-all duration-500"
          style={{ clipPath: `inset(${100 - vibe}% 0 0 0)` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
          {vibe}%
        </div>
      </div>
      <div className="w-full space-y-2">
        <input 
          type="range" 
          className="w-full accent-emerald-500" 
          value={vibe} 
          onChange={e => setVibe(parseInt(e.target.value))} 
        />
        <p className="text-center text-[10px] uppercase tracking-widest text-emerald-400">Current Frequency</p>
      </div>
    </div>
  );
};

const FlashUI = () => {
  const themes = [
    { name: 'Nexus Blue', color: 'bg-blue-500' },
    { name: 'Emerald Pulse', color: 'bg-emerald-500' },
    { name: 'Cyber Red', color: 'bg-red-500' },
    { name: 'Royal Purple', color: 'bg-purple-500' },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 h-full">
      {themes.map(t => (
        <button onClick={() => alert("Theme selected: " + t.name)} key={t.name} className="glass-panel p-4 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors">
          <div className={`w-8 h-8 rounded-full ${t.color} shadow-lg`} />
          <span className="text-[10px] uppercase tracking-tighter">{t.name}</span>
        </button>
      ))}
    </div>
  );
};

const LinkToInk = () => {
  const [repo, setRepo] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<boolean>(false);
  const [theme, setTheme] = useState<'neon' | 'minimal'>('neon');

  const handleAnalyze = () => {
    if (!repo) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(true);
    }, 2000);
  };

  if (result) {
    return (
      <div className="flex flex-col h-full space-y-4 animate-in fade-in zoom-in duration-500">
        <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg border border-white/10">
          <span className="text-xs text-white/80 truncate max-w-[150px] font-mono">{repo}</span>
          <div className="flex gap-2">
            <button onClick={() => setTheme('neon')} className={`text-[10px] px-3 py-1.5 rounded-md transition-all ${theme === 'neon' ? 'bg-pink-500/20 text-pink-400 border border-pink-500/50' : 'text-white/40 hover:text-white'}`}>Neon Cyber</button>
            <button onClick={() => setTheme('minimal')} className={`text-[10px] px-3 py-1.5 rounded-md transition-all ${theme === 'minimal' ? 'bg-white/20 text-white border border-white/30' : 'text-white/40 hover:text-white'}`}>Glass Minimal</button>
          </div>
        </div>
        
        {theme === 'neon' ? (
          <div className="flex-1 bg-gray-950 border border-pink-500/50 rounded-xl p-5 shadow-[0_0_20px_rgba(236,72,153,0.15)] overflow-auto relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
            <h3 className="text-cyan-400 font-bold text-xl mb-4 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] tracking-wider">CYBER_REPO_DASHBOARD</h3>
            <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
              <div className="bg-black/60 border border-cyan-500/30 p-4 rounded-lg text-pink-400 text-xs shadow-[inset_0_0_10px_rgba(34,211,238,0.1)]">
                <div className="mb-1 opacity-70">TOTAL COMMITS</div>
                <div className="text-white text-2xl font-mono">1,337</div>
              </div>
              <div className="bg-black/60 border border-cyan-500/30 p-4 rounded-lg text-pink-400 text-xs shadow-[inset_0_0_10px_rgba(34,211,238,0.1)]">
                <div className="mb-1 opacity-70">OPEN ISSUES</div>
                <div className="text-white text-2xl font-mono">42</div>
              </div>
            </div>
            <div className="h-32 border border-pink-500/30 bg-black/60 rounded-lg relative overflow-hidden flex items-end p-2 gap-2">
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(34,211,238,0.05)_50%)] bg-[length:100%_4px]" />
              {[40, 70, 45, 90, 65, 80, 30, 50, 85, 60].map((h, i) => (
                <div key={i} className="flex-1 bg-cyan-400/40 rounded-t-sm relative z-10 hover:bg-pink-400/60 transition-colors cursor-pointer" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-white/90 border border-gray-200 rounded-xl p-5 shadow-lg overflow-auto text-gray-800 relative">
            <h3 className="text-gray-900 font-semibold text-xl mb-4 tracking-tight">Repository Overview</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-gray-500 text-xs">
                <div className="mb-1">Total Commits</div>
                <div className="text-gray-900 text-2xl font-medium">1,337</div>
              </div>
              <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-gray-500 text-xs">
                <div className="mb-1">Open Issues</div>
                <div className="text-gray-900 text-2xl font-medium">42</div>
              </div>
            </div>
            <div className="h-32 border border-gray-100 bg-gray-50 rounded-xl flex items-end p-3 gap-2">
              {[40, 70, 45, 90, 65, 80, 30, 50, 85, 60].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-500/20 rounded-t-md hover:bg-blue-500/40 transition-colors cursor-pointer" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex gap-2">
        <input 
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500/50" 
          placeholder="Enter GitHub Repo URL..."
          value={repo}
          onChange={e => setRepo(e.target.value)}
        />
        <button 
          onClick={handleAnalyze}
          className="glass-button px-4 py-2 text-purple-400"
        >
          <Github size={16}/>
        </button>
      </div>
      <div className="flex-1 glass-panel p-4 flex flex-col items-center justify-center text-center">
        {analyzing ? (
          <div className="space-y-4">
            <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto" />
            <p className="text-xs text-purple-400 uppercase tracking-widest">Cloning & Analyzing...</p>
          </div>
        ) : (
          <div className="text-white/30 space-y-2">
            <Github size={32} className="mx-auto opacity-50" />
            <p className="text-sm">Link to Ink</p>
            <p className="text-xs font-light">Paste a repository link to generate an interactive intelligence page.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const PlaceholderApp = ({ name }: { name: string }) => (
  <div className="flex flex-col items-center justify-center h-full text-white/40 space-y-4">
    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
      <Zap className="animate-pulse" />
    </div>
    <p className="text-sm font-light italic text-center">{name} is initializing...</p>
    <button onClick={() => alert("Launching " + name + " agent...")} className="glass-button px-4 py-2 text-xs fiber-glow-blue text-blue-400">
      Launch Agent
    </button>
  </div>
);

// --- Registry ---

export const MINI_APPS: Record<string, MiniApp> = {
  'multi-model-search': {
    id: 'multi-model-search',
    title: 'Multi-Model Search',
    description: 'Search across multiple LLMs and the web.',
    icon: Search,
    category: 'Utility',
    component: MultiModelSearch
  },
  'category-generator': {
    id: 'category-generator',
    title: 'Category Generator',
    description: 'On-the-fly category generation.',
    icon: FolderTree,
    category: 'Utility',
    component: () => <PlaceholderApp name="Category Generator" />
  },
  'execution-agent': {
    id: 'execution-agent',
    title: 'Execution Agent',
    description: 'Versatile task execution engine.',
    icon: Terminal,
    category: 'Utility',
    component: () => <PlaceholderApp name="Execution Agent" />
  },
  'weather-dashboard': {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'Real-time weather and environmental data.',
    icon: Cloud,
    category: 'Utility',
    component: () => <PlaceholderApp name="Weather Dashboard" />
  },
  'intute': {
    id: 'intute',
    title: 'Intute',
    description: 'Intuitive background processing.',
    icon: Brain,
    category: 'Misc',
    component: () => <PlaceholderApp name="Intute" />
  },
  'augmented-image': {
    id: 'augmented-image',
    title: 'Augmented Image',
    description: 'Enhanced image generation and editing.',
    icon: ImageIcon,
    category: 'Creative',
    component: () => <PlaceholderApp name="Augmented Image" />
  },
  'agentic-vision': {
    id: 'agentic-vision',
    title: 'Agentic Vision',
    description: 'Gemini-powered image understanding.',
    icon: Eye,
    category: 'Creative',
    component: () => <PlaceholderApp name="Agentic Vision" />
  },
  'flash-ui': {
    id: 'flash-ui',
    title: 'Flash UI',
    description: 'Dynamic hub interface customization.',
    icon: Layout,
    category: 'Misc',
    component: FlashUI
  },
  'voices-from-history': {
    id: 'voices-from-history',
    title: 'Voices from History',
    description: 'Chat with historical figures.',
    icon: History,
    category: 'Misc',
    component: () => <PlaceholderApp name="Voices from History" />
  },
  'lyria-camera': {
    id: 'lyria-camera',
    title: 'Lyria Camera',
    description: 'Advanced visual capture and processing.',
    icon: Camera,
    category: 'Creative',
    component: () => <PlaceholderApp name="Lyria Camera" />
  },
  'infinite-heroes': {
    id: 'infinite-heroes',
    title: 'Infinite Heroes',
    description: 'Endless character generation.',
    icon: UserCircle,
    category: 'Creative',
    component: () => <PlaceholderApp name="Infinite Heroes" />
  },
  'link-to-ink': {
    id: 'link-to-ink',
    title: 'Link to Ink',
    description: 'GitHub visual intelligence platform.',
    icon: Github,
    category: 'Misc',
    component: LinkToInk
  },
  'info-genius': {
    id: 'info-genius',
    title: 'Info Genius',
    description: 'Tailored research visualization.',
    icon: Brain,
    category: 'Research',
    component: () => <PlaceholderApp name="Info Genius" />
  },
  'proactive-creator': {
    id: 'proactive-creator',
    title: 'Proactive Creator',
    description: 'AI co-creator that anticipates needs.',
    icon: Wand2,
    category: 'Creative',
    component: () => <PlaceholderApp name="Proactive Creator" />
  },
  'research-viz': {
    id: 'research-viz',
    title: 'Research Visualization',
    description: 'Visual data mapping for research.',
    icon: Layers,
    category: 'Research',
    component: () => <PlaceholderApp name="Research Visualization" />
  },
  'vibe-check': {
    id: 'vibe-check',
    title: 'Vibe Check',
    description: 'Analyze current frequency and mood.',
    icon: Sparkles,
    category: 'Vibe',
    component: VibeCheck
  },
  'ask-manuel': {
    id: 'ask-manuel',
    title: 'Ask Manuel',
    description: 'Your personal guide and assistant.',
    icon: MessageSquare,
    category: 'Misc',
    component: () => <PlaceholderApp name="Ask Manuel" />
  },
  'enhance': {
    id: 'enhance',
    title: 'Enhance',
    description: 'Upscale and improve content.',
    icon: Sparkles,
    category: 'Utility',
    component: () => <PlaceholderApp name="Enhance" />
  },
  'fit-check': {
    id: 'fit-check',
    title: 'Fit Check',
    description: 'Style and outfit analysis.',
    icon: Camera,
    category: 'Misc',
    component: () => <PlaceholderApp name="Fit Check" />
  },
  'passed-forward': {
    id: 'passed-forward',
    title: 'Passed Forward',
    description: 'Knowledge sharing and delegation.',
    icon: ArrowRight,
    category: 'Utility',
    component: () => <PlaceholderApp name="Passed Forward" />
  },
  'gym-booth': {
    id: 'gym-booth',
    title: 'Gym Booth',
    description: 'Fitness and health tracking agent.',
    icon: Dumbbell,
    category: 'Misc',
    component: () => <PlaceholderApp name="Gym Booth" />
  },
  'chat-with-docs': {
    id: 'chat-with-docs',
    title: 'Chat with Docs',
    description: 'Analyze and query your documents.',
    icon: FileText,
    category: 'Research',
    component: () => <PlaceholderApp name="Chat with Docs" />
  },
  'prompt-dj': {
    id: 'prompt-dj',
    title: 'Prompt DJ',
    description: 'Curate and mix AI prompts.',
    icon: Music,
    category: 'Vibe',
    component: () => <PlaceholderApp name="Prompt DJ" />
  },
  'thinking-space': {
    id: 'thinking-space',
    title: 'Thinking Space',
    description: 'A quiet place for ideation.',
    icon: Lightbulb,
    category: 'Creative',
    component: () => <PlaceholderApp name="Thinking Space" />
  },
  'dictation': {
    id: 'dictation',
    title: 'Dictation App',
    description: 'Voice-to-text with semantic analysis.',
    icon: Mic,
    category: 'Utility',
    component: () => <PlaceholderApp name="Dictation App" />
  },
  'video-to-learning': {
    id: 'video-to-learning',
    title: 'Video to Learning',
    description: 'Convert videos to educational modules.',
    icon: MonitorPlay,
    category: 'Research',
    component: () => <PlaceholderApp name="Video to Learning" />
  },
  'flashcard-maker': {
    id: 'flashcard-maker',
    title: 'Flashcard Maker',
    description: 'Auto-generate study flashcards.',
    icon: BookOpen,
    category: 'Research',
    component: () => <PlaceholderApp name="Flashcard Maker" />
  },
  'video-analyzer': {
    id: 'video-analyzer',
    title: 'Video Analyzer',
    description: 'Extract insights from video content.',
    icon: Video,
    category: 'Research',
    component: () => <PlaceholderApp name="Video Analyzer" />
  },
  'spatial-understanding': {
    id: 'spatial-understanding',
    title: 'Spatial Understanding',
    description: '3D and spatial data analysis.',
    icon: Map,
    category: 'Utility',
    component: () => <PlaceholderApp name="Spatial Understanding" />
  },
  'image-to-code': {
    id: 'image-to-code',
    title: 'Image to Code',
    description: 'Convert designs to functional code.',
    icon: Code,
    category: 'Creative',
    component: () => <PlaceholderApp name="Image to Code" />
  }
};

