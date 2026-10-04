import React, { useState } from 'react';
import { ElementType } from '../../types';
import { ElementGraphic } from './TacticalSvgDefs';
import { 
  Pencil, 
  Type, 
  ListOrdered, 
  Grid, 
  ArrowRight,
  User, 
  Smile,
  Shield
} from 'lucide-react';

interface IllustrationLibraryProps {
  onAddElement: (type: ElementType, customLabel?: string) => void;
  activeTool: 'select' | 'arrow_shot' | 'arrow_pass' | 'arrow_gk' | 'arrow_cross' | 'text';
  setActiveTool: (tool: 'select' | 'arrow_shot' | 'arrow_pass' | 'arrow_gk' | 'arrow_cross' | 'text') => void;
}

type DockCategory = 
  | 'equipment'   // ▲ ⚽ 用具・器具
  | 'goalkeeper'  // 🤸 ゴールキーパー (Screenshot 3 Active)
  | 'player'      // 🏃 フィールド選手
  | 'coach'       // 👨‍🏫 コーチ
  | 'arrows'      // ➔ 矢印
  | 'text'        // Aa テキスト・指示枠
  | 'numbers'     // ① 手順番号
  | 'zones';      // ▧ エリア

interface ItemDef {
  type: ElementType;
  name: string;
  defaultLabel?: string;
}

// Screenshot 3 Goalkeeper items in horizontal tray
const GK_ITEMS: ItemDef[] = [
  { type: 'gk_ready', name: '基本姿勢（構え）', defaultLabel: 'GK' },
  { type: 'gk_spread', name: 'スプレッド（両足開き）', defaultLabel: 'Spread' },
  { type: 'gk_k_block', name: 'Kブロック（片膝着地）', defaultLabel: 'Kセーブ' },
  { type: 'gk_stand_single', name: '片足ステップ', defaultLabel: 'Step' },
  { type: 'gk_high_catch', name: 'ハイキャッチ（頭上確保）', defaultLabel: 'Catch' },
  { type: 'gk_arms_up', name: '両手上構え', defaultLabel: 'Ready' },
  { type: 'gk_air_claim', name: '空中ジャンプキャッチ', defaultLabel: 'Air' },
  { type: 'gk_smother', name: 'フロントダイブ低姿勢', defaultLabel: 'Smother' },
  { type: 'gk_dive_low_left', name: 'ローダイブ（左）', defaultLabel: 'Low L' },
  { type: 'gk_dive_low_right', name: 'ローダイブ（右）', defaultLabel: 'Low R' },
  { type: 'gk_dive_mid_left', name: 'ミドルダイブ（左）', defaultLabel: 'Mid L' },
  { type: 'gk_dive_mid_right', name: 'ミドルダイブ（右）', defaultLabel: 'Mid R' },
  { type: 'gk_dive_high_left', name: 'ハイダイブ（左）', defaultLabel: 'High L' },
  { type: 'gk_dive_high_right', name: 'ハイダイブ（右）', defaultLabel: 'High R' },
  { type: 'gk_slide_left', name: '水平スライド（左）', defaultLabel: 'Slide L' },
  { type: 'gk_slide_right', name: '水平スライド（右）', defaultLabel: 'Slide R' },
];

const EQUIPMENT_ITEMS: ItemDef[] = [
  { type: 'cone_tall_orange', name: 'コーン (赤・橙)' },
  { type: 'cone_tall_yellow', name: 'コーン (黄)' },
  { type: 'cone_tall_blue', name: 'コーン (青)' },
  { type: 'marker_disc_white', name: 'マーカー (白)' },
  { type: 'marker_disc_red', name: 'マーカー (赤)' },
  { type: 'marker_disc_yellow', name: 'マーカー (黄)' },
  { type: 'marker_disc_blue', name: 'マーカー (青)' },
  { type: 'ball', name: 'サッカーボール' },
  { type: 'tennis_ball', name: 'テニスボール' },
  { type: 'goal_regulation', name: '公式ゴール 7.32m' },
  { type: 'goal_mini', name: 'ミニゴール', defaultLabel: 'Mini' },
  { type: 'mannequin', name: '人垣マネキン' },
  { type: 'ladder', name: 'アジリティラダー' },
  { type: 'hurdle', name: 'ミニハードル' },
  { type: 'rebounder', name: 'リバウンダー反発板' },
  { type: 'deflection_board', name: '偏向ボード' },
  { type: 'target_ring', name: 'ターゲット枠' },
];

const PLAYER_ITEMS: ItemDef[] = [
  { type: 'attacker', name: 'アタッカー (黄・FW)', defaultLabel: 'FW' },
  { type: 'defender', name: 'ディフェンダー (青・DF)', defaultLabel: 'DF' },
  { type: 'server_2', name: 'サーバー 2', defaultLabel: 'S2' },
];

const CALLOUT_PRESETS = [
  '7.32を守る',
  '3歩で7.32を閉じる',
  'ボールより先に動かない',
  'スローは必ず指定で',
  '蹴る位置によって斜を変える',
  'テニスボールを投げ合い、動く',
  'Green',
  '1st shot',
  'リカバリー',
];

export const IllustrationLibrary: React.FC<IllustrationLibraryProps> = ({
  onAddElement,
  activeTool,
  setActiveTool,
}) => {
  const [activeCategory, setActiveCategory] = useState<DockCategory>('goalkeeper');
  const [customText, setCustomText] = useState('');

  return (
    <div className="w-full bg-[#f1f5f9] border-t border-neutral-300 flex flex-col shrink-0 select-none font-sans shadow-lg">
      {/* 1. Top Category Bar (Screenshot 3 icons row) */}
      <div className="flex items-center gap-1 px-6 pt-2 pb-1.5 border-b border-neutral-200 bg-white">
        {/* Cones & Balls */}
        <button
          onClick={() => setActiveCategory('equipment')}
          title="器具・用具"
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeCategory === 'equipment'
              ? 'bg-[#081a2e] text-[#eab308]'
              : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
          }`}
        >
          <span className="text-sm">▲ ⚽</span>
        </button>

        {/* Goalkeeper (Screenshot 3 Active with blue tooltip) */}
        <div className="relative">
          <button
            onClick={() => setActiveCategory('goalkeeper')}
            title="ゴールキーパー"
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeCategory === 'goalkeeper'
                ? 'bg-[#081a2e] text-[#eab308] shadow-xs'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <span className="text-sm">🧤 🤸</span>
          </button>

          {/* Screenshot 3 Floating Tooltip: "ゴールキーパー" */}
          {activeCategory === 'goalkeeper' && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#081a2e] text-white text-[10px] font-bold whitespace-nowrap shadow-md pointer-events-none">
              ゴールキーパー
            </div>
          )}
        </div>

        {/* Field Player */}
        <button
          onClick={() => setActiveCategory('player')}
          title="フィールド選手"
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeCategory === 'player'
              ? 'bg-[#081a2e] text-[#eab308]'
              : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
          }`}
        >
          <span className="text-sm">🏃</span>
        </button>

        {/* Coach */}
        <button
          onClick={() => {
            setActiveCategory('coach');
            onAddElement('coach_server', 'Coach');
          }}
          title="コーチ・キッカー"
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeCategory === 'coach'
              ? 'bg-[#081a2e] text-[#eab308]'
              : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
          }`}
        >
          <span className="text-sm">👨‍🏫 📋</span>
        </button>

        <div className="w-px h-5 bg-neutral-200 mx-1" />

        {/* Arrows & Lines */}
        <button
          onClick={() => setActiveCategory('arrows')}
          title="矢印・パスライン"
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeCategory === 'arrows'
              ? 'bg-[#081a2e] text-[#eab308]'
              : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
          }`}
        >
          <span className="text-sm">⇢ ⤳ ➜</span>
        </button>

        {/* Pen */}
        <button
          onClick={() => {
            setActiveCategory('arrows');
            setActiveTool('arrow_shot');
          }}
          title="フリーハンド描画"
          className="p-1.5 rounded-lg text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
        >
          <Pencil className="w-4 h-4" />
        </button>

        {/* Text Callouts (Aa) */}
        <button
          onClick={() => setActiveCategory('text')}
          title="テキスト・指示枠"
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeCategory === 'text'
              ? 'bg-[#081a2e] text-[#eab308]'
              : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
          }`}
        >
          <span className="text-sm font-serif">Aa</span>
        </button>

        {/* Step Numbers (①) */}
        <button
          onClick={() => setActiveCategory('numbers')}
          title="手順番号"
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeCategory === 'numbers'
              ? 'bg-[#081a2e] text-[#eab308]'
              : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
          }`}
        >
          <span className="text-sm">①</span>
        </button>

        {/* Zone Shading */}
        <button
          onClick={() => {
            setActiveCategory('zones');
            onAddElement('zone_box', 'Danger Zone');
          }}
          title="ゾーンエリア"
          className={`p-1.5 rounded-lg transition-all ${
            activeCategory === 'zones'
              ? 'bg-[#081a2e] text-[#eab308]'
              : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
          }`}
        >
          <Grid className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Bottom Content Strip (Screenshot 3 Tray) */}
      <div className="h-28 overflow-x-auto px-6 py-2 flex items-center gap-3 bg-[#e2e8f0]/80 custom-scrollbar">
        {/* Goalkeeper Stance Tray (Screenshot 3) */}
        {activeCategory === 'goalkeeper' && (
          <div className="flex items-center gap-3">
            {GK_ITEMS.map((item, idx) => (
              <button
                key={item.type + idx}
                onClick={() => onAddElement(item.type, item.defaultLabel)}
                title={item.name}
                className="group flex flex-col items-center justify-center w-16 h-22 p-1 bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-[#081a2e] rounded-xl shadow-xs hover:shadow transition-all shrink-0 cursor-pointer"
              >
                <div className="w-12 h-14 flex items-center justify-center pointer-events-none">
                  <svg viewBox="-35 -35 70 70" className="w-full h-full">
                    <ElementGraphic type={item.type} scale={0.9} />
                  </svg>
                </div>
                <span className="text-[9px] font-bold text-neutral-600 group-hover:text-[#081a2e] truncate max-w-full text-center">
                  {item.defaultLabel || item.name}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Equipment Tray */}
        {activeCategory === 'equipment' && (
          <div className="flex items-center gap-3">
            {EQUIPMENT_ITEMS.map((item, idx) => (
              <button
                key={item.type + idx}
                onClick={() => onAddElement(item.type, item.defaultLabel)}
                title={item.name}
                className="group flex flex-col items-center justify-center w-16 h-22 p-1 bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-[#081a2e] rounded-xl shadow-xs hover:shadow transition-all shrink-0 cursor-pointer"
              >
                <div className="w-12 h-14 flex items-center justify-center pointer-events-none">
                  <svg viewBox="-35 -35 70 70" className="w-full h-full">
                    <ElementGraphic type={item.type} scale={0.85} />
                  </svg>
                </div>
                <span className="text-[9px] font-bold text-neutral-600 group-hover:text-[#081a2e] truncate max-w-full text-center">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Player Tray */}
        {activeCategory === 'player' && (
          <div className="flex items-center gap-3">
            {PLAYER_ITEMS.map((item, idx) => (
              <button
                key={item.type + idx}
                onClick={() => onAddElement(item.type, item.defaultLabel)}
                title={item.name}
                className="group flex flex-col items-center justify-center w-16 h-22 p-1 bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-[#081a2e] rounded-xl shadow-xs hover:shadow transition-all shrink-0 cursor-pointer"
              >
                <div className="w-12 h-14 flex items-center justify-center pointer-events-none">
                  <svg viewBox="-30 -30 60 60" className="w-full h-full">
                    <ElementGraphic type={item.type} scale={1} />
                  </svg>
                </div>
                <span className="text-[9px] font-bold text-neutral-600 group-hover:text-[#081a2e] truncate max-w-full text-center">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Arrows Tray */}
        {activeCategory === 'arrows' && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTool('arrow_shot')}
              className={`flex flex-col items-center justify-center w-28 h-20 p-2 rounded-xl border text-center transition-all shrink-0 ${
                activeTool === 'arrow_shot'
                  ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-xs'
                  : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <span className="text-xl font-bold text-red-500">➔</span>
              <span className="text-[11px] font-bold mt-1">シュート (赤実線)</span>
              <span className="text-[9px] text-neutral-400">ピッチ上をドラッグ</span>
            </button>

            <button
              onClick={() => setActiveTool('arrow_cross')}
              className={`flex flex-col items-center justify-center w-28 h-20 p-2 rounded-xl border text-center transition-all shrink-0 ${
                activeTool === 'arrow_cross'
                  ? 'bg-amber-50 border-amber-500 text-amber-700 shadow-xs'
                  : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <span className="text-xl font-bold text-amber-500">⤳</span>
              <span className="text-[11px] font-bold mt-1">クロス (曲線)</span>
              <span className="text-[9px] text-neutral-400">アーチを描く</span>
            </button>

            <button
              onClick={() => setActiveTool('arrow_gk')}
              className={`flex flex-col items-center justify-center w-28 h-20 p-2 rounded-xl border text-center transition-all shrink-0 ${
                activeTool === 'arrow_gk'
                  ? 'bg-cyan-50 border-cyan-500 text-cyan-700 shadow-xs'
                  : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <span className="text-xl font-bold text-cyan-600">⇢</span>
              <span className="text-[11px] font-bold mt-1">GK移動 (点線)</span>
              <span className="text-[9px] text-neutral-400">ステップワーク</span>
            </button>

            <button
              onClick={() => setActiveTool('arrow_pass')}
              className={`flex flex-col items-center justify-center w-28 h-20 p-2 rounded-xl border text-center transition-all shrink-0 ${
                activeTool === 'arrow_pass'
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-xs'
                  : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <span className="text-xl font-bold text-emerald-600">➜</span>
              <span className="text-[11px] font-bold mt-1">パス・スロー</span>
              <span className="text-[9px] text-neutral-400">配球ライン</span>
            </button>
          </div>
        )}

        {/* Text Callouts Tray (Screenshot 1 Presets) */}
        {activeCategory === 'text' && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-neutral-300 shrink-0">
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="独自の指示テキスト..."
                className="text-xs px-2 py-1 border border-neutral-300 rounded-lg w-44"
              />
              <button
                onClick={() => {
                  if (customText.trim()) {
                    onAddElement('callout_box', customText.trim());
                    setCustomText('');
                  }
                }}
                className="px-3 py-1 bg-[#081a2e] text-white font-bold text-xs rounded-lg"
              >
                配置
              </button>
            </div>

            {CALLOUT_PRESETS.map((txt, idx) => (
              <button
                key={idx}
                onClick={() => onAddElement('callout_box', txt)}
                className="px-3 py-1.5 bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-[#081a2e] rounded-xl text-xs font-bold text-[#081a2e] shadow-xs shrink-0 transition-colors"
              >
                {txt}
              </button>
            ))}
          </div>
        )}

        {/* Step Numbers ①②③ */}
        {activeCategory === 'numbers' && (
          <div className="flex items-center gap-3">
            {['1', '2', '3', '4', '5', '6'].map(num => (
              <button
                key={num}
                onClick={() => onAddElement('step_number', num)}
                className="w-12 h-12 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-white font-extrabold text-base flex items-center justify-center shadow-xs transition-all shrink-0"
              >
                {num}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
