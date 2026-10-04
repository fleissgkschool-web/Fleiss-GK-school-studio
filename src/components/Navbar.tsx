import React from 'react';
import { Plus, Github } from 'lucide-react';

export type NavTab = 'drills' | 'tactical_board' | 'players' | 'session_planner' | 'github_sync';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onNewDrill: () => void;
  onOpenGithub: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onNewDrill,
  onOpenGithub,
}) => {
  return (
    <header className="flex items-center justify-between px-6 py-3.5 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div 
        onClick={() => onSelectTab('drills')}
        className="text-base font-bold tracking-tight text-white flex items-center gap-2 cursor-pointer select-none"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        <span className="font-extrabold uppercase tracking-wide">FLEISS GK STUDIO</span>
      </div>

      {/* Zone 2: 4-6 clean text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-neutral-400">
        <button
          onClick={() => onSelectTab('drills')}
          className={`hover:text-white transition-colors whitespace-nowrap ${
            currentTab === 'drills' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          メニュー一覧
        </button>
        <button
          onClick={() => onSelectTab('tactical_board')}
          className={`hover:text-white transition-colors whitespace-nowrap ${
            currentTab === 'tactical_board' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          タクティカルボード
        </button>
        <button
          onClick={() => onSelectTab('players')}
          className={`hover:text-white transition-colors whitespace-nowrap ${
            currentTab === 'players' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          GK個人管理
        </button>
        <button
          onClick={() => onSelectTab('session_planner')}
          className={`hover:text-white transition-colors whitespace-nowrap ${
            currentTab === 'session_planner' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          セッション計画
        </button>
        <button
          onClick={() => onSelectTab('github_sync')}
          className={`hover:text-white transition-colors whitespace-nowrap ${
            currentTab === 'github_sync' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          GitHub連携
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenGithub}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 rounded-lg transition-colors whitespace-nowrap"
        >
          <Github className="w-3.5 h-3.5" />
          GitHub保存
        </button>
        <button
          onClick={onNewDrill}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors whitespace-nowrap shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          新規メニュー
        </button>
      </div>
    </header>
  );
};
