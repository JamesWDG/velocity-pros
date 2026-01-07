import React, { useState } from 'react';
import { User } from '../types.ts';

interface SettingsProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdateUser }) => {
  const [profile, setProfile] = useState({
    firstName: user.name.split(' ')[0] || user.name,
    lastName: user.name.split(' ')[1] || '',
    username: user.name.toLowerCase().replace(' ', '_'),
    email: user.email,
  });
  const [saving, setSaving] = useState(false);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      onUpdateUser({ ...user, name: `${profile.firstName} ${profile.lastName}`.trim(), email: profile.email });
      setSaving(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 classy-header">Settings</h1>
        <p className="text-slate-500">Personalize your account and profile information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-indigo-50 shadow-inner">
                <img src={`https://picsum.photos/seed/${user.email}/200`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-2 right-2 w-10 h-10 bg-indigo-600 text-white rounded-xl shadow-lg border-4 border-white flex items-center justify-center hover:bg-indigo-700">
                <i className="fa-solid fa-camera"></i>
              </button>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
            <p className="text-indigo-600 text-xs font-black uppercase tracking-widest mt-1">{user.role}</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center gap-3 bg-slate-50/30">
              <i className="fa-solid fa-user-gear text-indigo-600"></i>
              <h3 className="font-bold text-slate-900">Personal Information</h3>
            </div>
            <form onSubmit={handleProfileSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none transition-all"
                    value={profile.firstName}
                    onChange={e => setProfile({...profile, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none transition-all"
                    value={profile.lastName}
                    onChange={e => setProfile({...profile, lastName: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Username</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none transition-all"
                    value={profile.username}
                    onChange={e => setProfile({...profile, username: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none transition-all"
                    value={profile.email}
                    onChange={e => setProfile({...profile, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  type="submit" 
                  disabled={saving}
                  className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-xl disabled:opacity-70 active:scale-95 transition-all"
                >
                  {saving ? 'Saving...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center gap-3 bg-slate-50/30">
              <i className="fa-solid fa-shield-halved text-indigo-600"></i>
              <h3 className="font-bold text-slate-900">Security & Password</h3>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">New Password</label>
                    <input type="password" placeholder="Min. 8 characters" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Confirm New</label>
                    <input type="password" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all active:scale-95">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;