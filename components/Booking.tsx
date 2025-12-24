
import React, { useState } from 'react';
import { ShareItem, BookingDetails } from '../types';
import { Calendar, Clock, MapPin, CheckCircle, Download, Star, Leaf } from 'lucide-react';

interface Props {
  item: ShareItem;
  onConfirm: (details: BookingDetails) => void;
  onCancel: () => void;
}

const Booking: React.FC<Props> = ({ item, onConfirm, onCancel }) => {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [formData, setFormData] = useState({
    quantity: 1,
    pickupDate: '',
    lendingTime: '',
  });

  const totalAmount = formData.quantity * item.pricePerDay;

  const handlePayment = () => {
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="max-w-2xl mx-auto py-20 px-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-black mb-4 font-heading">PAYMENT SUCCESS!</h2>
        <p className="text-slate-500 mb-10 text-lg">Your item is now rented. You've saved the community money and resources.</p>
        
        <div className="bg-emerald-900 text-white rounded-[40px] p-10 space-y-8 mb-10 shadow-2xl relative overflow-hidden">
          <Leaf className="absolute -top-10 -right-10 w-40 h-40 opacity-10" />
          <h3 className="text-2xl font-bold flex items-center justify-center gap-3"><Leaf className="text-emerald-400" /> SUSTAINABILITY REPORT</h3>
          <div className="grid grid-cols-2 gap-8 py-6 border-y border-white/10">
            <div>
              <p className="text-emerald-400 text-xs font-black tracking-widest uppercase mb-2">CO2 SAVED</p>
              <p className="text-3xl font-black">4.2 KG</p>
            </div>
            <div>
              <p className="text-emerald-400 text-xs font-black tracking-widest uppercase mb-2">MONEY SAVED</p>
              <p className="text-3xl font-black">₹{totalAmount * 5}</p>
            </div>
          </div>
          <button className="w-full py-4 bg-emerald-500 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-emerald-400 transition shadow-lg">
            <Download className="w-5 h-5"/> DOWNLOAD PDF REPORT
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Rate your experience</p>
          <div className="flex justify-center gap-2">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-8 h-8 text-yellow-400 fill-current cursor-pointer hover:scale-110 transition"/>)}
          </div>
          <button onClick={onCancel} className="mt-8 text-emerald-600 font-black uppercase text-xs tracking-[0.2em] border-b-2 border-emerald-600 pb-1">Return to Hub</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-[48px] shadow-2xl overflow-hidden border border-slate-100 transition-all duration-500">
      <div className="bg-emerald-600 p-10 text-white relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[100px]"></div>
        <h2 className="text-3xl font-black mb-2 font-heading uppercase tracking-tighter">
          {step === 'details' ? 'Book Item' : 'Secure Payment'}
        </h2>
        <p className="text-emerald-100 font-medium">{item.name} • {item.ownerName}</p>
      </div>

      {step === 'details' ? (
        <form onSubmit={(e) => { e.preventDefault(); setStep('payment'); }} className="p-10 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Quantity</label>
              <input type="number" min="1" required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500" value={formData.quantity} onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})}/>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Pick-up Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                <input type="date" required className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500" value={formData.pickupDate} onChange={e => setFormData({...formData, pickupDate: e.target.value})}/>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Lending Time</label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
              <input type="time" required className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500" value={formData.lendingTime} onChange={e => setFormData({...formData, lendingTime: e.target.value})}/>
            </div>
          </div>

          <div className="bg-emerald-50 p-6 rounded-3xl space-y-2 border border-emerald-100">
            <div className="flex justify-between text-xs font-bold text-emerald-800">
              <span>Distance</span>
              <span>{item.distance} away</span>
            </div>
            <div className="flex justify-between text-2xl font-black text-emerald-900 pt-2 border-t border-emerald-200/50">
              <span>TOTAL</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={onCancel} className="flex-1 py-4 font-black text-slate-400 uppercase tracking-widest text-xs hover:text-slate-600">Cancel</button>
            <button type="submit" className="flex-1 py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition shadow-xl shadow-emerald-100">Next Step</button>
          </div>
        </form>
      ) : (
        <div className="p-10 space-y-6">
          <p className="text-center text-slate-400 font-bold text-xs uppercase tracking-widest mb-8">Choose Payment Method</p>
          {['ICICI Bank', 'SBI Bank', 'UPI Payment'].map(bank => (
            <button key={bank} onClick={handlePayment} className="w-full p-6 bg-slate-50 rounded-[28px] border border-slate-100 flex items-center gap-4 hover:border-emerald-500 hover:bg-emerald-50 transition group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center font-black text-emerald-600">{bank.charAt(0)}</div>
              <span className="font-bold text-slate-700">{bank}</span>
              <CheckCircle className="ml-auto w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition"/>
            </button>
          ))}
          <button onClick={() => setStep('details')} className="w-full text-center py-4 font-black text-slate-400 uppercase text-[10px] tracking-widest mt-4">Back to details</button>
        </div>
      )}
    </div>
  );
};

export default Booking;
