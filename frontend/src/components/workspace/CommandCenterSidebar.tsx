import React from 'react';
import { 
  Inbox, 
  Sparkles, 
  AlertTriangle, 
  UserCheck, 
  Star,
  Mail,
  MessageSquare,
  Phone,
  Radio,
  Cpu,
  Workflow,
  BookOpen,
  BarChart3,
  ShieldAlert,
  Sliders,
  ChevronDown,
  Activity,
  Plug,
  ExternalLink,
  Users,
  Settings
} from 'lucide-react';
import { Channel } from '../../types';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  selectedChannel: string;
  onChannelChange: (channel: string) => void;
  ticketCounts: {
    all: number;
    aiTriaged: number;
    escalated: number;
    critical: number;
    email: number;
    chat: number;
    whatsapp: number;
    voice: number;
  };
}

export const CommandCenterSidebar: React.FC<SidebarProps> = ({
  activeView,
  onViewChange,
  selectedChannel,
  onChannelChange,
  ticketCounts
}) => {
  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/60 flex flex-col h-[calc(100vh-3.5rem)] select-none">
      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        
        {/* Workspace Inboxes */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5 mb-1 flex items-center justify-between">
            <span>Support Queues</span>
            <span className="text-slate-500 font-mono text-[9px]">LIVE</span>
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => { onViewChange('workspace'); onChannelChange('ALL'); }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'workspace' && selectedChannel === 'ALL'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Inbox className="w-3.5 h-3.5 text-blue-400" />
                <span>Unified Inbox</span>
              </div>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-semibold">
                {ticketCounts.all}
              </span>
            </button>

            <button
              onClick={() => { onViewChange('workspace'); onChannelChange('AI_TRIAGE'); }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'workspace' && selectedChannel === 'AI_TRIAGE'
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>AI Auto-Triage</span>
              </div>
              <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded font-semibold">
                {ticketCounts.aiTriaged}
              </span>
            </button>

            <button
              onClick={() => { onViewChange('workspace'); onChannelChange('ESCALATED'); }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'workspace' && selectedChannel === 'ESCALATED'
                  ? 'bg-rose-600/20 text-rose-400 border border-rose-500/30'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Escalated SLA</span>
              </div>
              <span className="text-[10px] font-mono bg-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded font-semibold">
                {ticketCounts.escalated}
              </span>
            </button>

            <button
              onClick={() => { onViewChange('workspace'); onChannelChange('VIP'); }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'workspace' && selectedChannel === 'VIP'
                  ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                <span>Enterprise VIP</span>
              </div>
              <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-semibold">
                {ticketCounts.critical}
              </span>
            </button>
          </div>
        </div>

        {/* Omnichannel Streams */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5 mb-1">
            Omnichannel Channels
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => { onViewChange('workspace'); onChannelChange('EMAIL'); }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedChannel === 'EMAIL' ? 'bg-blue-600/20 text-blue-400 font-semibold' : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>Email</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">{ticketCounts.email}</span>
            </button>

            <button
              onClick={() => { onViewChange('workspace'); onChannelChange('LIVE_CHAT'); }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedChannel === 'LIVE_CHAT' ? 'bg-blue-600/20 text-blue-400 font-semibold' : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                <span>Live Chat</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">{ticketCounts.chat}</span>
            </button>

            <button
              onClick={() => { onViewChange('workspace'); onChannelChange('WHATSAPP'); }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedChannel === 'WHATSAPP' ? 'bg-blue-600/20 text-blue-400 font-semibold' : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">{ticketCounts.whatsapp}</span>
            </button>

            <button
              onClick={() => onViewChange('voice')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'voice' ? 'bg-violet-600/20 text-violet-300 font-semibold border border-violet-500/30' : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-violet-400" />
                <span>Voice Softphone</span>
              </div>
              <span className="text-[10px] font-mono bg-violet-500/20 text-violet-300 px-1.5 py-0.2 rounded font-semibold">LIVE</span>
            </button>
          </div>
        </div>

        {/* Enterprise Platform Engines */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5 mb-1">
            Enterprise Engines
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => onViewChange('admin')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'admin'
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                  : 'text-indigo-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-3.5 h-3.5 text-indigo-400" />
                <span>Admin & Genesys</span>
              </div>
              <span className="text-[9px] font-mono bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded font-bold">CONTROL</span>
            </button>

            <button
              onClick={() => onViewChange('portal')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'portal'
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                  : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>Customer Portal</span>
            </button>

            <button
              onClick={() => onViewChange('agent-studio')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'agent-studio'
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Agent Studio</span>
            </button>

            <button
              onClick={() => onViewChange('automation')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'automation'
                  ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <Workflow className="w-3.5 h-3.5 text-cyan-400" />
              <span>Visual Automations</span>
            </button>

            <button
              onClick={() => onViewChange('diagnostics')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'diagnostics'
                  ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              <span>Pega Product Fixer</span>
            </button>

            <button
              onClick={() => onViewChange('interactions')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'interactions'
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
              <span>Interaction Records</span>
            </button>

            <button
              onClick={() => onViewChange('wfm')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'wfm'
                  ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Workforce (WFM)</span>
            </button>

            <button
              onClick={() => onViewChange('knowledge')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'knowledge'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>Knowledge Base & RAG</span>
            </button>

            <button
              onClick={() => onViewChange('status')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'status'
                  ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Operational Status</span>
            </button>

            <button
              onClick={() => onViewChange('integrations')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'integrations'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <Plug className="w-3.5 h-3.5 text-indigo-400" />
              <span>Integrations & Webhooks</span>
            </button>

            <button
              onClick={() => onViewChange('analytics')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'analytics'
                  ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Analytics & AI QA</span>
            </button>
          </div>
        </div>
      </div>

      {/* Incident Detector Banner */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        <div className="p-2.5 rounded-lg bg-gradient-to-br from-amber-500/10 to-rose-500/10 border border-amber-500/20">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Incident Detector</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-tight">
            Detected +312% crash reports on <span className="font-semibold text-white">Android 16</span>.
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[10px] text-slate-400">97% AI Confidence</span>
            <button 
              onClick={() => onViewChange('status')}
              className="text-[10px] font-semibold text-amber-400 hover:underline"
            >
              View Status →
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
