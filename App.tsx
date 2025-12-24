
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
import { User as UserIcon, LogOut, ChevronLeft, Shield, Truck, Package } from 'lucide-react';

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

  return (
    <div className="min-h-screen pb-20">
      <nav className="fixed top-0 left-0 right-0 z-40 glass-morphism px-8 py-4 flex items-center justify-between shadow-sm border-b border-white/20">
        <div className="flex items-center gap-8">
          <button 
            onClick={() => setCurrentView('landing')}
            className="text-2xl font-black text-slate-900 font-heading tracking-tighter hover:text-emerald-600 transition"
          >
            SHARE<span className="text-emerald-600">HUB</span>
          </button>
          <div className="hidden md:flex items-center gap-6">
            {['discover', 'flow', 'community', 'tracking', 'carrier'].map((v) => (
              <button 
                key={v}
                onClick={() => setCurrentView(v as View)}
                className={`text-[10px] font-black uppercase tracking-[0.2em] hover:text-emerald-600 transition ${currentView === v ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-400'}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user.role === 'admin' && (
            <button 
              onClick={() => setCurrentView('admin')}
              className={`p-3 rounded-2xl transition-all ${currentView === 'admin' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            >
              <Shield className="w-5 h-5" />
            </button>
          )}
          <button 
            onClick={() => setCurrentView('profile')}
            className={`w-12 h-12 rounded-[20px] flex items-center justify-center transition-all ${currentView === 'profile' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-100' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
          >
            <UserIcon className="w-6 h-6" />
          </button>
          <button onClick={handleLogout} className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <main className="transition-all duration-500">
        {currentView !== 'landing' && (
          <div className="max-w-7xl mx-auto px-6 pt-24 mb-4">
            <button onClick={() => setCurrentView('landing')} className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-emerald-600 transition group">
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform"/> Back to home
            </button>
          </div>
        )}
        {renderView()}
      </main>

      <footer className="mt-20 border-t border-slate-200 bg-slate-900 text-slate-400 py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="space-y-6">
             <h4 className="text-white font-black text-2xl tracking-tighter">SHARE<span className="text-emerald-500">HUB</span></h4>
             <p className="text-xs leading-relaxed">Empowering communities to share more and waste less. Proudly serving Delhi neighborhoods with AI-driven resource matching.</p>
          </div>
          <div className="space-y-4">
            <h5 className="text-white font-bold text-xs uppercase tracking-widest">Navigation</h5>
            <ul className="text-xs space-y-3">
              <li onClick={() => setCurrentView('discover')} className="hover:text-emerald-500 cursor-pointer transition">Browse Items</li>
              <li onClick={() => setCurrentView('tracking')} className="hover:text-emerald-500 cursor-pointer transition">Track Rents</li>
              <li onClick={() => setCurrentView('carrier')} className="hover:text-emerald-500 cursor-pointer transition">Fleet Portal</li>
            </ul>
          </div>
          <div className="space-y-4">
             <h5 className="text-white font-bold text-xs uppercase tracking-widest">Contact Hub</h5>
             <p className="text-xs">3.shwetayadav29@gmail.com</p>
             <p className="text-xs">PM SHRI KV NARELA</p>
          </div>
          <div className="space-y-4">
             <h5 className="text-white font-bold text-xs uppercase tracking-widest">Binary Bandits</h5>
             <p className="text-xs">Team ID: D1428SR2</p>
             <p className="text-xs">Zero Waste Champions</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-[10px] uppercase tracking-widest font-bold">
          Empowered by Sustainable Design • 2024
        </div>
      </footer>

      <AIBot />
    </div>
  );
};

export default App;
