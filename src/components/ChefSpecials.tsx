import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface Special {
  id: string;
  name: string;
  description: string;
  videoUrl: string;
  tag: string;
}

const SPECIALS: Special[] = [
  {
    id: 's1',
    name: 'Sizzling Garlic Prawns',
    description: 'Fresh jumbo prawns tossed in a secret garlic butter sauce with a hint of chili and aromatic herbs.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-in-a-professional-kitchen-40761-large.mp4',
    tag: 'Signature'
  },
  {
    id: 's2',
    name: 'Authentic Beef Chowmien',
    description: 'Hand-pulled noodles stir-fried with tender beef strips and farm-fresh vegetables in a high-heat wok.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-vegetables-in-a-wok-40763-large.mp4',
    tag: 'Chef Choice'
  },
  {
    id: 's3',
    name: 'Y&Y Special Platter',
    description: 'A grand selection of our best-selling appetizers, perfect for sharing with family and friends.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-finishing-a-dish-with-a-sauce-40762-large.mp4',
    tag: 'Best Seller'
  }
];

export default function ChefSpecials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const next = () => setActiveIndex((prev) => (prev + 1) % SPECIALS.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + SPECIALS.length) % SPECIALS.length);

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(next, 8000);
      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  return (
    <section className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-orange-500 font-bold uppercase tracking-[0.4em] text-xs mb-4 block"
          >
            Culinary Art
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-white"
          >
            CHEF'S <span className="text-orange-500">SPECIALS</span>
          </motion.h2>
        </div>

        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={SPECIALS[activeIndex].id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <video
                src={SPECIALS[activeIndex].videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
              
              <div className="absolute inset-0 flex items-center px-10 md:px-20">
                <div className="max-w-xl space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-2 bg-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit"
                  >
                    <Star className="w-3 h-3 fill-current" />
                    {SPECIALS[activeIndex].tag}
                  </motion.div>
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-4xl md:text-6xl font-black text-white leading-none"
                  >
                    {SPECIALS[activeIndex].name}
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-white/60 text-lg leading-relaxed"
                  >
                    {SPECIALS[activeIndex].description}
                  </motion.p>
                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all"
                  >
                    Order This Special
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute bottom-10 right-10 flex items-center gap-4 z-10">
            <button 
              onClick={prev}
              className="p-4 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full text-white transition-all border border-white/10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={next}
              className="p-4 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full text-white transition-all border border-white/10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-10 left-10 flex items-center gap-2 z-10">
            {SPECIALS.map((_, i) => (
              <div 
                key={i}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  activeIndex === i ? "w-12 bg-orange-500" : "w-4 bg-white/20"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
