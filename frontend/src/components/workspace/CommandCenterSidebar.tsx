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
  Activity,
  Plug,
  ExternalLink,
  Users,
  Settings,
  Wrench,
  FileCheck
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
    <aside className="w-64 border-r border-slate-200/90 bg-white flex flex-col h-[calc(100vh-3.5rem)] select-none shadow-[1px_0_3px_rgba(0,0,0,0.02)]">
      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto p-3 space-y-5">
        
        {/* Workspace Inboxes */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5 mb-1.5 flex items-center justify-between">
            <span>Support Queues</span>
            <span className="text-purple-600 font-mono text-[9px] bg-purple-50 px-1.5 py-0.5 rounded font-bold border border-purple-100">
              LIVE
            </span>
          </div>
          <div className="space-y-1">
            <button
              onClick={() => { onViewChange('workspace'); onChannelChange('ALL'); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeView === 'workspace' && selectedChannel === 'ALL'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200/80 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox className={`w-4 h-4 ${activeView === 'workspace' && selectedChannel === 'ALL' ? 'text-purple-600' : 'text-slate-400'}`} />
                <span>Unified Inbox</span>
              </div>
              <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                {ticketCounts.all}
              </span>
            </button>

            <button
              onClick={() => { onViewChange('workspace'); onChannelChange('AI_TRIAGE'); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeView === 'workspace' && selectedChannel === 'AI_TRIAGE'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200/80 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className={`w-4 h-4 ${activeView === 'workspace' && selectedChannel === 'AI_TRIAGE' ? 'text-purple-600' : 'text-slate-400'}`} />
                <span>AI Auto-Triage</span>
              </div>
              <span className="text-[10px] font-mono bg-purple-100/70 text-purple-700 px-2 py-0.5 rounded-full font-bold">
                {ticketCounts.aiTriaged}
              </span>
            </button>

            <button
              onClick={() => { onViewChange('workspace'); onChannelChange('ESCALATED'); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeView === 'workspace' && selectedChannel === 'ESCALATED'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200/80 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <AlertTriangle className={`w-4 h-4 ${activeView === 'workspace' && selectedChannel === 'ESCALATED' ? 'text-rose-600' : 'text-slate-400'}`} />
                <span>Escalations</span>
              </div>
              <span className="text-[10px] font-mono bg-rose-100/70 text-rose-700 px-2 py-0.5 rounded-full font-bold">
                {ticketCounts.escalated}
              </span>
            </button>

            <button
              onClick={() => { onViewChange('workspace'); onChannelChange('VIP'); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeView === 'workspace' && selectedChannel === 'VIP'
                  ? 'bg-amber-50 text-amber-800 border border-amber-200/80 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Star className={`w-4 h-4 ${activeView === 'workspace' && selectedChannel === 'VIP' ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
                <span>Enterprise VIP</span>
              </div>
              <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                {ticketCounts.critical}
              </span>
            </button>
          </div>
        </div>

        {/* Omnichannel Queues */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5 mb-1.5">
            Omnichannel Streams
          </div>
          <div className="space-y-1">
            <button
              onClick={() => { onViewChange('workspace'); onChannelChange('WHATSAPP'); }}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeView === 'workspace' && selectedChannel === 'WHATSAPP'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Radio className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Live</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-bold">{ticketCounts.whatsapp}</span>
            </button>

            <button
              onClick={() => { onViewChange('workspace'); onChannelChange('LIVE_CHAT'); }}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeView === 'workspace' && selectedChannel === 'LIVE_CHAT'
                  ? 'bg-sky-50 text-sky-700 border border-sky-200 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                <span>Live Chat</span>
              </div>
              <span className="text-[10px] font-mono text-sky-700 font-bold">{ticketCounts.chat}</span>
            </button>

            <button
              onClick={() => { onViewChange('workspace'); onChannelChange('EMAIL'); }}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeView === 'workspace' && selectedChannel === 'EMAIL'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-purple-600" />
                <span>Email Inbound</span>
              </div>
              <span className="text-[10px] font-mono text-purple-700 font-bold">{ticketCounts.email}</span>
            </button>
          </div>
        </div>

        {/* Pega Enterprise Engines */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5 mb-1.5">
            Pega Service Engines
          </div>
          <div className="space-y-1">
            <button
              onClick={() => onViewChange('diagnostics')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeView === 'diagnostics'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200 font-bold shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Wrench className="w-4 h-4 text-purple-600" />
              <span>Guided Product Fixer</span>
            </button>

            <button
              onClick={() => onViewChange('interactions')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeView === 'interactions'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200 font-bold shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <FileCheck className="w-4 h-4 text-purple-600" />
              <span>Interaction Records</span>
            </button>

            <button
              onClick={() => onViewChange('wfm')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeView === 'wfm'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200 font-bold shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-4 h-4 text-purple-600" />
              <span>Workforce (WFM)</span>
            </button>

            <button
              onClick={() => onViewChange('knowledge')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeView === 'knowledge'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200 font-bold shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>Knowledge Base</span>
            </button>

            <button
              onClick={() => onViewChange('status')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeView === 'status'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200 font-bold shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Activity className="w-4 h-4 text-purple-600" />
              <span>System Status</span>
            </button>
          </div>
        </div>

        {/* Administration Section */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5 mb-1.5">
            Administration
          </div>
          <button
            onClick={() => onViewChange('admin')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeView === 'admin'
                ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/20'
                : 'bg-purple-50 text-purple-700 border border-purple-200/80 hover:bg-purple-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4 text-purple-600" />
              <span>Admin & Genesys</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white text-purple-700 border border-purple-200 shadow-2xs font-bold">
              CONTROL
            </span>
          </button>
        </div>
      </div>

      {/* Incident Detector Banner */}
      <div className="p-3 border-t border-slate-200/90 bg-slate-50/80">
        <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200/80">
          <div className="flex items-center gap-2 text-amber-800 text-xs font-bold mb-1">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Telemetry Incident</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-tight">
            Detected +312% crash reports on <span className="font-semibold text-slate-900">Android 16</span>.
          </p>
          <div className="mt-2 flex items-center justify-between pt-1 border-t border-amber-200/60">
            <span className="text-[10px] text-slate-500 font-mono">97% AI Confidence</span>
            <button 
              onClick={() => onViewChange('status')}
              className="text-[10px] font-bold text-purple-700 hover:underline"
            >
              Diagnostics →
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
