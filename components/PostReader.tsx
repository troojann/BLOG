
import React, { useState } from 'react';
import { Post } from '../types';
import { Icons } from '../constants';
import { summarizePost } from '../services/geminiService';

interface PostReaderProps {
  post: Post;
  onBack: () => void;
}

const PostReader: React.FC<PostReaderProps> = ({ post, onBack }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    try {
      const result = await summarizePost(post.content);
      setSummary(result);
    } catch (error) {
      console.error(error);
      setSummary("Failed to generate summary.");
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-6 duration-500">
      <button 
        onClick={onBack}
        className="inline-flex items-center space-x-2 text-slate-500 hover:text-slate-900 transition-all group"
      >
        <div className="rotate-180 group-hover:-translate-x-1 transition-transform p-1.5 bg-slate-100 rounded-full border border-slate-200">
          <Icons.ChevronRight />
        </div>
        <span className="font-bold text-sm">Back to Feed</span>
      </button>

      <header className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="px-4 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-widest">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-slate-900">
          {post.title}
        </h1>
        <div className="flex items-center space-x-4 text-slate-500 text-sm border-b border-slate-100 pb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center font-bold text-white shadow-lg">
              {post.author[0]}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 leading-none mb-1">{post.author}</span>
              <span className="text-xs text-slate-400 uppercase tracking-tight">{post.date}</span>
            </div>
          </div>
          <span className="w-px h-8 bg-slate-200"></span>
          <span className="font-semibold">{post.readTime}</span>
        </div>
      </header>

      <div className="relative">
        <img src={post.imageUrl} className="w-full h-[450px] object-cover rounded-[3rem] border border-slate-200 shadow-xl relative z-10" alt={post.title} />
      </div>

      {/* AI Companion - Clean Light Mode */}
      <div className="p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] space-y-6 relative overflow-hidden group">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-xl text-blue-600 ring-1 ring-blue-200">
              <Icons.Sparkles />
            </div>
            <div>
              <span className="block font-black text-xl text-slate-900 leading-tight tracking-tight">AI Insights</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Powered by Gemini</span>
            </div>
          </div>
          {!summary && !isSummarizing && (
            <button 
              onClick={handleSummarize}
              className="px-6 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-2xl transition-all font-bold text-xs shadow-lg active:scale-95"
            >
              Analyze content
            </button>
          )}
        </div>
        
        {isSummarizing && (
          <div className="flex flex-col items-center justify-center py-6 space-y-4 text-slate-400">
            <Icons.Loader />
            <span className="text-xs font-bold uppercase tracking-widest animate-pulse">Running semantic analysis...</span>
          </div>
        )}

        {summary && (
          <div className="text-slate-700 text-sm leading-relaxed relative z-10 animate-in fade-in duration-500">
             <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm">
               <div className="flex items-center space-x-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Executive Summary</span>
               </div>
               <div className="whitespace-pre-wrap text-slate-600 space-y-2 leading-relaxed font-medium">
                {summary}
               </div>
             </div>
          </div>
        )}
      </div>

      <div className="prose prose-slate max-w-none">
        <div className="text-slate-700 leading-relaxed text-lg font-medium space-y-8 tracking-tight">
          {post.content.split('\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostReader;
