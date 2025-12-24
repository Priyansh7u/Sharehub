
import React from 'react';
import { MapPin, Search, Activity, Users } from 'lucide-react';

interface Props {
  onNavigate: (view: 'discover' | 'flow' | 'community') => void;
}

const LandingPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="pt-24 pb-12 px-6">
      {/* Header / Hero Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4 group">
            <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:rotate-12 transition-transform duration-300">
              <Activity className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 font-heading">
              COMMUNITY<br/>
              <span className="text-emerald-600">SHARE HUB</span>
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
            Revolutionizing local consumption by connecting neighbors. Borrow tools, lend appliances, and save the planet—one share at a time.
          </p>
        </div>

        {/* Delhi Proximity Map Mock */}
        <div className="flex-1 w-full h-[400px] bg-slate-200 rounded-[40px] relative overflow-hidden shadow-inner border-8 border-white group">
          <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/77.2090,28.6139,12,0/800x600?access_token=pk.eyJ1IjoiYWRtaW4iLCJhIjoiY2p4eCJ9')] bg-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Markers */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="absolute animate-bounce"
                style={{ 
                  top: `${20 + Math.random() * 60}%`, 
                  left: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              >
                <div className="p-2 bg-emerald-600 rounded-full text-white shadow-xl">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-6 left-6 right-6 p-4 glass-morphism rounded-2xl flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold">Multiple items available within 1km in Delhi</span>
          </div>
        </div>
      </div>

      {/* Main Feature Boxes */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            id: 'discover' as const, 
            name: 'DISCOVER', 
            icon: <Search className="w-8 h-8"/>, 
            color: 'bg-blue-500', 
            desc: 'Find items nearby. From drills to cameras, explore what your neighbours are lending.' 
          },
          { 
            id: 'flow' as const, 
            name: 'FLOW', 
            icon: <Activity className="w-8 h-8"/>, 
            color: 'bg-emerald-500', 
            desc: 'Manage your active loans, track payments, and get late-return alerts instantly.' 
          },
          { 
            id: 'community' as const, 
            name: 'COMMUNITY', 
            icon: <Users className="w-8 h-8"/>, 
            color: 'bg-purple-500', 
            desc: 'Share your experiences, earn badges, and join the zero-waste revolution.' 
          }
        ].map((feature) => (
          <div 
            key={feature.id}
            onClick={() => onNavigate(feature.id)}
            className="group relative h-80 bg-white rounded-[40px] p-8 shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-500 overflow-hidden border border-slate-100 hover:-translate-y-2"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${feature.color} opacity-10 rounded-bl-[100px] group-hover:w-full group-hover:h-full group-hover:rounded-none transition-all duration-700`}></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-3xl font-black mb-4 font-heading group-hover:text-white transition-colors duration-500">{feature.name}</h3>
              <p className="text-slate-500 group-hover:text-white/90 transition-colors duration-500 text-sm leading-relaxed">
                {feature.desc}
              </p>
              <div className="mt-auto">
                <span className="text-sm font-bold tracking-widest group-hover:text-white transition-colors duration-500">EXPLORE →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
