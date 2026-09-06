import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Pause, 
  Play, 
  Sparkles, 
  User, 
  ShieldCheck, 
  Activity, 
  Clock,
  Radio,
  FileText,
  Volume2
} from 'lucide-react';
import { VoiceCallSession } from '../../types';

export const VoiceContactCenter: React.FC = () => {
  const [callStatus, setCallStatus] = useState<'IDLE' | 'RINGING' | 'CONNECTED' | 'ON_HOLD'>('RINGING');
  const [callSeconds, setCallSeconds] = useState(74);
  const [isMuted, setIsMuted] = useState(false);
  const [disposition, setDisposition] = useState('Billing Duplicate - Refund Initiated');
  const [isCallLogged, setIsCallLogged] = useState(false);

  // Active call timer
  useEffect(() => {
    let timer: any;
    if (callStatus === 'CONNECTED') {
      timer = setInterval(() => setCallSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [callStatus]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const transcripts = [
    { speaker: 'Sarah Chen (Customer)', time: '00:04', text: "Hi, I noticed two identical $350 debits on our corporate Visa for invoice #INV-9821 this morning." },
    { speaker: 'Support Specialist', time: '00:15', text: "Hello Sarah! Thanks for calling SupportOS priority line. Let me pull up invoice #INV-9821 right now." },
    { speaker: 'Support Specialist', time: '00:32', text: "I can confirm both transactions cleared simultaneously due to a gateway timeout. I've initiated an instant reversal of the second $350." },
    { speaker: 'Sarah Chen (Customer)', time: '00:58', text: "That is amazing. Will we receive an updated statement via email?" },
    { speaker: 'Support Specialist', time: '01:10', text: "Yes, the credit confirmation statement is being generated and sent to sarah.chen@apexcloud.io immediately." }
  ];

  const handleAnswer = () => setCallStatus('CONNECTED');
  const handleHangup = () => setCallStatus('IDLE');
  const handleHold = () => setCallStatus(s => s === 'ON_HOLD' ? 'CONNECTED' : 'ON_HOLD');

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded">
              Contact Center & Cloud Telephony Layer
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Phone className="w-5 h-5 text-violet-400" />
            <span>Voice Center & Live AI Transcription</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Inbound call routing, live conversational speech-to-text, real-time sentiment analysis, and automated post-call disposition.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>WebRTC Phone: Ready</span>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Softphone & Call Controller */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-6">
          {/* Active Caller Card */}
          <div className="text-center space-y-3">
            <div className="relative inline-block">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center mx-auto shadow-xl shadow-violet-500/20">
                SC
              </div>
              {callStatus === 'CONNECTED' && (
                <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-slate-900 rounded-full animate-ping" />
              )}
            </div>

            <div>
              <h3 className="text-base font-bold text-white">Sarah Chen</h3>
              <p className="text-xs text-slate-400 font-mono">+1-415-892-0192 • Apex Cloud</p>
              <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Enterprise VIP Caller (Tier 1)
              </div>
            </div>

            {/* Status & Timer */}
            <div className="pt-2">
              <div className={`text-sm font-bold font-mono ${
                callStatus === 'CONNECTED' ? 'text-emerald-400' : callStatus === 'RINGING' ? 'text-amber-400 animate-bounce' : 'text-slate-400'
              }`}>
                {callStatus === 'RINGING' && '🔔 Incoming Priority Call...'}
                {callStatus === 'CONNECTED' && `Call Active: ${formatSeconds(callSeconds)}`}
                {callStatus === 'ON_HOLD' && 'Call On Hold (Music Playing)'}
                {callStatus === 'IDLE' && 'Call Concluded'}
              </div>
            </div>

            {/* Audio Waveform Animation during call */}
            {callStatus === 'CONNECTED' && (
              <div className="flex items-center justify-center gap-1 h-8 pt-2">
                {[40, 75, 30, 90, 60, 100, 45, 80, 50, 95, 30, 60].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-violet-400 rounded-full animate-pulse"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Call Action Controls */}
          <div className="space-y-4">
            {callStatus === 'RINGING' ? (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleAnswer}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all active:scale-95"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>Answer Call</span>
                </button>
              </div>
            ) : callStatus === 'CONNECTED' || callStatus === 'ON_HOLD' ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-2.5 rounded-lg border font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      isMuted ? 'bg-rose-500/20 border-rose-500/40 text-rose-300' : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    <span>{isMuted ? 'Muted' : 'Mute'}</span>
                  </button>

                  <button
                    onClick={handleHold}
                    className={`p-2.5 rounded-lg border font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      callStatus === 'ON_HOLD' ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    {callStatus === 'ON_HOLD' ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    <span>{callStatus === 'ON_HOLD' ? 'Resume' : 'Hold'}</span>
                  </button>
                </div>

                <button
                  onClick={handleHangup}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md shadow-rose-500/30 transition-all active:scale-95"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>End Session</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCallStatus('RINGING')}
                className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Simulate Inbound Call</span>
              </button>
            )}
          </div>
        </div>

        {/* Column 2: Live AI Speech-to-Text Transcription */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Live Speech Transcription (STT)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded font-semibold">
              Real-Time Stream
            </span>
          </div>

          {/* Transcript Scroll Area */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
            {transcripts.map((t, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-slate-300">{t.speaker}</span>
                  <span className="text-slate-500 font-mono">{t.time}</span>
                </div>
                <p className="text-slate-200 leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: AI Intelligence, Sentiment & Post-Call Summary */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>AI Call Intelligence</span>
              </h3>
              <span className="text-[10px] font-mono text-blue-400">Audio Telemetry</span>
            </div>

            {/* Sentiment Meter */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Caller Sentiment</span>
                <span className="font-bold text-emerald-400">Positive (+72% recovery)</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
              </div>
              <p className="text-[11px] text-slate-400">
                Customer started frustrated due to duplicate debit, became relieved upon immediate reversal confirmation.
              </p>
            </div>

            {/* Auto-Generated Summary */}
            <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-2">
              <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                <span>AI Auto-Generated Call Summary</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/60">
                Caller Sarah Chen contacted priority phone support regarding duplicate $350 debit for invoice #INV-9821. Agent verified simultaneous clearance in Stripe gateway and processed immediate full reversal under Policy #REF-202. Credit memo dispatched to customer.
              </p>
            </div>

            {/* Disposition selector */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-slate-300">
                Call Disposition Code
              </label>
              <select
                value={disposition}
                onChange={(e) => setDisposition(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
              >
                <option value="Billing Duplicate - Refund Initiated">Billing Duplicate - Refund Initiated</option>
                <option value="Shipping Status Delay - Tracer Opened">Shipping Status Delay - Tracer Opened</option>
                <option value="Technical Crash - Escalated to DevOps">Technical Crash - Escalated to DevOps</option>
                <option value="General Account Advisory">General Account Advisory</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => {
              setIsCallLogged(true);
              setTimeout(() => setIsCallLogged(false), 3000);
            }}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isCallLogged ? '✓ Call Logged to Customer 360 Timeline!' : 'Log Call & Summary to Customer 360'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
