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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200/90 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200/80 text-purple-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Pega Customer Verification Framework
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-mono font-semibold border border-purple-200">
                  ISO-27001
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Authenticate {customerName} ({customerEmail}) to unlock restricted actions.
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

        {/* Assurance Level Banner */}
        <div className="px-6 py-3 bg-purple-50/40 border-b border-purple-100/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-600 font-medium">Identity Assurance:</span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                verification.status === 'FULLY_AUTHENTICATED'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : verification.status === 'PARTIALLY_VERIFIED'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
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
            <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  verification.assuranceScore >= 100
                    ? 'bg-emerald-500'
                    : verification.assuranceScore >= 50
                    ? 'bg-purple-600'
                    : 'bg-amber-500'
                }`}
                style={{ width: `${verification.assuranceScore}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-slate-700">{verification.assuranceScore}%</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200/80 px-6 pt-2 bg-slate-50/50 gap-2">
          <button
            onClick={() => setActiveTab('KBA')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'KBA'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            Knowledge-Based (KBA)
          </button>
          <button
            onClick={() => setActiveTab('OTP')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'OTP'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            One-Time Passcode (OTP)
          </button>
          <button
            onClick={() => setActiveTab('REF_ID')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'REF_ID'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
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
              <p className="text-xs text-slate-600 mb-2">
                Ask the customer at least 2 security verification questions to establish elevated identity:
              </p>
              {kbaState.map((q) => (
                <div
                  key={q.id}
                  onClick={() => handleKbaToggle(q.id)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    q.isVerified
                      ? 'bg-emerald-50/70 border-emerald-200 text-slate-900 shadow-sm'
                      : 'bg-white border-slate-200/90 hover:border-purple-200 hover:bg-purple-50/30 text-slate-700 shadow-sm'
                  }`}
                >
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-900">{q.question}</p>
                    <p className="text-xs font-mono text-slate-500">Answer: {q.maskedAnswer}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      q.isVerified
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 text-transparent'
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
              <p className="text-xs text-slate-600">
                Dispatch a cryptographically signed 6-digit challenge code to customer's registered phone ending in{' '}
                <span className="text-slate-900 font-mono font-bold">+1 (***) ***-9281</span>.
              </p>
              {!otpSent ? (
                <button
                  onClick={handleSendOtp}
                  className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
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
                      className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-center font-mono text-sm text-slate-900 tracking-widest focus:outline-none focus:border-purple-500 focus:bg-white"
                    />
                    <button
                      onClick={handleVerifyOtp}
                      className="py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors shadow-sm"
                    >
                      Validate
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <RefreshCw className="w-3 h-3 text-purple-600" />
                    Code sent 12s ago. Hint for demo: type <span className="font-mono text-purple-700 font-bold">849201</span>
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'REF_ID' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Validate an enterprise authorization token or reference identifier provided via SSO, IVR, or verified customer portal:
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={refIdInput}
                  onChange={(e) => setRefIdInput(e.target.value)}
                  placeholder="e.g. AUTH-REF-8841-VIP"
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-mono text-xs text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white"
                />
                <button
                  onClick={handleRefIdVerify}
                  className="py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  Verify RefID
                </button>
              </div>
              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-purple-600" />
                Active RefID session bound to JWT session signature #SIG-9921-X.
              </div>
            </div>
          )}

          {/* Unlocked Capabilities Summary */}
          <div className="mt-5 pt-4 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
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
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-medium'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  {perm.enabled ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <AlertTriangle className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{perm.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50/80 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            RefID: {verification.authRefId || 'AUTH-REF-8841-VIP'}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
