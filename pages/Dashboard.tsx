import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UserRole, Claim } from '../types.ts';
import { STATUS_COLORS } from '../constants.ts';
import DashboardStats from '../components/DashboardStats.tsx';
import { getDashboardInsights } from '../services/gemini.ts';

const data = [
  { name: 'Mon', value: 40 },
  { name: 'Tue', value: 30 },
  { name: 'Wed', value: 65 },
  { name: 'Thu', value: 45 },
  { name: 'Fri', value: 90 },
  { name: 'Sat', value: 35 },
  { name: 'Sun', value: 50 },
];

interface DashboardProps {
  role: UserRole;
  claims: Claim[];
}

const Dashboard: React.FC<DashboardProps> = ({ role, claims }) => {
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportDates, setReportDates] = useState({ from: '', to: '' });
  const [generatingReport, setGeneratingReport] = useState(false);

  useEffect(() => {
    const fetchAI = async () => {
      setLoadingAI(true);
      const summary = claims.map(c => `${c.title} (${c.status})`).join(', ');
      const insights = await getDashboardInsights(summary);
      setAiInsights(insights);
      setLoadingAI(false);
    };
    fetchAI();
  }, [claims]);

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratingReport(true);
    setTimeout(() => {
      setGeneratingReport(false);
      alert(`Performance report for ${reportDates.from} to ${reportDates.to} has been compiled successfully.`);
      setShowReportModal(false);
    }, 2000);
  };

  const stats = [
    { label: 'Total Claims', value: claims.length, icon: 'fa-folder-open', color: 'bg-blue-600', trend: '+12%' },
    { label: 'In Progress', value: claims.filter(c => c.status === 'In Progress').length, icon: 'fa-clock', color: 'bg-amber-500' },
    { label: 'Settled Amount', value: '$124.5k', icon: 'fa-hand-holding-dollar', color: 'bg-emerald-500', trend: '+8.4%' },
    { label: 'Avg Process Time', value: '4.2 Days', icon: 'fa-bolt', color: 'bg-indigo-600', trend: '-15%' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 classy-header">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome back to your command center.</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => setShowReportModal(true)}
             className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2 active:scale-95"
           >
             <i className="fa-solid fa-file-chart-column"></i> Generate Report
           </button>
        </div>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Activity Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
             <div className="p-6 border-b border-slate-100 flex justify-between items-center">
               <h3 className="text-lg font-bold text-slate-900">Recent Claims</h3>
               <button className="text-indigo-600 font-medium text-sm hover:underline">View All</button>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                   <tr>
                     <th className="px-6 py-4">Claim ID</th>
                     <th className="px-6 py-4">Title</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4">Date</th>
                     <th className="px-6 py-4 text-right">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {claims.slice(0, 5).map(claim => (
                     <tr key={claim.id} className="hover:bg-slate-50 transition-colors">
                       <td className="px-6 py-4 font-semibold text-slate-900">{claim.id}</td>
                       <td className="px-6 py-4">
                         <div className="font-medium text-slate-900">{claim.title}</div>
                         <div className="text-xs text-slate-500">{claim.category}</div>
                       </td>
                       <td className="px-6 py-4">
                         <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[claim.status]}`}>
                           {claim.status}
                         </span>
                       </td>
                       <td className="px-6 py-4 text-sm text-slate-500">
                         {new Date(claim.createdAt).toLocaleDateString()}
                       </td>
                       <td className="px-6 py-4 text-right">
                         <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors">
                           <i className="fa-solid fa-ellipsis-vertical"></i>
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-900/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
              </div>
              <h3 className="text-lg font-bold">Velocity AI Insights</h3>
            </div>
            
            {loadingAI ? (
              <div className="space-y-4 py-8 text-center">
                <div className="animate-spin text-3xl mb-2 text-indigo-400">
                  <i className="fa-solid fa-circle-notch"></i>
                </div>
                <p className="text-slate-400 text-sm">Processing current claim data...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {aiInsights.length > 0 ? aiInsights.map((item, idx) => (
                  <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                        item.priority === 'high' ? 'text-red-400 border-red-400/30 bg-red-400/10' : 
                        item.priority === 'medium' ? 'text-amber-400 border-amber-400/30 bg-amber-400/10' : 
                        'text-emerald-400 border-emerald-400/30 bg-emerald-400/10'
                      }`}>
                        {item.priority} Priority
                      </span>
                    </div>
                    <h4 className="font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.insight}</p>
                  </div>
                )) : (
                  <p className="text-slate-500 text-sm italic py-4">No AI insights available for the selected period.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showReportModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in duration-300">
             <div className="p-8">
               <div className="flex justify-between items-center mb-6">
                 <div>
                   <h2 className="text-2xl font-bold text-slate-900">Compile Report</h2>
                   <p className="text-slate-500 text-sm">Select dates for combined claim data.</p>
                 </div>
                 <button onClick={() => setShowReportModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-50 rounded-lg">
                   <i className="fa-solid fa-xmark text-xl"></i>
                 </button>
               </div>

               <form onSubmit={handleGenerateReport} className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest">From</label>
                     <input 
                       type="date" 
                       required
                       className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none"
                       value={reportDates.from}
                       onChange={e => setReportDates({...reportDates, from: e.target.value})}
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest">To</label>
                     <input 
                       type="date" 
                       required
                       className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none"
                       value={reportDates.to}
                       onChange={e => setReportDates({...reportDates, to: e.target.value})}
                     />
                   </div>
                 </div>

                 <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <i className="fa-solid fa-circle-check text-indigo-500"></i>
                      Unified Claims Summary
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <i className="fa-solid fa-circle-check text-indigo-500"></i>
                      AI-Driven Performance Metrics
                    </div>
                 </div>

                 <div className="flex gap-4">
                   <button 
                     type="button" 
                     onClick={() => setShowReportModal(false)}
                     className="flex-1 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200"
                   >
                     Cancel
                   </button>
                   <button 
                     type="submit" 
                     disabled={generatingReport}
                     className="flex-[2] py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 active:scale-95"
                   >
                     {generatingReport ? (
                       <><i className="fa-solid fa-circle-notch animate-spin"></i> Processing...</>
                     ) : (
                       <><i className="fa-solid fa-file-pdf"></i> Generate & Download</>
                     )}
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

export default Dashboard;