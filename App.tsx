import React, { useState, useEffect } from 'react';
import { UserRole, User, Claim, ClaimStatus } from './types.ts';
import { MOCK_CLAIMS } from './constants.ts';
import Sidebar from './components/Sidebar.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Claims from './pages/Claims.tsx';
import Login from './pages/Login.tsx';
import Settings from './pages/Settings.tsx';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activePath, setActivePath] = useState('dashboard');
  const [claims, setClaims] = useState<Claim[]>(MOCK_CLAIMS);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (email: string, role: UserRole) => {
    setCurrentUser({
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      role
    });
  };

  const handleAddClaim = (claimData: Partial<Claim>) => {
    const newClaim: Claim = {
      id: `CLM-00${claims.length + 1}`,
      userId: currentUser?.id || 'guest',
      title: claimData.title || 'Untitled Claim',
      description: claimData.description || '',
      status: ClaimStatus.PENDING,
      createdAt: new Date().toISOString(),
      category: claimData.category || 'General',
      documents: []
    };
    setClaims([newClaim, ...claims]);
    setActivePath('claims');
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  const notifications = [
    { id: 1, text: "Claim CLM-002 status updated to In Progress", time: "2 mins ago", unread: true },
    { id: 2, text: "New message from Appraiser Gomez", time: "1 hour ago", unread: true },
    { id: 3, text: "Report 'January Summary' is ready for download", time: "3 hours ago", unread: false },
    { id: 4, text: "Claim CLM-001 documentation verified", time: "5 hours ago", unread: false },
    { id: 5, text: "Welcome to the new VelocityPRO portal", time: "Yesterday", unread: false },
    { id: 6, text: "System maintenance scheduled for Feb 10", time: "2 days ago", unread: false },
    { id: 7, text: "Claim amount for CLM-003 was adjusted", time: "3 days ago", unread: false },
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar 
        role={currentUser.role} 
        activePath={activePath} 
        onNavigate={setActivePath} 
      />
      
      <main className="flex-1 ml-64 p-8 transition-all duration-300">
        <header className="flex justify-between items-center mb-10 pb-6 border-b border-slate-200 relative">
           {/* Left Search */}
           <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 w-full max-w-xs">
             <i className="fa-solid fa-magnifying-glass text-slate-400"></i>
             <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none w-full text-slate-600 text-sm" />
           </div>

           {/* Constant Central Clock Display */}
           <div className="absolute left-1/2 -translate-x-1/2 bg-[#1e74e6] text-white px-10 py-3 rounded-2xl shadow-xl flex flex-col items-center justify-center min-w-[200px] border border-white/10 z-10">
             <span className="text-3xl font-bold leading-none tracking-tight">
               {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
             </span>
             <span className="text-[12px] font-medium opacity-90 mt-1 whitespace-nowrap">
               {currentTime.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' })}
             </span>
           </div>

           {/* Right Actions */}
           <div className="flex items-center gap-6">
             <div className="relative">
               <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2.5 transition-all rounded-xl border ${showNotifications ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 shadow-sm'}`}>
                 <i className="fa-solid fa-bell text-xl"></i>
                 <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
               </button>

               {showNotifications && (
                 <>
                   <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
                   <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-5 duration-200">
                     <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                       <h4 className="font-bold text-slate-900">Notifications</h4>
                       <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full">2 NEW</span>
                     </div>
                     <div className="max-h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300">
                       {notifications.map(n => (
                         <div key={n.id} className={`p-4 hover:bg-slate-50 border-b border-slate-50 transition-colors cursor-pointer group flex gap-3 ${n.unread ? 'bg-indigo-50/20' : ''}`}>
                           <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${n.unread ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
                           <div>
                             <p className={`text-sm mb-1 leading-relaxed ${n.unread ? 'text-slate-900 font-semibold' : 'text-slate-600'}`}>{n.text}</p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{n.time}</p>
                           </div>
                         </div>
                       ))}
                     </div>
                     <button className="w-full py-3.5 text-xs font-black text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-all uppercase tracking-widest">
                       View History
                     </button>
                   </div>
                 </>
               )}
             </div>
             
             <div className="h-8 w-px bg-slate-200"></div>

             <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActivePath('settings')}>
               <div className="text-right hidden sm:block">
                 <p className="text-sm font-bold text-slate-900 leading-none group-hover:text-indigo-600 transition-colors">{currentUser.name}</p>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{currentUser.role}</p>
               </div>
               <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border-2 border-transparent group-hover:border-indigo-600 transition-all overflow-hidden shadow-sm">
                 <img src={`https://picsum.photos/seed/${currentUser.email}/100`} alt="Avatar" className="w-full h-full object-cover" />
               </div>
               <button onClick={(e) => { e.stopPropagation(); setCurrentUser(null); }} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                 <i className="fa-solid fa-power-off"></i>
               </button>
             </div>
           </div>
        </header>

        {activePath === 'dashboard' && <Dashboard role={currentUser.role} claims={claims} />}
        {activePath === 'claims' && <Claims role={currentUser.role} claims={claims} onAddClaim={handleAddClaim} />}
        {activePath === 'settings' && <Settings user={currentUser} onUpdateUser={setCurrentUser} />}
        
        {!['dashboard', 'claims', 'settings'].includes(activePath) && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
             <div className="w-32 h-32 bg-slate-200/50 rounded-full flex items-center justify-center text-slate-300 text-5xl mb-6">
               <i className="fa-solid fa-hammer"></i>
             </div>
             <h2 className="text-3xl font-bold text-slate-800 classy-header mb-2 uppercase tracking-tight">{activePath} Under Development</h2>
             <p className="text-slate-500 max-w-md">We are working hard to bring this feature to VelocityPRO. Stay tuned for future updates!</p>
             <button onClick={() => setActivePath('dashboard')} className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all">
               Return to Dashboard
             </button>
          </div>
        )}

        <footer className="mt-20 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
           <div>© 2026 VelocityPRO Enterprise Solutions</div>
           <div className="flex gap-8">
             <a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a>
             <a href="#" className="hover:text-indigo-600 transition-colors">Technical Support</a>
             <a href="#" className="hover:text-indigo-600 transition-colors">Privacy & Legal</a>
           </div>
        </footer>
      </main>
    </div>
  );
};

export default App;