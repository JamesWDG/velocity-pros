import React from 'react';
import { UserRole } from '../types.ts';

interface SidebarProps {
  role: UserRole;
  activePath: string;
  onNavigate: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, activePath, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-gauge-high', roles: [UserRole.USER, UserRole.APPRAISER, UserRole.ADMIN] },
    { id: 'claims', label: 'Claims', icon: 'fa-file-invoice', roles: [UserRole.USER, UserRole.APPRAISER, UserRole.ADMIN] },
    { id: 'users', label: 'Users', icon: 'fa-users', roles: [UserRole.ADMIN] },
    { id: 'companies', label: 'Companies', icon: 'fa-building', roles: [UserRole.ADMIN] },
    { id: 'reports', label: 'Reports', icon: 'fa-chart-pie', roles: [UserRole.APPRAISER, UserRole.ADMIN] },
    { id: 'settings', label: 'Settings', icon: 'fa-sliders', roles: [UserRole.USER, UserRole.APPRAISER, UserRole.ADMIN] },
  ];

  return (
    <div className="w-64 bg-slate-900 h-screen text-slate-300 flex flex-col fixed left-0 top-0 z-20 transition-all duration-300">
      <div className="p-8 flex items-center justify-center border-b border-slate-800">
        <span className="text-2xl tracking-tighter logo-gradient">
          VelocityPRO
        </span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.filter(item => item.roles.includes(role)).map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activePath === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg ${activePath === item.id ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'}`}></i>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 text-sm">
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <p className="text-slate-400 mb-1">Signed in as:</p>
          <p className="font-semibold text-white truncate">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;