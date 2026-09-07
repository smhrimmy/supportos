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
  Check,
  TrendingUp,
  Award
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
  const [nbaExecuted, setNbaExecuted] = useState(false);

  if (!ticket) {
    return (
      <div className="w-96 border-l border-slate-200/90 bg-white p-6 flex flex-col items-center justify-center text-center text-slate-400">
        <Sparkles className="w-8 h-8 text-purple-300 mb-2" />
        <span className="text-xs font-semibold text-slate-700">Customer Intelligence</span>
        <span className="text-[11px] text-slate-400 mt-1">Select a ticket to activate real-time telemetry</span>
      </div>
    );
  }

  const handleActionClick = (action: string) => {
    setActionDone(action);
    onApplyAction(action);
    setTimeout(() => setActionDone(null), 3000);
  };

  const handleExecuteNba = () => {
    setNbaExecuted(true);
    onApplyAction("Pega NBA: Executed Immediate $350 Reversal + Waived Next Month Enterprise Platform Fee ($350 Concession)");
    setTimeout(() => setNbaExecuted(false), 4000);
  };

  return (
    <aside className="w-96 border-l border-slate-200/90 bg-white flex flex-col h-[calc(100vh-3.5rem)] select-none">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200/90 bg-slate-50/70 p-1.5 text-xs font-semibold gap-1">
        <button
          onClick={() => setActiveTab('COPILOT')}
          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'COPILOT'
              ? 'bg-white text-purple-700 shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-purple-200/80 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 border border-transparent'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>AI Copilot & NBA</span>
        </button>

        <button
          onClick={() => setActiveTab('CUSTOMER_360')}
          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'CUSTOMER_360'
              ? 'bg-white text-purple-700 shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-purple-200/80 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 border border-transparent'
          }`}
        >
          <User className="w-3.5 h-3.5 text-indigo-600" />
          <span>Customer 360</span>
        </button>

        <button
          onClick={() => setActiveTab('QA_INCIDENT')}
          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'QA_INCIDENT'
              ? 'bg-white text-purple-700 shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-purple-200/80 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 border border-transparent'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>QA & Incident</span>
        </button>
      </div>

      {/* Tab Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF9FD]/50">
        
        {/* TAB 1: AI COPILOT & PEGA NEXT BEST ACTION */}
        {activeTab === 'COPILOT' && copilot && (
          <div className="space-y-4">
            
            {/* PEGA CUSTOMER DECISION HUB — NEXT BEST ACTION (NBA) ARBITRATION */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-purple-50/90 via-indigo-50/50 to-white border border-purple-200/90 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-purple-900">
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span>Pega CDH Next-Best-Action</span>
                </span>
                <span className="text-[10px] font-mono bg-purple-100 text-purple-800 border border-purple-200 px-2 py-0.5 rounded font-bold">
                  Ranked Offers
                </span>
              </div>

              {/* Offer 1 (Primary - 94% Propensity) */}
              <div className="p-3 rounded-lg bg-white border border-purple-200/90 shadow-sm space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">#1 Primary NBA (94% Propensity)</span>
                  <span className="text-[10px] font-bold text-emerald-600">+$1,200 LTV Protection</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  Instant $350 Reversal + 1-Mo Loyalty Platform Credit
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Formula: <strong className="text-purple-700">LTV ($8,400)</strong> × <strong className="text-rose-600">Frustration (-0.75)</strong> = Concession eliminates churn risk on $12k renewal.
                </p>
                <div className="pt-1 flex justify-end">
                  <button
                    onClick={handleExecuteNba}
                    disabled={nbaExecuted}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-3 py-1 rounded-md text-[11px] shadow-sm transition-all disabled:opacity-50"
                  >
                    {nbaExecuted ? '✓ Executed & Logged' : 'Execute Offer 1 →'}
                  </button>
                </div>
              </div>

              {/* Offer 2 (Alternative - 88% Propensity) */}
              <div className="p-2.5 rounded-lg bg-white/90 border border-slate-200/80 space-y-1 hover:bg-white transition-colors">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-amber-800">#2 Proactive Hardware Diagnostic & RMA (88%)</span>
                  <span className="text-slate-500 font-mono">Cost: $0</span>
                </div>
                <p className="text-[10px] text-slate-600">
                  Telemetry detected cooling fan seizure on SN-9021-4821A. Pre-dispatch replacement before catastrophic outage.
                </p>
              </div>

              {/* Offer 3 (Alternative - 76% Propensity) */}
              <div className="p-2.5 rounded-lg bg-white/90 border border-slate-200/80 space-y-1 hover:bg-white transition-colors">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-indigo-800">#3 Elevate Security to VIP Managed Key (76%)</span>
                  <span className="text-slate-500 font-mono">Security</span>
                </div>
                <p className="text-[10px] text-slate-600">
                  Issue dedicated hardware security key (FIDO2) and priority routing tag for Sarah Chen.
                </p>
              </div>
            </div>

            {/* Live Telemetry Card */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Real-Time Triage Telemetry</span>
                </span>
                <span className="text-[10px] font-mono bg-purple-50 border border-purple-200/80 px-2 py-0.5 rounded text-purple-700 font-bold">
                  {copilot.confidence}% Confidence
                </span>
              </div>

              {/* Sentiment & Urgency Bars */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50/80 p-2 rounded-lg border border-slate-200/80">
                  <div className="text-[10px] text-slate-500 font-medium mb-0.5">Sentiment</div>
                  <div className={`font-bold flex items-center gap-1 ${
                    copilot.sentiment === 'FRUSTRATED' || copilot.sentiment === 'ANGRY'
                      ? 'text-rose-600'
                      : 'text-emerald-600'
                  }`}>
                    {copilot.sentiment}
                  </div>
                </div>

                <div className="bg-slate-50/80 p-2 rounded-lg border border-slate-200/80">
                  <div className="text-[10px] text-slate-500 font-medium mb-0.5">Urgency Score</div>
                  <div className="font-bold text-amber-600 flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-amber-500" />
                    <span>{copilot.urgencyScore} / 100</span>
                  </div>
                </div>
              </div>

              {/* Detected Intent */}
              <div className="bg-purple-50/40 p-2.5 rounded-lg border border-purple-100 text-xs">
                <div className="text-[10px] text-purple-900 font-bold uppercase tracking-wider mb-0.5">Detected Intent</div>
                <div className="font-semibold text-slate-800">{copilot.intent}</div>
              </div>

              {/* Policy References */}
              {copilot.policyReferences && copilot.policyReferences.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Policy & Guardrail Validation
                  </div>
                  {copilot.policyReferences.map((policy, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700 bg-emerald-50/60 p-2 rounded border border-emerald-200/80">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{policy}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Permitted AI Actions */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                <span>Permitted Copilot Actions</span>
                <span className="text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-bold font-mono">AUTHORIZED</span>
              </div>
              <div className="space-y-1.5">
                {copilot.nextBestActions && copilot.nextBestActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleActionClick(action)}
                    className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-purple-50/60 border border-slate-200/90 hover:border-purple-200 text-xs font-semibold text-slate-700 hover:text-purple-900 shadow-sm flex items-center justify-between group transition-all"
                  >
                    <span className="truncate">{action}</span>
                    {actionDone === action ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Suggested Response Preview */}
            {copilot.suggestedReply && (
              <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-200/80 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-purple-900">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>AI Recommended Draft</span>
                  </span>
                  <button
                    onClick={() => onUseSuggestedReply(copilot.suggestedReply)}
                    className="text-[10px] font-bold text-purple-700 hover:text-purple-800 transition-colors"
                  >
                    Apply to Composer →
                  </button>
                </div>
                <p className="text-[11px] text-slate-700 bg-white p-2.5 rounded-lg border border-purple-100 leading-relaxed max-h-36 overflow-y-auto whitespace-pre-wrap shadow-sm">
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
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
                        {customer.fullName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{customer.fullName}</span>
                          <span className="text-[9px] font-extrabold uppercase bg-purple-100 text-purple-800 border border-purple-200 px-1.5 py-0.2 rounded">
                            {customer.tier}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Building className="w-3 h-3 text-slate-400" />
                          <span>{customer.company || 'Enterprise Account'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Health Score & Lifetime Value */}
                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                    <div className="bg-slate-50/80 p-2 rounded-lg border border-slate-200/80">
                      <div className="text-[10px] text-slate-500 font-medium">Customer Health</div>
                      <div className="text-sm font-extrabold text-emerald-600">
                        {customer.healthScore}% [Optimal]
                      </div>
                    </div>

                    <div className="bg-slate-50/80 p-2 rounded-lg border border-slate-200/80">
                      <div className="text-[10px] text-slate-500 font-medium">Lifetime Value</div>
                      <div className="text-sm font-extrabold text-purple-700">
                        ${customer.lifetimeValue.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="space-y-1 text-[11px] text-slate-600 pt-1">
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
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span>Recent Orders & Invoices</span>
                    <span className="text-[10px] text-slate-400 font-mono">{orders.length} records</span>
                  </div>

                  <div className="space-y-2">
                    {orders.map((ord) => (
                      <div key={ord.id} className="p-2.5 rounded-lg bg-white border border-slate-200/90 shadow-sm text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-slate-800">#{ord.orderNumber}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                            ord.status === 'PAID'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : ord.status === 'PENDING_REVERSAL'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-purple-50 text-purple-700 border-purple-200'
                          }`}>
                            {ord.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600 leading-tight">{ord.itemSummary}</div>
                        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                          <span className="font-bold text-slate-900">${ord.amount.toFixed(2)}</span>
                          {ord.trackingNumber && (
                            <span className="font-mono text-purple-700">Ref: {ord.trackingNumber}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                No customer profile linked to this ticket.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: QA & INCIDENT */}
        {activeTab === 'QA_INCIDENT' && (
          <div className="space-y-4">
            {/* Conversation QA Card */}
            <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Automated AI Quality Assurance</span>
                </span>
                <span className="text-sm font-extrabold text-emerald-700">
                  92 / 100
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Company Policy Followed</span>
                  </span>
                  <span className="font-bold text-emerald-700 text-[11px]">100%</span>
                </div>

                <div className="flex items-center justify-between text-slate-700">
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Correct Info Provided</span>
                  </span>
                  <span className="font-bold text-emerald-700 text-[11px]">100%</span>
                </div>

                <div className="flex items-center justify-between text-slate-700">
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>AI Hallucination Risk</span>
                  </span>
                  <span className="font-bold text-purple-700 text-[11px]">LOW (0.02%)</span>
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-emerald-100 text-[11px] text-slate-700 leading-relaxed shadow-sm">
                <span className="font-bold text-slate-900">Coach Note: </span>
                Agent quickly recognized the duplicate billing anomaly and applied instant reversal under Policy #REF-202.
              </div>
            </div>

            {/* Product Incident Detector Card */}
            <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/80 shadow-sm space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Product Incident Detector</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                SupportOS detected a <span className="text-amber-700 font-bold">+312% spike</span> in session crashes for Android 16 users across 14 tickets in the last hour.
              </p>
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => alert("Bridged to Engineering: Incident #INC-402 created in GitHub / Jira and Status Page updated.")}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition-all active:scale-95"
                >
                  Create Engineering Incident
                </button>
                <span className="text-[10px] text-slate-500 font-mono">Confidence: 97%</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </aside>
  );
};
