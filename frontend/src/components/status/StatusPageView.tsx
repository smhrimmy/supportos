import React, { useState } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Bell, 
  ShieldCheck, 
  TrendingUp,
  Server,
  Zap,
  Radio
} from 'lucide-react';
import { SystemComponentStatus } from '../../types';

export const StatusPageView: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const components: SystemComponentStatus[] = [
    { id: '1', name: 'Core REST & GraphQL APIs', status: 'OPERATIONAL', uptimePercentage: 99.99, description: 'Handles all ticket CRUD, message processing, and customer 360 requests' },
    { id: '2', name: 'Mobile Authentication & Session Tokens', status: 'DEGRADED', uptimePercentage: 98.42, description: 'Investigating session termination spike on Android 16 build 8.4.1 (Incident #INC-402)' },
    { id: '3', name: 'Stripe & Payment Webhooks Engine', status: 'OPERATIONAL', uptimePercentage: 100.0, description: 'Real-time billing settlement, invoice webhook listeners, and automatic refund dispatch' },
    { id: '4', name: 'SupportOS Gemini AI Gateway', status: 'OPERATIONAL', uptimePercentage: 99.95, description: 'Ticket triage, real-time sentiment scoring, and Copilot response generation' },
    { id: '5', name: 'Cloud Voice & WebRTC Telephony', status: 'OPERATIONAL', uptimePercentage: 99.88, description: 'Live softphone SIP endpoints, speech-to-text audio streams, and IVR routing' }
  ];

  const incidents = [
    {
      id: 'INC-402',
      title: 'Elevated session errors on Android 16',
      status: 'INVESTIGATING',
      severity: 'MAJOR',
      date: 'Today, 14:32 UTC',
      updates: [
        { time: '14:45 UTC', text: 'Engineering has replicated the token expiration bug and prepared a patch in PR #882. Rollout underway.' },
        { time: '14:32 UTC', text: 'SupportOS Incident Radar detected +312% error spike from Dublin and Frankfurt clusters. Team mobilized.' }
      ]
    },
    {
      id: 'INC-398',
      title: 'Scheduled Database Maintenance & Migration',
      status: 'RESOLVED',
      severity: 'MAINTENANCE',
      date: 'Sep 3, 2026',
      updates: [
        { time: '04:15 UTC', text: 'Zero-downtime PostgreSQL schema update completed successfully. All services nominal.' }
      ]
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-y-auto">
      {/* Top Banner */}
      <div className="p-8 border-b border-slate-800 bg-slate-900/40">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                SupportOS Trust & Infrastructure
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-xs text-slate-400">Statuspage.io Native Alternative</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Activity className="w-6 h-6 text-emerald-400" />
              <span>System Operational Status</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Live uptime metrics, component diagnostics, and real-time incident notifications.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Enter email for alerts..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-3 py-1.5 rounded-lg shadow-sm transition-all"
            >
              {subscribed ? 'Subscribed ✓' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-8 space-y-8">
        {/* Overall Status Bar */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Partial System Degradation (Incident Active)</div>
              <div className="text-xs text-slate-400">4 of 5 core services running at 100% capacity</div>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
            99.98% 90-Day Uptime
          </span>
        </div>

        {/* Component Health Cards */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Core Service Components
          </h3>
          <div className="space-y-2">
            {components.map((c) => (
              <div key={c.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>{c.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">• {c.uptimePercentage}%</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{c.description}</div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    c.status === 'OPERATIONAL'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-amber-500/20 text-amber-300 animate-pulse'
                  }`}>
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active & Past Incidents Timeline */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Incident History & Outage Log
          </h3>

          <div className="space-y-4">
            {incidents.map((inc) => (
              <div key={inc.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400">#{inc.id}</span>
                    <span className="text-xs font-bold text-white">{inc.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-mono">{inc.date}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      inc.status === 'RESOLVED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {inc.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                  {inc.updates.map((up, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-slate-300">
                      <span className="font-mono text-slate-500 text-[10px] shrink-0 mt-0.5">{up.time}</span>
                      <p className="text-[11px] leading-relaxed">{up.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
