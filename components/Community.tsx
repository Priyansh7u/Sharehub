
import React, { useState } from 'react';
import { CommunityPost, BadgeType } from '../types';
import { Heart, Share2, MessageCircle, Award, Send } from 'lucide-react';

const Community: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: 'p1',
      userName: 'Karan Mehra',
      content: 'Just borrowed a lawn mower from Sarah. Saved me 2000 rupees and a trip to the store! This hub is amazing. #Sustainability',
      likes: 24,
      badgeDedicated: 'Helpful Neighbour',
      timestamp: '2 hours ago'
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post: CommunityPost = {
      id: Date.now().toString(),
      userName: 'You',
      content: newPost,
      likes: 0,
      timestamp: 'Just now'
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1 h-8 bg-purple-600 rounded-full"></div>
        <h2 className="text-4xl font-black tracking-tighter font-heading">COMMUNITY HUB</h2>
      </div>

      {/* Post Box */}
      <div className="bg-white rounded-[32px] p-6 shadow-xl border border-slate-100 mb-12">
        <textarea 
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share your lending experience..."
          className="w-full p-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:outline-none mb-4 min-h-[100px]"
        />
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
             <button className="p-3 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition"><Award className="w-5 h-5"/></button>
             <button className="p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition"><Share2 className="w-5 h-5"/></button>
          </div>
          <button 
            onClick={handlePost}
            className="px-8 py-3 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition flex items-center gap-2"
          >
            Post <Send className="w-4 h-4"/>
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-8">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-[40px] p-8 shadow-xl border border-slate-50 transition-all hover:shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center font-black text-purple-600">
                  {post.userName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{post.userName}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{post.timestamp}</p>
                </div>
              </div>
              {post.badgeDedicated && (
                <div className="px-4 py-2 bg-emerald-50 rounded-full flex items-center gap-2 text-[10px] font-black text-emerald-700 border border-emerald-100">
                  <Award className="w-3 h-3"/> DEDICATED: {post.badgeDedicated.toUpperCase()}
                </div>
              )}
            </div>

            <p className="text-slate-600 leading-relaxed mb-8 text-lg">
              {post.content}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="flex gap-6">
                <button className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition font-bold text-sm">
                  <Heart className="w-5 h-5"/> {post.likes}
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-blue-500 transition font-bold text-sm">
                  <MessageCircle className="w-5 h-5"/> Reply
                </button>
              </div>
              <button className="p-2 text-slate-300 hover:text-slate-600 transition">
                <Share2 className="w-5 h-5"/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Badge Showcase */}
      <div className="mt-20 text-center">
        <h3 className="text-2xl font-black mb-10 font-heading">RECOGNITION BADGES</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Helpful Neighbour', color: 'bg-blue-500', icon: '🤝', desc: 'Active helper in local area' },
            { name: 'Best Lender', color: 'bg-yellow-500', icon: '🌟', desc: 'High quality items and service' },
            { name: 'Zero Waste Hero', color: 'bg-emerald-500', icon: '♻️', desc: 'Massive CO2 savings contributor' }
          ].map(b => (
            <div key={b.name} className="bg-white p-8 rounded-[40px] shadow-lg border border-slate-100 group hover:-translate-y-2 transition-all">
              <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-xl ${b.color} text-white group-hover:scale-110 transition`}>
                {b.icon}
              </div>
              <h4 className="font-black text-slate-900 mb-2">{b.name}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
