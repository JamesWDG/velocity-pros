import React, { useState } from 'react';
import { UserRole } from '../types.ts';

interface LoginProps {
  onLogin: (email: string, role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      let role = UserRole.USER;
      if (email.includes('admin')) role = UserRole.ADMIN;
      else if (email.includes('appraiser') || email.includes('mecygufo')) role = UserRole.APPRAISER;
      
      onLogin(email, role);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <div className="hidden md:flex flex-1 bg-slate-900 relative overflow-hidden items-center justify-center p-20 text-white border-r border-slate-800">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-600/20 blur-[120px] rounded-full"></div>
        
        <div className="relative z-10 max-w-lg">
          <div className="mb-12">
            <h1 className="text-5xl font-black logo-gradient tracking-tighter mb-2">VelocityPRO</h1>
            <div className="h-1 w-20 bg-indigo-600 rounded-full"></div>
          </div>
          <h2 className="text-6xl font-bold classy-header mb-8 leading-tight tracking-tight text-white">Advanced Claims Intelligence.</h2>
          <p className="text-slate-400 text-xl leading-relaxed mb-12">
            Streamlined processing for a modern insurance era.
          </p>
          
          <div className="flex gap-4">
            <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 flex-1">
              <p className="text-3xl font-bold mb-1 text-white">99.8%</p>
              <p className="text-slate-500 text-sm uppercase font-black tracking-widest">Efficiency</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 flex-1">
              <p className="text-3xl font-bold mb-1 text-white">24/7</p>
              <p className="text-slate-500 text-sm uppercase font-black tracking-widest">Active Support</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="md:hidden text-center mb-10">
            <h1 className="text-4xl font-black logo-gradient tracking-tighter bg-slate-900 p-4 rounded-2xl mb-4">VelocityPRO</h1>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-bold text-slate-900 classy-header mb-2">Portal Access</h2>
            <p className="text-slate-500">Welcome back. Enter your credentials.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Corporate Email</label>
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@velocitypro.com" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 outline-none transition-all font-medium" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Secure Password</label>
              </div>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 outline-none transition-all font-medium" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isLoading ? (
                <><i className="fa-solid fa-circle-notch animate-spin text-xl"></i> Verifying...</>
              ) : 'Sign In to Portal'}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100">
             <div className="grid grid-cols-2 gap-3">
                <button onClick={() => {setEmail('admin@admin.com'); setPassword('password')}} className="p-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">Admin Demo</button>
                <button onClick={() => {setEmail('mecygufo@mailinator.com'); setPassword('password')}} className="p-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">Appraiser Demo</button>
                <button onClick={() => {setEmail('user@user.com'); setPassword('password')}} className="p-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors col-span-2">Standard User</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;