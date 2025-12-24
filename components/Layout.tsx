
import React, { useState } from 'react';
import { Icons } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Feed', icon: <Icons.Home /> },
    { id: 'draft', label: 'Magic Draft', icon: <Icons.Sparkles /> },
    { id: 'write', label: 'New Post', icon: <Icons.Pen /> },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen text-slate-900">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 glass border-r border-slate-200 p-6 space-y-8 sticky top-0 h-screen z-20">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg">D</div>
          <span className="text-xl font-bold tracking-tight text-slate-900">DevCanvas</span>
        </div>
        
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className={activeTab === item.id ? 'text-white' : 'text-slate-400'}>
                {item.icon}
              </span>
              <span className="font-semibold text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">AI Processing</p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs text-slate-600 font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.3)]"></span>
              <span>Gemini Pro Active</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Nav */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center font-bold text-lg text-white">D</div>
          <span className="font-bold text-slate-900">DevCanvas</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-white p-8 flex flex-col space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <button onClick={() => setIsMobileMenuOpen(false)} className="self-end p-2 text-slate-500">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`text-2xl font-bold flex items-center space-x-4 ${activeTab === item.id ? 'text-slate-900' : 'text-slate-400'}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 md:px-12 relative z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
