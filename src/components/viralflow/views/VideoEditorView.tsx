import React from 'react';
import { VideoEditorLauncher } from './VideoEditorLauncher';

interface VideoEditorViewProps {
  onSendToComposer?: (data: { caption: string; videoUrl: string }) => void;
  onOpenComposer?: () => void;
  recentMedia?: { url: string; type: 'video' | 'image'; name: string } | null;
}

export const VideoEditorView: React.FC<VideoEditorViewProps> = ({ 
  onSendToComposer, 
  onOpenComposer,
  recentMedia 
}) => {
  const handleComposerNav = () => {
    if (onOpenComposer) {
      onOpenComposer();
    } else if (onSendToComposer) {
      onSendToComposer({
        caption: 'New video edited in Hivepostly Studio ready to publish!',
        videoUrl: recentMedia?.url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
      });
    }
  };

  return (
    <VideoEditorLauncher 
      onOpenComposer={handleComposerNav}
      recentMedia={recentMedia}
    />
  );
};
