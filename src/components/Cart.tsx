import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { OrderItem } from '../types';
import { cn } from '../lib/utils';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onUpdateQuantity: (id: string, size: string | undefined, delta: number) => void;
  onRemoveItem: (id: string, size: string | undefined) => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + (item.selectedPrice * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-zinc-900 border-l border-white/10 z-[101] flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-orange-500" />
                <h2 className="text-white font-bold text-xl">Your Order</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-white/20" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Your cart is empty</h3>
                    <p className="text-white/40 text-sm">Add some delicious items to get started!</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-600 transition-colors"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                items.map((item, idx) => (
                  <motion.div 
                    key={`${item.id}-${item.selectedSize}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex gap-4 group"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img 
                        src={`https://picsum.photos/seed/${item.name}/200/200`} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-white font-bold truncate">{item.name}</h4>
                        <button 
                          onClick={() => onRemoveItem(item.id, item.selectedSize)}
                          className="text-white/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {item.selectedSize && (
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-wider">{item.selectedSize}</span>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-white/5 rounded-lg px-2 py-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)}
                            className="p-1 hover:bg-white/10 rounded text-white/60 hover:text-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-white font-bold text-sm w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)}
                            className="p-1 hover:bg-white/10 rounded text-white/60 hover:text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-white font-bold">Rs. {item.selectedPrice * item.quantity}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-zinc-800/50 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between text-white/60 text-sm">
                  <span>Subtotal</span>
                  <span>Rs. {total}</span>
                </div>
                <div className="flex items-center justify-between text-white/60 text-sm">
                  <span>Delivery Fee</span>
                  <span>Rs. 150</span>
                </div>
                <div className="flex items-center justify-between text-white font-bold text-xl pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-orange-500">Rs. {total + 150}</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20"
                >
                  Checkout Now
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
