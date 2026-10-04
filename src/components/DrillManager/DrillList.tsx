import React, { useState, useMemo } from 'react';
import { Drill, DrillCategory } from '../../types';
import { ElementGraphic } from '../TacticalBoard/TacticalSvgDefs';
import { 
  Plus, 
  Search, 
  Folder, 
  LayoutGrid, 
  ChevronLeft, 
  ChevronRight, 
  MoreVertical, 
  SlidersHorizontal, 
  Clock, 
  Activity, 
  TrendingUp, 
  Users, 
  Rocket, 
  X,
  Share2,
  Trash2,
  Copy,
  Edit
} from 'lucide-react';

interface DrillListProps {
  drills: Drill[];
  onSelectDrill: (drill: Drill) => void;
  onEditDrill: (drill: Drill) => void;
  onNewDrill: () => void;
  onDeleteDrill: (id: string) => void;
  onDuplicateDrill: (drill: Drill) => void;
  onToggleFavorite: (id: string) => void;
}

interface CategoryFolder {
  id: DrillCategory | 'all';
  name: string;
  icon: 'all' | 'folder';
}

const CATEGORIES: CategoryFolder[] = [
  { id: 'all', name: 'すべてのドリル', icon: 'all' },
  { id: 'one_on_one', name: '1対1', icon: 'folder' },
  { id: 'global', name: 'グローバル', icon: 'folder' },
  { id: 'shot_stopping', name: 'セービング', icon: 'folder' },
  { id: 'distribution', name: 'ディストリビューション', icon: 'folder' },
  { id: 'high_ball', name: 'ハイボール', icon: 'folder' },
  { id: 'positioning', name: 'ポジショニング', icon: 'folder' },
  { id: 'reaction', name: '反応', icon: 'folder' },
];

export const DrillList: React.FC<DrillListProps> = ({
  drills,
  onSelectDrill,
  onEditDrill,
  onNewDrill,
  onDeleteDrill,
  onDuplicateDrill,
  onToggleFavorite,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DrillCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Filter drills
  const filteredDrills = useMemo(() => {
    return drills.filter(drill => {
      if (selectedCategory !== 'all' && drill.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = drill.title.toLowerCase().includes(q);
        const matchTags = drill.tags.some(t => t.toLowerCase().includes(q));
        const matchObj = drill.objectives.some(o => o.toLowerCase().includes(q));
        if (!matchTitle && !matchTags && !matchObj) return false;
      }
      return true;
    });
  }, [drills, selectedCategory, searchQuery]);

  // Counts per category
  const getCategoryCount = (catId: DrillCategory | 'all') => {
    if (catId === 'all') return drills.length;
    return drills.filter(d => d.category === catId).length;
  };

  const getIntensityLabel = (intensity: Drill['intensity']) => {
    switch (intensity) {
      case 'Low': return '低強度';
      case 'Medium': return '中強度';
      case 'High': return '高強度';
      case 'Match': return '試合強度';
      default: return '低強度';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f8fafc] text-neutral-800 overflow-y-auto custom-scrollbar font-sans">
      {/* Top Banner (Screenshot 1 top banner) */}
      {showUpgradeBanner && (
        <div className="mx-8 mt-5 p-3.5 bg-gradient-to-r from-[#fef08a] to-[#fde047] border border-[#facc15] rounded-xl flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#eab308] text-[#081a2e] flex items-center justify-center font-bold shrink-0">
              <Rocket className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0f172a]">
                FLEISS GK School 専用プロモード：無制限にドリル・メニューを作成できます
              </div>
              <div className="text-[11px] text-[#475569]">
                タクティカルボードでの作図、GK選手管理、GitHub連携が制限なしで利用可能です
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onNewDrill}
              className="px-4 py-1.5 bg-[#eab308] hover:bg-[#ca8a04] text-[#081a2e] font-bold text-xs rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>+ 新規ドリル作成</span>
              <Rocket className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setShowUpgradeBanner(false)}
              className="text-neutral-500 hover:text-neutral-800 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="px-8 py-6 space-y-6">
        {/* Title */}
        <div>
          <h1 className="text-3xl font-extrabold text-[#081a2e] tracking-tight">
            マイドリル
          </h1>
        </div>

        {/* Category Carousel (Screenshot 1 Folders) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-neutral-500">
              カテゴリーフォルダ
            </div>
            {/* Carousel Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
                disabled={carouselIndex === 0}
                className="w-6 h-6 rounded-full bg-neutral-200 hover:bg-neutral-300 disabled:opacity-30 text-neutral-700 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCarouselIndex(Math.min(CATEGORIES.length - 4, carouselIndex + 1))}
                disabled={carouselIndex >= CATEGORIES.length - 4}
                className="w-6 h-6 rounded-full bg-neutral-200 hover:bg-neutral-300 disabled:opacity-30 text-neutral-700 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Folder Cards Strip */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar">
            {CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat.id;
              const count = getCategoryCount(cat.id);

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex flex-col justify-between w-40 min-w-[150px] h-20 p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-white border-[#081a2e] shadow-md ring-2 ring-[#081a2e]/10'
                      : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      {cat.icon === 'all' ? (
                        <LayoutGrid className={`w-4 h-4 ${isSelected ? 'text-[#081a2e]' : 'text-neutral-500'}`} />
                      ) : (
                        <Folder className={`w-4 h-4 ${isSelected ? 'text-[#081a2e]' : 'text-neutral-500'}`} />
                      )}
                      <span className={`text-xs font-bold truncate ${isSelected ? 'text-[#081a2e]' : 'text-neutral-700'}`}>
                        {cat.name}
                      </span>
                    </div>
                    {cat.id !== 'all' && (
                      <MoreVertical className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    )}
                  </div>
                  <div className="text-[11px] font-medium text-neutral-500">
                    <span className="font-bold text-neutral-800">{count}</span> ドリル
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter and Search Bar (Screenshot 1 Action Bar) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-2">
          {/* Search Input */}
          <div className="relative flex-1 w-full max-w-xl">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="検索：ブロック、戦術、ウォームアップ..."
              className="w-full bg-white border border-neutral-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#081a2e] focus:ring-1 focus:ring-[#081a2e] shadow-xs"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Filter Button */}
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-semibold text-xs rounded-xl shadow-xs transition-colors">
              <SlidersHorizontal className="w-4 h-4 text-neutral-500" />
              <span>フィルター</span>
            </button>

            {/* + 新規ドリル (Bright Yellow Button like Screenshot 1) */}
            <button
              onClick={onNewDrill}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#f59e0b] hover:bg-[#d97706] text-[#081a2e] font-extrabold text-xs rounded-xl shadow-sm transition-all hover:shadow"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>新規ドリル</span>
            </button>
          </div>
        </div>

        {/* List Header */}
        <div className="flex items-center gap-2 text-xs font-bold text-neutral-600 pt-2">
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>
            {selectedCategory === 'all'
              ? `すべてのドリル・${filteredDrills.length} ドリル`
              : `${CATEGORIES.find(c => c.id === selectedCategory)?.name}・${filteredDrills.length} ドリル`}
          </span>
        </div>

        {/* Grid of 3 Columns (Screenshot 1 Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrills.map(drill => (
            <div
              key={drill.id}
              className="group bg-white rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all overflow-hidden flex flex-col"
            >
              {/* Card Pitch Thumbnail (Screenshot 1 style) */}
              <div
                onClick={() => onSelectDrill(drill)}
                className="relative aspect-[16/10] bg-[#15803d] cursor-pointer overflow-hidden border-b border-neutral-100 flex items-center justify-center select-none"
              >
                {/* SVG Pitch Canvas Rendering with Net & Markings */}
                <svg viewBox="0 0 1000 700" className="w-full h-full pointer-events-none">
                  {/* Grass Mowing Stripes */}
                  <rect x="0" y="0" width="1000" height="700" fill="#15803d" />
                  {[0, 100, 200, 300, 400, 500, 600].map(y => (
                    <rect key={y} x="0" y={y} width="1000" height="50" fill="#166534" opacity="0.35" />
                  ))}
                  {/* Pitch Border */}
                  <rect x="30" y="30" width="940" height="640" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="3.5" />
                  {/* Goal Area line */}
                  <line x1="30" y1="80" x2="970" y2="80" stroke="rgba(255,255,255,0.9)" strokeWidth="4" />
                  <rect x="280" y="80" width="440" height="150" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.8)" strokeWidth="3" />
                  <circle cx="500" cy="300" r="5" fill="#ffffff" />
                  {/* Penalty Arc */}
                  <path d="M420,440 A100,100 0 0,0 580,440" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="3" />

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
                          strokeWidth="4"
                          strokeDasharray={ar.dashed ? '8 6' : undefined}
                          strokeLinecap="round"
                        />
                      )}
                    </g>
                  ))}

                  {/* Elements & Callout Boxes */}
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

              {/* Card Content (Screenshot 1: Title, Meta, Tag Chips) */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3
                      onClick={() => onSelectDrill(drill)}
                      className="text-base font-bold text-[#081a2e] hover:text-[#2563eb] cursor-pointer transition-colors truncate"
                    >
                      {drill.title}
                    </h3>

                    {/* 3 Dots Menu */}
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === drill.id ? null : drill.id);
                        }}
                        className="p-1 rounded hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {activeMenuId === drill.id && (
                        <div
                          className="absolute right-0 top-6 w-36 bg-white border border-neutral-200 rounded-xl shadow-lg z-20 py-1 text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              onEditDrill(drill);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-neutral-50 text-neutral-700"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>編集</span>
                          </button>
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              onDuplicateDrill(drill);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-neutral-50 text-neutral-700"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>複製</span>
                          </button>
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              if (window.confirm(`「${drill.title}」を削除しますか？`)) {
                                onDeleteDrill(drill.id);
                              }
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-rose-50 text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>削除</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Metadata Line (Screenshot 1: ⏱ 10〜15分 · 📈 導入 · 📊 低強度 · 👥 ペア) */}
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-neutral-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      <span>{drill.durationMinutes}分</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-neutral-400" />
                      <span>導入</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Activity className="w-3 h-3 text-neutral-400" />
                      <span>{getIntensityLabel(drill.intensity)}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-neutral-400" />
                      <span>GK {drill.gkCount}</span>
                    </span>
                  </div>
                </div>

                {/* Tag Chips (Screenshot 1: コーン, マーカーコーン) */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {drill.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#fef3c7] text-[#92400e] border border-[#fde68a]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
