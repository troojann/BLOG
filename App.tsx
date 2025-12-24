
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './views/Home';
import PostReader from './components/PostReader';
import MagicDraft from './views/MagicDraft';
import { Post } from './types';
import { INITIAL_POSTS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Persistence of local posts
  useEffect(() => {
    const saved = localStorage.getItem('devcanvas_posts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Combine initial and saved, filter duplicates by title
        const combined = [...INITIAL_POSTS, ...parsed];
        const unique = combined.reduce((acc: Post[], curr: Post) => {
          if (!acc.find(p => p.id === curr.id)) acc.push(curr);
          return acc;
        }, []);
        setPosts(unique);
      } catch (e) {
        console.error("Failed to load saved posts", e);
      }
    }
  }, []);

  const handlePostCreated = (newPost: Post) => {
    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem('devcanvas_posts', JSON.stringify(updated.filter(p => !INITIAL_POSTS.find(ip => ip.id === p.id))));
    setSelectedPost(newPost);
    setActiveTab('reader');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab !== 'reader') setSelectedPost(null);
  };

  const renderContent = () => {
    if (selectedPost) {
      return (
        <PostReader 
          post={selectedPost} 
          onBack={() => {
            setSelectedPost(null);
            setActiveTab('home');
          }} 
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return <Home posts={posts} onPostSelect={setSelectedPost} />;
      case 'draft':
        return <MagicDraft onPostCreated={handlePostCreated} />;
      case 'write':
        return (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500 text-center space-y-8">
            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-300 border border-slate-100 shadow-sm">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Writing Desk</h2>
              <p className="max-w-xs mx-auto text-slate-500 font-medium">Our full-feature markdown editor is currently in beta. Leverage our AI Synthesizer in the meantime.</p>
            </div>
            <button 
              onClick={() => setActiveTab('draft')}
              className="px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black transition-all shadow-xl active:scale-95 text-xs uppercase tracking-widest"
            >
              Access AI Synthesizer
            </button>
          </div>
        );
      default:
        return <Home posts={posts} onPostSelect={setSelectedPost} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={handleTabChange}>
      <div className="pb-24">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
