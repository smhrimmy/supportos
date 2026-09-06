import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  ArrowRight,
  Eye,
  ThumbsUp,
  Tag
} from 'lucide-react';
import { KnowledgeArticle } from '../../types';
import { api } from '../../services/api';

export const KnowledgeBaseView: React.FC = () => {
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [gaps, setGaps] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [fetchedArticles, fetchedGaps] = await Promise.all([
      api.getKnowledgeArticles(),
      api.getKnowledgeGaps()
    ]);
    setArticles(fetchedArticles);
    setGaps(fetchedGaps);
    if (fetchedArticles.length > 0) {
      setSelectedArticle(fetchedArticles[0]);
    }
  };

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
              Self-Improving AI Knowledge Engine
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <span>Knowledge Base & AI Gap Intelligence</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Empower human agents and autonomous AI bots with real-time validated company documentation and proactive knowledge gap detection.
          </p>
        </div>

        <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-md transition-all">
          <Plus className="w-3.5 h-3.5" />
          <span>New Article</span>
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Article List & AI Gaps */}
        <div className="space-y-6">
          {/* AI Gap Detection Box */}
          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-purple-300">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>AI Detected Knowledge Gaps</span>
              </span>
              <span className="text-[10px] font-mono bg-purple-500/30 text-purple-200 px-1.5 py-0.5 rounded">
                Unanswered Queries
              </span>
            </div>

            <div className="space-y-2">
              {gaps.map((gap, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                  <div className="font-semibold text-slate-200 leading-snug">"{gap.question}"</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="text-purple-300 font-medium">Asked {gap.frequency} times ({gap.trend})</span>
                    <button 
                      onClick={() => alert(`AI auto-generated draft for: ${gap.suggestedTitle}`)}
                      className="text-blue-400 font-bold hover:underline"
                    >
                      Draft Article →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Article List with Search */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles & SOPs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              {filteredArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedArticle?.id === art.id
                      ? 'bg-blue-600/10 border-blue-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="bg-slate-800 px-1.5 py-0.5 rounded font-medium">{art.category}</span>
                    <span className="text-emerald-400 font-semibold">{art.status}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-100">{art.title}</div>
                  <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-2">
                    <span className="flex items-center gap-1"><ThumbsUp className="w-2.5 h-2.5" /> {art.helpfulCount} helpful</span>
                    <span className="flex items-center gap-1"><Eye className="w-2.5 h-2.5" /> {art.viewCount} views</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Article Viewer / Editor */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col h-full">
          {selectedArticle ? (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                    {selectedArticle.category}
                  </span>
                  <h2 className="text-base font-bold text-white mt-1.5">{selectedArticle.title}</h2>
                </div>
                <button className="bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700">
                  Edit Article
                </button>
              </div>

              <div className="prose prose-invert prose-xs max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
                {selectedArticle.content}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-500">
              Select an article to view content
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
