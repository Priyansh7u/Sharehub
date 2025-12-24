
import React, { useState } from 'react';
import { CATEGORIES, MOCK_ITEMS } from '../constants';
import { ShareItem, Category } from '../types';
import { Search, Image as ImageIcon, Camera, MapPin, RefreshCw } from 'lucide-react';

interface Props {
  onSelectItem: (item: ShareItem) => void;
}

const Discover: React.FC<Props> = ({ onSelectItem }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [pastItems] = useState<ShareItem[]>(MOCK_ITEMS.slice(0, 2)); // Mock past loans
  const [showUpload, setShowUpload] = useState(false);

  const filteredItems = activeCategory === 'All' 
    ? MOCK_ITEMS 
    : MOCK_ITEMS.filter(i => i.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-16">
      {/* Past Appliances Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-emerald-600 rounded-full"></div>
          <h2 className="text-3xl font-black tracking-tight font-heading">PAST APPLIANCES</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastItems.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-[32px] shadow-lg flex items-center gap-6 border border-slate-100 group">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md shrink-0">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <h4 className="font-bold text-slate-900">{item.name}</h4>
                  <span className="text-[10px] italic text-slate-400">{item.category}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                  {item.description}
                </p>
                <button 
                  onClick={() => onSelectItem(item)}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-full flex items-center gap-2 hover:bg-emerald-600 transition shadow-lg shadow-slate-200"
                >
                  <RefreshCw className="w-3 h-3" /> ReGrab
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Items Section */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
            <h2 className="text-3xl font-black tracking-tight font-heading">NEW ITEMS</h2>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition shadow-xl shadow-emerald-200"
            >
              <Camera className="w-5 h-5" /> Smart Match
            </button>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`p-6 rounded-[32px] flex flex-col items-center gap-4 transition-all duration-300 border ${
                activeCategory === cat.name 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 border-blue-600' 
                : 'bg-white text-slate-600 border-slate-100 hover:border-blue-200 hover:bg-blue-50'
              }`}
            >
              <div className={`${activeCategory === cat.name ? 'text-white' : 'text-blue-500'}`}>
                {cat.icon}
              </div>
              <span className="text-[10px] font-bold text-center leading-tight uppercase tracking-widest">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Item Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-slate-50 hover:-translate-y-2 transition-transform duration-300 group">
              <div className="h-56 relative overflow-hidden">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                <div className="absolute top-4 right-4 px-4 py-2 glass-morphism rounded-full text-xs font-bold text-emerald-800">
                  ₹{item.pricePerDay}/day
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                  <span className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-500 font-medium uppercase tracking-tighter">{item.category}</span>
                </div>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                    <MapPin className="w-4 h-4 text-emerald-500" /> {item.distance} away
                  </div>
                  <button 
                    onClick={() => onSelectItem(item)}
                    className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-100"
                  >
                    Lend Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Image Recognition Modal Mock */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-[40px] p-8 space-y-6 shadow-2xl relative">
            <button onClick={() => setShowUpload(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"><RefreshCw className="w-6 h-6"/></button>
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-4 text-emerald-600">
                <Camera className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black mb-2 font-heading">AI SMART MATCH</h3>
              <p className="text-slate-500 text-sm">Upload a photo and we'll match it with available items in our hub.</p>
            </div>
            <div className="border-4 border-dashed border-slate-100 rounded-[32px] p-12 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer transition">
              <ImageIcon className="w-12 h-12 mb-4" />
              <span className="font-bold">Select Photo</span>
            </div>
            <button className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-200">Start Recognition</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;
