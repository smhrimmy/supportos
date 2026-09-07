import { create } from 'zustand';
import { 
  AdminDispositionCategory, 
  CustomerTierPolicy, 
  GenesysQueueConfig, 
  TelephonyPolicy, 
  AiGuardrailConfig, 
  CustomerTier 
} from '../types';

interface AdminStoreState {
  dispositions: AdminDispositionCategory[];
  tierPolicies: CustomerTierPolicy[];
  queues: GenesysQueueConfig[];
  telephony: TelephonyPolicy;
  aiGuardrails: AiGuardrailConfig;

  // Actions
  addDisposition: (category: Omit<AdminDispositionCategory, 'id'>) => void;
  updateDisposition: (id: string, updated: Partial<AdminDispositionCategory>) => void;
  deleteDisposition: (id: string) => void;
  toggleDispositionActive: (id: string) => void;
  
  updateTierPolicy: (tier: CustomerTier, updated: Partial<CustomerTierPolicy>) => void;
  updateQueue: (id: string, updated: Partial<GenesysQueueConfig>) => void;
  updateTelephony: (updated: Partial<TelephonyPolicy>) => void;
  updateAiGuardrails: (updated: Partial<AiGuardrailConfig>) => void;

  getDispositionsForTier: (tier?: CustomerTier) => AdminDispositionCategory[];
}

const DEFAULT_DISPOSITIONS: AdminDispositionCategory[] = [
  {
    id: 'disp-1',
    code: 'BILLING_RESOLVED',
    label: 'Billing Resolved',
    description: 'Duplicate charges, credits or refunds executed and ledger balanced',
    allowedCustomerTiers: ['ENTERPRISE', 'PRO', 'STANDARD', 'FREE'],
    requiresMandatoryNote: true,
    triggerFollowUpTicket: false,
    isActive: true,
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
  {
    id: 'disp-2',
    code: 'PRODUCT_RMA_ISSUED',
    label: 'Product RMA Dispatched',
    description: 'Hardware defect verified via telemetry and replacement unit dispatched',
    allowedCustomerTiers: ['ENTERPRISE', 'PRO'],
    requiresMandatoryNote: true,
    triggerFollowUpTicket: true,
    isActive: true,
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  {
    id: 'disp-3',
    code: 'VIP_CONCESSION_GRANTED',
    label: 'VIP Concession & Loyalty Credit',
    description: 'Pega NBA retention incentive applied to preserve key enterprise account',
    allowedCustomerTiers: ['ENTERPRISE'],
    requiresMandatoryNote: true,
    triggerFollowUpTicket: true,
    isActive: true,
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  },
  {
    id: 'disp-4',
    code: 'TECH_CONFIG_APPLIED',
    label: 'Tech Config / OTA Patch Applied',
    description: 'Remote OTA firmware patch deployed or gateway setting adjusted',
    allowedCustomerTiers: ['ENTERPRISE', 'PRO', 'STANDARD'],
    requiresMandatoryNote: false,
    triggerFollowUpTicket: false,
    isActive: true,
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
  },
  {
    id: 'disp-5',
    code: 'DEDICATED_TAM_ESCALATION',
    label: 'Dedicated TAM Escalated',
    description: 'Case handed off to Technical Account Manager for architectural review',
    allowedCustomerTiers: ['ENTERPRISE'],
    requiresMandatoryNote: true,
    triggerFollowUpTicket: true,
    isActive: true,
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
  },
  {
    id: 'disp-6',
    code: 'SELF_SERVICE_FAQ_PROVIDED',
    label: 'Self-Service FAQ Provided',
    description: 'Customer guided to documentation or automated resolution flow',
    allowedCustomerTiers: ['STANDARD', 'FREE'],
    requiresMandatoryNote: false,
    triggerFollowUpTicket: false,
    isActive: true,
    badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
  },
  {
    id: 'disp-7',
    code: 'CHURN_PREVENTED',
    label: 'Churn Risk Mitigated',
    description: 'High sensitivity customer saved with customized retention package',
    allowedCustomerTiers: ['ENTERPRISE', 'PRO'],
    requiresMandatoryNote: true,
    triggerFollowUpTicket: true,
    isActive: true,
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
  },
];

const DEFAULT_TIER_POLICIES: CustomerTierPolicy[] = [
  {
    tier: 'ENTERPRISE',
    minAssuranceRequired: 'FULLY_AUTHENTICATED',
    maxAutonomousRefund: 1000,
    slaTargetMinutes: 15,
    rmaFastTrack: true,
    dedicatedAgentRequired: true,
    allowPriorityQueueBypass: true,
  },
  {
    tier: 'PRO',
    minAssuranceRequired: 'PARTIALLY_VERIFIED',
    maxAutonomousRefund: 250,
    slaTargetMinutes: 60,
    rmaFastTrack: true,
    dedicatedAgentRequired: false,
    allowPriorityQueueBypass: true,
  },
  {
    tier: 'STANDARD',
    minAssuranceRequired: 'PARTIALLY_VERIFIED',
    maxAutonomousRefund: 50,
    slaTargetMinutes: 240,
    rmaFastTrack: false,
    dedicatedAgentRequired: false,
    allowPriorityQueueBypass: false,
  },
  {
    tier: 'FREE',
    minAssuranceRequired: 'UNVERIFIED',
    maxAutonomousRefund: 0,
    slaTargetMinutes: 1440,
    rmaFastTrack: false,
    dedicatedAgentRequired: false,
    allowPriorityQueueBypass: false,
  },
];

const DEFAULT_QUEUES: GenesysQueueConfig[] = [
  {
    id: 'q-vip-voice',
    name: 'Enterprise Platinum VIP Voice ACD',
    channel: 'VOICE',
    skillRequirements: ['Senior Network Eng', 'Bilingual English/Mandarin'],
    basePriority: 100,
    ltvMultiplier: 0.15,
    maxWaitSeconds: 45,
    overflowQueueName: 'General Escalations Pool',
    activeAgentsCount: 8,
  },
  {
    id: 'q-billing',
    name: 'Critical Billing & Payment Dispute Swarm',
    channel: 'WHATSAPP',
    skillRequirements: ['Stripe Ledgers', 'Policy #REF-202'],
    basePriority: 80,
    ltvMultiplier: 0.08,
    maxWaitSeconds: 90,
    overflowQueueName: 'Supervisor Tier 2',
    activeAgentsCount: 12,
  },
  {
    id: 'q-hardware',
    name: 'Hardware Diagnostics & RMA Lab',
    channel: 'LIVE_CHAT',
    skillRequirements: ['Kernel Slab Telemetry', 'RMA Dispatcher'],
    basePriority: 70,
    ltvMultiplier: 0.05,
    maxWaitSeconds: 120,
    overflowQueueName: 'General Support',
    activeAgentsCount: 6,
  },
];

const DEFAULT_TELEPHONY: TelephonyPolicy = {
  dualChannelRecording: true,
  pciComplianceMute: true,
  sttModel: 'Gemini-2.5-Live-Audio',
  ivrGreetingPrompt: 'Welcome to SupportOS Priority Gateway. Connecting you to your dedicated agent based on your active SLA.',
  acwDurationSeconds: 45,
  autoWrapEnabled: true,
};

const DEFAULT_GUARDRAILS: AiGuardrailConfig = {
  containmentRateTarget: 65,
  modelTemperature: 0.2,
  concessionCapDollar: 1000,
  requireHumanAboveDollar: 350,
  sentimentAlertThreshold: -0.6,
};

export const useAdminStore = create<AdminStoreState>((set, get) => ({
  dispositions: DEFAULT_DISPOSITIONS,
  tierPolicies: DEFAULT_TIER_POLICIES,
  queues: DEFAULT_QUEUES,
  telephony: DEFAULT_TELEPHONY,
  aiGuardrails: DEFAULT_GUARDRAILS,

  addDisposition: (category) =>
    set((state) => ({
      dispositions: [
        ...state.dispositions,
        {
          ...category,
          id: `disp-${Date.now()}`,
          isActive: true,
          badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
        },
      ],
    })),

  updateDisposition: (id, updated) =>
    set((state) => ({
      dispositions: state.dispositions.map((d) => (d.id === id ? { ...d, ...updated } : d)),
    })),

  deleteDisposition: (id) =>
    set((state) => ({
      dispositions: state.dispositions.filter((d) => d.id !== id),
    })),

  toggleDispositionActive: (id) =>
    set((state) => ({
      dispositions: state.dispositions.map((d) => (d.id === id ? { ...d, isActive: !d.isActive } : d)),
    })),

  updateTierPolicy: (tier, updated) =>
    set((state) => ({
      tierPolicies: state.tierPolicies.map((tp) => (tp.tier === tier ? { ...tp, ...updated } : tp)),
    })),

  updateQueue: (id, updated) =>
    set((state) => ({
      queues: state.queues.map((q) => (q.id === id ? { ...q, ...updated } : q)),
    })),

  updateTelephony: (updated) =>
    set((state) => ({
      telephony: { ...state.telephony, ...updated },
    })),

  updateAiGuardrails: (updated) =>
    set((state) => ({
      aiGuardrails: { ...state.aiGuardrails, ...updated },
    })),

  getDispositionsForTier: (tier?: CustomerTier) => {
    const { dispositions } = get();
    if (!tier) return dispositions.filter((d) => d.isActive);
    return dispositions.filter((d) => d.isActive && d.allowedCustomerTiers.includes(tier));
  },
}));
