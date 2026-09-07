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
  Flame, 
  Smile, 
  Meh, 
  Frown,
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
        return <Mail className="w-3 h-3 text-purple-600" />;
      case 'LIVE_CHAT':
        return <MessageSquare className="w-3 h-3 text-sky-600" />;
      case 'WHATSAPP':
        return <Radio className="w-3 h-3 text-emerald-600" />;
      case 'VOICE':
        return <Phone className="w-3 h-3 text-purple-600" />;
      default:
        return <Globe className="w-3 h-3 text-slate-400" />;
    }
  };

  const getPriorityBadge = (priority: TicketPriority) => {
    switch (priority) {
      case 'CRITICAL':
        return <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Flame className="w-2.5 h-2.5" /> CRITICAL</span>;
      case 'HIGH':
        return <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full">HIGH</span>;
      case 'MEDIUM':
        return <span className="bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-medium px-2 py-0.5 rounded-full">MED</span>;
      case 'LOW':
        return <span className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full">LOW</span>;
    }
  };

  const getSentimentIcon = (sentiment?: string) => {
    switch (sentiment?.toUpperCase()) {
      case 'POSITIVE':
        return <span title="Sentiment: Positive"><Smile className="w-3.5 h-3.5 text-emerald-500" /></span>;
      case 'FRUSTRATED':
      case 'ANGRY':
        return <span title="Sentiment: Frustrated / Angry"><Frown className="w-3.5 h-3.5 text-rose-500" /></span>;
      default:
        return <span title="Sentiment: Neutral"><Meh className="w-3.5 h-3.5 text-slate-400" /></span>;
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
    <div className="w-80 border-r border-slate-200/90 bg-[#FDFCFE] flex flex-col h-[calc(100vh-3.5rem)] select-none">
      {/* List Header & Quick Filters */}
      <div className="p-3.5 border-b border-slate-200/90 bg-white space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-purple-600" />
            <span>Triage Queue</span>
          </span>
          <span className="text-[11px] font-mono text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full font-bold">
            {tickets.length} tickets
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 text-[11px]">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium focus:outline-none focus:border-purple-500"
          >
            <option value="ALL">Status: All</option>
            <option value="NEW">New</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="WAITING_ON_CUSTOMER">Waiting</option>
            <option value="RESOLVED">Resolved</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
            className="w-28 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium focus:outline-none focus:border-purple-500"
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
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-1.5 space-y-1">
        {tickets.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No tickets match the current queue filters.
          </div>
        ) : (
          tickets.map((ticket) => {
            const isSelected = ticket.id === selectedTicketId;
            return (
              <div
                key={ticket.id}
                onClick={() => onSelectTicket(ticket)}
                className={`p-3 rounded-xl cursor-pointer transition-all border-l-4 ${
                  isSelected
                    ? 'bg-white border-l-purple-600 shadow-sm border border-slate-200/90'
                    : 'bg-white/60 border-l-transparent border border-transparent hover:bg-white hover:border-slate-200/60'
                }`}
              >
                {/* Channel, Number, Priority */}
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="p-1 rounded-md bg-purple-50 border border-purple-100">
                      {getChannelIcon(ticket.channel)}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-700">
                      #{ticket.ticketNumber}
                    </span>
                    {getSentimentIcon(ticket.sentiment)}
                  </div>
                  <div>
                    {getPriorityBadge(ticket.priority)}
                  </div>
                </div>

                {/* Title */}
                <div className="text-xs font-bold text-slate-900 line-clamp-1 mb-1">
                  {ticket.title}
                </div>

                {/* Customer name & Description preview */}
                <div className="text-[11px] text-slate-500 line-clamp-1 mb-2">
                  <span className="text-slate-700 font-semibold">{ticket.customerName || 'Customer'}: </span>
                  {ticket.description}
                </div>

                {/* Meta info & SLA */}
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-100">
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
                    {ticket.category}
                  </span>
                  
                  <span className={`flex items-center gap-1 font-mono font-medium ${
                    ticket.priority === 'CRITICAL' ? 'text-rose-600 font-bold' : 'text-slate-500'
                  }`}>
                    <Clock className="w-3 h-3 text-slate-400" />
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
