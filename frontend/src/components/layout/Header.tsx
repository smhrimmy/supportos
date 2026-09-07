import React from 'react';
import { 
  Sparkles, 
  Search, 
  Plus, 
  Layers, 
  Zap,
  Phone, 
  ExternalLink,
  Settings,
  ShieldCheck,
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
  onOpenCommandPalette: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTenant,
  onTenantChange,
  onOpenNewTicket,
  searchQuery,
  onSearchChange,
  activeView,
  onViewChange,
  onOpenCommandPalette
}) => {
  return (
    <header className="h-14 border-b border-slate-200/90 bg-white/95 backdrop-blur-md px-5 flex items-center justify-between z-30 sticky top-0 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      {/* Brand & Organization */}
      <div className="flex items-center gap-3">
        <div 
          className="flex items-center gap-2.5 cursor-pointer group" 
          onClick={() => onViewChange('workspace')}
        >
          <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center shadow-md shadow-purple-600/20 group-hover:bg-purple-700 transition-all">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-slate-900 text-base">
                Support<span className="text-purple-600">OS</span>
              </span>
              <span className="text-[10px] font-bold tracking-wider bg-purple-50 text-purple-700 border border-purple-200/70 px-1.5 py-0.5 rounded-md font-mono">
                PEGA CLM
              </span>
            </div>
          </div>
        </div>

        <div className="h-4 w-[1px] bg-slate-200 mx-2 hidden sm:block" />

        {/* Tenant selector */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-xs text-slate-600">
          <Layers className="w-3.5 h-3.5 text-purple-600" />
          <span className="text-slate-400 font-medium">Org:</span>
          <select 
            value={currentTenant}
            onChange={(e) => onTenantChange(e.target.value)}
            className="bg-transparent text-slate-800 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="acme">Acme Global</option>
            <option value="stripeify">Stripeify Inc</option>
            <option value="fintech-core">FinTech Core</option>
          </select>
        </div>
      </div>

      {/* Center Search / Command Bar */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div 
          onClick={onOpenCommandPalette}
          className="relative flex items-center cursor-pointer group"
        >
          <Search className="w-4 h-4 text-slate-400 absolute left-3 group-hover:text-purple-600 transition-colors" />
          <input 
            type="text"
            readOnly
            placeholder="Search tickets, customers, diagnostic flows (⌘K)..."
            value={searchQuery}
            className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl pl-9 pr-14 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all cursor-pointer shadow-inner"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] bg-white text-slate-500 font-mono px-1.5 py-0.5 rounded border border-slate-200 shadow-sm">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls & Navigation */}
      <div className="flex items-center gap-2">
        {/* Softphone Launcher */}
        <button
          onClick={() => onViewChange('voice')}
          className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-xl border transition-all ${
            activeView === 'voice'
              ? 'bg-purple-600 text-white border-purple-600 shadow-sm shadow-purple-600/20'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200'
          }`}
          title="Genesys Voice Softphone"
        >
          <Phone className="w-3.5 h-3.5 text-purple-600" />
          <span className="hidden sm:inline">Softphone</span>
        </button>

        {/* Customer Portal Launcher */}
        <button
          onClick={() => onViewChange('portal')}
          className={`hidden md:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-xl border transition-all ${
            activeView === 'portal'
              ? 'bg-purple-600 text-white border-purple-600 shadow-sm shadow-purple-600/20'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200'
          }`}
        >
          <ExternalLink className="w-3.5 h-3.5 text-purple-600" />
          <span>Customer Portal</span>
        </button>

        {/* Admin & Genesys Control Deck */}
        <button
          onClick={() => onViewChange('admin')}
          className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-xl border transition-all ${
            activeView === 'admin'
              ? 'bg-purple-600 text-white border-purple-600 shadow-sm shadow-purple-600/20'
              : 'bg-purple-50/80 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300'
          }`}
        >
          <Settings className="w-3.5 h-3.5 text-purple-600" />
          <span className="hidden lg:inline">Admin & Genesys</span>
        </button>

        {/* Live Telemetry Status */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-medium text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>24 Agents</span>
        </div>

        {/* New Ticket Button */}
        <button
          onClick={onOpenNewTicket}
          className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-sm shadow-purple-600/30 transition-all active:scale-95 ml-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Ticket</span>
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 ml-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            ER
          </div>
        </div>
      </div>
    </header>
  );
};
