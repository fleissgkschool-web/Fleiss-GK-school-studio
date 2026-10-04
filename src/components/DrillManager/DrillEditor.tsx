import React, { useState } from 'react';
import { Drill, DrillCategory, AgeCategory, TacticalBoardData } from '../../types';
import { TacticalStudio } from '../TacticalBoard/TacticalStudio';
import { 
  Save, 
  X, 
  Plus, 
  Trash2, 
  Pencil, 
  FileText, 
  Video, 
  Tag, 
  ChevronRight 
} from 'lucide-react';

interface DrillEditorProps {
  drill?: Drill | null;
  onSave: (drill: Drill) => void;
  onCancel: () => void;
}

export const DrillEditor: React.FC<DrillEditorProps> = ({
  drill,
  onSave,
  onCancel,
}) => {
  const [activeTab, setActiveTab] = useState<'board' | 'details' | 'video' | 'tags'>('board');

  // Form states
  const [title, setTitle] = useState(drill?.title || '新規ドリル');
  const [category, setCategory] = useState<DrillCategory>(drill?.category || 'one_on_one');
  const [ageCategory, setAgeCategory] = useState<AgeCategory>(drill?.ageCategory || 'All');
  const [durationMinutes, setDurationMinutes] = useState(drill?.durationMinutes || 15);
  const [intensity, setIntensity] = useState<Drill['intensity']>(drill?.intensity || 'Medium');
  const [gkCount, setGkCount] = useState(drill?.gkCount || 2);
  const [videoUrl, setVideoUrl] = useState('');
  const [objectives, setObjectives] = useState<string[]>(
    drill?.objectives || ['最短距離でのボールアプローチと構え', 'キャッチング時の手首の固定']
  );
  const [setup, setSetup] = useState(drill?.setup || 'ゴール前、ペナルティエリア内にマーカーとコーンを配置。');
  const [procedure, setProcedure] = useState<string[]>(
    drill?.procedure || [
      '1. GKはセンターコーンで基本姿勢を保持。',
      '2. キッカーの合図でステップインしシュートストップ。',
      '3. キャッチ後、素早く逆サイドへ配球。'
    ]
  );
  const [coachingPoints, setCoachingPoints] = useState<string[]>(
    drill?.coachingPoints || [
      '7.32mを守る意識：コースの真ん中に重心を置く',
      'ボールより先に動かない（フェイクに釣られない）'
    ]
  );
  const [progressions, setProgressions] = useState<string[]>(
    drill?.progressions || ['キッカーのシュートスピードを上げる', 'セカンドボールの処理を追加']
  );
  const [tagsInput, setTagsInput] = useState(drill?.tags?.join(', ') || 'コーン, マーカーコーン, 1対1');

  // Tactical Board state
  const [board, setBoard] = useState<TacticalBoardData>(
    drill?.board || {
      pitchType: 'goal_mouth',
      pitchStyle: 'emerald_grass',
      elements: [
        { id: 'el-1', type: 'goal_regulation', x: 500, y: 70, rotation: 0, scale: 1.1 },
        { id: 'el-2', type: 'gk_ready', x: 500, y: 190, rotation: 180, scale: 1, label: 'GK' },
        { id: 'el-3', type: 'coach_server', x: 500, y: 500, rotation: 0, scale: 1, label: 'Coach' },
        { id: 'el-4', type: 'ball', x: 490, y: 460, rotation: 0, scale: 1 },
      ],
      arrows: [],
    }
  );

  const handleSave = () => {
    if (!title.trim()) {
      alert('ドリルタイトルを入力してください');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const savedDrill: Drill = {
      id: drill?.id || `drill-${Date.now()}`,
      title: title.trim(),
      category,
      ageCategory,
      durationMinutes: Number(durationMinutes) || 15,
      intensity,
      gkCount: Number(gkCount) || 2,
      objectives: objectives.filter(Boolean),
      setup,
      procedure: procedure.filter(Boolean),
      coachingPoints: coachingPoints.filter(Boolean),
      progressions: progressions.filter(Boolean),
      tags,
      board,
      isFavorite: drill?.isFavorite ?? false,
      createdAt: drill?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(savedDrill);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#f8fafc] text-neutral-800 select-none font-sans">
      {/* Top Header & Breadcrumbs (Screenshot 2: マイドリル > 新規ドリルを作成) */}
      <div className="bg-white border-b border-neutral-200 px-8 pt-4 pb-3 space-y-3">
        {/* Breadcrumb row & Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
            <span onClick={onCancel} className="hover:text-neutral-800 cursor-pointer">
              マイドリル
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-[#081a2e] font-bold">
              {drill ? 'ドリルを編集' : '新規ドリルを作成'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-1.5 text-xs font-bold text-[#081a2e] bg-[#f59e0b] hover:bg-[#d97706] rounded-lg transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              保存する
            </button>
          </div>
        </div>

        {/* Big Title (Screenshot 2) */}
        <div>
          <h1 className="text-2xl font-extrabold text-[#081a2e]">
            {drill ? 'ドリルを編集' : '新規ドリルを作成'}
          </h1>
        </div>

        {/* Drill Title Input & Mode Tabs (Screenshot 2) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          {/* Title Input field: "ドリル #11" */}
          <div className="w-full max-w-md">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ドリル名（例：ダブルゴール、1対1 Kセーブ）"
              className="w-full bg-[#f8fafc] border border-neutral-300 rounded-xl px-4 py-2 text-sm font-bold text-[#081a2e] focus:outline-none focus:border-[#081a2e] focus:ring-1 focus:ring-[#081a2e] shadow-xs"
            />
          </div>

          {/* Mode Tabs: [作図] [詳細] [ビデオ] [タグ] (Screenshot 2) */}
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl border border-neutral-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab('board')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg transition-all ${
                activeTab === 'board'
                  ? 'bg-white text-[#081a2e] shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>作図</span>
            </button>

            <button
              onClick={() => setActiveTab('details')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg transition-all ${
                activeTab === 'details'
                  ? 'bg-white text-[#081a2e] shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>詳細</span>
            </button>

            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg transition-all ${
                activeTab === 'video'
                  ? 'bg-white text-[#081a2e] shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>ビデオ</span>
            </button>

            <button
              onClick={() => setActiveTab('tags')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg transition-all ${
                activeTab === 'tags'
                  ? 'bg-white text-[#081a2e] shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>タグ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {activeTab === 'board' && (
          <TacticalStudio
            board={board}
            onChange={setBoard}
            drillTitle={title}
          />
        )}

        {activeTab === 'details' && (
          <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto space-y-6 custom-scrollbar w-full">
            {/* Category & Stats */}
            <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#081a2e]">基本設定</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">カテゴリー</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as DrillCategory)}
                    className="w-full bg-[#f8fafc] border border-neutral-300 rounded-lg px-3 py-2 text-neutral-800 font-medium"
                  >
                    <option value="one_on_one">1対1</option>
                    <option value="global">グローバル</option>
                    <option value="shot_stopping">セービング</option>
                    <option value="distribution">ディストリビューション</option>
                    <option value="high_ball">ハイボール</option>
                    <option value="positioning">ポジショニング</option>
                    <option value="reaction">反応</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">所要時間 (分)</label>
                  <input
                    type="number"
                    min="5"
                    max="90"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full bg-[#f8fafc] border border-neutral-300 rounded-lg px-3 py-2 text-neutral-800 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">運動強度</label>
                  <select
                    value={intensity}
                    onChange={(e) => setIntensity(e.target.value as Drill['intensity'])}
                    className="w-full bg-[#f8fafc] border border-neutral-300 rounded-lg px-3 py-2 text-neutral-800 font-medium"
                  >
                    <option value="Low">低強度</option>
                    <option value="Medium">中強度</option>
                    <option value="High">高強度</option>
                    <option value="Match">試合強度</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Objectives */}
            <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#081a2e]">トレーニングの目的・狙い</h3>
                <button
                  type="button"
                  onClick={() => setObjectives([...objectives, ''])}
                  className="flex items-center gap-1 text-xs text-[#2563eb] hover:text-[#1d4ed8] font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  目的を追加
                </button>
              </div>
              {objectives.map((obj, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={obj}
                    onChange={(e) => {
                      const next = [...objectives];
                      next[i] = e.target.value;
                      setObjectives(next);
                    }}
                    placeholder={`目的 ${i + 1}`}
                    className="flex-1 bg-[#f8fafc] border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-800"
                  />
                  <button
                    type="button"
                    onClick={() => setObjectives(objectives.filter((_, idx) => idx !== i))}
                    className="p-2 text-neutral-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Coaching Points */}
            <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#081a2e]">キーファクター (Coaching Points)</h3>
                <button
                  type="button"
                  onClick={() => setCoachingPoints([...coachingPoints, ''])}
                  className="flex items-center gap-1 text-xs text-[#2563eb] hover:text-[#1d4ed8] font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  キーファクターを追加
                </button>
              </div>
              {coachingPoints.map((point, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => {
                      const next = [...coachingPoints];
                      next[i] = e.target.value;
                      setCoachingPoints(next);
                    }}
                    placeholder={`キーファクター ${i + 1}`}
                    className="flex-1 bg-[#f8fafc] border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-800"
                  />
                  <button
                    type="button"
                    onClick={() => setCoachingPoints(coachingPoints.filter((_, idx) => idx !== i))}
                    className="p-2 text-neutral-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'video' && (
          <div className="flex-1 overflow-y-auto p-8 max-w-2xl mx-auto space-y-4 w-full">
            <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#081a2e]">参考動画・実演ビデオURL</h3>
              <p className="text-xs text-neutral-500">
                YouTubeやVimeoの実演動画リンクを登録しておくと、指導時にタブレットで選手に見せることができます。
              </p>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full bg-[#f8fafc] border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-800 font-mono"
              />
            </div>
          </div>
        )}

        {activeTab === 'tags' && (
          <div className="flex-1 overflow-y-auto p-8 max-w-2xl mx-auto space-y-4 w-full">
            <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#081a2e]">タグ設定</h3>
              <p className="text-xs text-neutral-500">
                カンマ（,）区切りでタグを入力してください（例：コーン, マーカーコーン, 1対1, ペア）。
              </p>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="コーン, マーカーコーン, 反応"
                className="w-full bg-[#f8fafc] border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-800"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
