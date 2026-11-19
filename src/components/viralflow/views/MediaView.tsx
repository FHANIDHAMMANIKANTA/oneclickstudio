import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Video, 
  Image as ImageIcon, 
  Trash2, 
  ExternalLink,
  Plus,
  Send,
  Play,
  Film,
  Loader2,
  X
} from 'lucide-react';
import { extractVideoMetadata, STOCK_SAMPLE_VIDEOS } from '../../../utils/mediaUtils';

export interface MediaAsset {
  id: string;
  title: string;
  type: 'VIDEO' | 'IMAGE';
  size: string;
  dimensions: string;
  url: string;
  date: string;
}

interface MediaViewProps {
  onUseMediaInComposer: (asset: { url: string; type: 'video' | 'image'; title: string }) => void;
  onOpenInEditor?: (videoUrl: string, title: string) => void;
}

export const MediaView: React.FC<MediaViewProps> = ({ 
  onUseMediaInComposer,
  onOpenInEditor,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'VIDEO' | 'IMAGE'>('ALL');
  const [isUploading, setIsUploading] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<MediaAsset | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [assets, setAssets] = useState<MediaAsset[]>([
    {
      id: 'm-1',
      title: 'ai_coding_broll_9x16.mp4',
      type: 'VIDEO',
      size: '8.4 MB',
      dimensions: '1080 × 1920 (9:16)',
      url: STOCK_SAMPLE_VIDEOS[0].url,
      date: 'Nov 16, 2026',
    },
    {
      id: 'm-2',
      title: 'saas_growth_cover.png',
      type: 'IMAGE',
      size: '3.2 MB',
      dimensions: '1200 × 675 (16:9)',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      date: 'Nov 15, 2026',
    },
    {
      id: 'm-3',
      title: 'creator_blueprint_mockup.png',
      type: 'IMAGE',
      size: '4.8 MB',
      dimensions: '1080 × 1080 (1:1)',
      url: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80',
      date: 'Nov 14, 2026',
    },
    {
      id: 'm-4',
      title: 'workspace_timelapse_16x9.mp4',
      type: 'VIDEO',
      size: '12.1 MB',
      dimensions: '1920 × 1080 (16:9)',
      url: STOCK_SAMPLE_VIDEOS[1].url,
      date: 'Nov 12, 2026',
    },
  ]);

  const filteredAssets = filter === 'ALL' ? assets : assets.filter((a) => a.type === filter);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isVideo = file.type.startsWith('video');
      const fileUrl = URL.createObjectURL(file);
      const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

      if (isVideo) {
        const meta = await extractVideoMetadata(file);
        const newAsset: MediaAsset = {
          id: `usr-${Date.now()}-${i}`,
          title: file.name,
          type: 'VIDEO',
          size: sizeStr,
          dimensions: `${meta.width} × ${meta.height} (${meta.aspectRatio})`,
          url: fileUrl,
          date: 'Just now',
        };
        setAssets((prev) => [newAsset, ...prev]);
      } else {
        const newAsset: MediaAsset = {
          id: `usr-${Date.now()}-${i}`,
          title: file.name,
          type: 'IMAGE',
          size: sizeStr,
          dimensions: 'Original Resolution',
          url: fileUrl,
          date: 'Just now',
        };
        setAssets((prev) => [newAsset, ...prev]);
      }
    }

    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = (id: string) => {
    setAssets(assets.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#0A0A0A]">
        <div>
          <h2 className="font-display text-3xl font-black tracking-tight text-[#0A0A0A]">
            MEDIA & ASSET VAULT
          </h2>
          <p className="text-xs text-neutral-600 font-medium">
            Stored videos, 4K b-roll clips, thumbnails, and carousels ready for instant multi-platform broadcasting.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            accept="video/*,image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-4 py-2.5 bg-[#FF5B37] hover:bg-[#ff4921] text-white font-display font-bold text-xs tracking-tight border-2 border-[#0A0A0A] shadow-brutal flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Media...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Upload Media</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(['ALL', 'VIDEO', 'IMAGE'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 font-display text-xs font-bold border-2 border-[#0A0A0A] transition-all ${
              filter === t
                ? 'bg-[#0A0A0A] text-white shadow-brutal-sm'
                : 'bg-white text-[#0A0A0A] hover:bg-neutral-100'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="card-brutal bg-white overflow-hidden flex flex-col justify-between group hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            <div>
              <div 
                onClick={() => setPreviewMedia(asset)}
                className="relative aspect-video border-b-2 border-[#0A0A0A] bg-neutral-900 overflow-hidden cursor-pointer"
              >
                {asset.type === 'VIDEO' ? (
                  <video
                    src={asset.url}
                    muted
                    loop
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    onMouseEnter={(e) => (e.target as HTMLVideoElement).play().catch(() => {})}
                    onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
                  />
                ) : (
                  <img
                    src={asset.url}
                    alt={asset.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                )}

                <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#B8FF5C] border border-[#0A0A0A] text-[9px] font-black font-mono uppercase">
                  {asset.type}
                </div>

                {asset.type === 'VIDEO' && (
                  <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white pointer-events-none">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                )}
              </div>

              <div className="p-4 space-y-1">
                <div className="font-display font-bold text-xs text-[#0A0A0A] truncate">
                  {asset.title}
                </div>
                <div className="text-[10px] font-mono text-neutral-500">
                  {asset.dimensions} · {asset.size}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 space-y-2 border-t border-neutral-100">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() =>
                    onUseMediaInComposer({
                      url: asset.url,
                      type: asset.type === 'VIDEO' ? 'video' : 'image',
                      title: asset.title,
                    })
                  }
                  className="flex-1 py-1.5 bg-[#FFFDF8] hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white border border-[#0A0A0A] text-xs font-display font-bold transition-colors text-center"
                >
                  Use in Composer
                </button>

                {asset.type === 'VIDEO' && onOpenInEditor && (
                  <button
                    onClick={() => onOpenInEditor(asset.url, asset.title)}
                    className="p-1.5 bg-[#B8FF5C] hover:bg-[#a5ee49] text-[#0A0A0A] border border-[#0A0A0A] text-[10px] font-bold"
                    title="Open in Hivepostly Studio"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => handleDelete(asset.id)}
                  className="p-1.5 hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors"
                  title="Delete Asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Media Fullscreen Preview Modal */}
      {previewMedia && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="card-brutal bg-white p-5 max-w-2xl w-full space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#0A0A0A]">
              <span className="font-display font-black text-sm text-[#0A0A0A] truncate">
                {previewMedia.title}
              </span>
              <button
                onClick={() => setPreviewMedia(null)}
                className="p-1 hover:bg-neutral-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="border-2 border-[#0A0A0A] bg-black max-h-[460px] flex items-center justify-center overflow-hidden">
              {previewMedia.type === 'VIDEO' ? (
                <video
                  src={previewMedia.url}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[440px] w-auto mx-auto"
                />
              ) : (
                <img
                  src={previewMedia.url}
                  alt={previewMedia.title}
                  className="max-h-[440px] w-auto mx-auto object-contain"
                />
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-xs text-neutral-600">
                {previewMedia.dimensions} · {previewMedia.size}
              </span>
              <button
                onClick={() => {
                  onUseMediaInComposer({
                    url: previewMedia.url,
                    type: previewMedia.type === 'VIDEO' ? 'video' : 'image',
                    title: previewMedia.title,
                  });
                  setPreviewMedia(null);
                }}
                className="px-4 py-2 bg-[#FF5B37] text-white font-display font-bold text-xs border border-[#0A0A0A] shadow-brutal-sm"
              >
                Use in Composer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
