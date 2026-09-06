import React, { useState } from 'react';
import { 
  LifeBuoy, 
  Search, 
  Sparkles, 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Package, 
  MessageSquare, 
  Plus, 
  ChevronRight,
  ShieldCheck,
  User,
  ExternalLink
} from 'lucide-react';
import { Ticket, CustomerOrder } from '../../types';

interface CustomerPortalViewProps {
  onBackToAgentWorkspace: () => void;
  orders: CustomerOrder[];
}

export const CustomerPortalView: React.FC<CustomerPortalViewProps> = ({
  onBackToAgentWorkspace,
  orders
}) => {
  const [activeTab, setActiveTab] = useState<'TICKETS' | 'AI_CHAT' | 'ORDERS' | 'KNOWLEDGE'>('TICKETS');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'AI', text: "Hello Sarah! I am your Apex Cloud Autonomous AI Support Assistant. How can I help you today? I can check order statuses, search our policies, or process eligible requests." },
    { sender: 'Customer', text: "Can you check why invoice #INV-9821 was charged twice?" },
    { sender: 'AI', text: "I looked up invoice #INV-9821 and verified the second $350.00 charge. A full refund has been initiated back to your Visa ending 4091. Tracking refund reference: #REF-202." }
  ]);
  const [chatInput, setChatInput] = useState('');

  const customerTickets: Partial<Ticket>[] = [
    {
      id: 1,
      ticketNumber: 'TCK-1042',
      title: 'Charged twice for monthly invoice #INV-9821',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      category: 'Billing',
      channel: 'WHATSAPP',
      slaDueAt: new Date(Date.now() + 45 * 60000).toISOString(),
      createdAt: '2026-09-07T00:30:00Z'
    },
    {
      id: 5,
      ticketNumber: 'TCK-998',
      title: 'Enterprise SSO Saml 2.0 Integration Assistance',
      status: 'RESOLVED',
      priority: 'MEDIUM',
      category: 'Technical',
      channel: 'EMAIL',
      createdAt: '2026-08-28T14:15:00Z'
    }
  ];

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'Customer', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        sender: 'AI',
        text: `I have analyzed your inquiry regarding "${userText}". All policies and telemetry data have been cross-checked. A support specialist has been alerted if further human intervention is required.`
      }]);
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-y-auto">
      {/* Customer Header Banner */}
      <div className="bg-gradient-to-r from-blue-900/40 via-indigo-950/40 to-slate-950 border-b border-slate-800 p-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
                Customer Self-Service Portal
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-xs text-slate-400">Apex Cloud Innovations</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Welcome back, Sarah Chen
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-lg">
              Track open support requests, chat directly with our autonomous AI resolver, inspect billing invoices, and browse product documentation.
            </p>
          </div>

          <button
            onClick={onBackToAgentWorkspace}
            className="self-start md:self-auto bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2 rounded-xl border border-slate-700 transition-all"
          >
            ← Back to Agent Console
          </button>
        </div>
      </div>

      {/* Portal Navigation Tabs */}
      <div className="border-b border-slate-800 bg-slate-900/40 px-8">
        <div className="max-w-5xl mx-auto flex gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('TICKETS')}
            className={`py-3.5 border-b-2 transition-all ${
              activeTab === 'TICKETS'
                ? 'border-blue-500 text-blue-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            My Support Tickets (2)
          </button>

          <button
            onClick={() => setActiveTab('AI_CHAT')}
            className={`py-3.5 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'AI_CHAT'
                ? 'border-purple-500 text-purple-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Chat with AI Support Bot</span>
          </button>

          <button
            onClick={() => setActiveTab('ORDERS')}
            className={`py-3.5 border-b-2 transition-all ${
              activeTab === 'ORDERS'
                ? 'border-blue-500 text-blue-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Invoices & Orders ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('KNOWLEDGE')}
            className={`py-3.5 border-b-2 transition-all ${
              activeTab === 'KNOWLEDGE'
                ? 'border-blue-500 text-blue-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Help Center & Guides
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 max-w-5xl mx-auto w-full p-8 space-y-6">
        
        {/* TAB: TICKETS */}
        {activeTab === 'TICKETS' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Your Support Tickets
              </h3>
              <button 
                onClick={() => alert("Open Customer Ticket Submission Modal")}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Submit New Issue</span>
              </button>
            </div>

            <div className="space-y-3">
              {customerTickets.map((t) => (
                <div key={t.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-400">#{t.ticketNumber}</span>
                      <span className="text-xs font-bold text-white">{t.title}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      t.status === 'RESOLVED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {t.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <div className="flex items-center gap-4">
                      <span>Category: <strong className="text-slate-200">{t.category}</strong></span>
                      <span>Channel: <strong className="text-slate-200">{t.channel}</strong></span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>SLA Response: Guaranteed within 45 mins</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: AI CHAT */}
        {activeTab === 'AI_CHAT' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-[520px]">
            <div className="p-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>SupportOS Autonomous Customer AI (Gemini 2.5)</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                ● Live Autonomous Mode
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.sender === 'Customer' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-slate-400 mb-0.5 px-1">{msg.sender}</span>
                  <div className={`max-w-md rounded-xl p-3 leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'Customer' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-slate-800 border border-slate-700 text-slate-100 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask our AI agent anything or request an action..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleSendChat}
                className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-xl transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB: ORDERS */}
        {activeTab === 'ORDERS' && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Your Billing & E-Commerce Transactions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orders.map((ord) => (
                <div key={ord.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-white">#{ord.orderNumber}</span>
                    <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded text-[10px]">
                      {ord.status}
                    </span>
                  </div>
                  <div className="text-slate-300">{ord.itemSummary}</div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-slate-400">
                    <span className="font-bold text-white text-sm">${ord.amount.toFixed(2)} USD</span>
                    {ord.trackingNumber && <span className="font-mono text-blue-400">Ref: {ord.trackingNumber}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: KNOWLEDGE */}
        {activeTab === 'KNOWLEDGE' && (
          <div className="space-y-4 text-xs">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search troubleshooting guides, policies, or FAQs..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 hover:border-blue-500/50 cursor-pointer transition-colors">
                <div className="text-blue-400 font-bold">Billing & Refund Policy</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Learn about automatic duplicate charge detection, SLA refund turnaround, and banking posting windows.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 hover:border-blue-500/50 cursor-pointer transition-colors">
                <div className="text-blue-400 font-bold">Carrier Tracking & Delivery ETAs</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  How FedEx and DHL real-time status updates are reflected in your account dashboard.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
