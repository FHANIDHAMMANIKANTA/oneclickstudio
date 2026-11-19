import React, { useState } from 'react';
import { ViralFlowTab } from '../Sidebar';
import { SocialAccountAnalyzer, AnalyzerPlatform } from '../SocialAccountAnalyzer';
import { BestTimeToPostWeekly } from '../BestTimeToPostWeekly';

interface DashboardViewProps {
  onNavigate: (tab: ViralFlowTab) => void;
  onNewPost: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, onNewPost }) => {
  // Synchronized platform selection across top analyzer and weekly best time to post
  const [activePlatform, setActivePlatform] = useState<AnalyzerPlatform>('instagram');

  return (
    <div className="space-y-8 text-left">
      {/* 1. Multi-Platform Audience & Profile Analyzer (Matches User Sketch) */}
      <SocialAccountAnalyzer 
        activePlatform={activePlatform} 
        onPlatformChange={setActivePlatform} 
      />

      {/* 2. Best Time to Post (Social Media Wise - All Week Monday to Sunday) */}
      <BestTimeToPostWeekly 
        selectedPlatform={activePlatform} 
        onSelectPlatform={setActivePlatform}
        onSchedulePost={(_day, _time, _plat) => {
          onNewPost();
        }}
      />
    </div>
  );
};
