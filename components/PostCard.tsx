
import React from 'react';
import { Post } from '../types';
import { Icons } from '../constants';

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <article 
      onClick={onClick}
      className="group cursor-pointer bg-white border border-slate-200 rounded-[2rem] overflow-hidden hover:border-slate-400 transition-all duration-300 card-shadow"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-slate-200 shadow-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-7 space-y-4">
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em]">
          <span>{post.date}</span>
          <span className="flex items-center space-x-1">
            <span>{post.readTime}</span>
          </span>
        </div>
        
        <h3 className="text-xl font-bold leading-tight text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
          {post.title}
        </h3>
        
        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="pt-5 flex items-center justify-between border-t border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-600 border border-slate-200">
              {post.author[0]}
            </div>
            <span className="text-xs text-slate-600 font-bold">{post.author}</span>
          </div>
          <div className="p-2 rounded-full bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">
            <Icons.ChevronRight />
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
