# SupportOS — AI-Native Customer Support Operating System

SupportOS is a next-generation, AI-native Customer Support Operating System combining the capabilities of Zendesk, Intercom, Freshdesk, Salesforce Service Cloud, HubSpot Service Hub, and Gorgias with a unified **One-of-One Support Command Center UX** and an integrated **AI Operating Layer**.

---

## Key Capabilities & Architecture

### 1. Unified 3-Column Command Center UX
- **Command Center & Inboxes**: Omnichannel queues (Email, WhatsApp, Live Chat, Voice, SMS, Web Forms, API) with real-time SLA countdowns, urgency scoring, and sentiment indicators.
- **Live Support Flow**: Real-time message thread supporting customer chats, agent replies, AI bot interactions, and yellow-highlighted internal notes. Includes a rich composer with 1-click macros and AI Copilot response insertion.
- **Customer Intelligence & Copilot Sidecar**:
  - **AI Copilot**: Real-time sentiment gauge, urgency score, intent detection, guardrail & policy citations, and 1-click permitted actions (e.g. `$350 Refund`, `Carrier Tracer`).
  - **Customer 360**: Health score, Lifetime Value, active e-commerce orders, and a complete chronological omnichannel journey timeline.
  - **QA & Incident Detector**: 100% automated conversation QA auditing and product incident detection (e.g. outage spike detection linked to GitHub/Jira).

### 2. The AI Operating Layer
- **Tri-Layer AI Framework**:
  - **Customer-Facing Autonomous Agent**: Self-service triage and resolution within strict guardrails.
  - **Real-Time Agent Copilot**: Intent detection, next-best-action guidance, and 1-click tone adaptation (Professional, Friendly, Concise, Apologetic, Technical).
  - **Supervisor & QA AI**: 100% conversation evaluation, policy compliance scoring, and hallucination monitoring.
- **Provider-Agnostic AI Gateway**: Integrates with Google Gemini models (Gemini 2.5 Flash / Pro) with resilient local domain fallbacks.

### 3. SupportOS Platform Modules
- **AI Agent Studio & Marketplace**: No-code visual agent creator with configurable permissions (refund limits, order checks) and guardrail escalation rules.
- **Visual Automation Builder**: Zapier/n8n-style node graph (Trigger $\rightarrow$ Condition $\rightarrow$ AI Classification $\rightarrow$ Automated Action).
- **Knowledge Base & AI Gap Engine**: Self-improving documentation system that flags high-frequency customer queries that lack articles.
- **Executive Analytics & Voice of Customer (VOC)**: AI containment tracking, SLA compliance, and emerging complaint clustering.

---

## Project Structure

```
c:\Users\dlpra\idea1\
├── backend/
│   ├── pom.xml
│   └── src/main/java/com/supportos/
│       ├── SupportOsApplication.java
│       ├── tenant/             # Multi-tenancy context & filters
│       ├── security/           # JWT & Spring Security RBAC
│       ├── customer/           # Customer 360, orders, and journey timeline
│       ├── ticket/             # Omnichannel tickets, conversations & messages
│       ├── ai/                 # Gemini AI Gateway, Copilot, & QA auditor
│       ├── knowledge/          # Articles & AI knowledge gap engine
│       ├── websocket/          # STOMP real-time event publisher
│       └── common/             # Seed data initializer (Acme Global, Sarah Chen VIP)
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── src/
│       ├── components/
│       │   ├── layout/         # Command Center top bar & telemetry
│       │   ├── workspace/      # 3-Column Command Center layout
│       │   ├── modals/         # New Omnichannel Ticket modal
│       │   └── views/          # Agent Studio, Automation Builder, Analytics
│       ├── services/api.ts     # Typed API client with live endpoints & mock fallbacks
│       └── types/index.ts      # Domain interfaces
└── README.md
```

---

## Quickstart

### Prerequisites
- **Java 17+** (OpenJDK 17 installed)
- **Node.js 18+** (Node v24 with npm 11 installed)
- Optional: `GEMINI_API_KEY` environment variable for live Gemini generation.

### 1. Start the Backend
```bash
cd backend
..\tools\apache-maven-3.9.6\bin\mvn.cmd spring-boot:run
```
- Backend starts at: `http://localhost:8080`
- Embedded H2 database console: `http://localhost:8080/h2-console`
- Health check: `http://localhost:8080/api/v1/health`

### 2. Start the Frontend
```bash
cd frontend
npm run dev
```
- Frontend launches at: `http://localhost:5173`

---

## Pre-Loaded Enterprise Demo Data
The backend boots with pre-seeded enterprise demonstration data:
- **Tenants**: Acme Global Technologies (`acme`), Stripeify Payments (`stripeify`).
- **Agents**: Elena Rostova (Admin), Marcus Vance (Supervisor), Chloe Bennett (Agent).
- **VIP Customer**: Sarah Chen (Enterprise Tier, $8,400 LTV, 88% Health Score).
- **Live Tickets**:
  - `#TCK-1042`: Duplicate payment on invoice #INV-9821 via WhatsApp (High Priority, SLA 45m).
  - `#TCK-1043`: Delayed package delivery via Email.
  - `#TCK-1044`: Session crash on Android 16 login screen via Live Chat (Critical Priority, SLA 18m).
  - `#TCK-1045`: SOC-2 Type II audit request via Web Form.
