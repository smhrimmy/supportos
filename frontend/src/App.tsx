import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { CommandPalette } from './components/layout/CommandPalette';
import { CommandCenterSidebar } from './components/workspace/CommandCenterSidebar';
import { TicketInboxList } from './components/workspace/TicketInboxList';
import { LiveSupportFlow } from './components/workspace/LiveSupportFlow';
import { CustomerIntelligencePanel } from './components/workspace/CustomerIntelligencePanel';
import { NewTicketModal } from './components/modals/NewTicketModal';
import { AgentStudioView } from './components/views/AgentStudioView';
import { AutomationBuilderView } from './components/views/AutomationBuilderView';
import { KnowledgeBaseView } from './components/views/KnowledgeBaseView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { VoiceContactCenter } from './components/voice/VoiceContactCenter';
import { CustomerPortalView } from './components/portal/CustomerPortalView';
import { StatusPageView } from './components/status/StatusPageView';
import { WorkforceView } from './components/wfm/WorkforceView';
import { IntegrationsHubView } from './components/integrations/IntegrationsHubView';
import { GuidedProductFixer } from './components/pega/GuidedProductFixer';
import { InteractionRecordView } from './components/pega/InteractionRecordView';
import { AdminControlCenterView } from './components/admin/AdminControlCenterView';
import { Ticket, Message, Customer, CustomerOrder, AiInsight, TicketStatus } from './types';
import { api } from './services/api';

export function App() {
  const [activeView, setActiveView] = useState<
    'workspace' | 'agent-studio' | 'automation' | 'knowledge' | 'analytics' | 'voice' | 'portal' | 'status' | 'wfm' | 'integrations' | 'diagnostics' | 'interactions' | 'admin'
  >('workspace');

  const [currentTenant, setCurrentTenant] = useState('acme');
  const [selectedChannel, setSelectedChannel] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [customer, setCustomer] = useState<Customer | undefined>();
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [copilot, setCopilot] = useState<AiInsight | null>(null);
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Load tickets on mount or filter change
  useEffect(() => {
    loadTickets();
  }, [currentTenant, selectedChannel, statusFilter, priorityFilter]);

  const loadTickets = async () => {
    const fetched = await api.getTickets(
      selectedChannel === 'AI_TRIAGE' || selectedChannel === 'ESCALATED' || selectedChannel === 'VIP' ? undefined : selectedChannel,
      statusFilter === 'ALL' ? undefined : statusFilter,
      priorityFilter === 'ALL' ? undefined : priorityFilter
    );

    let filtered = fetched;
    if (selectedChannel === 'AI_TRIAGE') {
      filtered = fetched.filter(t => t.urgencyScore >= 70);
    } else if (selectedChannel === 'ESCALATED') {
      filtered = fetched.filter(t => t.priority === 'CRITICAL' || t.status === 'ESCALATED');
    } else if (selectedChannel === 'VIP') {
      filtered = fetched.filter(t => t.tags?.includes('vip') || t.priority === 'HIGH' || t.priority === 'CRITICAL');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.ticketNumber.toLowerCase().includes(q) ||
        (t.customerName && t.customerName.toLowerCase().includes(q))
      );
    }

    setTickets(filtered);

    // Auto-select first ticket if none selected
    if (filtered.length > 0 && (!selectedTicket || !filtered.some(t => t.id === selectedTicket.id))) {
      selectTicket(filtered[0]);
    }
  };

  const selectTicket = async (ticket: Ticket) => {
    setSelectedTicket(ticket);
    const detail = await api.getTicketDetail(ticket.id);
    setMessages(detail.messages);
    setCustomer(detail.customer);
    setOrders(detail.orders);

    const cp = await api.getCopilot(ticket.id);
    setCopilot(cp);
  };

  const handleSendMessage = async (content: string, isInternalNote: boolean) => {
    if (!selectedTicket) return;
    const newMsg = await api.addMessage(
      selectedTicket.id,
      content,
      isInternalNote,
      selectedTicket.channel,
      isInternalNote ? 'SupportOS Copilot' : 'Elena Rostova'
    );
    setMessages(prev => [...prev, newMsg]);

    // Refresh copilot recommendations
    const cp = await api.getCopilot(selectedTicket.id);
    setCopilot(cp);
  };

  const handleUpdateStatus = async (status: TicketStatus) => {
    if (!selectedTicket) return;
    await api.updateStatus(selectedTicket.id, status);
    setSelectedTicket(prev => prev ? { ...prev, status } : null);
    setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, status } : t));
  };

  const handleAssignAgent = async (agentId: number, agentName: string) => {
    if (!selectedTicket) return;
    await api.assignTicket(selectedTicket.id, agentId, agentName);
    setSelectedTicket(prev => prev ? { ...prev, assignedAgentId: agentId, assignedAgentName: agentName } : null);
    setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, assignedAgentId: agentId, assignedAgentName: agentName } : t));
  };

  const handleCreateTicket = async (ticketData: any) => {
    const created = await api.createTicket(ticketData);
    setTickets(prev => [created, ...prev]);
    selectTicket(created);
  };

  const handleApplyAction = async (actionName: string) => {
    if (!selectedTicket) return;
    await handleSendMessage(`⚡ [AI Action Executed]: ${actionName}. Telemetry audit record created.`, true);
  };

  const handleCommandPaletteAction = (actionKey: string, payload?: any) => {
    if (actionKey === 'OPEN_PALETTE') {
      setIsCommandPaletteOpen(true);
      return;
    }
    if (actionKey === 'SELECT_TICKET' && payload) {
      setActiveView('workspace');
      selectTicket(payload);
      return;
    }
    setActiveView(actionKey as any);
  };

  // Ticket counts for sidebar
  const ticketCounts = {
    all: tickets.length,
    aiTriaged: tickets.filter(t => t.urgencyScore >= 70).length,
    escalated: tickets.filter(t => t.priority === 'CRITICAL' || t.status === 'ESCALATED').length,
    critical: tickets.filter(t => t.priority === 'CRITICAL').length,
    email: tickets.filter(t => t.channel === 'EMAIL').length,
    chat: tickets.filter(t => t.channel === 'LIVE_CHAT').length,
    whatsapp: tickets.filter(t => t.channel === 'WHATSAPP').length,
    voice: tickets.filter(t => t.channel === 'VOICE').length,
  };

  return (
    <div className="min-h-screen bg-[#FAF9FD] text-slate-900 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Top Global Command Bar */}
      <Header
        currentTenant={currentTenant}
        onTenantChange={setCurrentTenant}
        onOpenNewTicket={() => setIsNewTicketModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeView={activeView}
        onViewChange={(v: any) => setActiveView(v)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Column: Command Center Sidebar (Shown on all views except full Customer Portal) */}
        {activeView !== 'portal' && (
          <CommandCenterSidebar
            activeView={activeView}
            onViewChange={(v: any) => setActiveView(v)}
            selectedChannel={selectedChannel}
            onChannelChange={setSelectedChannel}
            ticketCounts={ticketCounts}
          />
        )}

        {/* Dynamic View Switcher */}
        {activeView === 'workspace' && (
          <div className="flex-1 flex overflow-hidden">
            {/* Center-Left: Ticket Triage Inbox List */}
            <TicketInboxList
              tickets={tickets}
              selectedTicketId={selectedTicket?.id || null}
              onSelectTicket={selectTicket}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
            />

            {/* Center-Right: Live Support Flow, Case Swarming & Composer */}
            <LiveSupportFlow
              ticket={selectedTicket}
              messages={messages}
              onSendMessage={handleSendMessage}
              onUpdateStatus={handleUpdateStatus}
              onAssignAgent={handleAssignAgent}
              suggestedReply={copilot?.suggestedReply}
              onRewriteTone={api.rewriteTone}
            />

            {/* Right Column: Customer Intelligence 360 & Pega NBA Sidecar */}
            <CustomerIntelligencePanel
              ticket={selectedTicket}
              customer={customer}
              orders={orders}
              copilot={copilot}
              onApplyAction={handleApplyAction}
              onUseSuggestedReply={(reply) => handleSendMessage(reply, false)}
            />
          </div>
        )}

        {activeView === 'voice' && <VoiceContactCenter />}
        {activeView === 'portal' && (
          <CustomerPortalView
            orders={orders}
            onBackToAgentWorkspace={() => setActiveView('workspace')}
          />
        )}
        {activeView === 'status' && <StatusPageView />}
        {activeView === 'wfm' && <WorkforceView />}
        {activeView === 'integrations' && <IntegrationsHubView />}
        {activeView === 'diagnostics' && (
          <div className="flex-1 p-8 overflow-y-auto bg-[#FAF9FD]">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    Pega Guided Product Diagnostics & Fixing Studio
                  </h2>
                  <p className="text-xs text-slate-500">
                    Case Lifecycle Management (CLM) for hardware, software, and edge device troubleshooting.
                  </p>
                </div>
                <button
                  onClick={() => setActiveView('workspace')}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm text-xs font-bold transition-colors"
                >
                  ← Back to Workspace
                </button>
              </div>
              <GuidedProductFixer
                isOpen={true}
                onClose={() => setActiveView('workspace')}
                ticketId={selectedTicket ? selectedTicket.id : 1042}
                ticketTitle={selectedTicket ? selectedTicket.title : 'Intermittent Edge Router Telemetry Failure'}
                onSessionComplete={(session) => {
                  handleSendMessage(`[Pega Guided Diagnostic Fixer Completed]: Hardware RMA #${session.rmaDetails?.rmaNumber} dispatched with ${session.rmaDetails?.courier}. Firmware hotfix scheduled.`, true);
                  setActiveView('workspace');
                }}
              />
            </div>
          </div>
        )}
        {activeView === 'interactions' && (
          <div className="flex-1 p-8 overflow-y-auto bg-[#FAF9FD]">
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    Pega Interaction Records & Contact Notes Hub
                  </h2>
                  <p className="text-xs text-slate-500">
                    Complete audio/chat recording playback, synchronized transcripts, supervisor coaching whispers, and compliance audit trail.
                  </p>
                </div>
                <button
                  onClick={() => setActiveView('workspace')}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm text-xs font-bold transition-colors"
                >
                  ← Back to Workspace
                </button>
              </div>
              <InteractionRecordView
                ticketId={selectedTicket ? selectedTicket.id : 1042}
                customerName={selectedTicket?.customerName || 'Sarah Chen'}
              />
            </div>
          </div>
        )}
        {activeView === 'agent-studio' && <AgentStudioView />}
        {activeView === 'automation' && <AutomationBuilderView />}
        {activeView === 'knowledge' && <KnowledgeBaseView />}
        {activeView === 'analytics' && <AnalyticsView />}
        {activeView === 'admin' && <AdminControlCenterView />}
      </main>

      {/* New Ticket Creation Modal */}
      <NewTicketModal
        isOpen={isNewTicketModalOpen}
        onClose={() => setIsNewTicketModalOpen(false)}
        onSubmit={handleCreateTicket}
      />

      {/* Global Spotlight Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAction={handleCommandPaletteAction}
        tickets={tickets}
      />
    </div>
  );
}

export default App;
