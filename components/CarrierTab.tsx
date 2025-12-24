
import React, { useState } from 'react';
import { db } from '../services/db';
import { Order, TrackingStatus } from '../types';
import { Truck, MapPin, Package, CheckCircle, Navigation, Phone, Clock, DollarSign, Zap } from 'lucide-react';

const CarrierTab: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Order[]>(db.getAvailableDeliveries());
  
  const updateStatus = (orderId: string, nextStatus: TrackingStatus) => {
    const orders = db.getOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex > -1) {
      const updatedOrder = { ...orders[orderIndex], status: nextStatus };
      db.saveOrder(updatedOrder);
      setDeliveries(db.getAvailableDeliveries());
    }
  };

  const statusFlow: TrackingStatus[] = ['Order Placed', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered'];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-12">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-slate-900 text-white rounded-[32px] flex items-center justify-center shadow-2xl animate-float">
            <Truck className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-5xl font-black tracking-tighter font-heading uppercase">Fleet Portal</h2>
            <p className="text-emerald-600 font-bold uppercase text-xs tracking-[0.4em]">Community Logistics Command</p>
          </div>
        </div>
        <div className="flex gap-4">
           <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Today's Earnings</p>
                <p className="text-2xl font-black text-slate-900">₹1,240</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3 font-heading uppercase">
              <Zap className="w-6 h-6 text-yellow-500 fill-yellow-500" /> Nearby Jobs
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing within 5km</span>
          </div>
          
          {deliveries.length === 0 ? (
            <div className="bg-white rounded-[56px] p-24 text-center border-4 border-dashed border-slate-100 space-y-6">
               <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                 <Package className="w-10 h-10 text-slate-200" />
               </div>
               <p className="font-black text-slate-400 uppercase tracking-widest text-lg">No active delivery requests</p>
               <button className="px-8 py-3 bg-slate-100 text-slate-400 rounded-2xl font-bold cursor-not-allowed">Refresh Feed</button>
            </div>
          ) : (
            deliveries.map(order => (
              <div key={order.id} className="bg-white rounded-[56px] p-10 shadow-2xl border border-slate-50 group hover:border-emerald-500 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-600/5 rounded-bl-[100px] -z-0"></div>
                
                <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
                  <div className="w-40 h-40 rounded-[40px] overflow-hidden shadow-2xl shrink-0 border-4 border-white group-hover:rotate-3 transition-transform">
                    <img src={order.itemImage} className="w-full h-full object-cover" alt=""/>
                  </div>
                  
                  <div className="flex-1 space-y-8 w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                            {order.status}
                          </span>
                          <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100">
                            PAY: ₹60
                          </span>
                        </div>
                        <h4 className="text-3xl font-black text-slate-900 uppercase tracking-tighter font-heading">{order.itemName}</h4>
                        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Batch #{order.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time Remaining</p>
                        <p className="text-3xl font-black text-emerald-600">{order.eta}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-slate-50 rounded-[32px] space-y-2 border border-slate-100">
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Pickup
                        </p>
                        <p className="text-sm font-bold text-slate-700 leading-snug">{order.pickupAddress}</p>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-[32px] space-y-2 border border-slate-100">
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Destination
                        </p>
                        <p className="text-sm font-bold text-slate-700 leading-snug">{order.deliveryAddress}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-100">
                      {statusFlow.map((status) => (
                        <button
                          key={status}
                          disabled={order.status === status}
                          onClick={() => updateStatus(order.id, status)}
                          className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            order.status === status 
                            ? 'bg-slate-900 text-white scale-105 shadow-xl' 
                            : 'bg-white text-slate-400 border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 hover:shadow-lg'
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
          <div className="bg-slate-900 rounded-[56px] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 opacity-20 rounded-bl-full group-hover:scale-150 transition-transform duration-1000"></div>
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3 font-heading uppercase">
              <Navigation className="w-6 h-6 text-emerald-400" /> Live Status
            </h3>
            <div className="space-y-8">
              <div className="flex justify-between items-center group-hover:translate-x-2 transition-transform">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Shift</p>
                  <p className="text-lg font-black text-emerald-400">4h 22m</p>
                </div>
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                   <Clock className="w-6 h-6 text-slate-400" />
                </div>
              </div>
              <div className="flex justify-between items-center group-hover:translate-x-2 transition-transform">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Items Delivered</p>
                  <p className="text-lg font-black text-blue-400">12 Packages</p>
                </div>
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                   <Package className="w-6 h-6 text-slate-400" />
                </div>
              </div>
              <div className="pt-4">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Health Status</p>
                 <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-4/5 h-full bg-emerald-500 rounded-full"></div>
                 </div>
              </div>
            </div>
            <button className="w-full py-5 mt-10 bg-emerald-500 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-400 transition shadow-2xl shadow-emerald-500/20 active:scale-95">Go Offline</button>
          </div>

          <div className="bg-white rounded-[48px] p-10 shadow-xl border border-slate-100 space-y-6">
             <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center shadow-inner">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                   <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Logistics Support</h4>
                   <p className="text-[10px] text-slate-400 font-bold tracking-widest">24/7 Priority Line</p>
                </div>
             </div>
             <p className="text-[11px] text-slate-500 font-medium leading-relaxed uppercase tracking-widest">Need help with a pickup or delivery route? Contact our central dispatch for real-time assistance.</p>
             <button className="w-full py-4 border-2 border-slate-100 text-slate-900 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition">Call Dispatch Hub</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrierTab;
