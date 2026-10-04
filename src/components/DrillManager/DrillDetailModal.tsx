import React from 'react';
import { Drill } from '../../types';
import { ElementGraphic } from '../TacticalBoard/TacticalSvgDefs';
import { X, Clock, Users, Flame, Star, Edit, Printer, Tag } from 'lucide-react';

interface DrillDetailModalProps {
  drill: Drill;
  onClose: () => void;
  onEdit: (drill: Drill) => void;
  onToggleFavorite: (id: string) => void;
}

export const DrillDetailModal: React.FC<DrillDetailModalProps> = ({
  drill,
  onClose,
  onEdit,
  onToggleFavorite,
}) => {
  const getCategoryLabel = (cat: Drill['category']) => {
    switch (cat) {
      case 'shot_stopping': return 'シュートストップ';
      case 'high_ball': return 'ハイボール・クロス';
      case 'one_on_one': return '1対1・ブロッキング';
      case 'footwork': return 'アジリティ・フットワーク';
      case 'distribution': return 'ディストリビューション';
      case 'reaction': return 'リアクション・反射';
      case 'game_situation': return '実戦・ゲーム形式';
      default: return cat;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleFavorite(drill.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                drill.isFavorite ? 'text-amber-400 bg-amber-400/10' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Star className={`w-5 h-5 ${drill.isFavorite ? 'fill-current' : ''}`} />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="text-emerald-400 font-medium">{getCategoryLabel(drill.category)}</span>
                <span>·</span>
                <span>{drill.ageCategory}</span>
                <span>·</span>
                <span>強度: {drill.intensity}</span>
              </div>
              <h2 className="text-lg font-bold text-white mt-0.5">{drill.title}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-300 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
              印刷 / PDF出力
            </button>
            <button
              onClick={() => {
                onClose();
                onEdit(drill);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
              編集 & 作図
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Top Quick Stats */}
          <div className="grid grid-cols-4 gap-3 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800 text-xs">
            <div className="flex items-center gap-2 text-neutral-300">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>所要時間: <strong className="text-white font-mono">{drill.durationMinutes}分</strong></span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>推奨人数: <strong className="text-white font-mono">GK {drill.gkCount}名</strong></span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <Flame className="w-4 h-4 text-emerald-400" />
              <span>運動強度: <strong className="text-white">{drill.intensity}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-400 truncate">
              <Tag className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">{drill.tags.join(', ')}</span>
            </div>
          </div>

          {/* Tactical Pitch Illustration Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-neutral-200">タクティカルボード（ピッチ配置図）</h3>
              <span className="text-[11px] text-neutral-400">
                配置イラスト数: {drill.board.elements.length}個 · 矢印: {drill.board.arrows.length}本
              </span>
            </div>
            <div className="relative w-full aspect-[10/7] max-h-[380px] bg-neutral-950 rounded-xl overflow-hidden border border-neutral-800 shadow-inner flex items-center justify-center">
              <svg viewBox="0 0 1000 700" className="w-full h-full">
                {/* Background & Turf */}
                <rect x="0" y="0" width="1000" height="700" fill={drill.board.pitchStyle === 'tactical_dark' ? '#0f172a' : '#15803d'} />
                {[0, 100, 200, 300, 400, 500, 600].map(y => (
                  <rect key={y} x="0" y={y} width="1000" height="50" fill={drill.board.pitchStyle === 'tactical_dark' ? '#1e293b' : '#166534'} opacity="0.35" />
                ))}
                {/* Border line */}
                <rect x="30" y="30" width="940" height="640" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
                {/* Goal area line */}
                <line x1="30" y1="90" x2="970" y2="90" stroke="rgba(255,255,255,0.8)" strokeWidth="3.5" />
                <rect x="280" y="90" width="440" height="150" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
                <circle cx="500" cy="320" r="4.5" fill="#ffffff" />

                {/* Arrows */}
                {drill.board.arrows.map(ar => (
                  <g key={ar.id}>
                    {ar.points.length >= 2 && (
                      <line
                        x1={ar.points[0].x}
                        y1={ar.points[0].y}
                        x2={ar.points[1].x}
                        y2={ar.points[1].y}
                        stroke={ar.color}
                        strokeWidth="3.5"
                        strokeDasharray={ar.dashed ? '8 6' : undefined}
                      />
                    )}
                  </g>
                ))}

                {/* Elements */}
                {drill.board.elements.map(el => (
                  <g
                    key={el.id}
                    transform={`translate(${el.x}, ${el.y}) rotate(${el.rotation}) scale(${el.scale})`}
                  >
                    <ElementGraphic type={el.type} scale={el.scale} label={el.label} color={el.color} />
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Drill Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Objectives & Setup & Progressions */}
            <div className="space-y-4">
              <div className="bg-neutral-950/40 p-4 rounded-xl border border-neutral-800">
                <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                  トレーニングの目的・狙い
                </h4>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {drill.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-neutral-950/40 p-4 rounded-xl border border-neutral-800">
                <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                  用具・グリッド設定 (Setup)
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap">
                  {drill.setup}
                </p>
              </div>

              {drill.progressions && drill.progressions.length > 0 && (
                <div className="bg-neutral-950/40 p-4 rounded-xl border border-neutral-800">
                  <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                    発展・バリエーション (Progression)
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {drill.progressions.map((prog, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">▸</span>
                        <span>{prog}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right: Procedure & Coaching Keys */}
            <div className="space-y-4">
              <div className="bg-neutral-950/40 p-4 rounded-xl border border-neutral-800">
                <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                  オーガナイズ & 手順
                </h4>
                <ol className="space-y-2 text-xs text-neutral-300">
                  {drill.procedure.map((proc, i) => (
                    <li key={i} className="leading-relaxed">
                      {proc}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/30">
                <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                  指導のキーファクター (Coaching Points)
                </h4>
                <ul className="space-y-2 text-xs text-neutral-200">
                  {drill.coachingPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
