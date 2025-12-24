
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Order, TrackingStatus } from '../types';
import { Package, MapPin, Truck, CheckCircle, Clock, ChevronRight } from 'lucide-react';

const OrderTracking: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(db.getOrders());
  
  const statusSteps: TrackingStatus[] = ['Order Placed', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered'];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-emerald-600 text-white rounded-[24px] flex items-center justify-center shadow-2xl">
          <Package className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-4xl font-black tracking-tighter font-heading">LIVE TRACKING</h2>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Monitor your active community shares</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-[48px] p-8 shadow-xl border border-slate-50 relative overflow-hidden group">
            <div className="flex flex-col gap-8">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-[24px] overflow-hidden shadow-md">
                    <img src={order.itemImage} className="w-full h-full object-cover" alt=""/>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">{order.itemName}</h3>
                    <p className="text-xs font-bold text-slate-400">Order #{order.id}</p>
                    <div className="mt-2 flex items-center gap-2">
                       <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                       <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{order.status}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Arrival In</p>
                   <p className="text-2xl font-black text-slate-900">{order.eta}</p>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="relative pt-4 pb-8">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full"></div>
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-emerald-500 -translate-y-1/2 rounded-full transition-all duration-1000" 
                  style={{ width: `${(statusSteps.indexOf(order.status) / (statusSteps.length - 1)) * 100}%` }}
                ></div>
                <div className="flex justify-between relative">
                  {statusSteps.map((step, i) => (
                    <div key={step} className="flex flex-col items-center group/step">
                      <div className={`w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 transition-colors ${
                        statusSteps.indexOf(order.status) >= i ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}></div>
                      <span className={`absolute -bottom-6 text-[8px] font-black uppercase tracking-widest transition-opacity ${
                        order.status === step ? 'opacity-100 text-emerald-600' : 'opacity-0'
                      }`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-slate-50 rounded-[28px] border border-slate-100 flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm"><MapPin className="w-4 h-4 text-slate-400" /></div>
                    <div>
                       <p className="text-[8px] font-black text-slate-400 uppercase">From</p>
                       <p className="text-[10px] font-bold text-slate-700 truncate w-32">{order.pickupAddress}</p>
                    </div>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-[28px] border border-slate-100 flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm"><Truck className="w-4 h-4 text-emerald-500" /></div>
                    <div>
                       <p className="text-[8px] font-black text-slate-400 uppercase">Current</p>
                       <p className="text-[10px] font-bold text-slate-700">{order.status}</p>
                    </div>
                 </div>
              </div>

              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-600 transition shadow-xl shadow-slate-200">
                View On Map <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;
