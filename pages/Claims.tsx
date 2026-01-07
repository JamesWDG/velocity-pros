import React, { useState } from 'react';
import { Claim, ClaimStatus, UserRole } from '../types.ts';
import { STATUS_COLORS } from '../constants.ts';

interface ClaimsProps {
  claims: Claim[];
  role: UserRole;
  onAddClaim: (claim: Partial<Claim>) => void;
}

const Claims: React.FC<ClaimsProps> = ({ claims, role, onAddClaim }) => {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<ClaimStatus | 'All'>('All');
  const [newClaim, setNewClaim] = useState({ title: '', description: '', category: 'Auto' });

  const filteredClaims = filter === 'All' ? claims : claims.filter(c => c.status === filter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddClaim(newClaim);
    setShowModal(false);
    setNewClaim({ title: '', description: '', category: 'Auto' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 classy-header">Claims Repository</h1>
          <p className="text-slate-500">Manage, track and update insurance claims.</p>
        </div>
        
        {role === UserRole.USER && (
          <button 
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center gap-2"
          >
            <i className="fa-solid fa-plus"></i> Submit New Claim
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['All', ClaimStatus.PENDING, ClaimStatus.IN_PROGRESS, ClaimStatus.COMPLETED, ClaimStatus.REJECTED].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              filter === f ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClaims.map((claim) => (
          <div key={claim.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-1.5 h-full ${claim.status === ClaimStatus.COMPLETED ? 'bg-green-500' : 'bg-amber-400'}`}></div>
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${STATUS_COLORS[claim.status]}`}>
                {claim.status}
              </span>
              <span className="text-xs text-slate-400 font-medium">{claim.id}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{claim.title}</h3>
            <p className="text-slate-500 text-sm mb-4 line-clamp-2">{claim.description}</p>
            
            <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
              <div className="flex-1">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Category</p>
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                   <i className={`fa-solid ${claim.category === 'Auto' ? 'fa-car' : 'fa-house'} text-slate-400`}></i>
                   {claim.category}
                </div>
              </div>
              <div className="flex-1 text-right">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Submitted</p>
                <p className="text-slate-700 font-semibold text-sm">{new Date(claim.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex-1 py-2 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-lg text-sm font-bold transition-colors">
                Details
              </button>
              {role !== UserRole.USER && (
                <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-bold transition-colors">
                  Action
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl animate-in zoom-in duration-300">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">New Insurance Claim</h2>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Claim Title</label>
                  <input 
                    type="text" 
                    required
                    value={newClaim.title}
                    onChange={(e) => setNewClaim({...newClaim, title: e.target.value})}
                    placeholder="e.g. Front End Collision"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Category</label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      value={newClaim.category}
                      onChange={(e) => setNewClaim({...newClaim, category: e.target.value})}
                    >
                      <option>Auto</option>
                      <option>Home</option>
                      <option>Life</option>
                      <option>Health</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Incident Date</label>
                    <input type="date" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Description</label>
                  <textarea 
                    rows={4} 
                    required
                    value={newClaim.description}
                    onChange={(e) => setNewClaim({...newClaim, description: e.target.value})}
                    placeholder="Detailed explanation of the incident..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  ></textarea>
                </div>

                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group cursor-pointer">
                  <i className="fa-solid fa-cloud-arrow-up text-3xl text-slate-300 group-hover:text-indigo-400 mb-2"></i>
                  <p className="text-slate-500 font-medium">Click to upload supporting documents</p>
                  <p className="text-slate-400 text-xs mt-1">PDF, JPG, PNG (Max 10MB)</p>
                </div>

                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 transition-all active:scale-95"
                  >
                    Submit Claim
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Claims;