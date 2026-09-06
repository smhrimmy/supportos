import React, { useState } from 'react';
import { 
  UserCheck, 
  Users, 
  Activity, 
  Sparkles, 
  Languages, 
  ShieldCheck, 
  CheckCircle2, 
  Sliders, 
  Clock, 
  Award,
  Layers,
  Zap
} from 'lucide-react';
import { AgentCapacity } from '../../types';

export const WorkforceView: React.FC = () => {
  const [agents, setAgents] = useState<AgentCapacity[]>([
    {
      id: 1,
      name: 'Elena Rostova',
      role: 'Operations Director & Admin',
      department: 'Executive Escalations',
      activeTickets: 2,
      maxCapacity: 5,
      languages: ['English', 'German'],
      skills: ['SOC-2 Compliance', 'Executive Dispute', 'GDPR'],
      status: 'ONLINE'
    },
    {
      id: 2,
      name: 'Marcus Vance',
      role: 'Senior Customer Success Lead',
      department: 'Billing & Enterprise',
      activeTickets: 4,
      maxCapacity: 5,
      languages: ['English', 'French'],
      skills: ['Stripe Invoicing', 'Duplicate Reversals', 'VIP Accounts'],
      status: 'ON_CALL'
    },
    {
      id: 3,
      name: 'Chloe Bennett',
      role: 'Tier 2 Technical Support',
      department: 'Engineering Triage',
      activeTickets: 2,
      maxCapacity: 6,
      languages: ['English', 'Spanish'],
      skills: ['Webhooks', 'REST APIs', 'Android Crash Logs'],
      status: 'ONLINE'
    },
    {
      id: 4,
      name: 'Liam Neill',
      role: 'Logistics Operations Lead',
      department: 'Fulfillment',
      activeTickets: 1,
      maxCapacity: 6,
      languages: ['English'],
      skills: ['FedEx API', 'DHL Tracers', 'Return Labels'],
      status: 'ONLINE'
    }
  ]);

  const queues = [
    { name: 'Critical Enterprise Escalations', active: 3, waitTime: '2m', load: 85, color: 'text-rose-400' },
    { name: 'Billing & Invoicing Queue', active: 6, waitTime: '5m', load: 74, color: 'text-amber-400' },
    { name: 'Technical & API Integrations', active: 4, waitTime: '12m', load: 60, color: 'text-blue-400' },
    { name: 'Shipping & Logistics Queue', active: 2, waitTime: '4m', load: 30, color: 'text-emerald-400' }
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
              Workforce & Skills Matrix
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-amber-400" />
            <span>Workforce Management & Skills-Based Routing</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time agent capacity, language skill routing, shift attendance, and dynamic queue load rebalancing.
          </p>
        </div>

        <button 
          onClick={() => alert("Workforce Queues rebalanced using AI predictive routing!")}
          className="flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-md transition-all active:scale-95"
        >
          <Zap className="w-3.5 h-3.5 fill-white" />
          <span>Auto-Rebalance Queues</span>
        </button>
      </div>

      {/* Queue Load Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {queues.map((q) => (
          <div key={q.name} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-[11px] font-semibold text-slate-400">{q.name}</div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-white">{q.active} <span className="text-xs text-slate-400 font-normal">active</span></span>
              <span className={`text-xs font-bold font-mono ${q.color}`}>{q.load}% Load</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${q.load}%` }} />
            </div>
            <div className="text-[10px] text-slate-500 font-mono">Avg Wait: {q.waitTime}</div>
          </div>
        ))}
      </div>

      {/* Agent Capacity & Skills Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span>Active Support Specialist Capacity</span>
          </h3>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded font-bold">
            4 Specialists Monitored
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agents.map((ag) => (
            <div key={ag.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-xs flex items-center gap-2">
                    <span>{ag.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({ag.role})</span>
                  </div>
                  <div className="text-[11px] text-slate-400">{ag.department}</div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  ag.status === 'ONLINE' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-violet-500/20 text-violet-300'
                }`}>
                  {ag.status}
                </span>
              </div>

              {/* Workload Progress */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Current Workload:</span>
                  <span className="font-mono font-bold text-slate-200">{ag.activeTickets} / {ag.maxCapacity} Tickets ({Math.round(ag.activeTickets/ag.maxCapacity*100)}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      ag.activeTickets >= ag.maxCapacity ? 'bg-rose-500' : ag.activeTickets >= 3 ? 'bg-amber-500' : 'bg-blue-500'
                    }`} 
                    style={{ width: `${(ag.activeTickets / ag.maxCapacity) * 100}%` }} 
                  />
                </div>
              </div>

              {/* Skills and Languages */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                {ag.languages.map((l) => (
                  <span key={l} className="text-[10px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-0.5 rounded">
                    🗣️ {l}
                  </span>
                ))}
                {ag.skills.map((s) => (
                  <span key={s} className="text-[10px] font-medium bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
