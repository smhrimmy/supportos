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
