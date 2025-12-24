
import React, { useState, useEffect } from 'react';
import { User, ShareItem } from './types';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import Discover from './components/Discover';
import Flow from './components/Flow';
import Community from './components/Community';
import Profile from './components/Profile';
import Booking from './components/Booking';
import AdminDashboard from './components/AdminDashboard';
import CarrierTab from './components/CarrierTab';
import OrderTracking from './components/OrderTracking';
import AIBot from './components/AIBot';
import { User as UserIcon, LogOut, ChevronLeft, Shield, Truck, Package, Activity } from 'lucide-react';

type View = 'landing' | 'discover' | 'flow' | 'community' | 'profile' | 'booking' | 'admin' | 'carrier' | 'tracking';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('landing');
  const [selectedItem, setSelectedItem] = useState<ShareItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('currentUser');
    if (saved) setUser(JSON.parse(saved));
    setIsLoading(false);
  }, []);

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-emerald-50"><div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!user) return <Auth onAuthSuccess={setUser} />;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setCurrentView('landing');
  };

  const navigateToBooking = (item: ShareItem) => {
    setSelectedItem(item);
    setCurrentView('booking');
  };

  const renderView = () => {
    switch(currentView) {
      case 'landing': return <LandingPage onNavigate={setCurrentView} />;
      case 'discover': return <Discover onSelectItem={navigateToBooking} />;
      case 'flow': return <Flow />;
      case 'community': return <Community />;
      case 'profile': return <Profile user={user} onUpdateUser={setUser} />;
      case 'admin': return <AdminDashboard />;
      case 'carrier': return <CarrierTab />;
      case 'tracking': return <OrderTracking />;
      case 'booking': return selectedItem ? <Booking item={selectedItem} onConfirm={() => setCurrentView('tracking')} onCancel={() => setCurrentView('discover')} /> : null;
      default: return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  const navItems = [
    { id: 'discover', label: 'Browse', icon: <Activity className="w-3 h-3" /> },
    { id: 'flow', label: 'Flow', icon: null },
    { id: 'community', label: 'Pulse', icon: null },
    { id: 'tracking', label: 'Live Tracking', icon: <Package className="w-3 h-3" /> },
    { id: 'carrier', label: 'Fleet Portal', icon: <Truck className="w-3 h-3" /> }
  ];

  return (
    <div className="min-h-screen pb-20 selection:bg-emerald-500 selection:text-white">
      <nav className="fixed top-0 left-0 right-0 z-40 glass-morphism px-10 py-5 flex items-center justify-between shadow-xl shadow-slate-900/5">
        <div className="flex items-center gap-12">
          <button 
            onClick={() => setCurrentView('landing')}
            className="text-3xl font-black text-slate-900 font-heading tracking-tighter hover:text-emerald-600 transition flex items-center gap-2"
          >
            SHARE<span className="text-emerald-600">HUB</span>
          </button>
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((v) => (
              <button 
                key={v.id}
                onClick={() => setCurrentView(v.id as View)}
                className={`text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 transition-all duration-300 group ${currentView === v.id ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-900'}`}
              >
                {v.icon && <span className={`${currentView === v.id ? 'text-emerald-600' : 'text-slate-300 group-hover:text-slate-900'}`}>{v.icon}</span>}
                {v.label}
                {currentView === v.id && <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse"></span>}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          {user.role === 'admin' && (
            <button 
              onClick={() => setCurrentView('admin')}
              className={`p-3.5 rounded-2xl transition-all shadow-lg ${currentView === 'admin' ? 'bg-slate-900 text-white shadow-slate-900/20' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-100'}`}
            >
              <Shield className="w-5 h-5" />
            </button>
          )}
          <button 
            onClick={() => setCurrentView('profile')}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all shadow-lg font-black text-[10px] uppercase tracking-widest ${currentView === 'profile' ? 'bg-emerald-600 text-white shadow-emerald-500/20' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-100'}`}
          >
            <UserIcon className="w-5 h-5" />
            <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
          </button>
          <button onClick={handleLogout} className="p-3.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition border border-transparent hover:border-red-100">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <main className="transition-all duration-700 pt-24 min-h-screen">
        {currentView !== 'landing' && (
          <div className="max-w-7xl mx-auto px-6 mb-8 mt-4">
            <button onClick={() => setCurrentView('landing')} className="flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-emerald-600 transition-all group">
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform"/> Hub Base
            </button>
          </div>
        )}
        {renderView()}
      </main>

      <footer className="border-t border-slate-200 bg-slate-950 text-slate-400 py-24 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 text-center md:text-left">
          <div className="space-y-10">
             <h4 className="text-white font-black text-4xl tracking-tighter font-heading">SHARE<span className="text-emerald-500">HUB</span></h4>
             <p className="text-sm leading-relaxed text-slate-500 font-medium">Redefining local consumption through decentralized sharing. Built by community, for community.</p>
             <div className="flex gap-4 justify-center md:justify-start">
                {[1,2,3].map(i => <div key={i} className="w-10 h-10 bg-slate-900 rounded-xl hover:bg-emerald-600 transition cursor-pointer"></div>)}
             </div>
          </div>
          <div className="space-y-8">
            <h5 className="text-white font-black text-[10px] uppercase tracking-[0.4em]">Hub Navigation</h5>
            <ul className="text-xs space-y-5 font-bold uppercase tracking-widest">
              <li onClick={() => setCurrentView('discover')} className="hover:text-emerald-500 cursor-pointer transition">Browse Catalog</li>
              <li onClick={() => setCurrentView('tracking')} className="hover:text-emerald-500 cursor-pointer transition">Live Tracking</li>
              <li onClick={() => setCurrentView('carrier')} className="hover:text-emerald-500 cursor-pointer transition">Fleet Portal</li>
              <li onClick={() => setCurrentView('community')} className="hover:text-emerald-500 cursor-pointer transition">Community Pulse</li>
            </ul>
          </div>
          <div className="space-y-8">
             <h5 className="text-white font-black text-[10px] uppercase tracking-[0.4em]">HQ Connect</h5>
             <div className="space-y-2">
                <p className="text-xs font-bold text-slate-200">3.shwetayadav29@gmail.com</p>
                <p className="text-xs text-slate-500">PM SHRI KV NARELA, DELHI</p>
             </div>
          </div>
          <div className="space-y-8">
             <h5 className="text-white font-black text-[10px] uppercase tracking-[0.4em]">Development</h5>
             <div className="space-y-2">
                <p className="text-xs font-bold text-slate-200 uppercase tracking-widest">Binary Bandits</p>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Team ID: D1428SR2</p>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[10px] uppercase tracking-[0.5em] font-black text-slate-600">© 2024 COMMUNITY SHARE HUB</span>
          <div className="flex gap-10">
             <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-600 hover:text-emerald-500 transition cursor-pointer">Privacy Policy</span>
             <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-600 hover:text-emerald-500 transition cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>

      <AIBot />
    </div>
  );
};

export default App;
