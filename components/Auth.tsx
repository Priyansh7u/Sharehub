
import React, { useState } from 'react';
import { User } from '../types';
import { LogIn, UserPlus, Mail, Lock, Phone, MapPin, User as UserIcon } from 'lucide-react';

interface Props {
  onAuthSuccess: (user: User) => void;
}

const Auth: React.FC<Props> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    address: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const stored = localStorage.getItem(`user_${formData.email}`);
      if (stored) {
        const user = JSON.parse(stored);
        if (user.password === formData.password) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          onAuthSuccess(user);
        } else {
          alert("Invalid password");
        }
      } else {
        alert("User not found");
      }
    } else {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        contactNo: formData.contactNo,
        address: formData.address,
        badges: [],
        itemsCount: 0,
        role: formData.email.includes('admin') ? 'admin' : 'user'
      };
      const fullUserData = { ...newUser, password: formData.password };
      localStorage.setItem(`user_${formData.email}`, JSON.stringify(fullUserData));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      onAuthSuccess(newUser);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
      
      <div className="w-full max-w-md glass-morphism rounded-[48px] shadow-2xl overflow-hidden border border-white/10 z-10">
        <div className="p-12 text-center bg-gradient-to-br from-emerald-600 to-emerald-800 text-white relative">
          <h1 className="text-4xl font-black tracking-tighter mb-2 font-heading uppercase">
            {isLogin ? 'Welcome Back' : 'Create Hub'}
          </h1>
          <p className="text-emerald-100/70 text-xs font-bold uppercase tracking-widest">
            {isLogin ? 'Access your local network' : 'Join the zero-waste community'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-4">
          {!isLogin && (
            <>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="text" required placeholder="Full Name" className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/50 border-none focus:ring-2 focus:ring-emerald-500 transition shadow-inner" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}/>
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="tel" required placeholder="Contact Number" className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/50 border-none focus:ring-2 focus:ring-emerald-500 transition shadow-inner" value={formData.contactNo} onChange={e => setFormData({...formData, contactNo: e.target.value})}/>
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="text" required placeholder="Delhi Address" className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/50 border-none focus:ring-2 focus:ring-emerald-500 transition shadow-inner" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}/>
              </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="email" required placeholder="Email Address" className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/50 border-none focus:ring-2 focus:ring-emerald-500 transition shadow-inner" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}/>
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="password" required placeholder="Password" className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/50 border-none focus:ring-2 focus:ring-emerald-500 transition shadow-inner" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}/>
          </div>

          <button type="submit" className="w-full bg-emerald-600 text-white font-black py-5 rounded-[24px] shadow-xl hover:bg-emerald-700 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 uppercase tracking-widest">
            {isLogin ? 'Sign In' : 'Join Now'}
          </button>

          <div className="text-center mt-6">
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-emerald-600 transition">
              {isLogin ? "Need an account? Sign up" : "Have an account? Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
