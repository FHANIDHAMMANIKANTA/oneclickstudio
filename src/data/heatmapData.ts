import { Platform } from '../types';

export interface HeatmapHour {
  hour: number;
  score: number; // 0 to 100
  isTopSlot: boolean;
  activeFollowersPct: number;
}

export interface DayHeatmap {
  dayName: string;
  shortDay: string;
  hours: HeatmapHour[];
}

export const getPlatformHeatmap = (platform: Platform): DayHeatmap[] => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const shortDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return days.map((dayName, dayIdx) => {
    const hours: HeatmapHour[] = [];
    for (let h = 0; h < 24; h++) {
      let baseScore = 20;

      // Platform specific patterns
      if (platform === 'instagram') {
        // Peaks around lunch (12-14) and evening (18-22)
        if (h >= 18 && h <= 21) baseScore = 85 + (dayIdx >= 4 ? 12 : 5);
        else if (h >= 12 && h <= 14) baseScore = 65;
        else if (h >= 8 && h <= 11) baseScore = 48;
        else if (h < 6) baseScore = 8;
        else baseScore = 35;
      } else if (platform === 'linkedin') {
        // Business days 8-11 and 16-18 peak, weekends low
        if (dayIdx >= 5) {
          baseScore = 15 + Math.random() * 20;
        } else {
          if (h >= 8 && h <= 11) baseScore = 90 + Math.random() * 8;
          else if (h >= 16 && h <= 18) baseScore = 80;
          else if (h >= 12 && h <= 15) baseScore = 60;
          else if (h < 6 || h > 21) baseScore = 5;
          else baseScore = 30;
        }
      } else if (platform === 'youtube') {
        // Evening peaks 17-22 and weekends strong
        if (dayIdx >= 4 && h >= 14 && h <= 22) baseScore = 92;
        else if (h >= 18 && h <= 21) baseScore = 88;
        else if (h >= 12 && h <= 17) baseScore = 60;
        else if (h < 7) baseScore = 10;
        else baseScore = 40;
      } else if (platform === 'x') {
        // Broad spread throughout daylight hours, peaks during news/morning (8-10) and late night (21-23)
        if ((h >= 8 && h <= 10) || (h >= 20 && h <= 23)) baseScore = 86;
        else if (h >= 12 && h <= 17) baseScore = 70;
        else if (h < 6) baseScore = 12;
        else baseScore = 45;
      } else if (platform === 'tiktok') {
        // Late afternoons and nights, 19-23
        if (h >= 19 && h <= 23) baseScore = 95;
        else if (h >= 14 && h <= 18) baseScore = 75;
        else if (h < 8) baseScore = 10;
        else baseScore = 42;
      } else {
        // Default curve
        if (h >= 18 && h <= 21) baseScore = 80;
        else if (h >= 11 && h <= 14) baseScore = 65;
        else baseScore = 30;
      }

      // Add controlled jitter
      const finalScore = Math.min(100, Math.max(5, Math.round(baseScore + ((h * 7 + dayIdx * 11) % 9) - 4)));
      const isTopSlot = finalScore >= 90;
      const activeFollowersPct = Math.round(finalScore * 0.72 + 15);

      hours.push({
        hour: h,
        score: finalScore,
        isTopSlot,
        activeFollowersPct,
      });
    }

    return {
      dayName,
      shortDay: shortDays[dayIdx],
      hours,
    };
  });
};

export const getTopSlotsForPlatform = (platform: Platform) => {
  switch (platform) {
    case 'instagram':
      return [
        { time: 'Today • 7:30 PM IST', score: '98% virality probability', rationale: 'Peak follower online window, +4.8x comment velocity' },
        { time: 'Tomorrow • 1:15 PM IST', score: '88% virality probability', rationale: 'Lunch break scroll peak for Reels' },
        { time: 'Friday • 8:00 PM IST', score: '95% virality probability', rationale: 'Weekend kick-off saves spike by 62%' },
      ];
    case 'youtube':
      return [
        { time: 'Today • 6:00 PM IST', score: '96% algorithm pickup', rationale: '24h initial velocity benchmark' },
        { time: 'Saturday • 11:30 AM IST', score: '99% algorithm pickup', rationale: 'Weekend high retention window' },
        { time: 'Thursday • 5:45 PM IST', score: '89% algorithm pickup', rationale: 'Mid-week prime viewing window' },
      ];
    case 'linkedin':
      return [
        { time: 'Tomorrow • 9:15 AM IST', score: '97% B2B reach', rationale: 'First work-hour desktop feed consumption' },
        { time: 'Thursday • 4:30 PM IST', score: '91% B2B reach', rationale: 'End-of-day thought leadership reading' },
        { time: 'Tuesday • 8:45 AM IST', score: '94% B2B reach', rationale: 'Highest comment-to-share ratio' },
      ];
    case 'x':
      return [
        { time: 'Today • 2:30 PM IST', score: '94% engagement rate', rationale: 'Midday tech discourse window' },
        { time: 'Tonight • 10:15 PM IST', score: '96% engagement rate', rationale: 'Late night founder discussion peak' },
        { time: 'Tomorrow • 8:30 AM IST', score: '90% engagement rate', rationale: 'Morning industry news breakdown' },
      ];
    case 'tiktok':
      return [
        { time: 'Tonight • 8:45 PM IST', score: '99% FYP pickup', rationale: 'Maximum sound-trend algorithmic velocity' },
        { time: 'Tomorrow • 4:00 PM IST', score: '90% FYP pickup', rationale: 'After school/work casual scroll spike' },
        { time: 'Saturday • 9:30 PM IST', score: '98% FYP pickup', rationale: 'Peak weekend entertainment surge' },
      ];
    default:
      return [
        { time: 'Today • 7:00 PM IST', score: '92% reach', rationale: 'General evening peak' },
        { time: 'Tomorrow • 12:30 PM IST', score: '85% reach', rationale: 'Midday check-in' },
        { time: 'Sunday • 6:30 PM IST', score: '90% reach', rationale: 'Sunday evening catch-up' },
      ];
  }
};
