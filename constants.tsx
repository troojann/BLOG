
import React from 'react';
import { Post } from './types';

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: 'Mastering React Server Components',
    excerpt: 'Deep dive into the architecture of RSCs and how they change the way we build modern web apps.',
    content: 'React Server Components represent a paradigm shift in how we build React applications. By offloading rendering logic to the server, we can ship significantly less JavaScript to the client...',
    author: 'Sarah Dev',
    date: 'Oct 24, 2023',
    readTime: '8 min read',
    tags: ['React', 'Next.js', 'Performance'],
    imageUrl: 'https://picsum.photos/seed/react/800/400'
  },
  {
    id: '2',
    title: 'Modern TypeScript Patterns for 2024',
    excerpt: 'Exploring advanced utility types, template literal types, and effective generic usage.',
    content: 'TypeScript has evolved rapidly. In this post, we explore why branded types are powerful for safety and how template literal types can transform your API definitions...',
    author: 'Alex Code',
    date: 'Nov 02, 2023',
    readTime: '12 min read',
    tags: ['TypeScript', 'Architecture'],
    imageUrl: 'https://picsum.photos/seed/ts/800/400'
  },
  {
    id: '3',
    title: 'Building a Real-time Engine with Rust',
    excerpt: 'How we achieved 5ms latency in our production data pipeline using Rust and WebSockets.',
    content: 'Rust’s ownership model provides guarantees that are perfect for high-concurrency real-time systems. We migrated our core logic from Node.js and saw a 10x improvement in throughput...',
    author: 'Marcus Iron',
    date: 'Dec 15, 2023',
    readTime: '15 min read',
    tags: ['Rust', 'Backend', 'WebSockets'],
    imageUrl: 'https://picsum.photos/seed/rust/800/400'
  }
];

export const Icons = {
  Home: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  Pen: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
  ),
  Sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  ),
  Loader: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><line x1="12" x2="12" y1="2" y2="6"/><line x1="12" x2="12" y1="18" y2="22"/><line x1="4.93" x2="7.76" y1="4.93" y2="7.76"/><line x1="16.24" x2="19.07" y1="16.24" y2="19.07"/><line x1="2" x2="6" y1="12" y2="12"/><line x1="18" x2="22" y1="12" y2="12"/><line x1="4.93" x2="7.76" y1="19.07" y2="16.24"/><line x1="16.24" x2="19.07" y1="7.76" y2="4.93"/></svg>
  )
};
