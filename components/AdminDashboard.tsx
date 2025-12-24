
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { ShareItem } from '../types';
import { Shield, Users, Package, Leaf, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState(db.getGlobalStats());
  const [items, setItems] = useState<ShareItem[]>(db.getItems());

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to remove this item from the platform?")) {
      db.deleteItem(id);
      setItems(db.getItems());
      setStats(db.getGlobalStats());
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-4xl font-black tracking-tighter font-heading">ADMIN COMMAND CENTER</h2>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Platform Overview & Auditing</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100 group hover:bg-slate-900 transition-all duration-500">
          <Users className="w-10 h-10 text-blue-500 mb-6 group-hover:text-blue-400" />
          <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Active Users</h3>
          <p className="text-4xl font-black text-slate-900 group-hover:text-white">1,248</p>
        </div>
        <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100 group hover:bg-emerald-600 transition-all duration-500">
          <Package className="w-10 h-10 text-emerald-500 mb-6 group-hover:text-white" />
          <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Total Items</h3>
          <p className="text-4xl font-black text-slate-900 group-hover:text-white">{stats.totalItems}</p>
        </div>
        <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100 group hover:bg-emerald-900 transition-all duration-500">
          <Leaf className="w-10 h-10 text-emerald-700 mb-6 group-hover:text-emerald-400" />
          <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">CO2 Avoided (KG)</h3>
          <p className="text-4xl font-black text-slate-900 group-hover:text-white">{stats.co2Saved}</p>
        </div>
      </div>

      {/* Item Audit Table */}
      <div className="bg-white rounded-[48px] shadow-2xl overflow-hidden border border-slate-50">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-black text-slate-900 font-heading text-xl">GLOBAL INVENTORY AUDIT</h3>
          <div className="flex gap-2">
             <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase">Verified: 92%</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-6">Item Details</th>
                <th className="px-8 py-6">Owner</th>
                <th className="px-8 py-6">Shares</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <img src={item.imageUrl} className="w-12 h-12 rounded-xl object-cover shadow-sm" alt=""/>
                      <div>
                        <p className="font-bold text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-400 italic">{item.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-semibold text-slate-600">{item.ownerName}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-black text-slate-600">{item.lendingCount}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-bold text-slate-600 uppercase">Active</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button onClick={() => handleDelete(item.id)} className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
