import React, { useState } from 'react';
import { Drill, Player, SessionPlan } from '../../types';
import { ElementGraphic } from '../TacticalBoard/TacticalSvgDefs';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  Printer, 
  Save, 
  Check, 
  Users,
  ChevronDown
} from 'lucide-react';

interface SessionPlannerProps {
  drills: Drill[];
  players: Player[];
  sessions: SessionPlan[];
  onSaveSession: (session: SessionPlan) => void;
  onDeleteSession: (id: string) => void;
}

export const SessionPlanner: React.FC<SessionPlannerProps> = ({
  drills,
  players,
  sessions,
  onSaveSession,
  onDeleteSession,
}) => {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    sessions[0]?.id || null
  );

  // New or active session state
  const [title, setTitle] = useState('本日のGKトレーニングセッション');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [targetCategory, setTargetCategory] = useState<SessionPlan['targetCategory']>('All');
  const [mainObjective, setMainObjective] = useState(
    '至近距離でのコラプシング反応と1対1での我慢強さの定着'
  );
  const [coachNotes, setCoachNotes] = useState(
    '雨天のためスリッピーなピッチコンディション。ボールのバウンド速度に注意させる。'
  );
  const [selectedDrillIds, setSelectedDrillIds] = useState<string[]>([
    drills[0]?.id || '',
    drills[1]?.id || '',
  ].filter(Boolean));
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>(
    players.map(p => p.id)
  );

  const activeDrills = selectedDrillIds
    .map(id => drills.find(d => d.id === id))
    .filter((d): d is Drill => !!d);

  const totalMinutes = activeDrills.reduce((acc, d) => acc + d.durationMinutes, 0);

  const handleSave = () => {
    const newSession: SessionPlan = {
      id: selectedSessionId || `session-${Date.now()}`,
      title,
      date,
      targetCategory,
      assignedPlayerIds: selectedPlayerIds,
      drills: activeDrills.map(d => ({
        drillId: d.id,
        durationMinutes: d.durationMinutes,
      })),
      mainObjective,
      coachNotes,
      createdAt: new Date().toISOString(),
    };
    onSaveSession(newSession);
    setSelectedSessionId(newSession.id);
    alert('セッション計画を保存しました');
  };

  const handleAddDrill = (drillId: string) => {
    if (!selectedDrillIds.includes(drillId)) {
      setSelectedDrillIds([...selectedDrillIds, drillId]);
    }
  };

  const handleRemoveDrill = (drillId: string) => {
    setSelectedDrillIds(selectedDrillIds.filter(id => id !== drillId));
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-neutral-950 overflow-hidden">
      {/* Top Header */}
      <div className="p-6 border-b border-neutral-800 bg-neutral-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">セッション計画 (Session Planner)</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            日々のトレーニングメニューを組み合わせて1回のGK練習セッションを設計
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            <Printer className="w-4 h-4" />
            印刷 / 指導案シート印刷
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            セッションを保存
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {/* Session Meta Card */}
        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="md:col-span-2">
              <label className="block text-neutral-400 mb-1">セッション名</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white font-semibold"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">実施日</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">合計練習時間</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-emerald-400 font-mono font-bold">
                <Clock className="w-4 h-4" />
                {totalMinutes} 分 ({activeDrills.length}メニュー)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1">本日のメインテーマ・狙い</label>
              <textarea
                rows={2}
                value={mainObjective}
                onChange={(e) => setMainObjective(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">天候・ピッチ条件・特記事項</label>
              <textarea
                rows={2}
                value={coachNotes}
                onChange={(e) => setCoachNotes(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Selected Drills Pipeline */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>実施メニュー構成</span>
              <span className="text-xs font-normal text-neutral-400">
                （ドラッグ＆ドロップまたは追加ボタンで編成）
              </span>
            </h3>

            {/* Quick Drill Adder Dropdown */}
            <div className="relative">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddDrill(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-emerald-400 font-medium focus:outline-none cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled>+ メニューをセッションに追加...</option>
                {drills
                  .filter(d => !selectedDrillIds.includes(d.id))
                  .map(d => (
                    <option key={d.id} value={d.id}>
                      {d.title} ({d.durationMinutes}分)
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {activeDrills.map((drill, index) => (
              <div
                key={drill.id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col md:flex-row gap-5 items-start justify-between"
              >
                {/* Tactical Mini Pitch */}
                <div className="w-full md:w-56 aspect-[16/10] bg-neutral-950 rounded-lg overflow-hidden border border-neutral-800 shrink-0">
                  <svg viewBox="0 0 1000 700" className="w-full h-full pointer-events-none">
                    <rect x="0" y="0" width="1000" height="700" fill={drill.board.pitchStyle === 'tactical_dark' ? '#0f172a' : '#15803d'} />
                    <rect x="30" y="30" width="940" height="640" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
                    <line x1="30" y1="90" x2="970" y2="90" stroke="rgba(255,255,255,0.8)" strokeWidth="3.5" />
                    {drill.board.elements.map(el => (
                      <g key={el.id} transform={`translate(${el.x}, ${el.y}) rotate(${el.rotation}) scale(${el.scale})`}>
                        <ElementGraphic type={el.type} scale={el.scale} label={el.label} color={el.color} />
                      </g>
                    ))}
                  </svg>
                </div>

                {/* Drill Info */}
                <div className="flex-1 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <span className="font-bold text-emerald-400 font-mono">Part {index + 1}</span>
                    <span>·</span>
                    <span>{drill.category}</span>
                    <span>·</span>
                    <span className="font-mono text-white font-medium">{drill.durationMinutes}分</span>
                  </div>

                  <h4 className="text-sm font-bold text-white">{drill.title}</h4>
                  <p className="text-neutral-300 leading-relaxed line-clamp-2">
                    {drill.objectives[0]}
                  </p>

                  <div className="text-[11px] text-neutral-400 pt-1">
                    <span className="text-emerald-400 font-medium">キーファクター: </span>
                    {drill.coachingPoints.slice(0, 2).join(' / ')}
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => handleRemoveDrill(drill.id)}
                  className="p-2 text-neutral-500 hover:text-rose-400 rounded-lg hover:bg-neutral-800 transition-colors self-end md:self-auto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Participating GK Players */}
        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl space-y-3">
          <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-4 h-4 text-emerald-400" />
            参加ゴールキーパー ({selectedPlayerIds.length}名)
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {players.map(p => {
              const isSelected = selectedPlayerIds.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedPlayerIds(selectedPlayerIds.filter(id => id !== p.id));
                    } else {
                      setSelectedPlayerIds([...selectedPlayerIds, p.id]);
                    }
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors ${
                    isSelected
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 font-medium'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <span className="font-mono font-bold">#{p.number}</span>
                  <span>{p.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
