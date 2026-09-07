import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  FileText, 
  Lock, 
  Eye, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  Search, 
  Plus, 
  CheckCircle2, 
  MessageSquare, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { ContactNote, ContactNoteType, InteractionRecord } from '../../types';

interface InteractionRecordViewProps {
  ticketId: number;
  customerName: string;
}

const MOCK_INTERACTION: InteractionRecord = {
  id: 'int-8841',
  interactionRef: 'INT-2026-8841',
  ticketId: 1042,
  customerName: 'Sarah Chen',
  channel: 'WHATSAPP',
  startedAt: '2026-09-06T14:22:10Z',
  endedAt: '2026-09-06T14:38:45Z',
  durationFormatted: '16m 35s',
  authRefId: 'AUTH-REF-8841-VIP',
  wrapUpCode: 'BILLING_RESOLVED',
  complianceVerified: true,
  audioWaveform: [30, 45, 60, 25, 80, 95, 70, 40, 55, 85, 90, 65, 35, 75, 85, 40, 50, 70, 60, 30],
  transcript: [
    { id: 'tr-1', timestamp: '00:05', speaker: 'CUSTOMER', text: 'Hi, I was charged twice for invoice #INV-9821 on Stripe. $350 each.', sentiment: 'NEGATIVE' },
    { id: 'tr-2', timestamp: '00:45', speaker: 'AGENT', text: 'Hello Sarah, I understand completely and apologize for the error. Let me verify your account first.', sentiment: 'POSITIVE' },
    { id: 'tr-3', timestamp: '02:10', speaker: 'AI_BOT', text: 'Pega Security Broker elevated session to FULLY_AUTHENTICATED via OTP #849201.', sentiment: 'POSITIVE' },
    { id: 'tr-4', timestamp: '04:30', speaker: 'AGENT', text: 'Thank you. I have pulled up transaction tx_9821. It looks like a duplicate webhook triggered the duplicate capture.', sentiment: 'NEUTRAL' },
    { id: 'tr-5', timestamp: '08:15', speaker: 'SUPERVISOR', text: '[Whisper to Agent]: Check if their edge router also has the memory leak patch pending.', sentiment: 'NEUTRAL' },
    { id: 'tr-6', timestamp: '11:20', speaker: 'AGENT', text: 'I have issued the $350 refund directly to your Mastercard ending in 4242, and also queued an RMA replacement for your router.', sentiment: 'POSITIVE' },
    { id: 'tr-7', timestamp: '15:10', speaker: 'CUSTOMER', text: 'That is incredible service. Thank you so much for fixing both issues so quickly!', sentiment: 'POSITIVE' },
  ],
  notes: [
    {
      id: 'not-1',
      ticketId: 1042,
      authorName: 'Elena Rostova',
      authorRole: 'Senior Support Specialist',
      noteType: 'GENERAL',
      content: 'Customer confirmed duplicate charge on invoice #INV-9821. Verified payment gateway logs in Stripe.',
      timestamp: 'Sep 6, 2026, 2:25 PM',
      isAudited: true,
    },
    {
      id: 'not-2',
      ticketId: 1042,
      authorName: 'Marcus Vance',
      authorRole: 'Support Supervisor',
      noteType: 'COACHING_WHISPER',
      content: 'Excellent handling of customer frustration. Proactive diagnostic check saved a future return call.',
      timestamp: 'Sep 6, 2026, 2:32 PM',
      isAudited: true,
    },
    {
      id: 'not-3',
      ticketId: 1042,
      authorName: 'Compliance Guardian Engine',
      authorRole: 'Automated Audit Bot',
      noteType: 'COMPLIANCE_FLAG',
      content: 'Customer authentication passed ISO-27001 standard. RefID #AUTH-REF-8841-VIP recorded in immutable ledger.',
      timestamp: 'Sep 6, 2026, 2:38 PM',
      isAudited: true,
    },
  ],
};

export const InteractionRecordView: React.FC<InteractionRecordViewProps> = ({ ticketId, customerName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(42); // seconds
  const [searchQuery, setSearchQuery] = useState('');
  const [notes, setNotes] = useState<ContactNote[]>(MOCK_INTERACTION.notes);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteType, setNewNoteType] = useState<ContactNoteType>('GENERAL');
  const [showAddNote, setShowAddNote] = useState(false);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAddNote = () => {
    if (!newNoteContent.trim()) return;
    const newNote: ContactNote = {
      id: `not-${Date.now()}`,
      ticketId,
      authorName: 'Elena Rostova',
      authorRole: 'Active Agent',
      noteType: newNoteType,
      content: newNoteContent,
      timestamp: 'Just now',
      isAudited: true,
    };
    setNotes([newNote, ...notes]);
    setNewNoteContent('');
    setShowAddNote(false);
  };

  const filteredTranscript = MOCK_INTERACTION.transcript.filter((line) =>
    line.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    line.speaker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Interaction Overview Banner */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Pega Interaction Record: {MOCK_INTERACTION.interactionRef}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-1 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" /> Compliance Audited
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Channel: <span className="text-indigo-400 font-semibold">{MOCK_INTERACTION.channel}</span> • Duration: {MOCK_INTERACTION.durationFormatted} • RefID: {MOCK_INTERACTION.authRefId}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              Wrap: {MOCK_INTERACTION.wrapUpCode}
            </span>
          </div>
        </div>

        {/* Audio Waveform & Player Console */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div className="flex items-center gap-4">
            <button
              onClick={handleTogglePlay}
              className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            {/* Waveform Scrubber */}
            <div className="flex-1 flex items-center gap-1 h-8">
              {MOCK_INTERACTION.audioWaveform?.map((height, idx) => (
                <div
                  key={idx}
                  className={`flex-1 rounded-full transition-all duration-200 ${
                    idx < 8 ? 'bg-indigo-500' : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>04:12 / 16:35</span>
            </div>
            <Volume2 className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Synchronized Transcript with Search */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            Synchronized Interaction Transcript
          </h4>
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transcript..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-2">
          {filteredTranscript.map((line) => (
            <div
              key={line.id}
              className={`p-3 rounded-xl text-xs border transition-all ${
                line.speaker === 'SUPERVISOR'
                  ? 'bg-amber-500/10 border-amber-500/30'
                  : line.speaker === 'AI_BOT'
                  ? 'bg-purple-500/10 border-purple-500/30'
                  : line.speaker === 'AGENT'
                  ? 'bg-indigo-500/5 border-indigo-500/20'
                  : 'bg-slate-950/40 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`font-semibold ${
                    line.speaker === 'SUPERVISOR'
                      ? 'text-amber-400'
                      : line.speaker === 'AI_BOT'
                      ? 'text-purple-400'
                      : line.speaker === 'AGENT'
                      ? 'text-indigo-300'
                      : 'text-slate-300'
                  }`}
                >
                  {line.speaker === 'SUPERVISOR' ? '💡 Supervisor Whisper' : line.speaker}
                </span>
                <span className="font-mono text-[11px] text-slate-400">{line.timestamp}</span>
              </div>
              <p className="text-slate-200 leading-relaxed">{line.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pega Contact Notes Record */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              Pega Contact Notes Record & Audit Log
            </h4>
            <p className="text-xs text-slate-400">Classified notes attached to interaction session.</p>
          </div>
          <button
            onClick={() => setShowAddNote(!showAddNote)}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Add Contact Note
          </button>
        </div>

        {/* Add Note Card */}
        {showAddNote && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-700 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-400">Note Classification:</label>
              {(['GENERAL', 'INTERNAL_CONFIDENTIAL', 'COACHING_WHISPER', 'COMPLIANCE_FLAG'] as ContactNoteType[]).map(
                (type) => (
                  <button
                    key={type}
                    onClick={() => setNewNoteType(type)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                      newNoteType === type
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    {type.replace('_', ' ')}
                  </button>
                )
              )}
            </div>
            <textarea
              rows={3}
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Record detailed interaction notes or compliance observations..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddNote(false)}
                className="px-3 py-1.5 rounded-lg text-slate-400 text-xs hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
              >
                Save Immutable Note
              </button>
            </div>
          </div>
        )}

        {/* Notes List */}
        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-4 rounded-xl border text-xs space-y-2 ${
                note.noteType === 'COMPLIANCE_FLAG'
                  ? 'bg-emerald-500/5 border-emerald-500/30'
                  : note.noteType === 'COACHING_WHISPER'
                  ? 'bg-amber-500/5 border-amber-500/30'
                  : note.noteType === 'INTERNAL_CONFIDENTIAL'
                  ? 'bg-rose-500/5 border-rose-500/30'
                  : 'bg-slate-800/40 border-slate-700/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{note.authorName}</span>
                  <span className="text-[11px] text-slate-400">({note.authorRole})</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      note.noteType === 'COMPLIANCE_FLAG'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : note.noteType === 'COACHING_WHISPER'
                        ? 'bg-amber-500/20 text-amber-300'
                        : note.noteType === 'INTERNAL_CONFIDENTIAL'
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {note.noteType.replace('_', ' ')}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">{note.timestamp}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
