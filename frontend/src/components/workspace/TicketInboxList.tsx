import React from 'react';
import { 
  Ticket, 
  Channel, 
  TicketPriority, 
  TicketStatus 
} from '../../types';
import { 
  Mail, 
  MessageSquare, 
  Radio, 
  Phone, 
  Globe, 
  Clock, 
  AlertCircle, 
  Flame, 
  Smile, 
  Meh, 
  Frown,
  CheckCircle2,
  Filter
} from 'lucide-react';

interface TicketInboxListProps {
  tickets: Ticket[];
  selectedTicketId: number | null;
  onSelectTicket: (ticket: Ticket) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (priority: string) => void;
}

export const TicketInboxList: React.FC<TicketInboxListProps> = ({
  tickets,
  selectedTicketId,
  onSelectTicket,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange
}) => {
  const getChannelIcon = (channel: Channel) => {
    switch (channel) {
      case 'EMAIL':
        return <Mail className="w-3 h-3 text-blue-400" />;
      case 'LIVE_CHAT':
        return <MessageSquare className="w-3 h-3 text-sky-400" />;
      case 'WHATSAPP':
        return <Radio className="w-3 h-3 text-emerald-400" />;
      case 'VOICE':
        return <Phone className="w-3 h-3 text-purple-400" />;
      default:
        return <Globe className="w-3 h-3 text-slate-400" />;
    }
  };

  const getPriorityBadge = (priority: TicketPriority) => {
    switch (priority) {
      case 'CRITICAL':
        return <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1"><Flame className="w-2.5 h-2.5" /> CRITICAL</span>;
      case 'HIGH':
        return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-1.5 py-0.5 rounded">HIGH</span>;
      case 'MEDIUM':
        return <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-medium px-1.5 py-0.5 rounded">MED</span>;
      case 'LOW':
        return <span className="bg-slate-800 text-slate-400 text-[10px] font-medium px-1.5 py-0.5 rounded">LOW</span>;
    }
  };

  const getSentimentIcon = (sentiment?: string) => {
    switch (sentiment?.toUpperCase()) {
      case 'POSITIVE':
        return <span title="Sentiment: Positive"><Smile className="w-3 h-3 text-emerald-400" /></span>;
      case 'FRUSTRATED':
      case 'ANGRY':
        return <span title="Sentiment: Frustrated / Angry"><Frown className="w-3 h-3 text-rose-400" /></span>;
      default:
        return <span title="Sentiment: Neutral"><Meh className="w-3 h-3 text-slate-400" /></span>;
    }
  };

  const formatSla = (slaDueAt?: string) => {
    if (!slaDueAt) return 'No SLA';
    const diff = new Date(slaDueAt).getTime() - Date.now();
    if (diff <= 0) return 'SLA Breached!';
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m remaining`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m remaining`;
  };

  return (
    <div className="w-80 border-r border-slate-800 bg-slate-900/40 flex flex-col h-[calc(100vh-3.5rem)] select-none">
      {/* List Header & Quick Filters */}
      <div className="p-3 border-b border-slate-800/80 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-blue-400" />
            <span>Triage Feed</span>
          </span>
          <span className="text-[11px] font-mono text-slate-400 font-semibold">
            {tickets.length} tickets
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 text-[11px]">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="flex-1 bg-slate-950/80 border border-slate-800 rounded px-2 py-1 text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Status: All</option>
            <option value="NEW">New</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="WAITING_ON_CUSTOMER">Waiting on Customer</option>
            <option value="RESOLVED">Resolved</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
            className="w-28 bg-slate-950/80 border border-slate-800 rounded px-2 py-1 text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Priority: All</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      {/* Ticket List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/50">
        {tickets.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No tickets match the current queue filters.
          </div>
        ) : (
          tickets.map((ticket) => {
            const isSelected = ticket.id === selectedTicketId;
            return (
              <div
                key={ticket.id}
                onClick={() => onSelectTicket(ticket)}
                className={`p-3 cursor-pointer transition-all border-l-2 ${
                  isSelected
                    ? 'bg-blue-600/10 border-blue-500 text-white'
                    : 'border-transparent hover:bg-slate-800/40 text-slate-300'
                }`}
              >
                {/* Channel, Number, Priority */}
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="p-1 rounded bg-slate-800 border border-slate-700/60">
                      {getChannelIcon(ticket.channel)}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-300">
                      #{ticket.ticketNumber}
                    </span>
                    {getSentimentIcon(ticket.sentiment)}
                  </div>
                  <div className="flex items-center gap-1">
                    {getPriorityBadge(ticket.priority)}
                  </div>
                </div>

                {/* Title */}
                <div className="text-xs font-semibold text-slate-100 line-clamp-1 mb-1">
                  {ticket.title}
                </div>

                {/* Customer name & Description preview */}
                <div className="text-[11px] text-slate-400 line-clamp-1 mb-2">
                  <span className="text-slate-300 font-medium">{ticket.customerName || 'Customer'}: </span>
                  {ticket.description}
                </div>

                {/* Meta info & SLA */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/40">
                  <span className="bg-slate-800/80 px-1.5 py-0.5 rounded text-slate-400 font-medium">
                    {ticket.category}
                  </span>
                  
                  <span className={`flex items-center gap-1 font-mono font-medium ${
                    ticket.priority === 'CRITICAL' ? 'text-rose-400 font-bold animate-pulse' : 'text-slate-400'
                  }`}>
                    <Clock className="w-2.5 h-2.5" />
                    {formatSla(ticket.slaDueAt)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
