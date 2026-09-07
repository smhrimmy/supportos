export type Channel = 'EMAIL' | 'LIVE_CHAT' | 'WHATSAPP' | 'SMS' | 'VOICE' | 'API' | 'WEB_FORM';

export type TicketStatus = 'NEW' | 'ASSIGNED' | 'IN_PROGRESS' | 'WAITING_ON_CUSTOMER' | 'ESCALATED' | 'RESOLVED' | 'CLOSED';

export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type SenderType = 'CUSTOMER' | 'AGENT' | 'AI_BOT' | 'SYSTEM';

export type CustomerTier = 'FREE' | 'STANDARD' | 'PRO' | 'ENTERPRISE';

export interface Customer {
  id: number;
  tenantSlug: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  tier: CustomerTier;
  healthScore: number;
  lifetimeValue: number;
  sentimentScore: string;
  riskLevel: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface CustomerOrder {
  id: number;
  customerId: number;
  orderNumber: string;
  amount: number;
  currency: string;
  status: string;
  itemSummary: string;
  trackingNumber?: string;
  createdAt: string;
}

export interface TimelineEvent {
  id: number;
  customerId: number;
  eventType: string;
  title: string;
  description?: string;
  channel?: string;
  badgeColor: string;
  occurredAt: string;
}

export interface Message {
  id: number;
  ticketId: number;
  conversationId?: number;
  senderType: SenderType;
  senderId?: number;
  senderName: string;
  content: string;
  isInternalNote: boolean;
  channel: Channel;
  sentiment?: string;
  createdAt: string;
}

export interface Ticket {
  id: number;
  tenantSlug: string;
  ticketNumber: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  channel: Channel;
  customerId?: number;
  customerName?: string;
  customerEmail?: string;
  assignedAgentId?: number;
  assignedAgentName?: string;
  tags?: string;
  category: string;
  slaDueAt?: string;
  slaBreached: boolean;
  sentiment: string;
  urgencyScore: number;
  aiConfidence: number;
  createdAt: string;
  updatedAt: string;
  isSwarming?: boolean;
}

export interface NextBestAction {
  id: string;
  title: string;
  actionType: 'REFUND' | 'RETENTION' | 'UPGRADE' | 'ESCALATE' | 'WAIVE_FEE';
  propensityScore: number; // 0-100%
  rationale: string;
  businessValue: string;
  concessionValue?: string;
  permittedAction: string;
}

export interface SwarmParticipant {
  id: number;
  name: string;
  role: string;
  department: string;
  isOnline: boolean;
  avatar: string;
}

export interface VoiceCallSession {
  id: string;
  customerName: string;
  customerPhone: string;
  durationSeconds: number;
  status: 'RINGING' | 'CONNECTED' | 'ON_HOLD' | 'ENDED';
  isRecording: boolean;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'FRUSTRATED';
  transcription: { speaker: string; text: string; time: string }[];
  summary?: string;
  disposition?: string;
}

export interface SystemComponentStatus {
  id: string;
  name: string;
  status: 'OPERATIONAL' | 'DEGRADED' | 'OUTAGE';
  uptimePercentage: number;
  description: string;
}

export interface AgentCapacity {
  id: number;
  name: string;
  role: string;
  department: string;
  activeTickets: number;
  maxCapacity: number;
  languages: string[];
  skills: string[];
  status: 'ONLINE' | 'BUSY' | 'ON_CALL' | 'OFFLINE';
}

export interface IntegrationConnector {
  id: string;
  name: string;
  category: 'CRM' | 'COMMERCE' | 'DEV' | 'COMMS' | 'PAYMENTS';
  description: string;
  isConnected: boolean;
  webhookCount: number;
  lastSyncAt: string;
}

export interface AiInsight {
  category: string;
  intent: string;
  sentiment: string;
  urgencyScore: number;
  confidence: number;
  priority: string;
  suggestedReply: string;
  policyReferences: string[];
  nextBestActions: string[];
  nextBestDecision?: NextBestAction;
  requiresHumanApproval: boolean;
}

export interface TicketDetailResponse {
  ticket: Ticket;
  messages: Message[];
  customer?: Customer;
  orders: CustomerOrder[];
}

export interface KnowledgeArticle {
  id: number;
  title: string;
  slug: string;
  category: string;
  content: string;
  status: string;
  helpfulCount: number;
  viewCount: number;
  tags?: string;
  createdAt: string;
}

// ==========================================
// PEGA CUSTOMER SERVICE & CDH DOMAIN MODELS
// ==========================================

export type VerificationStatus = 'UNVERIFIED' | 'PARTIALLY_VERIFIED' | 'FULLY_AUTHENTICATED';

export interface KbaQuestion {
  id: string;
  question: string;
  maskedAnswer: string;
  isVerified: boolean;
}

export interface CustomerVerification {
  status: VerificationStatus;
  authRefId: string;
  verifiedAt?: string;
  verifiedBy?: string;
  kbaQuestions: KbaQuestion[];
  otpSent: boolean;
  otpCode?: string;
  assuranceScore: number;
  allowedActions: string[];
}

export type DiagnosticStage = 'IDENTIFICATION' | 'DIAGNOSTICS' | 'RESOLUTION' | 'VERIFICATION';

export interface DiagnosticCheck {
  id: string;
  name: string;
  description: string;
  status: 'PENDING' | 'RUNNING' | 'PASS' | 'FAIL';
  telemetrySignal?: string;
  remedyAction?: string;
}

export interface ProductDiagnosticSession {
  id: string;
  ticketId: number;
  productName: string;
  productSku: string;
  serialNumber: string;
  firmwareVersion: string;
  symptoms: string[];
  currentStage: DiagnosticStage;
  checks: DiagnosticCheck[];
  resolutionType?: 'FIRMWARE_PATCH' | 'CONFIG_RESET' | 'HARDWARE_RMA' | 'TECHNICIAN_DISPATCH';
  rmaDetails?: {
    rmaNumber: string;
    returnTrackingNumber: string;
    replacementUnitSku: string;
    labelDownloadUrl: string;
    warrantyStatus: 'ACTIVE' | 'EXPIRED' | 'EXTENDED';
    courier: string;
  };
}

export type PegaDispositionCode = 
  | 'BILLING_RESOLVED' 
  | 'PRODUCT_RMA_ISSUED' 
  | 'TECH_CONFIG_APPLIED' 
  | 'CHURN_PREVENTED' 
  | 'ACCOUNT_VERIFIED' 
  | 'ESCALATED_TIER_3';

export interface SentimentTrajectoryPoint {
  stage: 'OPENING' | 'DISCOVERY' | 'RESOLUTION' | 'WRAP_UP';
  score: number; // -1.0 to 1.0
  label: string;
  color: string;
}

export interface AutoWrapUpSummary {
  ticketId: number;
  reasonForContact: string;
  diagnosticStepsTaken: string[];
  resolutionSummary: string;
  dispositionCode: PegaDispositionCode;
  sentimentTrajectory: SentimentTrajectoryPoint[];
  sentimentShiftPercent: number;
  followUpActionItems: { id: string; text: string; completed: boolean; dueDate?: string }[];
  estimatedCsat: number; // 1-5
  autoWrapConfidence: number; // 0-100%
  completedAt?: string;
}

export type ContactNoteType = 'GENERAL' | 'INTERNAL_CONFIDENTIAL' | 'COACHING_WHISPER' | 'COMPLIANCE_FLAG';

export interface ContactNote {
  id: string;
  ticketId: number;
  authorName: string;
  authorRole: string;
  noteType: ContactNoteType;
  content: string;
  timestamp: string;
  isAudited: boolean;
}

export interface InteractionTranscriptLine {
  id: string;
  timestamp: string;
  speaker: 'CUSTOMER' | 'AGENT' | 'AI_BOT' | 'SUPERVISOR';
  text: string;
  sentiment?: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
}

export interface InteractionRecord {
  id: string;
  interactionRef: string; // e.g., INT-2026-8841
  ticketId: number;
  customerName: string;
  channel: Channel;
  startedAt: string;
  endedAt: string;
  durationFormatted: string;
  recordingUrl?: string;
  audioWaveform?: number[];
  transcript: InteractionTranscriptLine[];
  authRefId: string;
  wrapUpCode: PegaDispositionCode;
  notes: ContactNote[];
  complianceVerified: boolean;
}

// ==========================================
// ADMIN CONTROL CENTER & GENESYS ACD MODELS
// ==========================================

export interface AdminDispositionCategory {
  id: string;
  code: string;
  label: string;
  description: string;
  allowedCustomerTiers: CustomerTier[];
  requiresMandatoryNote: boolean;
  triggerFollowUpTicket: boolean;
  isActive: boolean;
  badgeColor: string;
}

export interface CustomerTierPolicy {
  tier: CustomerTier;
  minAssuranceRequired: VerificationStatus;
  maxAutonomousRefund: number; // e.g., 1000 for Enterprise, 250 for Pro
  slaTargetMinutes: number; // 15m for VIP, 60m for Pro, 240m for Standard
  rmaFastTrack: boolean;
  dedicatedAgentRequired: boolean;
  allowPriorityQueueBypass: boolean;
}

export interface GenesysQueueConfig {
  id: string;
  name: string;
  channel: Channel;
  skillRequirements: string[];
  basePriority: number;
  ltvMultiplier: number;
  maxWaitSeconds: number;
  overflowQueueName?: string;
  activeAgentsCount: number;
}

export interface TelephonyPolicy {
  dualChannelRecording: boolean;
  pciComplianceMute: boolean;
  sttModel: string;
  ivrGreetingPrompt: string;
  acwDurationSeconds: number; // After-Call Work countdown (e.g. 45s)
  autoWrapEnabled: boolean;
}

export interface AiGuardrailConfig {
  containmentRateTarget: number; // 0-100%
  modelTemperature: number; // 0.0-1.0
  concessionCapDollar: number;
  requireHumanAboveDollar: number;
  sentimentAlertThreshold: number; // e.g. -0.6
}


