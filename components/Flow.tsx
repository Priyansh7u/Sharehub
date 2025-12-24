
import React, { useState } from 'react';
import { Loan } from '../types';
import { CreditCard, AlertCircle, CheckCircle2, DollarSign, Smartphone } from 'lucide-react';

const Flow: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([
    {
      id: 'L1',
      itemId: '2',
      itemName: 'Microwave Oven',
      ownerName: 'Priya Verma',
      amount: 600,
      status: 'pending',
      dueDate: '2023-12-25',
      message: 'Please return in clean condition!'
    }
  ]);

  const [payingLoan, setPayingLoan] = useState<Loan | null>(null);

  const clearLoan = (id: string) => {
    setLoans(loans.map(l => l.id === id ? { ...l, status: 'cleared' as const } : l));
    setPayingLoan(null);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1 h-8 bg-emerald-600 rounded-full"></div>
        <h2 className="text-4xl font-black tracking-tighter font-heading">YOUR FLOW</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-slate-800">Active Transactions</h3>
          {loans.map(loan => (
            <div key={loan.id} className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${loan.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {loan.status}
                  </span>
                  {loan.status === 'pending' && <span className="flex items-center gap-1 text-red-500 text-[10px] font-bold"><AlertCircle className="w-3 h-3"/> DUE IN 2 DAYS</span>}
                </div>
                <h4 className="text-2xl font-black text-slate-900">{loan.itemName}</h4>
                <p className="text-slate-500 text-sm font-medium">Lender: <span className="text-slate-900">{loan.ownerName}</span></p>
                {loan.message && <div className="bg-slate-50 p-3 rounded-xl text-xs italic text-slate-500 border-l-4 border-emerald-400">"{loan.message}"</div>}
              </div>

              <div className="text-right space-y-4 w-full md:w-auto">
                <div className="text-3xl font-black text-emerald-600">₹{loan.amount}</div>
                {loan.status === 'pending' && (
                  <button 
                    onClick={() => setPayingLoan(loan)}
                    className="w-full md:w-auto px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-emerald-600 transition shadow-lg"
                  >
                    Clear Due
                  </button>
                )}
                {loan.status === 'cleared' && (
                  <div className="flex items-center gap-2 text-emerald-600 font-bold">
                    <CheckCircle2 className="w-5 h-5"/> Paid Successfully
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800">Notifications</h3>
          <div className="bg-white rounded-[32px] p-6 shadow-xl border border-slate-100 space-y-4">
            <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0"/>
              <div>
                <p className="text-sm font-bold text-red-900">Late Return Alert!</p>
                <p className="text-xs text-red-700">Drill Machine was due yesterday. Please contact Rahul.</p>
              </div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0"/>
              <div>
                <p className="text-sm font-bold text-emerald-900">Payment Verified</p>
                <p className="text-xs text-emerald-700">Amit Singh received your payment for Projector.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {payingLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-6">
          <div className="w-full max-w-md bg-white rounded-[48px] p-10 shadow-2xl space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-black font-heading mb-2">SECURE PAYMENT</h3>
              <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Paying ₹{payingLoan.amount}</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <button onClick={() => clearLoan(payingLoan.id)} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 transition group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 font-black">SBI</div>
                  <span className="font-bold text-slate-700">State Bank of India</span>
                </div>
                <CheckCircle2 className="w-6 h-6 text-emerald-500 opacity-0 group-hover:opacity-100"/>
              </button>

              <button onClick={() => clearLoan(payingLoan.id)} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 transition group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-orange-600 font-black">ICICI</div>
                  <span className="font-bold text-slate-700">ICICI Net Banking</span>
                </div>
                <CheckCircle2 className="w-6 h-6 text-emerald-500 opacity-0 group-hover:opacity-100"/>
              </button>

              <button onClick={() => clearLoan(payingLoan.id)} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 transition group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-emerald-600"><Smartphone className="w-6 h-6"/></div>
                  <span className="font-bold text-slate-700">UPI / GPay / PhonePe</span>
                </div>
                <CheckCircle2 className="w-6 h-6 text-emerald-500 opacity-0 group-hover:opacity-100"/>
              </button>
            </div>

            <button onClick={() => setPayingLoan(null)} className="w-full text-slate-400 font-bold text-xs uppercase hover:text-slate-600">Cancel Payment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flow;
