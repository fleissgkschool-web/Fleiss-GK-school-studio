import React from 'react';
import { 
  Compass, 
  Layers, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Users, 
  BarChart2, 
  Settings, 
  MessageSquare, 
  Rocket, 
  MoreVertical,
  ChevronDown,
  Github
} from 'lucide-react';

export type SidebarTab = 
  | 'drills' 
  | 'templates' 
  | 'calendar' 
  | 'plan' 
  | 'goalkeepers' 
  | 'analytics' 
  | 'explore'
  | 'github';

interface SidebarProps {
  currentTab: SidebarTab;
  onSelectTab: (tab: SidebarTab) => void;
  drillCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  drillCount,
}) => {
  return (
    <aside className="w-64 bg-[#081a2e] text-neutral-300 flex flex-col h-screen border-r border-[#132c4a] select-none shrink-0 font-sans">
      {/* Brand Header */}
      <div className="px-5 py-4 flex items-center gap-3 border-b border-[#132c4a]/60">
        {/* Yellow GK Studio Icon */}
        <div className="w-8 h-8 rounded-lg bg-[#eab308] flex items-center justify-center text-[#081a2e] font-extrabold shadow-md">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-extrabold tracking-wider text-[#eab308] leading-none">
            GOALKEEPER STUDIO
          </span>
          <span className="text-[10px] text-neutral-400 mt-0.5 tracking-tight font-medium">
            Coaching System
          </span>
        </div>
      </div>

      {/* Main Nav Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 custom-scrollbar">
        {/* Explore */}
        <div>
          <button
            onClick={() => onSelectTab('explore')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'explore'
                ? 'bg-[#122e4e] text-white font-semibold'
                : 'text-neutral-300 hover:bg-[#0d2238] hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4 text-neutral-400" />
            <span>探索</span>
          </button>
        </div>

        {/* Workspace Section */}
        <div className="space-y-1">
          <div className="px-3 text-[11px] font-medium text-neutral-400">
            マイワークスペース
          </div>

          {/* マイドリル (Primary) */}
          <button
            onClick={() => onSelectTab('drills')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              currentTab === 'drills'
                ? 'bg-[#eab308] text-[#081a2e] shadow-sm'
                : 'text-neutral-200 hover:bg-[#0d2238] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4" />
              <span>マイドリル</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              currentTab === 'drills' ? 'bg-[#ca8a04]/40 text-[#081a2e] font-bold' : 'text-neutral-400'
            }`}>
              {drillCount}
            </span>
          </button>

          {/* トレーニングテンプレート */}
          <button
            onClick={() => onSelectTab('templates')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'templates'
                ? 'bg-[#122e4e] text-white font-semibold'
                : 'text-neutral-300 hover:bg-[#0d2238] hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-neutral-400" />
            <span className="truncate">トレーニングテンプレート...</span>
          </button>

          {/* カレンダー */}
          <button
            onClick={() => onSelectTab('calendar')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'calendar'
                ? 'bg-[#122e4e] text-white font-semibold'
                : 'text-neutral-300 hover:bg-[#0d2238] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-neutral-400" />
              <span>カレンダー</span>
            </div>
            <span className="text-[9px] bg-[#132c4a] text-neutral-400 px-1.5 py-0.5 rounded">
              プレビュー
            </span>
          </button>

          {/* プラン */}
          <button
            onClick={() => onSelectTab('plan')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'plan'
                ? 'bg-[#122e4e] text-white font-semibold'
                : 'text-neutral-300 hover:bg-[#0d2238] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-4 h-4 text-neutral-400" />
              <span>プラン</span>
            </div>
            <span className="text-[9px] bg-[#132c4a] text-neutral-400 px-1.5 py-0.5 rounded">
              プレビュー
            </span>
          </button>

          {/* ゴールキーパー (個人管理) */}
          <button
            onClick={() => onSelectTab('goalkeepers')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'goalkeepers'
                ? 'bg-[#eab308] text-[#081a2e] font-semibold'
                : 'text-neutral-200 hover:bg-[#0d2238] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4" />
              <span>ゴールキーパー</span>
            </div>
            <span className={`text-[9px] px-1.5 py-0.5 rounded ${
              currentTab === 'goalkeepers' ? 'bg-[#ca8a04]/40 text-[#081a2e]' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
            }`}>
              管理OK
            </span>
          </button>

          {/* アナリティクス */}
          <button
            onClick={() => onSelectTab('analytics')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'analytics'
                ? 'bg-[#122e4e] text-white font-semibold'
                : 'text-neutral-300 hover:bg-[#0d2238] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <BarChart2 className="w-4 h-4 text-neutral-400" />
              <span>アナリティクス</span>
            </div>
            <span className="text-[9px] bg-[#132c4a] text-neutral-400 px-1.5 py-0.5 rounded">
              プレビュー
            </span>
          </button>

          {/* GitHub 連携 */}
          <button
            onClick={() => onSelectTab('github')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'github'
                ? 'bg-[#122e4e] text-emerald-400 font-semibold'
                : 'text-neutral-300 hover:bg-[#0d2238] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Github className="w-4 h-4 text-emerald-400" />
              <span>GitHub連携</span>
            </div>
            <span className="text-[9px] bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 px-1.5 py-0.5 rounded">
              保存
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Pro / Unlimited Status Card (Screenshot 1 bottom card) */}
      <div className="p-3 border-t border-[#132c4a]/60 space-y-2">
        <div className="bg-[#0f243c] border border-[#1a385c] rounded-xl p-3 text-xs space-y-1">
          <div className="flex items-center gap-2 text-white font-semibold text-xs">
            <Rocket className="w-4 h-4 text-[#eab308]" />
            <span>無制限プラン有効</span>
          </div>
          <p className="text-[11px] text-neutral-400 leading-tight">
            ドリル作成：<strong className="text-emerald-400 font-mono">無制限 ∞</strong>
          </p>
          <div className="w-full bg-[#132c4a] rounded-full h-1 mt-1 overflow-hidden">
            <div className="bg-[#eab308] h-full w-full rounded-full" />
          </div>
        </div>

        {/* Settings & Feedback */}
        <div className="pt-1 space-y-0.5 text-xs text-neutral-400">
          <button className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-[#0d2238] hover:text-white transition-colors">
            <div className="flex items-center gap-2">
              <Settings className="w-3.5 h-3.5" />
              <span>設定</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#0d2238] hover:text-white transition-colors">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>フィードバックを送る</span>
          </button>
        </div>

        {/* User Account Bar (fleiss.gk.school@gmail.com) */}
        <div className="pt-2 border-t border-[#132c4a]/60 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-[10px] font-bold text-emerald-400 shrink-0">
              FB
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">
                Fleiβ GK School
              </div>
              <div className="text-[10px] text-neutral-400 truncate font-mono">
                fleiss.gk.school@gmail.com
              </div>
            </div>
          </div>
          <button className="text-neutral-400 hover:text-white p-1">
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
