import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Key, Smartphone, Lock, CheckCircle2, AlertTriangle, X, RefreshCw } from 'lucide-react';
import { CustomerVerification } from '../../types';

interface CustomerVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
  customerEmail: string;
  verification: CustomerVerification;
  onVerificationUpdate: (updated: CustomerVerification) => void;
}

export const CustomerVerificationModal: React.FC<CustomerVerificationModalProps> = ({
  isOpen,
  onClose,
  customerName,
  customerEmail,
  verification,
  onVerificationUpdate,
}) => {
  const [activeTab, setActiveTab] = useState<'KBA' | 'OTP' | 'REF_ID'>('KBA');
  const [refIdInput, setRefIdInput] = useState(verification.authRefId || 'AUTH-REF-8841-VIP');
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(verification.otpSent);
  const [kbaState, setKbaState] = useState(verification.kbaQuestions);

  if (!isOpen) return null;

  const handleKbaToggle = (id: string) => {
    const updatedKba = kbaState.map((q) => (q.id === id ? { ...q, isVerified: !q.isVerified } : q));
    setKbaState(updatedKba);

    const verifiedCount = updatedKba.filter((q) => q.isVerified).length;
    let newStatus = verification.status;
    let assuranceScore = 25;

    if (verifiedCount >= 3) {
      newStatus = 'FULLY_AUTHENTICATED';
      assuranceScore = 100;
    } else if (verifiedCount >= 1) {
      newStatus = 'PARTIALLY_VERIFIED';
      assuranceScore = 65;
    }

    onVerificationUpdate({
      ...verification,
      status: newStatus,
      assuranceScore,
      kbaQuestions: updatedKba,
      allowedActions:
        newStatus === 'FULLY_AUTHENTICATED'
          ? ['ISSUE_REFUND', 'DISPATCH_RMA', 'RESET_SECURITY_TOKEN', 'MODIFY_SUBSCRIPTION']
          : ['VIEW_PUBLIC_ORDERS'],
      verifiedAt: new Date().toISOString(),
      verifiedBy: 'Elena Rostova (Agent)',
    });
  };

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (otpInput.length === 6 || otpInput === '849201') {
      onVerificationUpdate({
        ...verification,
        status: 'FULLY_AUTHENTICATED',
        assuranceScore: 100,
        otpSent: true,
        otpCode: otpInput,
        allowedActions: ['ISSUE_REFUND', 'DISPATCH_RMA', 'RESET_SECURITY_TOKEN', 'MODIFY_SUBSCRIPTION'],
        verifiedAt: new Date().toISOString(),
        verifiedBy: 'Elena Rostova (Agent)',
      });
    }
  };

  const handleRefIdVerify = () => {
    if (refIdInput.trim().length > 4) {
      onVerificationUpdate({
        ...verification,
        authRefId: refIdInput,
        status: 'FULLY_AUTHENTICATED',
        assuranceScore: 100,
        allowedActions: ['ISSUE_REFUND', 'DISPATCH_RMA', 'RESET_SECURITY_TOKEN', 'MODIFY_SUBSCRIPTION'],
        verifiedAt: new Date().toISOString(),
        verifiedBy: 'Pega Direct Auth Broker',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                Pega Customer Verification Framework
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                  ISO-27001
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Authenticate {customerName} ({customerEmail}) to unlock restricted actions.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Assurance Level Banner */}
        <div className="px-6 py-3 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Identity Assurance:</span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                verification.status === 'FULLY_AUTHENTICATED'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : verification.status === 'PARTIALLY_VERIFIED'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}
            >
              {verification.status === 'FULLY_AUTHENTICATED' ? (
                <Lock className="w-3.5 h-3.5" />
              ) : (
                <ShieldAlert className="w-3.5 h-3.5" />
              )}
              {verification.status.replace('_', ' ')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-24 bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  verification.assuranceScore >= 100
                    ? 'bg-emerald-500'
                    : verification.assuranceScore >= 50
                    ? 'bg-sky-500'
                    : 'bg-amber-500'
                }`}
                style={{ width: `${verification.assuranceScore}%` }}
              />
            </div>
            <span className="text-xs font-mono font-medium text-slate-300">{verification.assuranceScore}%</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 px-6 pt-2 bg-slate-900">
          <button
            onClick={() => setActiveTab('KBA')}
            className={`pb-3 px-3 text-xs font-medium border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'KBA'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            Knowledge-Based (KBA)
          </button>
          <button
            onClick={() => setActiveTab('OTP')}
            className={`pb-3 px-3 text-xs font-medium border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'OTP'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            One-Time Passcode (OTP)
          </button>
          <button
            onClick={() => setActiveTab('REF_ID')}
            className={`pb-3 px-3 text-xs font-medium border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'REF_ID'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Authentication RefID
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'KBA' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400 mb-2">
                Ask the customer at least 2 security verification questions to establish elevated identity:
              </p>
              {kbaState.map((q) => (
                <div
                  key={q.id}
                  onClick={() => handleKbaToggle(q.id)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    q.isVerified
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                      : 'bg-slate-800/60 border-slate-700/70 hover:border-slate-600 text-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-200">{q.question}</p>
                    <p className="text-xs font-mono text-slate-400">Answer: {q.maskedAnswer}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      q.isVerified
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                        : 'border-slate-600 text-transparent'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'OTP' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Dispatch a cryptographically signed 6-digit challenge code to customer's registered phone ending in{' '}
                <span className="text-slate-200 font-mono">+1 (***) ***-9281</span>.
              </p>
              {!otpSent ? (
                <button
                  onClick={handleSendOtp}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
                >
                  <Smartphone className="w-4 h-4" />
                  Send Instant Verification Code
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      placeholder="Enter 6-digit OTP (demo: 849201)"
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-center font-mono text-sm text-white tracking-widest focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={handleVerifyOtp}
                      className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                    >
                      Validate
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <RefreshCw className="w-3 h-3 text-indigo-400" />
                    Code sent 12s ago. Hint for demo: type <span className="font-mono text-indigo-300">849201</span>
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'REF_ID' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Validate an enterprise authorization token or reference identifier provided via SSO, IVR, or verified customer portal:
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={refIdInput}
                  onChange={(e) => setRefIdInput(e.target.value)}
                  placeholder="e.g. AUTH-REF-8841-VIP"
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 font-mono text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleRefIdVerify}
                  className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
                >
                  Verify RefID
                </button>
              </div>
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                Active RefID session bound to JWT session signature #SIG-9921-X.
              </div>
            </div>
          )}

          {/* Unlocked Capabilities Summary */}
          <div className="mt-5 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Action Security Permissions:
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'Issue Payment Refund', enabled: verification.status === 'FULLY_AUTHENTICATED' },
                { name: 'Dispatch Hardware RMA', enabled: verification.status === 'FULLY_AUTHENTICATED' },
                { name: 'Reset Security Token', enabled: verification.status === 'FULLY_AUTHENTICATED' },
                { name: 'View Past Invoices', enabled: true },
              ].map((perm, idx) => (
                <div
                  key={idx}
                  className={`text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-2 border ${
                    perm.enabled
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-slate-800/40 border-slate-800 text-slate-500'
                  }`}
                >
                  {perm.enabled ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                  <span>{perm.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">
            RefID: {verification.authRefId || 'AUTH-REF-8841-VIP'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
