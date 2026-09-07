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
  Sparkles,
  Settings
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
    { label: 'Enterprise Admin & Genesys Control Deck', key: 'admin', icon: <Settings className="w-4 h-4 text-purple-600" /> },
    { label: 'Unified Support Workspace', key: 'workspace', icon: <MessageSquare className="w-4 h-4 text-purple-600" /> },
    { label: 'Pega Guided Product Diagnostics & Fixing', key: 'diagnostics', icon: <Activity className="w-4 h-4 text-purple-600" /> },
    { label: 'Pega Interaction Records & Contact Notes', key: 'interactions', icon: <BookOpen className="w-4 h-4 text-purple-600" /> },
    { label: 'Voice Contact Center (Softphone)', key: 'voice', icon: <Phone className="w-4 h-4 text-purple-600" /> },
    { label: 'Customer Self-Service Portal', key: 'portal', icon: <ExternalLink className="w-4 h-4 text-purple-600" /> },
    { label: 'AI Agent Studio & Marketplace', key: 'agent-studio', icon: <Cpu className="w-4 h-4 text-purple-600" /> },
    { label: 'Visual Automations Builder', key: 'automation', icon: <Workflow className="w-4 h-4 text-purple-600" /> },
    { label: 'Workforce Capacity & Skills (WFM)', key: 'wfm', icon: <UserCheck className="w-4 h-4 text-purple-600" /> },
    { label: 'System Operational Status Page', key: 'status', icon: <Activity className="w-4 h-4 text-purple-600" /> },
    { label: 'Integrations Hub & Webhook Sandbox', key: 'integrations', icon: <Plug className="w-4 h-4 text-purple-600" /> },
  ];

  const filteredTickets = tickets.filter(t => 
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.ticketNumber.toLowerCase().includes(query.toLowerCase()) ||
    (t.customerName && t.customerName.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredNav = quickNav.filter(n => n.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white border border-slate-200/90 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]">
        {/* Search Input */}
        <div className="p-3.5 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-4 h-4 text-purple-600 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command, ticket number, or search across SupportOS..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <kbd className="text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 font-mono shadow-sm">
            ESC
          </kbd>
        </div>

        {/* Results Stream */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs bg-[#FAF9FD]/40">
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
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-purple-50/70 text-slate-700 hover:text-purple-900 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span className="font-semibold">{item.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 group-hover:text-purple-600 font-mono">Jump →</span>
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
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-purple-50/70 text-slate-700 hover:text-purple-900 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-purple-700 font-bold text-[11px]">#{t.ticketNumber}</span>
                      <span className="font-medium truncate text-slate-900">{t.title}</span>
                    </div>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 shrink-0 font-medium">
                      {t.customerName}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 px-4">
          <span>Navigate with <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700 shadow-sm">↑</kbd> <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700 shadow-sm">↓</kbd></span>
          <span>Select with <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700 shadow-sm">Enter</kbd></span>
        </div>
      </div>
    </div>
  );
};
