import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { cn } from '../lib/utils';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [user] = useAuthState(auth);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => signOut(auth);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
      >
        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white text-xl">Y</div>
        <span className="text-white font-bold text-xl tracking-tighter">YIN & YUMMY</span>
      </motion.div>

      <div className="flex items-center gap-6">
        <button 
          onClick={onCartClick}
          className="relative text-white/80 hover:text-white transition-colors"
        >
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-white/20" />
              <span className="text-white/80 text-sm hidden md:block">{user.displayName}</span>
            </div>
            <button onClick={handleLogout} className="text-white/60 hover:text-white transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button 
            onClick={handleLogin}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-orange-500 hover:text-white transition-all"
          >
            <User className="w-4 h-4" />
            <span>Login</span>
          </button>
        )}
      </div>
    </nav>
  );
}
