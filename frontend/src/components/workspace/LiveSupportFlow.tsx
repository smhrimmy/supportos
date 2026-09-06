import React, { useState } from 'react';
import { 
  Ticket, 
  Message, 
  SenderType, 
  Channel, 
  TicketStatus, 
  TicketPriority,
  SwarmParticipant 
} from '../../types';
import { 
  Send, 
  Lock, 
  Sparkles, 
  Clock, 
  UserCheck, 
  ChevronDown, 
  Smile, 
  Paperclip, 
  Wand2, 
  Radio, 
  Mail, 
  MessageSquare, 
  Phone, 
  ShieldCheck,
  AlertCircle,
  Users,
  GitPullRequest,
  ExternalLink,
  Plus
} from 'lucide-react';

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
  const [activeSubTab, setActiveSubTab] = useState<'CONVERSATION' | 'CASE_SWARM'>('CONVERSATION');
  const [inputText, setInputText] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [selectedTone, setSelectedTone] = useState('PROFESSIONAL');
  const [isRewriting, setIsRewriting] = useState(false);

  const swarmParticipants: SwarmParticipant[] = [
    { id: 1, name: 'Marcus Vance', role: 'Billing Specialist', department: 'Finance', isOnline: true, avatar: 'MV' },
    { id: 2, name: 'Alex Rivera', role: 'Lead DevOps Engineer', department: 'Engineering', isOnline: true, avatar: 'AR' },
    { id: 3, name: 'Elena Rostova', role: 'Escalation Director', department: 'Operations', isOnline: true, avatar: 'ER' }
  ];

  if (!ticket) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-950 p-8 text-center text-slate-500">
        <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-3">
          <MessageSquare className="w-6 h-6 text-slate-600" />
        </div>
        <h3 className="text-sm font-semibold text-slate-300 mb-1">No Ticket Selected</h3>
        <p className="text-xs text-slate-500 max-w-sm">
          Select a ticket from the triage queue on the left to start live resolution and copilot actions.
        </p>
      </div>
    );
  }

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim(), isInternalNote);
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
    if (!inputText.trim()) {
      if (suggestedReply) {
        setIsRewriting(true);
        try {
          const res = await onRewriteTone(suggestedReply, tone);
          setInputText(res);
        } finally {
          setIsRewriting(false);
        }
      }
      return;
    }
    setIsRewriting(true);
    try {
      const res = await onRewriteTone(inputText, tone);
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
        return <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full"><Radio className="w-3 h-3" /> WhatsApp Live</span>;
      case 'LIVE_CHAT':
        return <span className="flex items-center gap-1 text-[11px] font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-full"><MessageSquare className="w-3 h-3" /> Live Chat</span>;
      case 'EMAIL':
        return <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full"><Mail className="w-3 h-3" /> Email Inbound</span>;
      case 'VOICE':
        return <span className="flex items-center gap-1 text-[11px] font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full"><Phone className="w-3 h-3" /> Voice Session</span>;
      default:
        return <span className="text-[11px] font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full">{ch}</span>;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 border-r border-slate-800">
      {/* Ticket Header & Controls */}
      <div className="p-3.5 border-b border-slate-800 bg-slate-900/50 backdrop-blur flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              #{ticket.ticketNumber}
            </span>
            {getChannelBadge(ticket.channel)}
            <span className="text-xs font-semibold text-slate-400">
              • {ticket.category}
            </span>
          </div>
          <h2 className="text-sm font-bold text-white truncate">
            {ticket.title}
          </h2>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          {/* Sub Tab Switcher: Conversation vs Case Swarm */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setActiveSubTab('CONVERSATION')}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                activeSubTab === 'CONVERSATION' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Stream
            </button>
            <button
              onClick={() => setActiveSubTab('CASE_SWARM')}
              className={`px-2.5 py-1 rounded font-semibold flex items-center gap-1 transition-all ${
                activeSubTab === 'CASE_SWARM' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-3 h-3 text-indigo-400" />
              <span>Case Swarm (3)</span>
            </button>
          </div>

          {/* Status Dropdown */}
          <select
            value={ticket.status}
            onChange={(e) => onUpdateStatus(e.target.value as TicketStatus)}
            className="bg-slate-900 border border-slate-700 text-xs text-slate-200 font-semibold px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="NEW">New</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="WAITING_ON_CUSTOMER">Waiting on Customer</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>

          {/* Assigned Agent */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 text-xs px-2.5 py-1.5 rounded-lg text-slate-200">
            <UserCheck className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-300">
              {ticket.assignedAgentName || 'Unassigned'}
            </span>
          </div>
        </div>
      </div>

      {/* SWARM ROOM VIEW (Salesforce-style Case Swarming) */}
      {activeSubTab === 'CASE_SWARM' ? (
        <div className="flex-1 p-6 space-y-5 overflow-y-auto bg-slate-950/60">
          <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Salesforce-Style Active Case Swarm</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Cross-functional resolution swarm linked to <strong className="text-white">#swarm-tck-1042-billing</strong> on Slack.
              </p>
            </div>
            <button 
              onClick={() => alert("Specialist invited to Swarm!")}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Invite Swarmer</span>
            </button>
          </div>

          {/* Active Swarmers */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Active Swarm Participants
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {swarmParticipants.map((sp) => (
                <div key={sp.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-white font-bold text-xs flex items-center justify-center">
                    {sp.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{sp.name}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <div className="text-[10px] text-slate-400">{sp.role} • {sp.department}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Linked Engineering Issues */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Linked Engineering Artifacts
            </h4>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <GitPullRequest className="w-4 h-4 text-purple-400" />
                <span>GitHub Issue #882: Fix idempotency token expiration on checkout</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">
                Merged to Staging
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Message Thread Stream */
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {messages.map((msg) => {
            const isCustomer = msg.senderType === 'CUSTOMER';
            const isNote = msg.isInternalNote;
            const isAi = msg.senderType === 'AI_BOT';

            if (isNote) {
              return (
                <div 
                  key={msg.id} 
                  className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-200 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1 text-[11px] font-bold text-amber-400">
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3 h-3" />
                      <span>INTERNAL NOTE — {msg.senderName}</span>
                    </div>
                    <span className="text-[10px] text-amber-500/80 font-mono">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="text-amber-100 whitespace-pre-wrap leading-relaxed">
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
                  <span className="font-semibold text-slate-300">{msg.senderName}</span>
                  <span>•</span>
                  <span className="font-mono">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {msg.channel && <span className="text-slate-500">via {msg.channel}</span>}
                </div>

                <div
                  className={`max-w-xl rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm whitespace-pre-wrap ${
                    isCustomer
                      ? 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-sm'
                      : isAi
                      ? 'bg-purple-900/30 border border-purple-500/30 text-purple-100 rounded-tr-sm'
                      : 'bg-blue-600 text-white rounded-tr-sm'
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
      <div className="p-3 border-t border-slate-800 bg-slate-900/60 backdrop-blur space-y-2">
        {/* Quick Suggestion & Macros Bar */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-[11px]">
          <div className="flex items-center gap-1.5">
            {suggestedReply && (
              <button
                onClick={handleInsertAiSuggestion}
                className="flex items-center gap-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-md font-semibold transition-all"
              >
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>Insert AI Suggestion</span>
              </button>
            )}

            {/* Macros */}
            <button
              onClick={() => applyMacro("I have verified the duplicate charge on invoice #INV-9821 and executed a full refund of $350.00 back to your original payment method under Policy #REF-202.")}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-md transition-colors"
            >
              Macro: Duplicate Refund
            </button>
            <button
              onClick={() => applyMacro("We checked tracking details with the carrier. The package departed the sorting facility and will be delivered tomorrow afternoon.")}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-md transition-colors"
            >
              Macro: Shipping Update
            </button>
          </div>

          {/* Tone Selector */}
          <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 px-2 py-0.5 rounded-md">
            <Wand2 className="w-3 h-3 text-slate-400" />
            <span className="text-slate-400 text-[10px]">Tone:</span>
            <select
              value={selectedTone}
              onChange={(e) => handleToneChange(e.target.value)}
              disabled={isRewriting}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer text-[10px]"
            >
              <option value="PROFESSIONAL" className="bg-slate-900 text-white">Professional</option>
              <option value="FRIENDLY" className="bg-slate-900 text-white">Friendly 😊</option>
              <option value="CONCISE" className="bg-slate-900 text-white">Concise</option>
              <option value="APOLOGETIC" className="bg-slate-900 text-white">Apologetic</option>
              <option value="TECHNICAL" className="bg-slate-900 text-white">Technical</option>
            </select>
          </div>
        </div>

        {/* Textarea */}
        <div className={`relative rounded-xl border transition-all ${
          isInternalNote 
            ? 'bg-amber-950/20 border-amber-500/40 focus-within:border-amber-500' 
            : 'bg-slate-950/90 border-slate-800 focus-within:border-blue-500/70'
        }`}>
          <textarea
            rows={3}
            placeholder={isInternalNote ? "Write an internal team note (only agents and AI can see this)..." : "Reply to customer (Ctrl+Enter to send)..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none resize-none leading-relaxed"
          />

          {/* Footer controls inside input box */}
          <div className="px-3 py-2 border-t border-slate-800/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Note Toggle */}
              <button
                type="button"
                onClick={() => setIsInternalNote(!isInternalNote)}
                className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded transition-all ${
                  isInternalNote 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Lock className="w-3 h-3" />
                <span>Internal Note</span>
              </button>

              <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                Press ⌘+Enter to send
              </span>
            </div>

            <button
              type="button"
              onClick={handleSend}
              disabled={!inputText.trim()}
              className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-lg shadow-sm transition-all ${
                isInternalNote
                  ? 'bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              } disabled:opacity-40 disabled:cursor-not-allowed active:scale-95`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isInternalNote ? 'Save Note' : 'Send Reply'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
