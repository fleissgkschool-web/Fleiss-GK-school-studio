import React, { useState } from 'react';
import { Player, AgeCategory } from '../../types';
import { RadarChart } from './RadarChart';
import { 
  Plus, 
  Search, 
  User, 
  Shield, 
  Trash2, 
  Edit3, 
  Eye, 
  Calendar,
  Activity
} from 'lucide-react';

interface PlayerListProps {
  players: Player[];
  onSelectPlayer: (player: Player) => void;
  onEditPlayer: (player: Player) => void;
  onNewPlayer: () => void;
  onDeletePlayer: (id: string) => void;
}

export const PlayerList: React.FC<PlayerListProps> = ({
  players,
  onSelectPlayer,
  onEditPlayer,
  onNewPlayer,
  onDeletePlayer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPlayers = players.filter(player => {
    if (selectedCategory !== 'all' && player.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = player.name.toLowerCase().includes(q);
      const matchTeam = player.team.toLowerCase().includes(q);
      const matchFurigana = player.furigana.toLowerCase().includes(q);
      if (!matchName && !matchTeam && !matchFurigana) return false;
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-neutral-950 overflow-hidden">
      {/* Top Header & Filters */}
      <div className="p-6 border-b border-neutral-800 bg-neutral-900/60 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">GK個人管理・選手カルテ</h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              登録ゴールキーパー: <span className="font-mono text-emerald-400 font-semibold">{players.length}名</span>
              <span className="mx-2">·</span>
              6大ピラー能力値・個別育成計画 (IDP)・指導カルテ
            </p>
          </div>

          <button
            onClick={onNewPlayer}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-sm self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            新規GK選手を登録
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="選手名、所属チームから検索..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs">
            {['all', 'U-10', 'U-12', 'U-15', 'U-18', 'Senior/Pro'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded transition-colors ${
                  selectedCategory === cat
                    ? 'bg-neutral-800 text-emerald-400 font-medium'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {cat === 'all' ? '全年代' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Players Grid */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {filteredPlayers.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-neutral-800 rounded-2xl">
            <User className="w-8 h-8 text-neutral-600 mb-2" />
            <p className="text-sm font-medium text-neutral-300">該当する選手が見つかりませんでした</p>
            <p className="text-xs text-neutral-500 mt-1">「新規GK選手を登録」から選手を追加してください</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlayers.map(player => {
              const avg = Math.round(
                Object.values(player.ratings).reduce((acc, v) => acc + v, 0) / 6
              );

              return (
                <div
                  key={player.id}
                  className="flex flex-col bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  {/* Card Header Profile & Mini Radar */}
                  <div className="p-5 border-b border-neutral-800/80 bg-neutral-950/40 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700">
                        <img
                          src={player.avatarUrl}
                          alt={player.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-emerald-950/80 text-emerald-400 font-bold text-sm">
                          #{player.number}
                        </div>
                      </div>

                      <div>
                        {/* Unboxed metadata */}
                        <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                          <span className="text-emerald-400 font-semibold">{player.category}</span>
                          <span>·</span>
                          <span>{player.height}cm</span>
                        </div>
                        <h3
                          onClick={() => onSelectPlayer(player)}
                          className="text-base font-bold text-white hover:text-emerald-400 cursor-pointer transition-colors mt-0.5"
                        >
                          {player.name}
                        </h3>
                        <p className="text-[11px] text-neutral-500 truncate max-w-[150px]">
                          {player.team}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-neutral-400">OVR</span>
                      <span className="font-mono text-xl font-bold text-emerald-400 leading-none">
                        {avg}
                      </span>
                    </div>
                  </div>

                  {/* Radar Chart Display */}
                  <div
                    onClick={() => onSelectPlayer(player)}
                    className="p-3 flex items-center justify-center bg-neutral-950 cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <RadarChart ratings={player.ratings} size={200} />
                  </div>

                  {/* IDP & Strengths Preview */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="text-[11px] text-neutral-400 flex items-center gap-1">
                        <Shield className="w-3 h-3 text-emerald-400" />
                        <span>育成テーマ:</span>
                      </div>
                      <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                        {player.idpGoal || player.strengths[0] || '目標未設定'}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-neutral-500">
                        指導記録: <strong className="font-mono text-neutral-300">{player.notes.length}件</strong>
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onSelectPlayer(player)}
                          className="flex items-center gap-1 px-2.5 py-1 text-xs text-neutral-300 hover:text-emerald-400 bg-neutral-800 hover:bg-neutral-700 rounded transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                          詳細カルテ
                        </button>
                        <button
                          onClick={() => onEditPlayer(player)}
                          title="編集"
                          className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`「${player.name}」選手を削除しますか？`)) {
                              onDeletePlayer(player.id);
                            }
                          }}
                          title="削除"
                          className="p-1.5 rounded text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
