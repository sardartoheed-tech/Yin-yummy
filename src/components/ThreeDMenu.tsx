import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, ContactShadows, Html, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import { X, Info, ShoppingCart } from 'lucide-react';
import { MenuItem } from '../types';

function FoodModel({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl);
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 64]} />
        <meshStandardMaterial color="#27272a" />
      </mesh>
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.4, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </Float>
  );
}

interface ThreeDMenuProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, size?: string) => void;
}

export default function ThreeDMenu({ item, onClose, onAddToCart }: ThreeDMenuProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-10"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[210]"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-full h-full max-w-7xl grid lg:grid-cols-2 gap-10 items-center">
          {/* 3D Viewer */}
          <div className="relative h-[400px] lg:h-[600px] bg-zinc-900/50 rounded-3xl overflow-hidden border border-white/5">
            <Canvas shadows dpr={[1, 2]}>
              <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
              <Suspense fallback={<Html center><div className="text-orange-500 font-bold animate-pulse">Loading 3D...</div></Html>}>
                <Environment preset="city" />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <FoodModel imageUrl={item.image || `https://picsum.photos/seed/${item.name}/800/800`} />
                <ContactShadows position={[0, -0.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
                <OrbitControls enableZoom={true} minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
              </Suspense>
            </Canvas>
            <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest pointer-events-none">
              <Info className="w-4 h-4" />
              <span>Rotate & Zoom to explore</span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-xs mb-2 block">{item.category}</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4 uppercase">{item.name}</h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                {item.description || 'A masterfully prepared dish featuring the perfect blend of traditional spices and modern culinary techniques. Each bite is a journey through authentic flavors.'}
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Key Ingredients</h4>
                  <div className="flex flex-wrap gap-2">
                    {(item.ingredients || ['Fresh Spices', 'Organic Herbs', 'Premium Meat', 'Chef\'s Secret Sauce']).map((ing, i) => (
                      <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-white/80">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-white/40 text-xs uppercase font-bold tracking-widest mb-1">Starting from</p>
                    <p className="text-3xl font-black text-orange-500">
                      Rs. {typeof item.price === 'object' ? Object.values(item.price)[0] : item.price}
                    </p>
                  </div>
                  <button 
                    onClick={() => onAddToCart(item)}
                    className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-orange-500 hover:text-white transition-all active:scale-95 shadow-xl shadow-white/5"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Order</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
