
import React, { useState } from 'react';
import PostCard from '../components/PostCard';
import { Post } from '../types';
import { Icons } from '../constants';

interface HomeProps {
  posts: Post[];
  onPostSelect: (post: Post) => void;
}

const Home: React.FC<HomeProps> = ({ posts, onPostSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const allTags = ['All', ...Array.from(new Set(posts.flatMap(p => p.tags)))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <header className="space-y-10">
        <div className="space-y-4">
          <h1 className="text-6xl font-black tracking-tighter text-slate-900">
            Engineering Logs
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
            Technical research and architectural deep dives from the DevCanvas labs.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-900 transition-colors">
              <Icons.Search />
            </div>
            <input 
              type="text"
              placeholder="Search concepts or stack..."
              className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] py-5 pl-14 pr-6 focus:ring-4 focus:ring-slate-100 focus:border-slate-400 focus:outline-none transition-all placeholder:text-slate-400 text-slate-900 text-lg shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-4 no-scrollbar">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap border uppercase tracking-widest ${
                selectedTag === tag 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </header>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} onClick={() => onPostSelect(post)} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400 space-y-6 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-200 border border-slate-100 shadow-sm">
            <Icons.Search />
          </div>
          <div className="text-center space-y-2">
            <p className="text-xl font-black text-slate-900">No logs found</p>
            <p className="text-sm text-slate-500 font-medium">Try adjusting your search filters or clear your selection.</p>
          </div>
          <button onClick={() => {setSearchQuery(''); setSelectedTag('All');}} className="px-8 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors">Clear filters</button>
        </div>
      )}
    </div>
  );
};

export default Home;
