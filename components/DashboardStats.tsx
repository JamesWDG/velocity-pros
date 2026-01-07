
import React from 'react';

interface Stat {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: string;
}

const DashboardStats: React.FC<{ stats: Stat[] }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl ${stat.color}`}>
              <i className={`fa-solid ${stat.icon}`}></i>
            </div>
            {stat.trend && (
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stat.trend}
              </span>
            )}
          </div>
          <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
