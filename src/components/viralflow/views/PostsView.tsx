import React, { useState } from 'react';
import { 
  FileText, 
  Trash2, 
  ExternalLink, 
  TrendingUp, 
  Plus, 
  CheckCircle2,
  Share2
} from 'lucide-react';

interface PostsViewProps {
  onNewPost: () => void;
}

export const PostsView: React.FC<PostsViewProps> = ({ onNewPost }) => {
  const [posts, setPosts] = useState([
    {
      id: 'p-1',
      title: 'Top 5 AI tools that replaced my $10k video editing team',
      caption: 'Why are 90% of creators still losing 70% of viewers in the first 3 seconds? Comment TOOLS below...',
      platforms: ['Twitter / X', 'Instagram', 'YouTube'],
      reach: '48.2K',
      engRate: '8.4%',
      status: 'published',
      date: 'Today · 2h ago',
    },
    {
      id: 'p-2',
      title: 'Why 90% of SaaS founders fail on LinkedIn in 2026',
      caption: 'Corporate tone kills organic reach. Here is the 3-step personal story framework...',
      platforms: ['LinkedIn'],
      reach: '18.4K',
      engRate: '12.1%',
      status: 'published',
      date: 'Yesterday · 9:30 AM',
    },
    {
      id: 'p-3',
      title: 'How I scaled from 0 to 100K Followers in 90 Days',
      caption: 'The algorithm changed again. Here is the retention curve formula top creators use.',
      platforms: ['YouTube', 'Instagram', 'TikTok'],
      reach: '84.6K',
      engRate: '14.9%',
      status: 'published',
      date: 'Nov 14 · 6:00 PM',
    },
    {
      id: 'p-4',
      title: 'The exact DM automation sequence that generated ₹1,48,000 while I slept 🧵',
      caption: '1/7 Most creators rely on link-in-bio with 1.2% click-through. Comment-to-DM gets 34%...',
      platforms: ['Twitter / X', 'Threads'],
      reach: '32.1K',
      engRate: '6.9%',
      status: 'published',
      date: 'Nov 12 · 2:15 PM',
    },
  ]);

  const handleDelete = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#0A0A0A]">
        <div>
          <h2 className="font-display text-3xl font-black tracking-tight text-[#0A0A0A]">
            SHIPPED POSTS
          </h2>
          <p className="text-xs text-neutral-600 font-medium">
            History of all multi-platform broadcasts with live metrics and reach receipts.
          </p>
        </div>

        <button
          onClick={onNewPost}
          className="px-4 py-2.5 bg-[#FF5B37] hover:bg-[#ff4921] text-white font-display font-bold text-xs tracking-tight border-2 border-[#0A0A0A] shadow-brutal flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Post</span>
        </button>
      </div>

      {/* Posts Table */}
      <div className="card-brutal p-6 bg-white space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b-2 border-[#0A0A0A] text-[11px] font-black uppercase font-mono tracking-wider text-neutral-500">
              <tr>
                <th className="py-2.5">POST & TITLE</th>
                <th>NETWORKS</th>
                <th>REACH</th>
                <th>ENGAGEMENT</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th className="text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-[#0A0A0A]/10 text-neutral-800 font-medium">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-neutral-50">
                  <td className="py-3.5 max-w-xs">
                    <div className="font-display font-bold text-sm text-[#0A0A0A] truncate">
                      {post.title}
                    </div>
                    <div className="text-[11px] text-neutral-500 truncate mt-0.5">
                      {post.caption}
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {post.platforms.map((p) => (
                        <span key={p} className="px-1.5 py-0.5 bg-neutral-100 border border-[#0A0A0A] text-[10px] font-bold">
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="font-mono font-bold text-sm text-[#0A0A0A]">
                    {post.reach}
                  </td>
                  <td>
                    <span className="font-mono font-bold text-xs text-[#FF5B37] px-1.5 py-0.5 bg-neutral-100 border border-[#0A0A0A]">
                      {post.engRate}
                    </span>
                  </td>
                  <td className="text-[11px] font-mono text-neutral-500">
                    {post.date}
                  </td>
                  <td>
                    <span className="px-2 py-0.5 bg-[#B8FF5C] border border-[#0A0A0A] text-[10px] font-mono font-bold uppercase">
                      {post.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors"
                      title="Delete post from record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
