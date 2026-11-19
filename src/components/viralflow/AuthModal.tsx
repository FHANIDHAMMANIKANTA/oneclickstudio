import React, { useState } from 'react';
import { Zap, X, ArrowRight } from 'lucide-react';
import { HivepostlyLogo } from './HivepostlyLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('admin@hivepostly.ai');
  const [password, setPassword] = useState('admin123');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="card-brutal p-8 bg-white max-w-md w-full space-y-6 relative shadow-brutal-lg text-left">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 hover:bg-neutral-100 border border-[#0A0A0A] text-[#0A0A0A]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand */}
        <div className="space-y-1">
          <HivepostlyLogo size="md" />
          <h3 className="font-display text-xl font-black tracking-tight text-[#0A0A0A] pt-2">
            {isSignUp ? 'Create your creator account' : 'Sign in to Command Room'}
          </h3>
          <p className="text-xs text-neutral-600 font-medium">
            AI-native social operating system for serious creators.
          </p>
        </div>

        {/* Demo banner */}
        <div className="p-3 bg-[#B8FF5C] border-2 border-[#0A0A0A] text-xs font-bold font-mono space-y-0.5">
          <div className="text-[10px] uppercase text-neutral-700">Demo Credentials:</div>
          <div>User: <strong className="text-[#0A0A0A]">admin@hivepostly.ai</strong></div>
          <div>Pass: <strong className="text-[#0A0A0A]">admin123</strong></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-wider font-mono text-neutral-600">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FFFDF8] border-2 border-[#0A0A0A] p-3 text-xs font-bold text-[#0A0A0A] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-wider font-mono text-neutral-600">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FFFDF8] border-2 border-[#0A0A0A] p-3 text-xs font-bold text-[#0A0A0A] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#FF5B37] hover:bg-[#ff4921] text-white font-display font-black text-sm tracking-tight border-2 border-[#0A0A0A] shadow-brutal flex items-center justify-center gap-2 transition-all hover:translate-x-0.5 hover:translate-y-0.5"
          >
            <span>{isSignUp ? 'Create Account' : 'Sign In Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch mode */}
        <div className="text-center text-xs font-bold text-neutral-600 pt-2 border-t border-neutral-100">
          {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#FF5B37] underline hover:text-[#0A0A0A]"
          >
            {isSignUp ? 'Sign in' : 'Create free account'}
          </button>
        </div>
      </div>
    </div>
  );
};
