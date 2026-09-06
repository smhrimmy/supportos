import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Users, 
  ArrowUpRight, 
  DollarSign,
  Activity,
  GitPullRequest
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              SupportOS Intelligence Engine
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <span>Executive Analytics, AI QA & Voice of Customer</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time analytics connecting support operations, autonomous AI containment, conversation QA, and engineering incident detection.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Date Range:</span>
          <select className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 font-semibold focus:outline-none">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Today</option>
          </select>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>AI Resolution Rate</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">68.4%</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% from last month</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Avg First Response</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">42s</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
            <TrendingUp className="w-3 h-3" />
            <span>98.8% within SLA target</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>CSAT Satisfaction</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">4.8 / 5.0</div>
          <div className="text-[11px] text-slate-400">Based on 1,420 surveys</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Estimated Cost Saved</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">$38,400</div>
          <div className="text-[11px] text-slate-400">2,310 bot automated hours</div>
        </div>
      </div>

      {/* Grid: AI Performance Breakdown & Voice of Customer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* AI Performance Card */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>AI Autonomous Triage & Containment</span>
            </h3>
            <span className="text-[11px] font-mono text-purple-300 font-bold bg-purple-500/20 px-2 py-0.5 rounded">
              4,892 Conversations
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-200">AI Direct Resolution</span>
                <span className="text-emerald-400">68%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '68%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-200">AI Assisted Human Escalation</span>
                <span className="text-blue-400">19%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '19%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-200">Human Handoff Request</span>
                <span className="text-amber-400">9%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '9%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-200">Unresolved Intent / Fallback</span>
                <span className="text-rose-400">4%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '4%' }} />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="font-bold text-slate-200">Top Unresolved Intent:</div>
            <div>Multi-tier corporate subscription invoicing disputes (auto-routed to Senior Billing Specialist).</div>
          </div>
        </div>

        {/* Voice of Customer (VOC) Card */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span>Voice of Customer (VOC) Clusters</span>
            </h3>
            <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded">
              Analyzed 12,400 messages
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-medium text-slate-200">1. Delivery Tracking Delay</span>
              <span className="font-bold text-slate-300">31% of inquiries</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-medium text-slate-200">2. Invoicing & Payment Duplicates</span>
              <span className="font-bold text-slate-300">19% of inquiries</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-medium text-slate-200">3. Mobile Authentication Crashes</span>
              <span className="font-bold text-rose-400">14% (+243% spike)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-medium text-slate-200">4. Refund Turnaround Inquiries</span>
              <span className="font-bold text-slate-300">11% of inquiries</span>
            </div>
          </div>

          {/* Incident Alert Connection */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 space-y-1.5">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Active Incident: Android 16 Login Crash</span>
            </div>
            <div className="text-[11px] text-amber-100 leading-relaxed">
              Spike detected at 14:32 UTC. Connected to engineering incident #INC-402 in GitHub with 14 customer tickets linked. Customers will be auto-notified once deployment verification completes.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
