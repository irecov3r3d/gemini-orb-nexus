import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Send, Sparkles } from 'lucide-react';

interface AudioOrbProps {
  onTaskSubmit: (task: string) => void;
  isProcessing: boolean;
  onOrbClick?: () => void;
}

export const AudioOrb: React.FC<AudioOrbProps> = ({ onTaskSubmit, isProcessing, onOrbClick }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          const fullTranscript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('');
          setInput(fullTranscript);
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInput('');
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error("Could not start speech recognition", e);
      }
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim()) {
      if (isListening) {
        recognitionRef.current?.stop();
        setIsListening(false);
      }
      onTaskSubmit(input);
      setInput('');
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full">
      {/* The Orb */}
      <motion.div
        layoutId="orb"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onOrbClick}
        className={`relative w-48 h-48 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500
          ${isProcessing ? 'scale-110' : 'scale-100'}
        `}
        animate={{
          boxShadow: isProcessing 
            ? '0 0 60px 10px rgba(59, 130, 246, 0.6)' 
            : isHovered 
              ? '0 0 40px 5px rgba(139, 92, 246, 0.4)' 
              : '0 0 20px 2px rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Inner Glow Layers */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-emerald-500/20 animate-orb blur-xl" />
        <div className="absolute inset-4 rounded-full bg-white/5 backdrop-blur-3xl border border-white/20 flex items-center justify-center overflow-hidden">
          {/* Spinner Evolve Background Effect */}
          <div className="absolute inset-0 opacity-30">
             <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent,rgba(59,130,246,0.5),transparent)] animate-[spin_4s_linear_infinite]" />
          </div>
          
          <Sparkles className={`w-12 h-12 transition-all duration-700 ${isProcessing ? 'text-blue-400 scale-125 rotate-12' : 'text-white/40'}`} />
        </div>
      </motion.div>

      {/* Input Area */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 w-full max-w-md px-6"
        >
          <form onSubmit={handleSubmit} className="relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What are we working on today?"
              className="w-full glass-panel px-6 py-4 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-lg placeholder:text-white/30"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2 rounded-lg transition-colors ${isListening ? 'text-red-400 bg-red-400/10' : 'text-white/40 hover:text-white'}`}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <button
                type="submit"
                disabled={!input.trim() || isProcessing}
                className="p-2 glass-button text-blue-400 disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
          
          <p className="text-center mt-4 text-white/40 text-sm font-light tracking-widest uppercase">
            {isProcessing ? 'Analyzing Intent...' : 'Nexus Visual Computer'}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
