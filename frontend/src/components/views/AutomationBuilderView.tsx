import React, { useState } from 'react';
import { 
  Workflow, 
  Sparkles, 
  Play, 
  Plus, 
  ArrowDown, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Bot, 
  Mail, 
  Sliders 
} from 'lucide-react';

export const AutomationBuilderView: React.FC = () => {
  const [activeWorkflow, setActiveWorkflow] = useState('Critical Enterprise Escalation');

  const workflows = [
    { name: 'Critical Enterprise Escalation', triggers: 'Ticket Created', status: 'ACTIVE', executions: '1,420 runs' },
    { name: 'Duplicate Billing Auto-Reversal', triggers: 'WhatsApp Message Inbound', status: 'ACTIVE', executions: '892 runs' },
    { name: 'Carrier Delay Proactive Notification', triggers: 'FedEx API Status Change', status: 'ACTIVE', executions: '430 runs' },
    { name: 'Android Crash Incident Detection', triggers: 'Spike Detected (> 50 / hr)', status: 'ACTIVE', executions: '34 runs' }
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
              Visual Automation Engine
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Workflow className="w-5 h-5 text-cyan-400" />
            <span>Zapier + n8n + Zendesk Workflows for SupportOS</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Design multi-step visual workflows combining triggers, conditions, AI classification, and automated external actions.
          </p>
        </div>

        <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-md shadow-blue-500/20 transition-all">
          <Plus className="w-3.5 h-3.5" />
          <span>New Workflow Rule</span>
        </button>
      </div>

      {/* Main Body */}
      <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar of rules */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active Support Workflows
          </h3>
          <div className="space-y-2">
            {workflows.map((wf) => (
              <div
                key={wf.name}
                onClick={() => setActiveWorkflow(wf.name)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  activeWorkflow === wf.name
                    ? 'bg-blue-600/10 border-blue-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="text-xs font-bold text-slate-100 mb-1">{wf.name}</div>
                <div className="text-[11px] text-slate-400">Trigger: {wf.triggers}</div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2">
                  <span className="text-emerald-400 font-semibold">{wf.status}</span>
                  <span className="font-mono">{wf.executions}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Node Graph Canvas */}
        <div className="lg:col-span-3 bg-slate-900/40 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center space-y-4 relative overflow-hidden">
          
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* NODE 1: TRIGGER */}
          <div className="w-80 bg-slate-900 border-2 border-cyan-500/60 rounded-xl p-4 shadow-xl z-10">
            <div className="flex items-center justify-between text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
              <span>Trigger Event</span>
              <span className="p-1 rounded bg-cyan-500/20 text-cyan-300">TRIGGER</span>
            </div>
            <div className="text-xs font-bold text-white">Ticket Created via Any Channel</div>
            <div className="text-[11px] text-slate-400 mt-1">Inbound stream listener (Email, WhatsApp, Chat, API)</div>
          </div>

          <ArrowDown className="w-5 h-5 text-slate-600 z-10 animate-bounce" />

          {/* NODE 2: CONDITION */}
          <div className="w-80 bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl z-10">
            <div className="flex items-center justify-between text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">
              <span>Logical Condition</span>
              <span className="p-1 rounded bg-amber-500/20 text-amber-300">IF / THEN</span>
            </div>
            <div className="text-xs font-bold text-white">Priority == CRITICAL & Tier == ENTERPRISE</div>
            <div className="text-[11px] text-slate-400 mt-1">Evaluates customer profile metadata and SLA window</div>
          </div>

          <ArrowDown className="w-5 h-5 text-slate-600 z-10" />

          {/* NODE 3: AI CLASSIFICATION */}
          <div className="w-80 bg-slate-900 border-2 border-purple-500/60 rounded-xl p-4 shadow-xl z-10">
            <div className="flex items-center justify-between text-[11px] font-bold text-purple-400 uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> AI Engine Analysis</span>
              <span className="p-1 rounded bg-purple-500/20 text-purple-300">GEMINI</span>
            </div>
            <div className="text-xs font-bold text-white">Detect Intent, Sentiment & Duplicate Charge</div>
            <div className="text-[11px] text-slate-400 mt-1">Calculates urgency score and cross-references Stripe</div>
          </div>

          <ArrowDown className="w-5 h-5 text-slate-600 z-10" />

          {/* NODE 4: MULTI-ACTION FANOUT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 z-10">
            <div className="w-72 bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3.5 shadow-lg">
              <div className="text-[10px] font-bold text-emerald-400 uppercase mb-0.5">Automated Action A</div>
              <div className="text-xs font-bold text-white">Start 15-Minute Critical SLA</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Notify On-Call Manager Marcus Vance via Slack</div>
            </div>

            <div className="w-72 bg-blue-950/40 border border-blue-500/40 rounded-xl p-3.5 shadow-lg">
              <div className="text-[10px] font-bold text-blue-400 uppercase mb-0.5">Automated Action B</div>
              <div className="text-xs font-bold text-white">Dispatch Customer Acknowledgement</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Send personalized WhatsApp update with live agent ETA</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
