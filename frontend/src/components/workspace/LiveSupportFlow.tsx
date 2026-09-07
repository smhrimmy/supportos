import React, { useState } from 'react';
import { 
  Ticket, 
  Message, 
  SenderType, 
  Channel, 
  TicketStatus, 
  TicketPriority,
  SwarmParticipant,
  CustomerVerification,
  ProductDiagnosticSession,
  AutoWrapUpSummary
} from '../../types';
import { 
  Send, 
  Lock, 
  Sparkles, 
  Clock, 
  UserCheck, 
  Wand2, 
  Radio, 
  Mail, 
  MessageSquare, 
  Phone, 
  ShieldCheck,
  ShieldAlert,
  Users,
  GitPullRequest,
  Plus,
  Wrench,
  FileCheck,
  CheckCircle2,
  Check,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import { CustomerVerificationModal } from '../pega/CustomerVerificationModal';
import { GuidedProductFixer } from '../pega/GuidedProductFixer';
import { AutoWrapUpModal } from '../pega/AutoWrapUpModal';
import { InteractionRecordView } from '../pega/InteractionRecordView';

interface LiveSupportFlowProps {
  ticket: Ticket | null;
  messages: Message[];
  onSendMessage: (content: string, isInternalNote: boolean) => void;
  onUpdateStatus: (status: TicketStatus) => void;
  onAssignAgent: (agentId: number, agentName: string) => void;
  suggestedReply?: string;
  onRewriteTone: (text: string, tone: string) => Promise<string>;
}

export const LiveSupportFlow: React.FC<LiveSupportFlowProps> = ({
  ticket,
  messages,
  onSendMessage,
  onUpdateStatus,
  onAssignAgent,
  suggestedReply,
  onRewriteTone
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'CONVERSATION' | 'CASE_SWARM' | 'INTERACTION_AUDIT'>('CONVERSATION');
  const [inputText, setInputText] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [isCoachingWhisper, setIsCoachingWhisper] = useState(false);
  const [selectedTone, setSelectedTone] = useState('PROFESSIONAL');
  const [isRewriting, setIsRewriting] = useState(false);

  // Pega Enterprise Modal States
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(false);
  const [showWrapUpModal, setShowWrapUpModal] = useState(false);

  // Customer Verification State
  const [verification, setVerification] = useState<CustomerVerification>({
    status: 'PARTIALLY_VERIFIED',
    authRefId: 'AUTH-REF-8841-VIP',
    assuranceScore: 65,
    kbaQuestions: [
      { id: 'kba-1', question: 'Billing ZIP Code', maskedAnswer: '94*** (San Francisco)', isVerified: true },
      { id: 'kba-2', question: 'Last 4 Digits of Active Card', maskedAnswer: '****-4242', isVerified: true },
      { id: 'kba-3', question: 'Date of Account Registration', maskedAnswer: 'March 2024', isVerified: false },
    ],
    otpSent: false,
    allowedActions: ['VIEW_PUBLIC_ORDERS'],
  });

  const swarmParticipants: SwarmParticipant[] = [
    { id: 1, name: 'Marcus Vance', role: 'Billing Specialist', department: 'Finance', isOnline: true, avatar: 'MV' },
    { id: 2, name: 'Alex Rivera', role: 'Lead DevOps Engineer', department: 'Engineering', isOnline: true, avatar: 'AR' },
    { id: 3, name: 'Elena Rostova', role: 'Escalation Director', department: 'Operations', isOnline: true, avatar: 'ER' }
  ];

  if (!ticket) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FAF9FD] p-8 text-center text-slate-400">
        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-3 shadow-sm">
          <MessageSquare className="w-7 h-7 text-purple-600" />
        </div>
        <h3 className="text-sm font-bold text-slate-800 mb-1">No Case Selected</h3>
        <p className="text-xs text-slate-500 max-w-sm">
          Select a case from the triage queue on the left to initiate Pega guided service and AI-assisted resolution.
        </p>
      </div>
    );
  }

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim(), isInternalNote || isCoachingWhisper);
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInsertAiSuggestion = () => {
    if (suggestedReply) {
      setInputText(suggestedReply);
    }
  };

  const handleToneChange = async (tone: string) => {
    setSelectedTone(tone);
    const sourceText = inputText.trim() || suggestedReply;
    if (!sourceText) return;

    setIsRewriting(true);
    try {
      const res = await onRewriteTone(sourceText, tone);
      setInputText(res);
    } finally {
      setIsRewriting(false);
    }
  };

  const applyMacro = (macroText: string) => {
    setInputText(macroText);
  };

  const getChannelBadge = (ch: Channel) => {
    switch (ch) {
      case 'WHATSAPP':
        return <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full"><Radio className="w-3 h-3 text-emerald-600" /> WhatsApp</span>;
      case 'LIVE_CHAT':
        return <span className="flex items-center gap-1 text-[11px] font-semibold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full"><MessageSquare className="w-3 h-3 text-sky-600" /> Live Chat</span>;
      case 'EMAIL':
        return <span className="flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full"><Mail className="w-3 h-3 text-purple-600" /> Email</span>;
      case 'VOICE':
        return <span className="flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full"><Phone className="w-3 h-3 text-purple-600" /> Voice</span>;
      default:
        return <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">{ch}</span>;
    }
  };

  // Pega Chevron Stage Definition
  const pegaStages = [
    { key: 'VERIFY', label: '1. Identity Check', isDone: verification.status === 'FULLY_AUTHENTICATED', isActive: verification.status !== 'FULLY_AUTHENTICATED' },
    { key: 'DIAGNOSE', label: '2. Diagnostic Probe', isDone: false, isActive: verification.status === 'FULLY_AUTHENTICATED' && ticket.status !== 'RESOLVED' },
    { key: 'RESOLVE', label: '3. Resolution & RMA', isDone: ticket.status === 'RESOLVED', isActive: false },
    { key: 'WRAP', label: '4. Case Wrap-Up', isDone: ticket.status === 'RESOLVED', isActive: false },
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-[#FAF9FD] border-r border-slate-200/90">
      
      {/* Pega Chevron Stage Path Bar */}
      <div className="px-5 py-2.5 bg-white border-b border-slate-200/80 flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-1 overflow-x-auto text-xs font-semibold">
          {pegaStages.map((st, idx) => (
            <React.Fragment key={st.key}>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                st.isDone 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold'
                  : st.isActive 
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/20 font-bold'
                  : 'bg-slate-50 text-slate-400 border border-slate-100'
              }`}>
                {st.isDone && <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />}
                <span>{st.label}</span>
              </div>
              {idx < pegaStages.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Action Controls in Stage Bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDiagnosticModal(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all shadow-2xs"
            title="Pega Guided Product Diagnostic Wizard"
          >
            <Wrench className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden sm:inline">Diagnostic Wizard</span>
          </button>

          <button
            onClick={() => setShowWrapUpModal(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm shadow-purple-600/20 transition-all active:scale-95"
            title="Pega GenAI Auto-Wrap-Up and Case Resolution"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Wrap Up Case</span>
          </button>
        </div>
      </div>

      {/* Case Header & Sub-Tab Bar */}
      <div className="px-5 py-3 border-b border-slate-200/80 bg-white flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              #{ticket.ticketNumber}
            </span>
            {getChannelBadge(ticket.channel)}
            <span className="text-xs font-semibold text-slate-500">
              • {ticket.category}
            </span>
          </div>
          <h2 className="text-sm font-bold text-slate-900 truncate">
            {ticket.title}
          </h2>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveSubTab('CONVERSATION')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeSubTab === 'CONVERSATION' 
                  ? 'bg-white text-purple-700 shadow-sm font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Conversation
            </button>
            <button
              onClick={() => setActiveSubTab('CASE_SWARM')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                activeSubTab === 'CASE_SWARM' 
                  ? 'bg-white text-purple-700 shadow-sm font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-purple-600" />
              <span>Swarm</span>
            </button>
            <button
              onClick={() => setActiveSubTab('INTERACTION_AUDIT')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                activeSubTab === 'INTERACTION_AUDIT' 
                  ? 'bg-white text-purple-700 shadow-sm font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Audit & Notes</span>
            </button>
          </div>

          {/* Ticket Status Select */}
          <select
            value={ticket.status}
            onChange={(e) => onUpdateStatus(e.target.value as TicketStatus)}
            className="bg-slate-50 border border-slate-200 text-xs text-slate-700 font-bold px-2.5 py-1.5 rounded-xl focus:outline-none focus:border-purple-500"
          >
            <option value="NEW">New</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="WAITING_ON_CUSTOMER">Waiting</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {/* Customer Verification Status Strip */}
      <div className={`px-5 py-2 text-xs flex items-center justify-between border-b ${
        verification.status === 'FULLY_AUTHENTICATED'
          ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-800'
          : 'bg-amber-50/70 border-amber-200/80 text-amber-900'
      }`}>
        <div className="flex items-center gap-2">
          {verification.status === 'FULLY_AUTHENTICATED' ? (
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          )}
          <span>
            Identity Status: <strong className="font-bold">{verification.status.replace('_', ' ')}</strong> ({verification.assuranceScore}%)
            {' • '}
            <span className="font-mono text-slate-600">RefID: {verification.authRefId}</span>
          </span>
        </div>

        <div>
          {verification.status === 'FULLY_AUTHENTICATED' ? (
            <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> ISO-27001 Cleared
            </span>
          ) : (
            <button
              onClick={() => setShowVerifyModal(true)}
              className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] shadow-2xs transition-all"
            >
              Verify Customer Identity
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {activeSubTab === 'CASE_SWARM' ? (
        /* Case Swarming View */
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-purple-900 font-bold text-xs">
                <Users className="w-4 h-4 text-purple-700" />
                <span>Salesforce-Style Case Swarm</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Cross-functional resolution swarm linked to <strong className="text-slate-900">#swarm-tck-1042-billing</strong>.
              </p>
            </div>
            <button 
              onClick={() => alert("Specialist invited to Swarm!")}
              className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Invite Swarmer</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {swarmParticipants.map((sp) => (
              <div key={sp.id} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-100 border border-purple-200 text-purple-800 font-bold text-xs flex items-center justify-center">
                  {sp.avatar}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{sp.name}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="text-[11px] text-slate-500">{sp.role} • {sp.department}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <GitPullRequest className="w-4 h-4 text-purple-600" />
              <span>GitHub PR #882: Fix idempotency token expiration on checkout</span>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-full">
              Merged to Staging
            </span>
          </div>
        </div>
      ) : activeSubTab === 'INTERACTION_AUDIT' ? (
        /* Pega Interaction Records View */
        <div className="flex-1 overflow-y-auto p-6">
          <InteractionRecordView ticketId={ticket.id} customerName={ticket.customerName || 'Customer'} />
        </div>
      ) : (
        /* Conversation Message Stream */
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => {
            const isCustomer = msg.senderType === 'CUSTOMER';
            const isNote = msg.isInternalNote;
            const isAi = msg.senderType === 'AI_BOT';

            if (isNote) {
              return (
                <div 
                  key={msg.id} 
                  className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1.5 text-[11px] font-bold text-amber-800">
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-amber-600" />
                      <span>INTERNAL NOTE — {msg.senderName}</span>
                    </div>
                    <span className="text-[10px] text-amber-600 font-mono">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="text-amber-950 whitespace-pre-wrap leading-relaxed">
                    {msg.content}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}
              >
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 px-1">
                  <span className="font-semibold text-slate-600">{msg.senderName}</span>
                  <span>•</span>
                  <span className="font-mono">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {msg.channel && <span className="text-slate-400">via {msg.channel}</span>}
                </div>

                <div
                  className={`max-w-xl rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm whitespace-pre-wrap ${
                    isCustomer
                      ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'
                      : isAi
                      ? 'bg-purple-50 border border-purple-200 text-purple-900 rounded-tr-sm'
                      : 'bg-purple-600 text-white rounded-tr-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Composer Section */}
      <div className="p-4 border-t border-slate-200 bg-white space-y-2.5">
        {/* Quick Suggestion & Macros Bar */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-[11px]">
          <div className="flex items-center gap-1.5">
            {suggestedReply && (
              <button
                onClick={handleInsertAiSuggestion}
                className="flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 px-3 py-1 rounded-xl font-bold transition-all shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Insert AI Suggestion</span>
              </button>
            )}

            {/* Macros */}
            <button
              onClick={() => applyMacro("I have verified the duplicate charge on invoice #INV-9821 and executed a full refund of $350.00 back to your original payment method under Policy #REF-202.")}
              className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-xl transition-colors font-medium"
            >
              Macro: Duplicate Refund
            </button>
            <button
              onClick={() => applyMacro("We checked tracking details with the carrier. The package departed the sorting facility and will be delivered tomorrow afternoon.")}
              className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-xl transition-colors font-medium"
            >
              Macro: Shipping Update
            </button>
          </div>

          {/* Tone Selector */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-xl">
            <Wand2 className="w-3 h-3 text-purple-600" />
            <span className="text-slate-400 text-[10px] font-semibold">Tone:</span>
            <select
              value={selectedTone}
              onChange={(e) => handleToneChange(e.target.value)}
              disabled={isRewriting}
              className="bg-transparent text-slate-800 font-bold focus:outline-none cursor-pointer text-[10px]"
            >
              <option value="PROFESSIONAL">Professional</option>
              <option value="FRIENDLY">Friendly 😊</option>
              <option value="CONCISE">Concise</option>
              <option value="APOLOGETIC">Apologetic</option>
              <option value="TECHNICAL">Technical</option>
            </select>
          </div>
        </div>

        {/* Textarea */}
        <div className={`relative rounded-2xl border transition-all ${
          isCoachingWhisper
            ? 'bg-indigo-50/70 border-indigo-300 focus-within:border-indigo-500'
            : isInternalNote 
            ? 'bg-amber-50/70 border-amber-300 focus-within:border-amber-500' 
            : 'bg-slate-50 border-slate-200 focus-within:border-purple-500 focus-within:bg-white'
        }`}>
          <textarea
            rows={3}
            placeholder={
              isCoachingWhisper
                ? "💡 Write a supervisor coaching whisper (only visible to agent Elena)..."
                : isInternalNote 
                ? "Write an internal team note (only agents and AI can see this)..." 
                : "Reply to customer (Ctrl+Enter to send)..."
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none resize-none leading-relaxed"
          />

          {/* Footer controls inside input box */}
          <div className="px-4 py-2.5 border-t border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Note Toggle */}
              <button
                type="button"
                onClick={() => {
                  setIsInternalNote(!isInternalNote);
                  if (isCoachingWhisper) setIsCoachingWhisper(false);
                }}
                className={`flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                  isInternalNote 
                    ? 'bg-amber-200/80 text-amber-900 border border-amber-300' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Lock className="w-3 h-3" />
                <span>Internal Note</span>
              </button>

              {/* Coaching Whisper Toggle */}
              <button
                type="button"
                onClick={() => {
                  setIsCoachingWhisper(!isCoachingWhisper);
                  if (!isCoachingWhisper) setIsInternalNote(true);
                }}
                className={`flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                  isCoachingWhisper 
                    ? 'bg-indigo-200/80 text-indigo-900 border border-indigo-300' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Lightbulb className="w-3 h-3 text-amber-500" />
                <span>Supervisor Whisper</span>
              </button>

              <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                ⌘+Enter to send
              </span>
            </div>

            <button
              type="button"
              onClick={handleSend}
              disabled={!inputText.trim()}
              className={`flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded-xl shadow-sm transition-all ${
                isInternalNote
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/30'
              } disabled:opacity-40 disabled:cursor-not-allowed active:scale-95`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isInternalNote ? 'Save Note' : 'Send Reply'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pega Enterprise Modals */}
      <CustomerVerificationModal
        isOpen={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
        customerName={ticket.customerName || 'Sarah Chen'}
        customerEmail={ticket.customerEmail || 'sarah.chen@acmeglobal.com'}
        verification={verification}
        onVerificationUpdate={(updated) => setVerification(updated)}
      />

      <GuidedProductFixer
        isOpen={showDiagnosticModal}
        onClose={() => setShowDiagnosticModal(false)}
        ticketId={ticket.id}
        ticketTitle={ticket.title}
        onSessionComplete={(session) => {
          onSendMessage(`[Pega Guided Diagnostic Fixer Completed]: Hardware RMA #${session.rmaDetails?.rmaNumber} dispatched with ${session.rmaDetails?.courier}. Firmware hotfix scheduled.`, true);
        }}
      />

      <AutoWrapUpModal
        isOpen={showWrapUpModal}
        onClose={() => setShowWrapUpModal(false)}
        ticketId={ticket.id}
        ticketTitle={ticket.title}
        customerName={ticket.customerName || 'Sarah Chen'}
        customerTier={ticket.tags?.toLowerCase().includes('vip') || ticket.priority === 'CRITICAL' ? 'ENTERPRISE' : 'STANDARD'}
        onWrapUpComplete={(summary) => {
          onUpdateStatus('RESOLVED');
          onSendMessage(`[Pega GenAI Auto-Wrap-Up Applied]:\n• Disposition: ${summary.dispositionCode}\n• Resolution: ${summary.resolutionSummary}\n• Sentiment Trajectory Shift: +${summary.sentimentShiftPercent}% (CSAT: ${summary.estimatedCsat}/5)`, true);
        }}
      />
    </div>
  );
};
