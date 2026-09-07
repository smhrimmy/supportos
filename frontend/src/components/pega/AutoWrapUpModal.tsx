import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Tag, 
  Calendar, 
  X, 
  Send, 
  FileText, 
  Clock, 
  ArrowRight, 
  Pause, 
  Play 
} from 'lucide-react';
import { AutoWrapUpSummary, PegaDispositionCode, SentimentTrajectoryPoint, CustomerTier } from '../../types';
import { useAdminStore } from '../../services/useAdminStore';

interface AutoWrapUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: number;
  ticketTitle: string;
  customerName: string;
  customerTier?: CustomerTier;
  onWrapUpComplete: (summary: AutoWrapUpSummary) => void;
}

const DEFAULT_SUMMARY: AutoWrapUpSummary = {
  ticketId: 1042,
  reasonForContact: 'Customer reported duplicate charge #INV-9821 ($350.00) and reported intermittent router telemetry packet loss.',
  diagnosticStepsTaken: [
    'Verified customer identity via Pega RefID #AUTH-REF-8841-VIP (KBA + OTP).',
    'Conducted Stripe billing ledger cross-check; confirmed double debit on transaction tx_9821.',
    'Executed remote hardware diagnostics; identified cooling fan failure on router SN-9021-4821A.',
    'Cited Policy #REF-202 authorizing instantaneous fee waiver and refund reversal.',
  ],
  resolutionSummary: 'Issued full $350.00 refund to original payment method. Dispatched replacement hardware via UPS Worldwide (RMA-7749-PACIFIC). Applied 15% retention loyalty discount per Pega NBA.',
  dispositionCode: 'BILLING_RESOLVED',
  sentimentTrajectory: [
    { stage: 'OPENING', score: -0.75, label: 'Frustrated / Angry', color: 'bg-rose-500' },
    { stage: 'DISCOVERY', score: -0.15, label: 'Attentive', color: 'bg-amber-500' },
    { stage: 'RESOLUTION', score: 0.65, label: 'Reassured', color: 'bg-purple-600' },
    { stage: 'WRAP_UP', score: 0.92, label: 'Delighted / Loyal', color: 'bg-emerald-500' },
  ],
  sentimentShiftPercent: 167,
  followUpActionItems: [
    { id: 'act-1', text: 'Confirm refund reflection on Stripe statement in 48 hours.', completed: false, dueDate: 'Sep 9' },
    { id: 'act-2', text: 'Monitor UPS tracking #1Z9999999999999999 delivery of replacement unit.', completed: false, dueDate: 'Sep 10' },
    { id: 'act-3', text: 'Pega CDH automated check-in email scheduled for day 7.', completed: false, dueDate: 'Sep 14' },
  ],
  estimatedCsat: 4.9,
  autoWrapConfidence: 96,
};

export const AutoWrapUpModal: React.FC<AutoWrapUpModalProps> = ({
  isOpen,
  onClose,
  ticketId,
  ticketTitle,
  customerName,
  customerTier = 'ENTERPRISE',
  onWrapUpComplete,
}) => {
  const { getDispositionsForTier, telephony } = useAdminStore();
  const activeDispositions = getDispositionsForTier(customerTier);

  const [summary, setSummary] = useState<AutoWrapUpSummary>({
    ...DEFAULT_SUMMARY,
    ticketId,
  });
  const [selectedDisposition, setSelectedDisposition] = useState<PegaDispositionCode>(summary.dispositionCode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Genesys After-Call Work (ACW) countdown timer
  const [acwSecondsLeft, setAcwSecondsLeft] = useState(telephony.acwDurationSeconds || 45);
  const [isAcwPaused, setIsAcwPaused] = useState(false);

  useEffect(() => {
    if (!isOpen || isAcwPaused || acwSecondsLeft <= 0) return;
    const timer = setInterval(() => {
      setAcwSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, isAcwPaused, acwSecondsLeft]);

  if (!isOpen) return null;

  const handleActionToggle = (id: string) => {
    setSummary((prev) => ({
      ...prev,
      followUpActionItems: prev.followUpActionItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

  const handleFinishWrapUp = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onWrapUpComplete({
        ...summary,
        dispositionCode: selectedDisposition,
        completedAt: new Date().toISOString(),
      });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200/90 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200/80 text-purple-700">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Pega GenAI Post-Interaction Processing & Auto-Wrap
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-mono font-semibold border border-purple-200">
                  {summary.autoWrapConfidence}% Confidence
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Automated case disposition, sentiment trajectory, and executive summary for {customerName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Genesys ACW Timer Banner */}
        <div className="px-6 py-2.5 bg-purple-50/50 border-b border-purple-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-slate-700 font-medium">
              Genesys After-Call Work (ACW) Timer:
            </span>
            <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
              acwSecondsLeft < 15 ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-purple-100 text-purple-800 border border-purple-200'
            }`}>
              {acwSecondsLeft}s remaining
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAcwPaused(!isAcwPaused)}
              className="px-2.5 py-1 rounded bg-white hover:bg-slate-50 border border-slate-200 text-[11px] text-slate-700 flex items-center gap-1 shadow-sm transition-colors"
            >
              {isAcwPaused ? <Play className="w-3 h-3 text-purple-600" /> : <Pause className="w-3 h-3 text-purple-600" />}
              {isAcwPaused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={() => setAcwSecondsLeft((prev) => prev + 30)}
              className="px-2.5 py-1 rounded bg-white hover:bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-medium shadow-sm transition-colors"
            >
              +30s
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-[#FAF9FD]/40">
          {/* Sentiment Trajectory Graph */}
          <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Customer Sentiment Trajectory (Shift: +{summary.sentimentShiftPercent}%)
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Predicted CSAT: {summary.estimatedCsat} / 5.0
              </span>
            </div>

            {/* Trajectory Bar Visualizer */}
            <div className="grid grid-cols-4 gap-2 pt-2">
              {summary.sentimentTrajectory.map((pt, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">{pt.stage}</span>
                    <span
                      className={`font-bold ${
                        pt.score > 0 ? 'text-emerald-600' : pt.score < -0.3 ? 'text-rose-600' : 'text-amber-600'
                      }`}
                    >
                      {pt.score > 0 ? `+${pt.score * 100}%` : `${pt.score * 100}%`}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${pt.color} transition-all duration-500`}
                      style={{ width: `${Math.abs(pt.score) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 truncate">{pt.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Executive Summary Block */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Auto-Generated Case Summary:
            </label>
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-900 block mb-1">Reason for Contact:</span>
                <p className="text-slate-700">{summary.reasonForContact}</p>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Diagnostic Steps Executed:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  {summary.diagnosticStepsTaken.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-emerald-700 block mb-1">Resolution Achieved:</span>
                <p className="text-slate-800 font-medium">{summary.resolutionSummary}</p>
              </div>
            </div>
          </div>

          {/* Disposition Code Selector (Dynamically Filtered by Customer Tier via Admin Store) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-purple-600" /> Pega Disposition & Wrap-Up Code:
              </label>
              <span className="text-[10px] font-mono text-purple-800 bg-purple-100 px-2 py-0.5 rounded border border-purple-200 font-bold">
                Customer Tier: {customerTier}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {activeDispositions.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => setSelectedDisposition(opt.code as PegaDispositionCode)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    selectedDisposition === opt.code
                      ? 'bg-purple-50 border-purple-300 text-purple-900 shadow-sm font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-purple-200'
                  }`}
                >
                  <p className="text-xs font-semibold">{opt.label}</p>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{opt.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Follow-up Action Items */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-600" /> Auto-Generated Follow-Up Commitments:
            </label>
            <div className="space-y-2">
              {summary.followUpActionItems.map((act) => (
                <div
                  key={act.id}
                  onClick={() => handleActionToggle(act.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    act.completed
                      ? 'bg-emerald-50/70 border-emerald-200 line-through text-slate-400'
                      : 'bg-white border-slate-200/90 text-slate-800 hover:border-purple-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                        act.completed
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {act.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs font-medium">{act.text}</span>
                  </div>
                  {act.dueDate && (
                    <span className="text-[11px] font-mono text-purple-700 font-semibold bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                      Due {act.dueDate}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50/80 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-purple-600" /> Auto-Wrap processed in 180ms
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={isSubmitting}
              onClick={handleFinishWrapUp}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-bold shadow-sm flex items-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : 'Apply Wrap-Up & Resolve Ticket'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
