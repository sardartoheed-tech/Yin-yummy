import React from 'react';
import { motion } from 'motion/react';
import { Plus, ShoppingCart, Info } from 'lucide-react';
import { MenuItem } from '../types';
import { cn } from '../lib/utils';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, size?: string) => void;
  onView3D: (item: MenuItem) => void;
}

export default function MenuCard({ item, onAddToCart, onView3D }: MenuCardProps) {
  const [selectedSize, setSelectedSize] = React.useState<string | undefined>(
    typeof item.price === 'object' ? Object.keys(item.price)[0] : undefined
  );

  const currentPrice = typeof item.price === 'object' 
    ? (item.price as any)[selectedSize!] 
    : item.price;

  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-500 h-full flex flex-col">
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={item.image || `https://picsum.photos/seed/${item.name}/400/400`} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <button 
          onClick={() => onView3D(item)}
          className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full text-white/60 hover:text-orange-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 border border-white/10"
        >
          <div className="flex items-center gap-2 px-2">
            <span className="text-[10px] font-bold uppercase tracking-widest">3D View</span>
          </div>
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-white font-bold text-lg leading-tight group-hover:text-orange-500 transition-colors">{item.name}</h3>
          <span className="text-orange-500 font-bold whitespace-nowrap">Rs. {currentPrice}</span>
        </div>

        <p className="text-white/40 text-sm mb-4 line-clamp-2">{item.description || 'Deliciously crafted with fresh ingredients and traditional spices.'}</p>

        <div className="mt-auto space-y-4">
          {typeof item.price === 'object' && (
            <div className="flex flex-wrap gap-2">
              {Object.keys(item.price).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium transition-all",
                    selectedSize === size 
                      ? "bg-orange-500 text-white" 
                      : "bg-white/10 text-white/60 hover:bg-white/20"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <button 
              onClick={() => onAddToCart(item, selectedSize)}
              className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-bold hover:bg-orange-500 hover:text-white transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
            <button 
              onClick={() => onView3D(item)}
              className="px-4 flex items-center justify-center bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
