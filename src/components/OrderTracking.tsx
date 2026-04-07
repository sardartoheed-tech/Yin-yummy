import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, Truck, Package, MapPin, Phone, User } from 'lucide-react';
import { Order } from '../types';
import { cn } from '../lib/utils';

interface OrderTrackingProps {
  order: Order;
}

const STEPS = [
  { id: 'pending', label: 'Order Placed', icon: Clock },
  { id: 'preparing', label: 'Preparing', icon: Package },
  { id: 'out-for-delivery', label: 'Out for Delivery', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle2 },
];

export default function OrderTracking({ order }: OrderTrackingProps) {
  const currentStepIdx = STEPS.findIndex(s => s.id === order.status);

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
      <div className="p-8 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-orange-500/10 to-transparent">
        <div>
          <h2 className="text-white font-bold text-2xl mb-1">Order Tracking</h2>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">#{order.id.slice(0, 8)}</p>
        </div>
        <div className="bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">
          {order.status.replace(/-/g, ' ')}
        </div>
      </div>

      <div className="p-8 space-y-12">
        {/* Map Journey */}
        <div className="relative h-64 bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 group">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 200C200 200 200 100 400 100C600 100 600 300 800 300" stroke="white" strokeWidth="2" strokeDasharray="10 10" />
              <circle cx="100" cy="200" r="10" fill="white" />
              <circle cx="700" cy="250" r="10" fill="white" />
            </svg>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-2xl h-full flex items-center justify-between px-20">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/50">
                  <MapPin className="w-6 h-6 text-orange-500" />
                </div>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Restaurant</span>
              </div>

              <div className="flex-1 relative h-px bg-white/10 mx-4">
                <motion.div 
                  initial={{ left: '0%' }}
                  animate={{ left: `${(currentStepIdx / (STEPS.length - 1)) * 100}%` }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
                >
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/50">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ width: '0%' }}
                  animate={{ width: `${(currentStepIdx / (STEPS.length - 1)) * 100}%` }}
                  className="absolute top-0 left-0 h-full bg-orange-500"
                />
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                  <User className="w-6 h-6 text-white/40" />
                </div>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">You</span>
              </div>
            </div>
          </div>
          
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Tracking</span>
          </div>
        </div>

        <div className="relative flex items-center justify-between max-w-2xl mx-auto">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: currentStepIdx / (STEPS.length - 1) }}
            className="absolute top-1/2 left-0 right-0 h-0.5 bg-orange-500 origin-left -translate-y-1/2 z-0"
          />

          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx <= currentStepIdx;
            const isCurrent = idx === currentStepIdx;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                <motion.div 
                  initial={false}
                  animate={{ 
                    backgroundColor: isActive ? '#f97316' : '#27272a',
                    scale: isCurrent ? 1.2 : 1,
                    boxShadow: isCurrent ? '0 0 20px rgba(249, 115, 22, 0.5)' : 'none'
                  }}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white border-2 border-white/10"
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                <span className={cn(
                  "text-xs font-bold uppercase tracking-wider whitespace-nowrap",
                  isActive ? "text-white" : "text-white/20"
                )}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-500" />
              Delivery Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white/40" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase font-bold tracking-widest mb-1">Customer</p>
                  <p className="text-white font-medium">i.sardartoheed@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white/40" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase font-bold tracking-widest mb-1">Address</p>
                  <p className="text-white font-medium">{order.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white/40" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase font-bold tracking-widest mb-1">Phone</p>
                  <p className="text-white font-medium">{order.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <Package className="w-5 h-5 text-orange-500" />
              Order Summary
            </h3>
            <div className="bg-white/5 rounded-2xl p-6 space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-white/60">
                    <span className="text-orange-500 font-bold mr-2">{item.quantity}x</span>
                    {item.name} {item.selectedSize && `(${item.selectedSize})`}
                  </span>
                  <span className="text-white font-medium">Rs. {item.selectedPrice * item.quantity}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-white font-bold">Total Amount</span>
                <span className="text-orange-500 font-bold text-xl">Rs. {order.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
