import React, { useState } from 'react';
import { 
  Wrench, 
  Cpu, 
  CheckCircle2, 
  AlertOctagon, 
  RefreshCw, 
  Package, 
  Truck, 
  FileText, 
  ArrowRight, 
  X, 
  Activity, 
  Check, 
  Download,
  AlertTriangle
} from 'lucide-react';
import { DiagnosticStage, ProductDiagnosticSession } from '../../types';

interface GuidedProductFixerProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: number;
  ticketTitle: string;
  onSessionComplete?: (session: ProductDiagnosticSession) => void;
}

const INITIAL_SESSION: ProductDiagnosticSession = {
  id: 'DIAG-2026-8812',
  ticketId: 1042,
  productName: 'SupportOS Edge Router v4 Pro',
  productSku: 'RTR-EDG-400X',
  serialNumber: 'SN-9021-4821A',
  firmwareVersion: 'v4.1.2-build89',
  symptoms: ['Packet drop > 15%', 'Heartbeat timeout', 'Thermal throttling @ 78°C'],
  currentStage: 'IDENTIFICATION',
  checks: [
    {
      id: 'chk-1',
      name: 'Cloud Gateway Telemetry Ping',
      description: 'Verifies ICMP latency and round-trip handshake to edge cluster.',
      status: 'PENDING',
      telemetrySignal: 'RTT: 18ms (Normal)',
    },
    {
      id: 'chk-2',
      name: 'Memory Leak & Heap Saturation Test',
      description: 'Inspects Linux kernel slab memory buffer allocations.',
      status: 'PENDING',
      telemetrySignal: 'Heap: 94% (CRITICAL LEAK)',
      remedyAction: 'Apply hotfix patch #HOTFIX-413 or cycle buffer',
    },
    {
      id: 'chk-3',
      name: 'ASIC Thermal & Fan RPM Probe',
      description: 'Monitors hardware temperature and thermal dissipation.',
      status: 'PENDING',
      telemetrySignal: 'Fan RPM: 0 (HARDWARE FAILURE)',
      remedyAction: 'Cooling fan seized. Requires RMA hardware replacement.',
    },
  ],
  rmaDetails: {
    rmaNumber: 'RMA-7749-PACIFIC',
    returnTrackingNumber: '1Z9999999999999999',
    replacementUnitSku: 'RTR-EDG-400X-REV2',
    labelDownloadUrl: '#download-label',
    warrantyStatus: 'ACTIVE',
    courier: 'UPS Worldwide Express',
  },
};

export const GuidedProductFixer: React.FC<GuidedProductFixerProps> = ({
  isOpen,
  onClose,
  ticketId,
  ticketTitle,
  onSessionComplete,
}) => {
  const [session, setSession] = useState<ProductDiagnosticSession>({
    ...INITIAL_SESSION,
    ticketId,
  });
  const [activeStage, setActiveStage] = useState<DiagnosticStage>('IDENTIFICATION');
  const [isRunningCheck, setIsRunningCheck] = useState<string | null>(null);
  const [patchApplied, setPatchApplied] = useState(false);
  const [rmaDispatched, setRmaDispatched] = useState(false);

  if (!isOpen) return null;

  const stages: { key: DiagnosticStage; label: string; step: number }[] = [
    { key: 'IDENTIFICATION', label: '1. Identification', step: 1 },
    { key: 'DIAGNOSTICS', label: '2. Diagnostic Probe', step: 2 },
    { key: 'RESOLUTION', label: '3. Resolution & RMA', step: 3 },
    { key: 'VERIFICATION', label: '4. Sign-Off & Verification', step: 4 },
  ];

  const handleRunCheck = (checkId: string) => {
    setIsRunningCheck(checkId);
    setTimeout(() => {
      setSession((prev) => ({
        ...prev,
        checks: prev.checks.map((c) => {
          if (c.id === checkId) {
            return {
              ...c,
              status: c.id === 'chk-1' ? 'PASS' : 'FAIL',
            };
          }
          return c;
        }),
      }));
      setIsRunningCheck(null);
    }, 1200);
  };

  const handleRunAllChecks = () => {
    session.checks.forEach((c, idx) => {
      setTimeout(() => {
        handleRunCheck(c.id);
      }, idx * 600);
    });
  };

  const handleApplyHotfix = () => {
    setPatchApplied(true);
  };

  const handleDispatchRma = () => {
    setRmaDispatched(true);
    setSession((prev) => ({
      ...prev,
      resolutionType: 'HARDWARE_RMA',
    }));
  };

  const handleCompleteFlow = () => {
    onSessionComplete?.(session);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                Pega Guided Service Flow & Product Fixer
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                  Case Lifecycle (CLM)
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Diagnostic & automated resolution wizard for Ticket #{ticketId}: {ticketTitle}
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

        {/* Stage Progress Tracker */}
        <div className="px-6 py-3 bg-slate-950/40 border-b border-slate-800">
          <div className="grid grid-cols-4 gap-2">
            {stages.map((st) => {
              const isActive = activeStage === st.key;
              const isPast =
                (st.key === 'IDENTIFICATION' && activeStage !== 'IDENTIFICATION') ||
                (st.key === 'DIAGNOSTICS' && (activeStage === 'RESOLUTION' || activeStage === 'VERIFICATION')) ||
                (st.key === 'RESOLUTION' && activeStage === 'VERIFICATION');

              return (
                <button
                  key={st.key}
                  onClick={() => setActiveStage(st.key)}
                  className={`px-3 py-2 rounded-xl text-left border transition-all ${
                    isActive
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-sm'
                      : isPast
                      ? 'bg-emerald-500/5 border-emerald-500/30 text-emerald-400'
                      : 'bg-slate-800/40 border-slate-800 text-slate-500 hover:text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">{st.label}</span>
                    {isPast && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Stage 1: Identification */}
          {activeStage === 'IDENTIFICATION' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1 font-semibold">
                    Product Model / SKU
                  </label>
                  <div className="flex items-center gap-2 text-sm text-white font-medium">
                    <Cpu className="w-4 h-4 text-indigo-400" />
                    {session.productName}
                  </div>
                  <span className="text-xs font-mono text-slate-400">SKU: {session.productSku}</span>
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1 font-semibold">
                    Hardware Serial Number
                  </label>
                  <div className="text-sm font-mono text-white bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700 w-fit">
                    {session.serialNumber}
                  </div>
                  <span className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" /> Active Warranty Coverage (Valid until Nov 2027)
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Observed Telemetry Symptoms:
                </label>
                <div className="flex flex-wrap gap-2">
                  {session.symptoms.map((sym, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-1.5"
                    >
                      <AlertOctagon className="w-3.5 h-3.5" />
                      {sym}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs flex items-center justify-between">
                <div>
                  <p className="font-semibold">Pega Device Fingerprinting Match</p>
                  <p className="text-indigo-300/80">
                    Firmware {session.firmwareVersion} matched known bug alert #CVE-2026-912.
                  </p>
                </div>
                <button
                  onClick={() => setActiveStage('DIAGNOSTICS')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 transition-colors"
                >
                  Proceed to Diagnostic Probe <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Stage 2: Diagnostics */}
          {activeStage === 'DIAGNOSTICS' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Execute automated telemetry probes against the customer's live device:
                </p>
                <button
                  onClick={handleRunAllChecks}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-indigo-400" /> Run All Diagnostic Probes
                </button>
              </div>

              <div className="space-y-3">
                {session.checks.map((chk) => {
                  const isRunning = isRunningCheck === chk.id;
                  return (
                    <div
                      key={chk.id}
                      className={`p-4 rounded-xl border transition-all ${
                        chk.status === 'PASS'
                          ? 'bg-emerald-500/10 border-emerald-500/30'
                          : chk.status === 'FAIL'
                          ? 'bg-rose-500/10 border-rose-500/30'
                          : 'bg-slate-800/40 border-slate-700/60'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white">{chk.name}</span>
                            {chk.status === 'PASS' && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                                PASS
                              </span>
                            )}
                            {chk.status === 'FAIL' && (
                              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                                HARDWARE FAILURE
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400">{chk.description}</p>
                          {chk.telemetrySignal && (
                            <p className="text-xs font-mono text-slate-300 bg-slate-900/60 px-2.5 py-1 rounded border border-slate-800 w-fit mt-1">
                              Signal: {chk.telemetrySignal}
                            </p>
                          )}
                          {chk.remedyAction && (
                            <p className="text-xs text-amber-300 flex items-center gap-1 mt-1">
                              <AlertTriangle className="w-3.5 h-3.5" /> Remedy: {chk.remedyAction}
                            </p>
                          )}
                        </div>

                        <button
                          disabled={isRunning}
                          onClick={() => handleRunCheck(chk.id)}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          {isRunning ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Activity className="w-3.5 h-3.5" />
                          )}
                          {isRunning ? 'Probing...' : 'Probe Device'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveStage('RESOLUTION')}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  Proceed to Resolution Actions <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Stage 3: Resolution & RMA */}
          {activeStage === 'RESOLUTION' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Diagnostic telemetry confirmed a critical hardware failure (Fan RPM = 0) and memory leak. Choose a resolution workflow:
              </p>

              {/* Action 1: OTA Firmware Hotfix */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-semibold text-white">Push Remote OTA Patch (v4.1.3-rc)</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Cycles kernel heap and flushes memory buffer without rebooting device.
                  </p>
                </div>
                <button
                  onClick={handleApplyHotfix}
                  disabled={patchApplied}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    patchApplied
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-sky-600 hover:bg-sky-500 text-white'
                  }`}
                >
                  {patchApplied ? '✓ Patch Dispatched' : 'Deploy OTA Patch'}
                </button>
              </div>

              {/* Action 2: 1-Click Pega Hardware RMA Dispatch */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Pega 1-Click Hardware RMA Replacement</h4>
                      <p className="text-xs text-amber-300/80">
                        Qualifies for immediate warranty hardware swap (Priority Tier: Platinum VIP).
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleDispatchRma}
                    disabled={rmaDispatched}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      rmaDispatched
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/30'
                    }`}
                  >
                    {rmaDispatched ? '✓ RMA Order Created' : 'Generate RMA & Dispatch Unit'}
                  </button>
                </div>

                {rmaDispatched && session.rmaDetails && (
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 animate-in fade-in duration-300">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block">RMA Reference Number:</span>
                        <span className="font-mono text-amber-300 font-bold">{session.rmaDetails.rmaNumber}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Replacement Unit SKU:</span>
                        <span className="font-mono text-white">{session.rmaDetails.replacementUnitSku}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Prepaid Return Courier:</span>
                        <span className="text-white flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-indigo-400" /> {session.rmaDetails.courier}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Tracking Number:</span>
                        <span className="font-mono text-slate-200">{session.rmaDetails.returnTrackingNumber}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Return shipping label emailed to customer.
                      </span>
                      <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5">
                        <Download className="w-3.5 h-3.5" /> Download Return Label PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveStage('VERIFICATION')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  Proceed to Final Sign-Off <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Stage 4: Verification & Sign-off */}
          {activeStage === 'VERIFICATION' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5" /> Case Lifecycle Resolution Summary
                </div>
                <p className="text-xs text-slate-300">
                  All diagnostic stages completed. RMA #{session.rmaDetails?.rmaNumber} dispatched and OTA hotfix queued. Telemetry signals have been stabilized.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2 text-xs">
                <span className="font-semibold text-slate-200 uppercase tracking-wider block">
                  Audit Checklist:
                </span>
                <div className="space-y-1.5 text-slate-300">
                  <p className="flex items-center gap-2 text-emerald-400">
                    <Check className="w-3.5 h-3.5" /> Hardware warranty coverage verified.
                  </p>
                  <p className="flex items-center gap-2 text-emerald-400">
                    <Check className="w-3.5 h-3.5" /> Telemetry error 0x882A logged to ServiceNow incident queue.
                  </p>
                  <p className="flex items-center gap-2 text-emerald-400">
                    <Check className="w-3.5 h-3.5" /> Prepaid courier shipping label generated.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">Session ID: {session.id}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCompleteFlow}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all"
            >
              Save Resolution to Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
