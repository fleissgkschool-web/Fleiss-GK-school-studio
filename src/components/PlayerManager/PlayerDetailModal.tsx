import React, { useState } from 'react';
import { Player, PlayerNote } from '../../types';
import { RadarChart } from './RadarChart';
import { 
  X, 
  Edit, 
  Calendar, 
  Activity, 
  Plus, 
  Star, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Printer
} from 'lucide-react';

interface PlayerDetailModalProps {
  player: Player;
  onClose: () => void;
  onEdit: (player: Player) => void;
  onAddNote: (playerId: string, note: Omit<PlayerNote, 'id'>) => void;
}

export const PlayerDetailModal: React.FC<PlayerDetailModalProps> = ({
  player,
  onClose,
  onEdit,
  onAddNote,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notes' | 'attendance'>('profile');
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteType, setNoteType] = useState<PlayerNote['type']>('evaluation');

  const averageRating = Math.round(
    Object.values(player.ratings).reduce((acc, v) => acc + v, 0) / 6
  );

  const handleSaveNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) return;
    onAddNote(player.id, {
      title: noteTitle.trim(),
      content: noteContent.trim(),
      date: new Date().toISOString().split('T')[0],
      author: 'GK コーチ',
      type: noteType,
    });
    setNoteTitle('');
    setNoteContent('');
    setShowNoteForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-4">
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
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="text-neutral-500">{player.furigana}</span>
                <span>·</span>
                <span className="text-emerald-400 font-medium">{player.category}</span>
                <span>·</span>
                <span>{player.team}</span>
              </div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                {player.name}
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono">
                  総合能力 {averageRating}
                </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-neutral-300 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              カルテ印刷
            </button>
            <button
              onClick={() => {
                onClose();
                onEdit(player);
              }}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
            >
              <Edit className="w-3.5 h-3.5" />
              プロフィール編集
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-neutral-800 bg-neutral-950/40 px-6 gap-6 text-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 font-medium transition-colors border-b-2 -mb-px ${
              activeTab === 'profile'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            総合能力 & レーダーチャート
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`py-3 font-medium transition-colors border-b-2 -mb-px ${
              activeTab === 'notes'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            指導記録・個別カルテ ({player.notes.length})
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`py-3 font-medium transition-colors border-b-2 -mb-px ${
              activeTab === 'attendance'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            トレーニング受講履歴 ({player.attendance.length})
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Top Details & Radar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Radar Chart */}
                <div className="flex flex-col items-center justify-center p-4 bg-neutral-950/40 rounded-xl border border-neutral-800">
                  <h3 className="text-xs font-semibold text-neutral-400 mb-2">
                    GK 6大ピラー能力評価チャート
                  </h3>
                  <RadarChart ratings={player.ratings} size={280} />
                </div>

                {/* Physical & Gear Profile */}
                <div className="space-y-4">
                  <div className="bg-neutral-950/40 p-4 rounded-xl border border-neutral-800 space-y-3">
                    <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      身体・用具データ
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-neutral-500">身長 / 体重:</span>
                        <p className="font-mono text-white font-medium mt-0.5">
                          {player.height} cm / {player.weight} kg
                        </p>
                      </div>
                      <div>
                        <span className="text-neutral-500">利き足 / 利き手:</span>
                        <p className="text-white font-medium mt-0.5">
                          {player.dominantFoot === 'Right' ? '右足' : '左足'} / {player.dominantHand === 'Right' ? '右手' : '両利き'}
                        </p>
                      </div>
                      <div>
                        <span className="text-neutral-500">生年月日:</span>
                        <p className="font-mono text-white font-medium mt-0.5">{player.birthDate}</p>
                      </div>
                      <div>
                        <span className="text-neutral-500">使用グローブ:</span>
                        <p className="text-white font-medium mt-0.5">{player.gloveSize}</p>
                      </div>
                    </div>
                  </div>

                  {/* IDP Goal */}
                  <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/30">
                    <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                      <Shield className="w-3.5 h-3.5" />
                      個人育成計画 (IDP) 目標
                    </h3>
                    <p className="text-xs text-neutral-200 leading-relaxed">
                      {player.idpGoal || '今期目標を設定してください。'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-neutral-950/40 p-4 rounded-xl border border-neutral-800">
                  <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ストロングポイント (強み)
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {player.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-neutral-950/40 p-4 rounded-xl border border-neutral-800">
                  <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    今後の改善・強化テーマ
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {player.weaknesses.map((w, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-400">
                  日々のトレーニング評価、フィジカル測定、試合の講評記録
                </p>
                <button
                  onClick={() => setShowNoteForm(!showNoteForm)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  記録を追加
                </button>
              </div>

              {/* Note creation form */}
              {showNoteForm && (
                <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                      placeholder="カルテ・記録タイトル..."
                      className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                    <select
                      value={noteType}
                      onChange={(e) => setNoteType(e.target.value as PlayerNote['type'])}
                      className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-300 focus:outline-none"
                    >
                      <option value="evaluation">技術評価・アドバイス</option>
                      <option value="training">練習メモ・測定値</option>
                      <option value="medical">コンディショニング・怪我</option>
                      <option value="idp">育成計画更新</option>
                    </select>
                  </div>
                  <textarea
                    rows={3}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="具体的な指導内容、改善点、次回の意識事項..."
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-xs text-white leading-relaxed focus:outline-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowNoteForm(false)}
                      className="px-3 py-1 text-xs text-neutral-400 hover:text-white"
                    >
                      キャンセル
                    </button>
                    <button
                      onClick={handleSaveNote}
                      className="px-4 py-1 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg"
                    >
                      記録を保存
                    </button>
                  </div>
                </div>
              )}

              {/* Notes List */}
              <div className="space-y-3">
                {player.notes.length === 0 ? (
                  <p className="text-xs text-neutral-500 text-center py-8">指導カルテはまだありません。</p>
                ) : (
                  player.notes.map(note => (
                    <div
                      key={note.id}
                      className="bg-neutral-950/40 border border-neutral-800 p-4 rounded-xl space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-emerald-400">{note.title}</span>
                          <span className="text-neutral-500">·</span>
                          <span className="text-neutral-400">{note.author}</span>
                        </div>
                        <span className="text-neutral-500 font-mono">{note.date}</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap">
                        {note.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="space-y-3">
              <p className="text-xs text-neutral-400">
                参加したトレーニングメニューごとの達成度とコーチ所見
              </p>
              <div className="space-y-2">
                {player.attendance.length === 0 ? (
                  <p className="text-xs text-neutral-500 text-center py-8">受講履歴はまだありません。</p>
                ) : (
                  player.attendance.map(att => (
                    <div
                      key={att.id}
                      className="flex items-center justify-between p-3 bg-neutral-950/40 border border-neutral-800 rounded-xl text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-neutral-500">{att.date}</span>
                          <span className="text-white font-medium">{att.drillTitle || 'トレーニングセッション'}</span>
                        </div>
                        {att.comment && (
                          <p className="text-[11px] text-neutral-400">{att.comment}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < att.performanceRating ? 'fill-current' : 'text-neutral-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
