import React, { useState } from 'react';
import { 
  Plug, 
  CheckCircle2, 
  ExternalLink, 
  Send, 
  Code, 
  ShieldCheck, 
  Check, 
  Plus, 
  Layers, 
  Zap,
  Globe,
  Lock
} from 'lucide-react';
import { IntegrationConnector } from '../../types';

export const IntegrationsHubView: React.FC = () => {
  const [connectors, setConnectors] = useState<IntegrationConnector[]>([
    { id: '1', name: 'Salesforce Service Cloud', category: 'CRM', description: 'Bi-directional account synchronization, lead linking, and enterprise case mapping', isConnected: true, webhookCount: 4120, lastSyncAt: 'Just now' },
    { id: '2', name: 'Stripe Payments Engine', category: 'PAYMENTS', description: 'Instant dispute detection, duplicate transaction verification, and automatic refund triggers', isConnected: true, webhookCount: 8901, lastSyncAt: '2 mins ago' },
    { id: '3', name: 'GitHub & Jira Engineering Bridge', category: 'DEV', description: 'Auto-create bug issues from support spikes and notify customers upon pull request deployment', isConnected: true, webhookCount: 1420, lastSyncAt: '12 mins ago' },
    { id: '4', name: 'WhatsApp Cloud Business API', category: 'COMMS', description: 'Live bidirectional messaging via Meta Graph API with interactive buttons and templates', isConnected: true, webhookCount: 18400, lastSyncAt: 'Live streaming' },
    { id: '5', name: 'Shopify Plus & Orders', category: 'COMMERCE', description: 'Live cart inspection, fulfillment tracking, and one-click return label generation', isConnected: false, webhookCount: 0, lastSyncAt: 'Not connected' },
    { id: '6', name: 'Slack Swarm Integration', category: 'COMMS', description: 'Spin up real-time war rooms and support swarms directly from critical tickets', isConnected: true, webhookCount: 312, lastSyncAt: '1 hour ago' }
  ]);

  const [testEvent, setTestEvent] = useState('ticket.created');
  const [testResult, setTestResult] = useState<string | null>(null);

  const toggleConnect = (id: string) => {
    setConnectors(prev => prev.map(c => c.id === id ? { ...c, isConnected: !c.isConnected } : c));
  };

  const handleTestWebhook = () => {
    setTestResult(`HTTP 200 OK — Delivered to endpoint https://api.supportos.io/webhooks/listener in 42ms. HMAC Signature: sha256=8a4f91e8b2d...`);
    setTimeout(() => setTestResult(null), 5000);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
              Native Integrations & Webhooks Hub
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Plug className="w-5 h-5 text-indigo-400" />
            <span>Enterprise Ecosystem Marketplace & Webhooks</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Connect SupportOS to your existing CRM, payments, developer tools, and communication channels with enterprise HMAC webhook signing.
          </p>
        </div>
      </div>

      {/* Grid: Connectors & Webhook Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Connectors Marketplace */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Active Ecosystem Connectors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {connectors.map((c) => (
              <div key={c.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {c.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      c.isConnected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {c.isConnected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{c.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{c.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                  <span className="text-slate-500 font-mono">{c.webhookCount.toLocaleString()} events dispatched</span>
                  <button
                    onClick={() => toggleConnect(c.id)}
                    className={`font-semibold px-2.5 py-1 rounded transition-colors ${
                      c.isConnected 
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' 
                        : 'bg-blue-600 hover:bg-blue-500 text-white'
                    }`}
                  >
                    {c.isConnected ? 'Configure' : 'Connect'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Webhook Dispatcher Sandbox */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-cyan-400" />
              <span>Webhook Event Dispatcher</span>
            </h3>
            <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded">
              Sandbox
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Event Type Trigger
              </label>
              <select
                value={testEvent}
                onChange={(e) => setTestEvent(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="ticket.created">ticket.created</option>
                <option value="ticket.resolved">ticket.resolved</option>
                <option value="sla.breached">sla.breached</option>
                <option value="incident.detected">incident.detected</option>
                <option value="ai.escalated">ai.escalated</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Payload JSON Preview
              </label>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
                {`{
  "event": "${testEvent}",
  "timestamp": "2026-09-07T02:24:00Z",
  "ticketId": 1042,
  "tenant": "acme",
  "customer": "Sarah Chen",
  "priority": "HIGH",
  "urgencyScore": 88
}`}
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Signed with HMAC-SHA256 Secret: <code className="text-slate-200">whsec_981a3...</code></span>
            </div>

            <button
              onClick={handleTestWebhook}
              className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Simulate Webhook Dispatch</span>
            </button>

            {testResult && (
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-[11px] leading-relaxed">
                {testResult}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
