
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Order, TrackingStatus } from '../types';
import { Package, MapPin, Truck, CheckCircle, Clock, ChevronRight, Navigation, Zap } from 'lucide-react';

const OrderTracking: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(db.getOrders());
  
  const statusSteps: TrackingStatus[] = ['Order Placed', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered'];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-12">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-emerald-600 text-white rounded-[32px] flex items-center justify-center shadow-2xl relative overflow-hidden group">
            <Package className="w-10 h-10 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </div>
          <div>
            <h2 className="text-5xl font-black tracking-tighter font-heading uppercase">Your Shares</h2>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-[0.4em]">Live community logistics tracking</p>
          </div>
        </div>
        <div className="bg-emerald-50 px-8 py-4 rounded-[32px] border border-emerald-100 flex items-center gap-4">
           <Zap className="w-6 h-6 text-emerald-600 fill-emerald-600" />
           <div>
              <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Platform Impact</p>
              <p className="text-lg font-black text-emerald-900">4.2 KG CO2 SAVED TODAY</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-[56px] p-10 shadow-2xl border border-slate-50 relative overflow-hidden group hover:shadow-emerald-500/10 transition-shadow">
            <div className="flex flex-col gap-10">
              <div className="flex items-start justify-between">
                <div className="flex gap-6">
                  <div className="w-24 h-24 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white">
                    <img src={order.itemImage} className="w-full h-full object-cover" alt=""/>
                  </div>
                  <div>
                    <span className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">
                      TRACKING LIVE
                    </span>
                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter font-heading">{order.itemName}</h3>
                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Order ID: {order.id}</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ETA Arrival</p>
                   <p className="text-3xl font-black text-emerald-600">{order.eta}</p>
                </div>
              </div>

              {/* Progress Tracker UI */}
              <div className="space-y-6 pt-4">
                <div className="flex justify-between items-center mb-2 px-2">
                   <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Delivery Progress</p>
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{order.status}</p>
                </div>
                <div className="relative h-4 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                  <div 
                    className="absolute top-0 left-0 h-full tracking-line rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${((statusSteps.indexOf(order.status) + 1) / statusSteps.length) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between px-1">
                  {statusSteps.map((step, i) => (
                    <div key={step} className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm mb-3 transition-all duration-500 ${
                        statusSteps.indexOf(order.status) >= i ? 'bg-emerald-500 scale-125' : 'bg-slate-200'
                      }`}></div>
                      <span className={`text-[8px] font-black uppercase tracking-widest transition-opacity text-center w-16 ${
                        order.status === step ? 'opacity-100 text-emerald-600 font-bold' : 'opacity-30 text-slate-400'
                      }`}>
                        {step.split(' ').join('\n')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                 <div className="p-6 bg-slate-50 rounded-[40px] border border-slate-100 flex items-center gap-4 group/box hover:bg-white transition-colors">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center group-hover/box:rotate-12 transition-transform">
                      <MapPin className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pickup Hub</p>
                       <p className="text-xs font-bold text-slate-700 truncate w-32">{order.pickupAddress}</p>
                    </div>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-[40px] border border-slate-100 flex items-center gap-4 group/box hover:bg-white transition-colors">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center group-hover/box:rotate-12 transition-transform">
                      <Truck className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logistics</p>
                       <p className="text-xs font-bold text-slate-700">Community Fleet</p>
                    </div>
                 </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-5 bg-slate-900 text-white rounded-[28px] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-emerald-600 transition shadow-2xl active:scale-95">
                  <Navigation className="w-5 h-5" /> View on Radar
                </button>
                <button className="w-16 h-16 bg-slate-50 text-slate-400 rounded-[28px] flex items-center justify-center hover:bg-slate-900 hover:text-white transition group/btn">
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;
