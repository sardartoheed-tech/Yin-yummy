import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ChevronRight, Star, Clock, MapPin, Phone, Instagram, Facebook, Twitter, ShoppingBag } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebase';
import { collection, addDoc, onSnapshot, query, where, orderBy, limit } from 'firebase/firestore';
import { MENU_ITEMS, CATEGORIES } from './constants';
import { MenuItem, OrderItem, Order } from './types';
import Navbar from './components/Navbar';
import MenuCard from './components/MenuCard';
import Cart from './components/Cart';
import OrderTracking from './components/OrderTracking';
import ChefSpecials from './components/ChefSpecials';
import ThreeDMenu from './components/ThreeDMenu';
import { cn } from './lib/utils';

export default function App() {
  const [user] = useAuthState(auth);
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [cartItems, setCartItems] = React.useState<OrderItem[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [activeOrder, setActiveOrder] = React.useState<Order | null>(null);
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [selectedThreeDItem, setSelectedThreeDItem] = React.useState<MenuItem | null>(null);

  const isFirebasePlaceholder = (auth.app.options as any).apiKey === 'YOUR_API_KEY';

  // Filter menu items
  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cart handlers
  const handleAddToCart = (item: MenuItem, size?: string) => {
    const price = typeof item.price === 'object' ? (item.price as any)[size!] : item.price;
    
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.selectedSize === size);
      if (existing) {
        return prev.map(i => i.id === item.id && i.selectedSize === size 
          ? { ...i, quantity: i.quantity + 1 } 
          : i
        );
      }
      return [...prev, { ...item, quantity: 1, selectedSize: size, selectedPrice: price }];
    });
    setIsCartOpen(true);
    setSelectedThreeDItem(null);
  };

  const handleUpdateQuantity = (id: string, size: string | undefined, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: string, size: string | undefined) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const handleCheckout = async () => {
    if (!user) {
      alert('Please login to place an order');
      return;
    }

    setIsCheckingOut(true);
    const total = cartItems.reduce((sum, item) => sum + (item.selectedPrice * item.quantity), 0) + 150;
    
    const newOrder: Omit<Order, 'id'> = {
      userId: user.uid,
      items: cartItems,
      total,
      status: 'pending',
      createdAt: Date.now(),
      address: '123 Main St, Karachi, Pakistan',
      phone: '+92 300 1234567',
    };

    try {
      // Mocking for now since Firebase config is placeholder
      const mockId = Math.random().toString(36).substr(2, 9);
      setActiveOrder({ ...newOrder, id: mockId });
      setCartItems([]);
      setIsCartOpen(false);
      
      // Simulate order progress
      let status: Order['status'][] = ['pending', 'preparing', 'out-for-delivery', 'delivered'];
      let currentStatusIdx = 0;
      const interval = setInterval(() => {
        currentStatusIdx++;
        if (currentStatusIdx < status.length) {
          setActiveOrder(prev => prev ? { ...prev, status: status[currentStatusIdx] } : null);
        } else {
          clearInterval(interval);
        }
      }, 10000);

    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-orange-500 selection:text-white">
      <Navbar 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      {isFirebasePlaceholder && (
        <div className="fixed top-20 left-0 right-0 z-[60] bg-orange-500/10 backdrop-blur-md border-y border-orange-500/20 px-6 py-3 flex items-center justify-center gap-3 text-orange-500 text-sm font-bold">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          <span>Firebase is not configured. Please update firebase-applet-config.json to enable real-time features.</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40 scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-orange-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Authentic Chinese & Continental</span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none">
              YIN & <span className="text-orange-500">YUMMY</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience the perfect balance of flavors at Yin & Yummy by DFC. From sizzling steaks to authentic Chinese delicacies, we bring the best to your table.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto bg-orange-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/20"
              >
                Order Online
              </button>
              <button className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/10">
                View Menu
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/20 text-xs font-bold uppercase tracking-widest">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-orange-500 to-transparent" />
        </motion.div>
      </section>

      {/* Chef's Specials */}
      <ChefSpecials />

      {/* Active Order Tracking */}
      {activeOrder && (
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <OrderTracking order={activeOrder} />
        </section>
      )}

      {/* Menu Section */}
      <section id="menu" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-2 block">Our Specialties</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">Explore Our Menu</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="text" 
                placeholder="Search dishes..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-orange-500/50 transition-all w-full sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-3 overflow-x-auto pb-8 mb-8 no-scrollbar">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border",
                selectedCategory === category 
                  ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20" 
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <MenuCard 
                  item={item} 
                  onAddToCart={handleAddToCart} 
                  onView3D={setSelectedThreeDItem}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-white/40 text-lg">No items found matching your search.</p>
          </div>
        )}
      </section>

      <ThreeDMenu 
        item={selectedThreeDItem} 
        onClose={() => setSelectedThreeDItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-white/5 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white">Y</div>
              <span className="text-white font-bold text-xl tracking-tighter">YIN & YUMMY</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Serving the finest Chinese and Continental cuisine since 2010. Quality ingredients, authentic taste, and exceptional service.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Twitter className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Menu</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-500 mt-1" />
                <span>123 Food Street, Gulshan-e-Iqbal, Karachi</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-500" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>12:00 PM - 12:00 AM</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-white/40 text-sm mb-4">Subscribe to get special offers and menu updates.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500/50 flex-1"
              />
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-white/5 text-center text-white/20 text-xs">
          &copy; 2026 Yin & Yummy by DFC. All rights reserved.
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
