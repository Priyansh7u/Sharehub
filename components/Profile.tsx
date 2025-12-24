
import React, { useState, useEffect } from 'react';
import { User, ShareItem, Category } from '../types';
import { BADGES, CATEGORIES } from '../constants';
import { db } from '../services/db';
import { Mail, Phone, MapPin, Edit3, Trash2, Plus, Camera, X, Leaf, CreditCard, ChevronRight } from 'lucide-react';

interface Props {
  user: User;
  onUpdateUser: (user: User) => void;
}

const Profile: React.FC<Props> = ({ user, onUpdateUser }) => {
  const [items, setItems] = useState<ShareItem[]>(db.getUserItems(user.id));
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    category: 'Home and Appliances' as Category,
    pricePerDay: 100,
    imageUrl: ''
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const item: ShareItem = {
      id: Date.now().toString(),
      name: newItem.name,
      description: newItem.description,
      category: newItem.category,
      ownerId: user.id,
      ownerName: user.name,
      distance: '0.1 km', // Mock local distance
      pricePerDay: newItem.pricePerDay,
      imageUrl: newItem.imageUrl || `https://picsum.photos/seed/${Date.now()}/400/300`,
      status: 'available',
      lendingCount: 0
    };
    db.saveItem(item);
    setItems(db.getUserItems(user.id));
    setShowAddModal(false);
    setNewItem({ name: '', description: '', category: 'Home and Appliances', pricePerDay: 100, imageUrl: '' });
  };

  const handleDeleteItem = (id: string) => {
    if(window.confirm("Remove this item from your lending library?")) {
      db.deleteItem(id);
      setItems(db.getUserItems(user.id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700">
      {/* Header Info */}
      <div className="bg-white rounded-[48px] p-12 shadow-2xl border border-slate-50 relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/5 rounded-bl-[200px] -z-0"></div>
        <div className="w-48 h-48 bg-emerald-600 rounded-[60px] flex items-center justify-center text-7xl font-black text-white shadow-2xl shrink-0">
          {user.name.charAt(0)}
        </div>
        <div className="flex-1 space-y-6 relative z-10">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-2 font-heading uppercase">{user.name}</h1>
            <p className="text-slate-400 font-semibold tracking-widest text-sm uppercase">Community Member Since 2024</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <Mail className="w-5 h-5 text-emerald-600" />
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <Phone className="w-5 h-5 text-emerald-600" />
              <span className="font-medium">{user.contactNo}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 md:col-span-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span className="font-medium">{user.address}</span>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="shrink-0 flex flex-col items-center gap-6 bg-slate-900 p-10 rounded-[48px] text-white shadow-2xl relative">
          <Leaf className="absolute top-4 right-4 text-emerald-500 w-6 h-6 animate-pulse" />
          <div className="text-center">
             <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-1">Impact Score</p>
             <p className="text-4xl font-black">{(items.reduce((a,c)=>a+c.lendingCount,0)*4.2).toFixed(1)} <span className="text-sm font-normal text-emerald-400">KG CO2</span></p>
          </div>
          <div className="w-full h-px bg-white/10"></div>
          <div className="text-center">
             <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Lending Revenue</p>
             <p className="text-3xl font-black text-blue-100">₹{items.reduce((a,c)=>a+(c.lendingCount*c.pricePerDay),0)}</p>
          </div>
        </div>
      </div>

      {/* Grant Panel */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-emerald-600 rounded-full"></div>
            <h2 className="text-4xl font-black tracking-tighter font-heading">GRANT PANEL</h2>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-8 py-5 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 hover:-translate-y-1 active:scale-95"
          >
            <Plus className="w-6 h-6" /> Add New Item
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.length === 0 ? (
            <div className="col-span-full py-24 bg-white rounded-[48px] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-400 text-center shadow-inner">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                <Camera className="w-10 h-10 text-slate-200" />
              </div>
              <p className="font-black text-2xl mb-2 text-slate-900">Your library is empty</p>
              <p className="text-slate-400 max-w-xs text-sm">Contribute to your community by listing items you don't use every day.</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="bg-white rounded-[48px] shadow-xl overflow-hidden border border-slate-50 p-8 flex flex-col gap-6 hover:shadow-2xl transition duration-500 group">
                <div className="h-48 rounded-[32px] overflow-hidden relative shadow-inner">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700"/>
                  <div className="absolute top-4 left-4 px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                    {item.category}
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="text-2xl font-black text-slate-900 tracking-tight">{item.name}</h4>
                    <span className="text-emerald-600 font-black">₹{item.pricePerDay}</span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{item.description}</p>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-slate-50">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-400">Total Shares</span>
                      <span className="text-slate-900">{item.lendingCount} Cycles</span>
                   </div>
                   {item.lendingCount >= 5 && (
                      <div className="p-3 bg-orange-50 rounded-xl flex items-center gap-3 border border-orange-100">
                        <Camera className="w-4 h-4 text-orange-500" />
                        <span className="text-[10px] font-bold text-orange-800 uppercase tracking-widest">Photo Update Required</span>
                      </div>
                   )}
                   <div className="flex gap-3">
                      <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-600 transition shadow-lg"><Edit3 className="w-4 h-4"/> Manage</button>
                      <button onClick={() => handleDeleteItem(item.id)} className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition shadow-sm"><Trash2 className="w-5 h-5"/></button>
                   </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-2xl bg-white rounded-[48px] overflow-hidden shadow-2xl relative animate-in slide-in-from-bottom-8 duration-500">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-8 right-8 w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="bg-emerald-600 p-12 text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[100px]"></div>
              <h3 className="text-4xl font-black mb-2 font-heading tracking-tighter uppercase">List New Item</h3>
              <p className="text-emerald-100 font-bold text-xs uppercase tracking-widest">Contribute to the circular economy</p>
            </div>

            <form onSubmit={handleAddItem} className="p-12 space-y-8 max-h-[70vh] overflow-y-auto">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Item Name</label>
                      <input required type="text" placeholder="e.g. Cordless Power Drill" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 shadow-inner" value={newItem.name} onChange={e=>setNewItem({...newItem, name: e.target.value})}/>
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Category</label>
                      <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 shadow-inner" value={newItem.category} onChange={e=>setNewItem({...newItem, category: e.target.value as Category})}>
                         {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                      </select>
                   </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Description</label>
                  <textarea required rows={3} placeholder="Share details about condition, usage tips..." className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 shadow-inner" value={newItem.description} onChange={e=>setNewItem({...newItem, description: e.target.value})}></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Daily Rent (₹)</label>
                      <input required type="number" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 shadow-inner" value={newItem.pricePerDay} onChange={e=>setNewItem({...newItem, pricePerDay: parseInt(e.target.value)})}/>
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Image URL (Optional)</label>
                      <input type="text" placeholder="https://..." className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 shadow-inner" value={newItem.imageUrl} onChange={e=>setNewItem({...newItem, imageUrl: e.target.value})}/>
                   </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-5 font-black text-slate-400 uppercase tracking-widest text-xs">Discard</button>
                <button type="submit" className="flex-1 py-5 bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition active:scale-95 uppercase tracking-widest text-xs">Verify & List Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
