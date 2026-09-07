import React, { useState } from 'react';
import { 
  Settings, 
  Tag, 
  ShieldCheck, 
  Phone, 
  GitBranch, 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Sliders, 
  Clock, 
  DollarSign, 
  Users, 
  Radio, 
  AlertTriangle,
  Lock,
  RefreshCw,
  Save,
  Layers
} from 'lucide-react';
import { useAdminStore } from '../../services/useAdminStore';
import { CustomerTier, VerificationStatus } from '../../types';

export const AdminControlCenterView: React.FC = () => {
  const {
    dispositions,
    tierPolicies,
    queues,
    telephony,
    aiGuardrails,
    addDisposition,
    updateDisposition,
    deleteDisposition,
    toggleDispositionActive,
    updateTierPolicy,
    updateQueue,
    updateTelephony,
    updateAiGuardrails,
  } = useAdminStore();

  const [activeTab, setActiveTab] = useState<'DISPOSITIONS' | 'TIERS' | 'GENESYS_QUEUES' | 'TELEPHONY' | 'AI_GUARDRAILS'>('DISPOSITIONS');
  const [showAddDispModal, setShowAddDispModal] = useState(false);
  const [savedBanner, setSavedBanner] = useState(false);

  // New disposition form state
  const [newCode, setNewCode] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTiers, setNewTiers] = useState<CustomerTier[]>(['ENTERPRISE', 'PRO']);
  const [newReqNote, setNewReqNote] = useState(true);
  const [newTriggerTicket, setNewTriggerTicket] = useState(false);

  const handleSaveNotification = () => {
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  const handleCreateDisposition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newLabel.trim()) return;

    addDisposition({
      code: newCode.toUpperCase().replace(/\s+/g, '_'),
      label: newLabel.trim(),
      description: newDesc.trim() || 'Custom customer service disposition',
      allowedCustomerTiers: newTiers,
      requiresMandatoryNote: newReqNote,
      triggerFollowUpTicket: newTriggerTicket,
      isActive: true,
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    });

    setNewCode('');
    setNewLabel('');
    setNewDesc('');
    setShowAddDispModal(false);
    handleSaveNotification();
  };

  const toggleTierInNew = (tier: CustomerTier) => {
    if (newTiers.includes(tier)) {
      setNewTiers(newTiers.filter((t) => t !== tier));
    } else {
      setNewTiers([...newTiers, tier]);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-[#FAF9FD] overflow-y-auto">
      {/* Top Banner */}
      <div className="p-6 border-b border-slate-200/90 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200/80 text-purple-700">
            <Settings className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                Enterprise Admin & Genesys Contact Center Control
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-mono font-bold border border-purple-200">
                TENANT: ACME_GLOBAL
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Customize customer support experience, wrap-up categories per tier, ACD queue routing, and softphone policies.
            </p>
          </div>
        </div>

        {savedBanner && (
          <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in shadow-sm">
            <Check className="w-4 h-4 text-emerald-600" /> Policies updated & hot-reloaded across active agents!
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200/90 px-6 bg-white gap-1">
        {[
          { key: 'DISPOSITIONS', label: 'Wrap-Up & Dispositions', icon: <Tag className="w-4 h-4" /> },
          { key: 'TIERS', label: 'Customer Tier Policies', icon: <ShieldCheck className="w-4 h-4" /> },
          { key: 'GENESYS_QUEUES', label: 'Genesys ACD Queues', icon: <GitBranch className="w-4 h-4" /> },
          { key: 'TELEPHONY', label: 'Voice & Softphone (Genesys)', icon: <Phone className="w-4 h-4" /> },
          { key: 'AI_GUARDRAILS', label: 'AI Guardrails & Pega CDH', icon: <Sparkles className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === tab.key
                ? 'border-purple-600 text-purple-700 bg-purple-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="p-6 flex-1 space-y-6 max-w-6xl">
        {/* TAB 1: WRAP-UP & DISPOSITIONS */}
        {activeTab === 'DISPOSITIONS' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Custom Wrap-Up Categories by Customer Tier
                </h3>
                <p className="text-xs text-slate-500">
                  Configure which resolution disposition codes are available to agents based on the customer's account level.
                </p>
              </div>
              <button
                onClick={() => setShowAddDispModal(true)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" /> Add Custom Wrap Category
              </button>
            </div>

            {/* After-Call Work (ACW) Timer Setting */}
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  Genesys After-Call Work (ACW) Auto-Wrap Timer
                </span>
                <p className="text-[11px] text-slate-500">
                  Countdown duration before the wrap-up dialog automatically saves and frees agent capacity.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={15}
                  max={120}
                  step={5}
                  value={telephony.acwDurationSeconds}
                  onChange={(e) => {
                    updateTelephony({ acwDurationSeconds: Number(e.target.value) });
                    handleSaveNotification();
                  }}
                  className="w-36 accent-purple-600 cursor-pointer"
                />
                <span className="text-xs font-mono font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-lg border border-purple-200">
                  {telephony.acwDurationSeconds}s
                </span>
              </div>
            </div>

            {/* Disposition Table */}
            <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                  <tr>
                    <th className="py-3 px-4">Code & Label</th>
                    <th className="py-3 px-4">Customer Tier Eligibility</th>
                    <th className="py-3 px-4">Mandatory Note</th>
                    <th className="py-3 px-4">Follow-Up Action</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dispositions.map((disp) => (
                    <tr key={disp.id} className="hover:bg-purple-50/20 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{disp.label}</div>
                        <div className="font-mono text-[10px] text-purple-700 font-bold">{disp.code}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{disp.description}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {disp.allowedCustomerTiers.map((t) => (
                            <span
                              key={t}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                t === 'ENTERPRISE'
                                  ? 'bg-purple-100 text-purple-800 border-purple-200'
                                  : t === 'PRO'
                                  ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
                                  : 'bg-slate-100 text-slate-700 border-slate-200'
                              }`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                            disp.requiresMandatoryNote
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {disp.requiresMandatoryNote ? 'Required' : 'Optional'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                            disp.triggerFollowUpTicket
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {disp.triggerFollowUpTicket ? 'Auto-Create Task' : 'None'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => {
                            toggleDispositionActive(disp.id);
                            handleSaveNotification();
                          }}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors border ${
                            disp.isActive
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          {disp.isActive ? 'ACTIVE' : 'DISABLED'}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            deleteDisposition(disp.id);
                            handleSaveNotification();
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOMER TIER POLICIES */}
        {activeTab === 'TIERS' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Customer Support Experience & SLA Policy Matrix
              </h3>
              <p className="text-xs text-slate-500">
                Define the autonomy boundaries, verification requirements, and response times for each customer tier.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tierPolicies.map((tp) => (
                <div
                  key={tp.tier}
                  className={`p-5 rounded-2xl border space-y-4 shadow-sm ${
                    tp.tier === 'ENTERPRISE'
                      ? 'bg-gradient-to-br from-purple-50/80 via-indigo-50/40 to-white border-purple-200'
                      : tp.tier === 'PRO'
                      ? 'bg-gradient-to-br from-indigo-50/70 to-white border-indigo-200'
                      : 'bg-white border-slate-200/90'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        tp.tier === 'ENTERPRISE'
                          ? 'bg-purple-100 text-purple-800 border-purple-200'
                          : tp.tier === 'PRO'
                          ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {tp.tier} TIER
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold">
                      SLA: {tp.slaTargetMinutes < 60 ? `${tp.slaTargetMinutes}m` : `${tp.slaTargetMinutes / 60}h`} Target
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    {/* Max Refund */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-sm">
                      <span className="text-slate-600 font-medium">Autonomous Refund Ceiling:</span>
                      <div className="flex items-center gap-1.5 font-bold text-emerald-700 font-mono">
                        <DollarSign className="w-3.5 h-3.5" />
                        <input
                          type="number"
                          value={tp.maxAutonomousRefund}
                          onChange={(e) => {
                            updateTierPolicy(tp.tier, { maxAutonomousRefund: Number(e.target.value) });
                            handleSaveNotification();
                          }}
                          className="w-20 bg-slate-50 border border-slate-200 px-2 py-1 rounded text-right text-slate-900 font-bold focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    {/* Minimum Verification Level */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-sm">
                      <span className="text-slate-600 font-medium">Required Identity Assurance:</span>
                      <select
                        value={tp.minAssuranceRequired}
                        onChange={(e) => {
                          updateTierPolicy(tp.tier, { minAssuranceRequired: e.target.value as VerificationStatus });
                          handleSaveNotification();
                        }}
                        className="bg-slate-50 border border-slate-200 px-2 py-1 rounded font-bold text-purple-800 text-xs focus:outline-none focus:border-purple-500"
                      >
                        <option value="FULLY_AUTHENTICATED">FULLY AUTHENTICATED (100%)</option>
                        <option value="PARTIALLY_VERIFIED">PARTIALLY VERIFIED (65%)</option>
                        <option value="UNVERIFIED">BASIC EMAIL (25%)</option>
                      </select>
                    </div>

                    {/* RMA Fast-Track Toggle */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-sm">
                      <span className="text-slate-600 font-medium">Fast-Track Hardware RMA:</span>
                      <button
                        onClick={() => {
                          updateTierPolicy(tp.tier, { rmaFastTrack: !tp.rmaFastTrack });
                          handleSaveNotification();
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                          tp.rmaFastTrack
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}
                      >
                        {tp.rmaFastTrack ? '✓ Auto-Courier Dispatch' : 'Standard Return'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: GENESYS ACD & ROUTING QUEUES */}
        {activeTab === 'GENESYS_QUEUES' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Genesys Automated Call Distribution (ACD) & Routing Queues
              </h3>
              <p className="text-xs text-slate-500">
                Configure skill-based queue dispatching and dynamic priority scoring algorithms.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-purple-900">
                <GitBranch className="w-4 h-4 text-purple-600" />
                <span>Genesys Predictive Priority Formula:</span>
              </div>
              <p className="font-mono text-purple-900 bg-white p-2.5 rounded-lg border border-purple-100 shadow-sm font-semibold">
                Queue Priority = Base + (Customer_LTV × Ltv_Multiplier) + (Wait_Time_Seconds × 1.2)
              </p>
            </div>

            <div className="space-y-4">
              {queues.map((q) => (
                <div key={q.id} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        {q.name}
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono border border-slate-200 font-semibold">
                          {q.channel}
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Fallback Overflow: <strong className="text-slate-800">{q.overflowQueueName}</strong>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-bold">
                        {q.activeAgentsCount} Agents Online
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs pt-1">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-600 font-medium block mb-1">Base Priority Weight:</span>
                      <input
                        type="number"
                        value={q.basePriority}
                        onChange={(e) => {
                          updateQueue(q.id, { basePriority: Number(e.target.value) });
                          handleSaveNotification();
                        }}
                        className="w-full bg-white border border-slate-200 px-2.5 py-1 rounded text-slate-900 font-mono focus:border-purple-500"
                      />
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-600 font-medium block mb-1">Max SLA Wait (Sec):</span>
                      <input
                        type="number"
                        value={q.maxWaitSeconds}
                        onChange={(e) => {
                          updateQueue(q.id, { maxWaitSeconds: Number(e.target.value) });
                          handleSaveNotification();
                        }}
                        className="w-full bg-white border border-slate-200 px-2.5 py-1 rounded text-slate-900 font-mono focus:border-purple-500"
                      />
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-600 font-medium block mb-1">Required Skills:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {q.skillRequirements.map((sk, idx) => (
                          <span key={idx} className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] text-slate-700 font-semibold shadow-sm">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TELEPHONY & SOFTPHONE (GENESYS CLOUD) */}
        {activeTab === 'TELEPHONY' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Genesys Telephony & Interaction Recording Policies
              </h3>
              <p className="text-xs text-slate-500">
                Configure audio recording, compliance pause, IVR prompts, and transcription models.
              </p>
            </div>

            <div className="space-y-4">
              {/* Dual Channel Recording */}
              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Dual-Channel Stereo Recording</div>
                  <p className="text-[11px] text-slate-500">Separates customer audio (Left) from agent audio (Right) for high-accuracy AI auditing.</p>
                </div>
                <button
                  onClick={() => {
                    updateTelephony({ dualChannelRecording: !telephony.dualChannelRecording });
                    handleSaveNotification();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                    telephony.dualChannelRecording
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}
                >
                  {telephony.dualChannelRecording ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>

              {/* PCI Compliance Auto-Mute */}
              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-rose-600" />
                    PCI-DSS Automatic Credit Card Audio Masking
                  </div>
                  <p className="text-[11px] text-slate-500">Automatically suppresses and redacts payment card digits from live recordings and transcripts.</p>
                </div>
                <button
                  onClick={() => {
                    updateTelephony({ pciComplianceMute: !telephony.pciComplianceMute });
                    handleSaveNotification();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                    telephony.pciComplianceMute
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}
                >
                  {telephony.pciComplianceMute ? 'ENFORCED' : 'OFF'}
                </button>
              </div>

              {/* Custom IVR Greeting Prompt */}
              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm space-y-2">
                <label className="text-xs font-bold text-slate-900 block">
                  Adaptive IVR Greeting Prompt:
                </label>
                <textarea
                  rows={2}
                  value={telephony.ivrGreetingPrompt}
                  onChange={(e) => {
                    updateTelephony({ ivrGreetingPrompt: e.target.value });
                    handleSaveNotification();
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                />
                <span className="text-[11px] text-slate-500">
                  Dynamic placeholders: <code className="text-purple-700 font-bold">{`{customer_name}`}</code>, <code className="text-purple-700 font-bold">{`{ticket_number}`}</code>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: AI GUARDRAILS & PEGA CDH */}
        {activeTab === 'AI_GUARDRAILS' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                AI Copilot Guardrails & Pega CDH Arbitration Tuning
              </h3>
              <p className="text-xs text-slate-500">
                Tune Google Gemini autonomous resolution limits, maximum allowable concessions, and human escalation thresholds.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-900 block">AI Autonomous Containment Target:</span>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={20}
                    max={95}
                    value={aiGuardrails.containmentRateTarget}
                    onChange={(e) => {
                      updateAiGuardrails({ containmentRateTarget: Number(e.target.value) });
                      handleSaveNotification();
                    }}
                    className="flex-1 accent-purple-600 cursor-pointer"
                  />
                  <span className="font-mono text-purple-800 text-xs font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    {aiGuardrails.containmentRateTarget}%
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-900 block">Require Human Approval Above ($):</span>
                <input
                  type="number"
                  value={aiGuardrails.requireHumanAboveDollar}
                  onChange={(e) => {
                    updateAiGuardrails({ requireHumanAboveDollar: Number(e.target.value) });
                    handleSaveNotification();
                  }}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs text-slate-900 font-mono font-bold focus:bg-white focus:border-purple-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Custom Disposition Modal */}
      {showAddDispModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white border border-slate-200/90 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-purple-600" /> Add Custom Wrap-Up Category
              </h3>
              <button onClick={() => setShowAddDispModal(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDisposition} className="p-6 space-y-4 text-xs">
              <div>
                <label className="text-slate-700 block mb-1 font-semibold">Category Label:</label>
                <input
                  type="text"
                  required
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="e.g. VIP Concession Applied"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-slate-700 block mb-1 font-semibold">System Code Identifier:</label>
                <input
                  type="text"
                  required
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="e.g. VIP_CONCESSION_GRANTED"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-mono text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-slate-700 block mb-1 font-semibold">Description:</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Explain when agents or AI should select this disposition..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-slate-700 block mb-1 font-semibold">Customer Tiers Eligible:</label>
                <div className="flex gap-2">
                  {(['ENTERPRISE', 'PRO', 'STANDARD', 'FREE'] as CustomerTier[]).map((tier) => (
                    <button
                      type="button"
                      key={tier}
                      onClick={() => toggleTierInNew(tier)}
                      className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
                        newTiers.includes(tier)
                          ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newReqNote}
                    onChange={(e) => setNewReqNote(e.target.checked)}
                    className="rounded accent-purple-600"
                  />
                  <span className="text-slate-700 font-medium">Mandatory Contact Note</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newTriggerTicket}
                    onChange={(e) => setNewTriggerTicket(e.target.checked)}
                    className="rounded accent-purple-600"
                  />
                  <span className="text-slate-700 font-medium">Trigger Follow-Up Task</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddDispModal(false)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-sm"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
