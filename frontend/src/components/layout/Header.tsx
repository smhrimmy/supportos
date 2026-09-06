import React from 'react';
import { 
  Sparkles, 
  Search, 
  Plus, 
  Bell, 
  CheckCircle2, 
  Layers, 
  Zap,
  Activity,
  UserCheck
} from 'lucide-react';

interface HeaderProps {
  currentTenant: string;
  onTenantChange: (tenant: string) => void;
  onOpenNewTicket: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTenant,
  onTenantChange,
  onOpenNewTicket,
  searchQuery,
  onSearchChange,
  activeView,
  onViewChange
}) => {
  return (
    <header className="h-14 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 flex items-center justify-between z-30 sticky top-0">
      {/* Brand & Organization */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange('workspace')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-white text-base">SUPPORT<span className="text-blue-400">OS</span></span>
              <span className="text-[10px] uppercase font-bold tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/30 px-1.5 py-0.2 rounded">v1.0 AI Native</span>
            </div>
          </div>
        </div>

        <div className="h-4 w-[1px] bg-slate-800 mx-1 hidden sm:block" />

        {/* Tenant selector */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/60 px-2.5 py-1 rounded-md text-xs">
          <Layers className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400">Org:</span>
          <select 
            value={currentTenant}
            onChange={(e) => onTenantChange(e.target.value)}
            className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="acme" className="bg-slate-900 text-white">Acme Global Technologies</option>
            <option value="stripeify" className="bg-slate-900 text-white">Stripeify Payments</option>
          </select>
        </div>
      </div>

      {/* Global Quick Search */}
      <div className="flex-1 max-w-md mx-4 hidden lg:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tickets, customers, orders, knowledge... (Cmd+K)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-950/70 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/40 transition-all"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 bg-slate-800/80 border border-slate-700 px-1.5 py-0.5 rounded font-mono">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Live System Telemetry & Actions */}
      <div className="flex items-center gap-2.5">
        {/* Live Agents Status */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>24 Agents Online</span>
        </div>

        {/* AI Gateway Status */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[11px] font-medium text-purple-300">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>AI Gateway: Active</span>
        </div>

        {/* SLA Health Indicator */}
        <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-medium text-blue-300">
          <Activity className="w-3 h-3 text-blue-400" />
          <span>SLA 98.4%</span>
        </div>

        <button
          onClick={onOpenNewTicket}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm shadow-blue-500/30 transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Ticket</span>
        </button>

        {/* Notifications */}
        <button className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 bg-blue-500 rounded-full absolute top-1 right-1" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 text-white font-bold text-xs flex items-center justify-center">
            ER
          </div>
          <div className="hidden 2xl:block text-left">
            <div className="text-xs font-semibold text-slate-200">Elena Rostova</div>
            <div className="text-[10px] text-slate-400">Org Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
};
