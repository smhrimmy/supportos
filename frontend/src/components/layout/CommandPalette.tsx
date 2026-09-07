import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  MessageSquare, 
  Phone, 
  Cpu, 
  Workflow, 
  BookOpen, 
  BarChart3, 
  Activity, 
  UserCheck, 
  Plug, 
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { Ticket } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (actionKey: string, payload?: any) => void;
  tickets: Ticket[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectAction,
  tickets
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onSelectAction('OPEN_PALETTE');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onSelectAction]);

  if (!isOpen) return null;

  const quickNav = [
    { label: 'Unified Support Workspace', key: 'workspace', icon: <MessageSquare className="w-4 h-4 text-blue-400" /> },
    { label: 'Pega Guided Product Diagnostics & Fixing', key: 'diagnostics', icon: <Activity className="w-4 h-4 text-amber-400" /> },
    { label: 'Pega Interaction Records & Contact Notes', key: 'interactions', icon: <BookOpen className="w-4 h-4 text-purple-400" /> },
    { label: 'Voice Contact Center (Softphone)', key: 'voice', icon: <Phone className="w-4 h-4 text-violet-400" /> },
    { label: 'Customer Self-Service Portal', key: 'portal', icon: <ExternalLink className="w-4 h-4 text-emerald-400" /> },
    { label: 'AI Agent Studio & Marketplace', key: 'agent-studio', icon: <Cpu className="w-4 h-4 text-purple-400" /> },
    { label: 'Visual Automations Builder', key: 'automation', icon: <Workflow className="w-4 h-4 text-cyan-400" /> },
    { label: 'Workforce Capacity & Skills (WFM)', key: 'wfm', icon: <UserCheck className="w-4 h-4 text-amber-400" /> },
    { label: 'System Operational Status Page', key: 'status', icon: <Activity className="w-4 h-4 text-rose-400" /> },
    { label: 'Integrations Hub & Webhook Sandbox', key: 'integrations', icon: <Plug className="w-4 h-4 text-indigo-400" /> },
  ];

  const filteredTickets = tickets.filter(t => 
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.ticketNumber.toLowerCase().includes(query.toLowerCase()) ||
    (t.customerName && t.customerName.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredNav = quickNav.filter(n => n.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]">
        {/* Search Input */}
        <div className="p-3.5 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command, ticket number, or search across SupportOS..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <kbd className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 font-mono">
            ESC
          </kbd>
        </div>

        {/* Results Stream */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Quick Views */}
          {filteredNav.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5 mb-1">
                Navigation & Modules
              </div>
              <div className="space-y-0.5">
                {filteredNav.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => { onSelectAction(item.key); onClose(); }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800/80 text-slate-200 hover:text-white transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">Jump →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tickets matches */}
          {filteredTickets.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5 mb-1">
                Matching Tickets ({filteredTickets.length})
              </div>
              <div className="space-y-0.5">
                {filteredTickets.slice(0, 5).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { onSelectAction('SELECT_TICKET', t); onClose(); }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800/80 text-slate-200 hover:text-white transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-blue-400 font-semibold text-[11px]">#{t.ticketNumber}</span>
                      <span className="font-medium truncate">{t.title}</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 shrink-0">
                      {t.customerName}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 px-4">
          <span>Navigate with <kbd className="bg-slate-800 px-1 rounded text-slate-300">↑</kbd> <kbd className="bg-slate-800 px-1 rounded text-slate-300">↓</kbd></span>
          <span>Select with <kbd className="bg-slate-800 px-1 rounded text-slate-300">Enter</kbd></span>
        </div>
      </div>
    </div>
  );
};
