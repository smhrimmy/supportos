import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  Shield, 
  CheckSquare, 
  Sliders, 
  Play, 
  ArrowRight, 
  Plus, 
  Check, 
  Settings,
  Bot,
  Layers,
  MessageSquare,
  DollarSign
} from 'lucide-react';

export const AgentStudioView: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState('Returns Assistant');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);

  // Agent configuration state
  const [agentName, setAgentName] = useState('Returns Assistant');
  const [purpose, setPurpose] = useState('Handle customer return requests, label generation, and refund eligibility.');
  const [tone, setTone] = useState('Empathetic & Professional');
  const [refundLimit, setRefundLimit] = useState('500');

  // Permissions & Guardrails
  const [actions, setActions] = useState({
    checkOrder: true,
    checkDelivery: true,
    createReturn: true,
    generateReturnLabel: true,
    issueRefund: true,
    modifySubscription: false,
    cancelOrder: true
  });

  const [guardrails, setGuardrails] = useState({
    escalateAngry: true,
    vipPriorityQueue: true,
    refundHumanApproval: true,
    highRiskFraudHold: true
  });

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setDeployed(true);
      setTimeout(() => setDeployed(false), 3000);
    }, 1200);
  };

  const marketplaceAgents = [
    { name: 'Returns Assistant', category: 'E-Commerce', status: 'ACTIVE', containment: '78%', rating: '4.9' },
    { name: 'Billing & Invoicing Bot', category: 'Fintech / SaaS', status: 'ACTIVE', containment: '64%', rating: '4.8' },
    { name: 'Technical Support Specialist', category: 'IT & Cloud', status: 'TESTING', containment: '52%', rating: '4.7' },
    { name: 'Shipping & Logistics Tracker', category: 'Operations', status: 'ACTIVE', containment: '85%', rating: '4.9' },
    { name: 'VIP Retention Concierge', category: 'Customer Success', status: 'DRAFT', containment: '41%', rating: '4.6' }
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-y-auto">
      {/* Studio Header */}
      <div className="p-6 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">
              No-Code Agent Architecture
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-400" />
            <span>AI Agent Studio & Marketplace</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Build, test, and deploy autonomous AI support agents with granular action permissions, knowledge access, and safety guardrails.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-lg shadow-purple-500/20 transition-all active:scale-95"
          >
            {deployed ? <Check className="w-4 h-4 text-emerald-300" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isDeploying ? 'Validating Guardrails...' : deployed ? 'Agent Deployed!' : 'Test & Deploy Agent'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Body */}
      <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Agent Catalog */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Installed & Marketplace Agents
            </h3>
            <button className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" />
              <span>Create Custom</span>
            </button>
          </div>

          <div className="space-y-2">
            {marketplaceAgents.map((ag) => (
              <div
                key={ag.name}
                onClick={() => { setSelectedAgent(ag.name); setAgentName(ag.name); }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedAgent === ag.name
                    ? 'bg-purple-600/10 border-purple-500 text-white shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-purple-400" />
                    {ag.name}
                  </span>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    ag.status === 'ACTIVE'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : ag.status === 'TESTING'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {ag.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                  <span>Category: {ag.category}</span>
                  <span className="font-semibold text-purple-300">{ag.containment} AI Resolution</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2 & 3: Visual Agent Configurator */}
        <div className="lg:col-span-2 space-y-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-blue-400" />
                <span>Agent Configuration: {agentName}</span>
              </h2>
              <p className="text-xs text-slate-400">Specify domain knowledge, allowed system actions, and hard boundary guardrails.</p>
            </div>
            <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded font-bold">
              Gemini 2.5 Flash Runtime
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Agent Name</label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Response Tone & Persona</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-purple-500"
              >
                <option value="Empathetic & Professional">Empathetic & Professional</option>
                <option value="Friendly & Casual">Friendly & Casual 😊</option>
                <option value="Concise & Efficient">Concise & Efficient</option>
                <option value="Strictly Technical">Strictly Technical</option>
              </select>
            </div>
          </div>

          {/* Permitted Actions */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Permitted Autonomous System Actions</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              {Object.entries(actions).map(([key, val]) => (
                <label
                  key={key}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${
                    val
                      ? 'bg-blue-600/10 border-blue-500/40 text-blue-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={val}
                    onChange={(e) => setActions({ ...actions, [key]: e.target.checked })}
                    className="rounded border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span className="capitalize font-medium">{key.replace(/([A-Z])/g, ' $1')}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Guardrails and Safety Rules */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-rose-400" />
              <span>Safety Guardrails & Escalation Rules</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div>
                  <div className="font-semibold text-slate-200">Refund &gt; Amount requires human supervisor approval</div>
                  <div className="text-[11px] text-slate-500">Autonomous refunds above this threshold are blocked and escalated.</div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">$</span>
                  <input
                    type="number"
                    value={refundLimit}
                    onChange={(e) => setRefundLimit(e.target.value)}
                    className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 text-right focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div>
                  <div className="font-semibold text-slate-200">Angry / Frustrated Sentiment Escalation</div>
                  <div className="text-[11px] text-slate-500">Instantly transfer customer to live human agent when sentiment is negative.</div>
                </div>
                <input
                  type="checkbox"
                  checked={guardrails.escalateAngry}
                  onChange={(e) => setGuardrails({ ...guardrails, escalateAngry: e.target.checked })}
                  className="rounded border-slate-700 text-purple-600 focus:ring-0 w-4 h-4"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div>
                  <div className="font-semibold text-slate-200">Enterprise VIP Priority Queue Auto-Route</div>
                  <div className="text-[11px] text-slate-500">VIP customers bypass bot triage directly to dedicated account lead.</div>
                </div>
                <input
                  type="checkbox"
                  checked={guardrails.vipPriorityQueue}
                  onChange={(e) => setGuardrails({ ...guardrails, vipPriorityQueue: e.target.checked })}
                  className="rounded border-slate-700 text-purple-600 focus:ring-0 w-4 h-4"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
