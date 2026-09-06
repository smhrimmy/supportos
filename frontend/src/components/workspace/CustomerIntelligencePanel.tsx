import React, { useState } from 'react';
import { 
  Customer, 
  CustomerOrder, 
  TimelineEvent, 
  AiInsight, 
  Ticket 
} from '../../types';
import { 
  Sparkles, 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  CreditCard, 
  Package, 
  Clock, 
  ExternalLink, 
  ArrowRight, 
  Zap, 
  History, 
  AlertTriangle,
  Building,
  Mail,
  Phone,
  Check
} from 'lucide-react';

interface CustomerIntelligenceProps {
  ticket: Ticket | null;
  customer?: Customer;
  orders: CustomerOrder[];
  copilot: AiInsight | null;
  onApplyAction: (actionName: string) => void;
  onUseSuggestedReply: (reply: string) => void;
}

export const CustomerIntelligencePanel: React.FC<CustomerIntelligenceProps> = ({
  ticket,
  customer,
  orders,
  copilot,
  onApplyAction,
  onUseSuggestedReply
}) => {
  const [activeTab, setActiveTab] = useState<'COPILOT' | 'CUSTOMER_360' | 'QA_INCIDENT'>('COPILOT');
  const [actionDone, setActionDone] = useState<string | null>(null);

  if (!ticket) {
    return (
      <div className="w-96 border-l border-slate-800 bg-slate-900/40 p-6 flex flex-col items-center justify-center text-center text-slate-500">
        <Sparkles className="w-8 h-8 text-slate-700 mb-2" />
        <span className="text-xs font-semibold text-slate-400">Customer Intelligence</span>
        <span className="text-[11px] text-slate-500 mt-1">Select a ticket to activate real-time telemetry</span>
      </div>
    );
  }

  const handleActionClick = (action: string) => {
    setActionDone(action);
    onApplyAction(action);
    setTimeout(() => setActionDone(null), 3000);
  };

  return (
    <aside className="w-96 border-l border-slate-800 bg-slate-900/60 flex flex-col h-[calc(100vh-3.5rem)] select-none">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-800 bg-slate-950/40 p-1 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('COPILOT')}
          className={`flex-1 py-1.5 rounded-md flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'COPILOT'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>AI Copilot</span>
        </button>

        <button
          onClick={() => setActiveTab('CUSTOMER_360')}
          className={`flex-1 py-1.5 rounded-md flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'CUSTOMER_360'
              ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-3.5 h-3.5 text-blue-400" />
          <span>Customer 360</span>
        </button>

        <button
          onClick={() => setActiveTab('QA_INCIDENT')}
          className={`flex-1 py-1.5 rounded-md flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'QA_INCIDENT'
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>QA & Incident</span>
        </button>
      </div>

      {/* Tab Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* TAB 1: AI COPILOT */}
        {activeTab === 'COPILOT' && copilot && (
          <div className="space-y-4">
            {/* Live Telemetry Card */}
            <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-purple-300">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Real-Time Triage Telemetry</span>
                </span>
                <span className="text-[10px] font-mono bg-purple-500/30 px-2 py-0.5 rounded text-purple-200">
                  {copilot.confidence}% Confidence
                </span>
              </div>

              {/* Sentiment & Urgency Bars */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 mb-0.5">Sentiment</div>
                  <div className={`font-bold flex items-center gap-1 ${
                    copilot.sentiment === 'FRUSTRATED' || copilot.sentiment === 'ANGRY'
                      ? 'text-rose-400'
                      : 'text-emerald-400'
                  }`}>
                    {copilot.sentiment}
                  </div>
                </div>

                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 mb-0.5">Urgency Score</div>
                  <div className="font-bold text-amber-400 flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-amber-400" />
                    <span>{copilot.urgencyScore} / 100</span>
                  </div>
                </div>
              </div>

              {/* Detected Intent */}
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs">
                <div className="text-[10px] text-slate-400 font-semibold mb-0.5">Detected Intent</div>
                <div className="font-semibold text-slate-100">{copilot.intent}</div>
              </div>

              {/* Policy References */}
              {copilot.policyReferences && copilot.policyReferences.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Policy & Guardrail Validation
                  </div>
                  {copilot.policyReferences.map((policy, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300 bg-slate-900/60 p-1.5 rounded border border-slate-800">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{policy}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Permitted AI Actions */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Permitted Copilot Actions</span>
                <span className="text-[9px] text-emerald-400 font-mono">AUTHORIZED</span>
              </div>
              <div className="space-y-1.5">
                {copilot.nextBestActions && copilot.nextBestActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleActionClick(action)}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-xs font-semibold text-slate-200 flex items-center justify-between group transition-all"
                  >
                    <span className="truncate">{action}</span>
                    {actionDone === action ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Suggested Response Preview */}
            {copilot.suggestedReply && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>AI Recommended Draft</span>
                  </span>
                  <button
                    onClick={() => onUseSuggestedReply(copilot.suggestedReply)}
                    className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Apply to Composer →
                  </button>
                </div>
                <p className="text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed max-h-36 overflow-y-auto whitespace-pre-wrap">
                  {copilot.suggestedReply}
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CUSTOMER 360 */}
        {activeTab === 'CUSTOMER_360' && (
          <div className="space-y-4">
            {customer ? (
              <>
                {/* Profile Card */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-sm flex items-center justify-center">
                        {customer.fullName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>{customer.fullName}</span>
                          <span className="text-[9px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded">
                            {customer.tier}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          <span>{customer.company || 'Enterprise Account'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Health Score & Lifetime Value */}
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-800">
                    <div className="bg-slate-950/60 p-2 rounded border border-slate-800/80">
                      <div className="text-[10px] text-slate-400">Customer Health</div>
                      <div className="text-sm font-extrabold text-emerald-400">
                        {customer.healthScore}% [Optimal]
                      </div>
                    </div>

                    <div className="bg-slate-950/60 p-2 rounded border border-slate-800/80">
                      <div className="text-[10px] text-slate-400">Lifetime Value</div>
                      <div className="text-sm font-extrabold text-blue-400">
                        ${customer.lifetimeValue.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="space-y-1 text-[11px] text-slate-300 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{customer.email}</span>
                    </div>
                    {customer.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{customer.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Orders & Subscriptions */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Recent Orders & Invoices</span>
                    <span className="text-[10px] text-slate-500 font-mono">{orders.length} records</span>
                  </div>

                  <div className="space-y-2">
                    {orders.map((ord) => (
                      <div key={ord.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-slate-200">#{ord.orderNumber}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                            ord.status === 'PAID'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : ord.status === 'PENDING_REVERSAL'
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-blue-500/20 text-blue-300'
                          }`}>
                            {ord.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 leading-tight">{ord.itemSummary}</div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/40">
                          <span className="font-bold text-slate-200">${ord.amount.toFixed(2)}</span>
                          {ord.trackingNumber && (
                            <span className="font-mono text-blue-400">Ref: {ord.trackingNumber}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="p-4 text-center text-xs text-slate-500">
                No customer profile linked to this ticket.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: QA & INCIDENT */}
        {activeTab === 'QA_INCIDENT' && (
          <div className="space-y-4">
            {/* Conversation QA Card */}
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Automated AI Quality Assurance</span>
                </span>
                <span className="text-sm font-extrabold text-emerald-400">
                  92 / 100
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Company Policy Followed</span>
                  </span>
                  <span className="font-bold text-emerald-400 text-[11px]">100%</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Correct Info Provided</span>
                  </span>
                  <span className="font-bold text-emerald-400 text-[11px]">100%</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>AI Hallucination Risk</span>
                  </span>
                  <span className="font-bold text-blue-400 text-[11px]">LOW (0.02%)</span>
                </div>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                <span className="font-bold text-slate-200">Coach Note: </span>
                Agent quickly recognized the duplicate billing anomaly and applied instant reversal under Policy #REF-202.
              </div>
            </div>

            {/* Product Incident Detector Card */}
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Product Incident Detector</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                SupportOS detected a <span className="text-amber-300 font-bold">+312% spike</span> in session crashes for Android 16 users across 14 tickets in the last hour.
              </p>
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => alert("Bridged to Engineering: Incident #INC-402 created in GitHub / Jira and Status Page updated.")}
                  className="bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg transition-all active:scale-95"
                >
                  Create Engineering Incident
                </button>
                <span className="text-[10px] text-slate-400 font-mono">Confidence: 97%</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </aside>
  );
};
