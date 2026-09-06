import { Ticket, TicketDetailResponse, Message, AiInsight, KnowledgeArticle, TimelineEvent } from '../types';

const API_BASE = '/api/v1';
const HEADERS = {
  'Content-Type': 'application/json',
  'X-Tenant-ID': 'acme'
};

export const api = {
  async getTickets(channel?: string, status?: string, priority?: string): Promise<Ticket[]> {
    const params = new URLSearchParams();
    if (channel && channel !== 'ALL') params.append('channel', channel);
    if (status && status !== 'ALL') params.append('status', status);
    if (priority && priority !== 'ALL') params.append('priority', priority);

    try {
      const res = await fetch(`${API_BASE}/tickets?${params.toString()}`, { headers: HEADERS });
      if (!res.ok) throw new Error('Network response failed');
      return await res.json();
    } catch (e) {
      console.warn('API call failed, using mock data:', e);
      return getMockTickets();
    }
  },

  async getTicketDetail(id: number): Promise<TicketDetailResponse> {
    try {
      const res = await fetch(`${API_BASE}/tickets/${id}`, { headers: HEADERS });
      if (!res.ok) throw new Error('Network response failed');
      return await res.json();
    } catch (e) {
      console.warn('API call failed, using mock ticket detail:', e);
      return getMockTicketDetail(id);
    }
  },

  async createTicket(payload: any): Promise<Ticket> {
    try {
      const res = await fetch(`${API_BASE}/tickets`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Ticket creation failed');
      return await res.json();
    } catch (e) {
      console.warn('Fallback ticket creation:', e);
      return {
        id: Date.now(),
        tenantSlug: 'acme',
        ticketNumber: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
        title: payload.title,
        description: payload.description,
        status: 'NEW',
        priority: payload.priority || 'MEDIUM',
        channel: payload.channel || 'EMAIL',
        customerName: payload.customerName || 'Customer',
        customerEmail: payload.customerEmail || 'user@example.com',
        category: payload.category || 'General',
        sentiment: 'NEUTRAL',
        urgencyScore: 50,
        aiConfidence: 88,
        slaBreached: false,
        slaDueAt: new Date(Date.now() + 7200000).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
  },

  async addMessage(ticketId: number, content: string, isInternalNote: boolean, channel: string, senderName = 'Support Specialist'): Promise<Message> {
    try {
      const res = await fetch(`${API_BASE}/tickets/${ticketId}/messages`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
          content,
          isInternalNote,
          senderType: isInternalNote ? 'AI_BOT' : 'AGENT',
          senderName,
          channel
        })
      });
      if (!res.ok) throw new Error('Message sending failed');
      return await res.json();
    } catch (e) {
      return {
        id: Date.now(),
        ticketId,
        senderType: isInternalNote ? 'AI_BOT' : 'AGENT',
        senderName,
        content,
        isInternalNote,
        channel: channel as any,
        createdAt: new Date().toISOString()
      };
    }
  },

  async updateStatus(ticketId: number, status: string): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/tickets/${ticketId}/status`, {
        method: 'PATCH',
        headers: HEADERS,
        body: JSON.stringify({ status })
      });
      return await res.json();
    } catch (e) {
      return { id: ticketId, status };
    }
  },

  async assignTicket(ticketId: number, agentId: number, agentName: string): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/tickets/${ticketId}/assign`, {
        method: 'PATCH',
        headers: HEADERS,
        body: JSON.stringify({ agentId, agentName })
      });
      return await res.json();
    } catch (e) {
      return { id: ticketId, assignedAgentId: agentId, assignedAgentName: agentName };
    }
  },

  async getCopilot(ticketId: number): Promise<AiInsight> {
    try {
      const res = await fetch(`${API_BASE}/tickets/${ticketId}/copilot`, { headers: HEADERS });
      if (!res.ok) throw new Error('Copilot fetch failed');
      return await res.json();
    } catch (e) {
      return {
        category: 'Billing',
        intent: 'Duplicate Transaction Dispute',
        sentiment: 'FRUSTRATED',
        urgencyScore: 88,
        confidence: 96,
        priority: 'HIGH',
        suggestedReply: 'Dear Customer,\n\nThank you for reaching out. We have identified the duplicate charge of $350.00 on invoice #INV-9821. An immediate reversal has been submitted to your bank card under Policy #REF-202.\n\nBest regards,\nSupportOS Billing Team',
        policyReferences: [
          'Policy #REF-202: Duplicate Payment Automatic Verification',
          'Billing SLA Tier 1: Resolve within 30 minutes'
        ],
        nextBestActions: [
          'Verify transaction hash in Stripe gateway',
          'Issue immediate $350.00 reversal',
          'Send automated receipt email'
        ],
        requiresHumanApproval: false
      };
    }
  },

  async rewriteTone(text: string, targetTone: string): Promise<string> {
    try {
      const res = await fetch(`${API_BASE}/ai/rewrite-tone`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ text, targetTone })
      });
      const data = await res.json();
      return data.rewrittenText;
    } catch (e) {
      switch (targetTone.toUpperCase()) {
        case 'FRIENDLY':
          return `Hi there! 😊 ${text} Please let us know if there is anything else we can do to help!`;
        case 'CONCISE':
          return text.replace(/I hope you are having a wonderful day\.?/gi, '').trim();
        case 'APOLOGETIC':
          return `I am so genuinely sorry for the trouble this has caused you! ${text} We are making sure this won't happen again.`;
        case 'TECHNICAL':
          return `Telemetry Incident Report: ${text} Audit logs confirm transaction timestamp reconciliation.`;
        default:
          return text;
      }
    }
  },

  async auditQa(title: string, messages: string[]): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/ai/qa-audit`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ title, messages })
      });
      return await res.json();
    } catch (e) {
      return {
        overallQaScore: 92,
        policyFollowed: true,
        correctInformationProvided: true,
        toneRating: 'Empathetic and Professional',
        resolutionAchieved: true,
        aiHallucinationRisk: 'LOW (0.02%)',
        customerSentimentProgression: 'Frustrated -> Satisfied (+68%)',
        missedOpportunity: 'Could proactively offer policy #REF-202 credit voucher for future renewals',
        supervisorRecommendation: 'Exemplary ticket handling. Complies with SOC2 & SupportOS Quality Standards.'
      };
    }
  },

  async getKnowledgeArticles(): Promise<KnowledgeArticle[]> {
    try {
      const res = await fetch(`${API_BASE}/knowledge`, { headers: HEADERS });
      if (!res.ok) throw new Error('Knowledge fetch failed');
      return await res.json();
    } catch (e) {
      return [
        {
          id: 1,
          title: 'Duplicate Charges & Instant Refund Protocols',
          slug: 'duplicate-charges-refund-protocol',
          category: 'Billing',
          content: 'Guidelines for resolving duplicate debits within 5 minutes under Policy #REF-202.',
          status: 'PUBLISHED',
          helpfulCount: 84,
          viewCount: 420,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Carrier Tracking Delays & Shipment Escalations',
          slug: 'carrier-tracking-delays',
          category: 'Shipping',
          content: 'Procedures for querying FedEx and DHL API tracers when transit window exceeds 48 hours.',
          status: 'PUBLISHED',
          helpfulCount: 52,
          viewCount: 310,
          createdAt: new Date().toISOString()
        }
      ];
    }
  },

  async getKnowledgeGaps(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE}/knowledge/gaps`, { headers: HEADERS });
      if (!res.ok) throw new Error('Knowledge gaps fetch failed');
      return await res.json();
    } catch (e) {
      return [
        {
          question: 'How to initiate a partial order return for bundles?',
          frequency: 347,
          trend: '+42% this week',
          status: 'MISSING_DOCUMENTATION',
          suggestedTitle: 'Partial Bundle Returns & Refund Policy',
          confidence: 94
        },
        {
          question: 'Resolving Android 16 login session timeouts',
          frequency: 218,
          trend: '+312% emerging spike',
          status: 'URGENT_DRAFT_GENERATED',
          suggestedTitle: 'Troubleshooting Android Authentication Errors',
          confidence: 98
        }
      ];
    }
  },

  async getCustomerTimeline(customerId: number): Promise<TimelineEvent[]> {
    try {
      const res = await fetch(`${API_BASE}/customers/${customerId}/timeline`, { headers: HEADERS });
      if (!res.ok) throw new Error('Timeline fetch failed');
      return await res.json();
    } catch (e) {
      return [];
    }
  }
};

function getMockTickets(): Ticket[] {
  return [
    {
      id: 1,
      tenantSlug: 'acme',
      ticketNumber: 'TCK-1042',
      title: 'Charged twice for monthly invoice #INV-9821',
      description: 'Hi, I noticed two identical $350 debits on our corporate Visa for invoice #INV-9821 this morning. Please inspect and process a reversal as soon as possible.',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      channel: 'WHATSAPP',
      customerId: 1,
      customerName: 'Sarah Chen',
      customerEmail: 'sarah.chen@apexcloud.io',
      assignedAgentId: 2,
      assignedAgentName: 'Marcus Vance',
      category: 'Billing',
      tags: 'billing, duplicate, stripe, vip',
      slaDueAt: new Date(Date.now() + 45 * 60000).toISOString(),
      slaBreached: false,
      sentiment: 'FRUSTRATED',
      urgencyScore: 88,
      aiConfidence: 96,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      tenantSlug: 'acme',
      ticketNumber: 'TCK-1043',
      title: 'Order #ORD-3910 delivery status delayed past estimated date',
      description: 'Our warehouse was expecting package FDX-8821901 yesterday afternoon. Tracking still shows In Transit. Can we get an updated ETA?',
      status: 'ASSIGNED',
      priority: 'MEDIUM',
      channel: 'EMAIL',
      customerId: 2,
      customerName: 'David Miller',
      customerEmail: 'david.miller@ftorbit.com',
      assignedAgentId: 3,
      assignedAgentName: 'Chloe Bennett',
      category: 'Shipping',
      tags: 'shipping, logistics, fedex',
      slaDueAt: new Date(Date.now() + 180 * 60000).toISOString(),
      slaBreached: false,
      sentiment: 'CONCERNED',
      urgencyScore: 65,
      aiConfidence: 92,
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 3,
      tenantSlug: 'acme',
      ticketNumber: 'TCK-1044',
      title: 'Session crash on Android 16 login screen',
      description: 'Multiple drivers in Dublin region report immediate app termination when entering credentials on Android 16 build 8.4.1.',
      status: 'NEW',
      priority: 'CRITICAL',
      channel: 'LIVE_CHAT',
      customerId: 3,
      customerName: 'Liam O\'Connor',
      customerEmail: 'liam@dublinlog.ie',
      category: 'Technical',
      tags: 'android, crash, mobile, incident-risk',
      slaDueAt: new Date(Date.now() + 18 * 60000).toISOString(),
      slaBreached: false,
      sentiment: 'ANGRY',
      urgencyScore: 98,
      aiConfidence: 97,
      createdAt: new Date(Date.now() - 1800000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 4,
      tenantSlug: 'acme',
      ticketNumber: 'TCK-1045',
      title: 'Requesting annual SOC-2 Type II audit report for compliance review',
      description: 'Greetings, we are undergoing our annual vendor risk assessment and need the latest SOC-2 Type II report and penetration test executive summary.',
      status: 'NEW',
      priority: 'LOW',
      channel: 'WEB_FORM',
      customerId: 4,
      customerName: 'Priya Sharma',
      customerEmail: 'priya@bharatretail.in',
      category: 'Account',
      tags: 'soc2, compliance, enterprise-nda',
      slaDueAt: new Date(Date.now() + 960 * 60000).toISOString(),
      slaBreached: false,
      sentiment: 'NEUTRAL',
      urgencyScore: 30,
      aiConfidence: 99,
      createdAt: new Date(Date.now() - 14400000).toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
}

function getMockTicketDetail(id: number): TicketDetailResponse {
  const tickets = getMockTickets();
  const ticket = tickets.find(t => t.id === id) || tickets[0];

  return {
    ticket,
    customer: {
      id: 1,
      tenantSlug: 'acme',
      fullName: 'Sarah Chen',
      email: 'sarah.chen@apexcloud.io',
      phone: '+1-415-892-0192',
      company: 'Apex Cloud Innovations',
      tier: 'ENTERPRISE',
      healthScore: 88,
      lifetimeValue: 8400.00,
      sentimentScore: 'FRUSTRATED',
      riskLevel: 'LOW',
      createdAt: new Date(Date.now() - 365 * 86400000).toISOString()
    },
    orders: [
      {
        id: 101,
        customerId: 1,
        orderNumber: 'ORD-4491',
        amount: 350.00,
        currency: 'USD',
        status: 'PAID',
        itemSummary: 'Cloud Infrastructure Enterprise Tier (Monthly Renewal)',
        trackingNumber: 'INV-9821',
        createdAt: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: 102,
        customerId: 1,
        orderNumber: 'ORD-4492',
        amount: 350.00,
        currency: 'USD',
        status: 'PENDING_REVERSAL',
        itemSummary: 'Duplicate Subscription Charge (In Reversal)',
        trackingNumber: 'INV-9822',
        createdAt: new Date(Date.now() - 7100000).toISOString()
      },
      {
        id: 103,
        customerId: 1,
        orderNumber: 'ORD-3910',
        amount: 1200.00,
        currency: 'USD',
        status: 'DELIVERED',
        itemSummary: 'Dedicated HSM Hardware Security Keys Pack',
        trackingNumber: 'FDX-8821901',
        createdAt: new Date(Date.now() - 30 * 86400000).toISOString()
      }
    ],
    messages: [
      {
        id: 1,
        ticketId: ticket.id,
        senderType: 'CUSTOMER',
        senderName: ticket.customerName || 'Sarah Chen',
        content: 'Hi, I noticed two identical $350 debits on our corporate Visa for invoice #INV-9821 this morning. Please inspect and process a reversal as soon as possible.',
        isInternalNote: false,
        channel: ticket.channel,
        sentiment: 'FRUSTRATED',
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 2,
        ticketId: ticket.id,
        senderType: 'AI_BOT',
        senderName: 'SupportOS Copilot',
        content: '🔍 Automated Telemetry Check: Located Stripe charge IDs ch_3P7x8... and ch_3P7x9... both billed at 14:02:18 UTC. Duplicate charge confirmed under Policy #REF-202.',
        isInternalNote: true,
        channel: ticket.channel,
        createdAt: new Date(Date.now() - 3500000).toISOString()
      },
      {
        id: 3,
        ticketId: ticket.id,
        senderType: 'AGENT',
        senderName: 'Marcus Vance',
        content: 'Hello Sarah! Marcus here. I verified the duplicate authorization right away. I\'ve initiated an immediate refund of $350.00 back to your Visa card.',
        isInternalNote: false,
        channel: ticket.channel,
        createdAt: new Date(Date.now() - 2400000).toISOString()
      },
      {
        id: 4,
        ticketId: ticket.id,
        senderType: 'CUSTOMER',
        senderName: ticket.customerName || 'Sarah Chen',
        content: 'Thank you Marcus! That was lightning fast. Will this reflect before end of week?',
        isInternalNote: false,
        channel: ticket.channel,
        sentiment: 'POSITIVE',
        createdAt: new Date(Date.now() - 1200000).toISOString()
      }
    ]
  };
}
