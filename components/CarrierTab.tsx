
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Order, TrackingStatus } from '../types';
import { Truck, MapPin, Package, CheckCircle, Navigation, Phone, Clock } from 'lucide-react';

const CarrierTab: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Order[]>(db.getAvailableDeliveries());
  
  const updateStatus = (orderId: string, nextStatus: TrackingStatus) => {
    const orders = db.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = nextStatus;
      db.saveOrder(order);
      setDeliveries(db.getAvailableDeliveries());
    }
  };

  const statusFlow: TrackingStatus[] = ['Order Placed', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered'];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-slate-900 text-white rounded-[24px] flex items-center justify-center shadow-2xl rotate-3">
          <Truck className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-4xl font-black tracking-tighter font-heading">CARRIER HUB</h2>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Logistics & Fleet Management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" /> Active Deliveries
          </h3>
          
          {deliveries.length === 0 ? (
            <div className="bg-white rounded-[40px] p-20 text-center border-4 border-dashed border-slate-100">
               <Package className="w-16 h-16 text-slate-200 mx-auto mb-4" />
               <p className="font-bold text-slate-400 uppercase tracking-widest">No active deliveries</p>
            </div>
          ) : (
            deliveries.map(order => (
              <div key={order.id} className="bg-white rounded-[48px] p-8 shadow-2xl border border-slate-50 overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/5 rounded-bl-[100px] group-hover:bg-emerald-600/10 transition-colors"></div>
                
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-32 h-32 rounded-[32px] overflow-hidden shadow-inner shrink-0">
                    <img src={order.itemImage} className="w-full h-full object-cover" alt=""/>
                  </div>
                  
                  <div className="flex-1 space-y-6 w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block">
                          {order.status}
                        </span>
                        <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{order.itemName}</h4>
                        <p className="text-xs font-bold text-slate-400">Order ID: {order.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ETA</p>
                        <p className="text-2xl font-black text-emerald-600">{order.eta}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-[24px] space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Pickup</p>
                        <p className="text-sm font-bold text-slate-700 flex items-center gap-2"><MapPin className="w-4 h-4 text-red-400" /> {order.pickupAddress}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-[24px] space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Drop-off</p>
                        <p className="text-sm font-bold text-slate-700 flex items-center gap-2"><Navigation className="w-4 h-4 text-blue-400" /> {order.deliveryAddress}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-50">
                      {statusFlow.map((status, i) => (
                        <button
                          key={status}
                          disabled={order.status === status}
                          onClick={() => updateStatus(order.id, status)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            order.status === status 
                            ? 'bg-slate-900 text-white' 
                            : 'bg-slate-100 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 rounded-[48px] p-8 text-white shadow-2xl relative overflow-hidden">
            <Truck className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10" />
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Navigation className="w-5 h-5 text-emerald-400" /> Fleet Stats</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-xs font-bold text-slate-400 uppercase">Total Deliveries</span>
                <span className="text-2xl font-black">128</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-xs font-bold text-slate-400 uppercase">Active Earnings</span>
                <span className="text-2xl font-black text-emerald-400">₹4,250</span>
              </div>
              <div className="flex justify-between items-center pb-4">
                <span className="text-xs font-bold text-slate-400 uppercase">Reliability Score</span>
                <span className="text-2xl font-black text-blue-400">98%</span>
              </div>
            </div>
            <button className="w-full py-4 mt-6 bg-emerald-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition">Go Offline</button>
          </div>

          <div className="bg-white rounded-[40px] p-8 shadow-xl border border-slate-100">
             <h4 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">Support Line</h4>
             <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <Phone className="w-6 h-6 text-blue-600" />
                <div>
                   <p className="text-xs font-bold text-blue-900">Emergency Logistics</p>
                   <p className="text-[10px] text-blue-600 font-bold">+91 98765 43210</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrierTab;
