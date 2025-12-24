
import React, { useState } from 'react';
import { Icons } from '../constants';
import { generateMagicDraft } from '../services/geminiService';
import { Post } from '../types';

interface MagicDraftProps {
  onPostCreated: (post: Post) => void;
}

const MagicDraft: React.FC<MagicDraftProps> = ({ onPostCreated }) => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const draft = await generateMagicDraft(topic);
      const newPost: Post = {
        id: Date.now().toString(),
        title: draft.title,
        excerpt: draft.excerpt,
        content: draft.content,
        author: 'AI Architect',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: 'Calculating...',
        tags: draft.tags,
        imageUrl: `https://picsum.photos/seed/${Math.random()}/800/400`
      };
      
      const words = draft.content.split(/\s+/).length;
      const minutes = Math.ceil(words / 200);
      newPost.readTime = `${minutes} min read`;

      onPostCreated(newPost);
    } catch (err) {
      console.error(err);
      setError("Synchronous link with Gemini Core failed. Re-verify API credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="text-center space-y-6">
        <div className="relative inline-block">
          <div className="relative inline-flex items-center justify-center w-24 h-24 bg-slate-900 rounded-[2.5rem] text-white mb-4 shadow-2xl">
            <Icons.Sparkles />
          </div>
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-slate-900">AI Synthesizer</h1>
        <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-xl mx-auto">
          Draft technical masterpieces in seconds. Powered by the Gemini 3 Flash engine.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Research Prompt</label>
            <span className="text-[10px] text-slate-300 font-mono">LLM: Gemini-3-Flash</span>
          </div>
          <textarea
            required
            placeholder="Describe the article, framework, or concept you want to manifest..."
            className="w-full h-60 bg-slate-50 border border-slate-200 rounded-[2.5rem] p-10 focus:ring-4 focus:ring-slate-100 focus:border-slate-400 focus:outline-none resize-none transition-all placeholder:text-slate-300 text-slate-900 text-xl leading-relaxed shadow-sm"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-3 py-6 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed text-white font-black rounded-3xl transition-all shadow-xl active:scale-[0.98]"
        >
          {isLoading ? (
            <>
              <Icons.Loader />
              <span className="tracking-widest uppercase text-xs">Synthesizing draft...</span>
            </>
          ) : (
            <>
              <Icons.Sparkles />
              <span className="tracking-widest uppercase text-xs">Generate Technical Log</span>
            </>
          )}
        </button>

        {error && (
          <div className="p-6 bg-red-50 border border-red-100 rounded-3xl text-red-600 text-sm flex items-center space-x-4">
             <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center font-black">!</div>
             <p className="font-bold tracking-tight">{error}</p>
          </div>
        )}
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-10 bg-white border border-slate-200 rounded-[2.5rem] space-y-4 shadow-sm">
          <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest">Processing</h4>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">Logical mapping of technical architecture into narrative structures.</p>
        </div>
        <div className="p-10 bg-white border border-slate-200 rounded-[2.5rem] space-y-4 shadow-sm">
          <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest">Synthesis</h4>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">Context-aware code generation with optimized markdown formatting.</p>
        </div>
        <div className="p-10 bg-white border border-slate-200 rounded-[2.5rem] space-y-4 shadow-sm">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Audit</h4>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">Automated checking for readability, tone, and technical clarity.</p>
        </div>
      </div>
    </div>
  );
};

export default MagicDraft;
