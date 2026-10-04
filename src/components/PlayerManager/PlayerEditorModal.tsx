import React, { useState } from 'react';
import { Player, AgeCategory } from '../../types';
import { X, Save } from 'lucide-react';

interface PlayerEditorModalProps {
  player?: Player | null;
  onSave: (player: Player) => void;
  onClose: () => void;
}

export const PlayerEditorModal: React.FC<PlayerEditorModalProps> = ({
  player,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState(player?.name || '');
  const [furigana, setFurigana] = useState(player?.furigana || '');
  const [number, setNumber] = useState(player?.number || 1);
  const [category, setCategory] = useState<AgeCategory>(player?.category || 'U-15');
  const [birthDate, setBirthDate] = useState(player?.birthDate || '2010-04-01');
  const [team, setTeam] = useState(player?.team || 'FLEISS GK School');
  const [height, setHeight] = useState(player?.height || 175);
  const [weight, setWeight] = useState(player?.weight || 65);
  const [dominantFoot, setDominantFoot] = useState<'Right' | 'Left' | 'Both'>(player?.dominantFoot || 'Right');
  const [dominantHand, setDominantHand] = useState<'Right' | 'Left' | 'Both'>(player?.dominantHand || 'Right');
  const [gloveSize, setGloveSize] = useState(player?.gloveSize || '8.5号');
  const [idpGoal, setIdpGoal] = useState(player?.idpGoal || '');
  const [strengthsText, setStrengthsText] = useState(player?.strengths?.join('\n') || '');
  const [weaknessesText, setWeaknessesText] = useState(player?.weaknesses?.join('\n') || '');

  // Ratings 1-100
  const [ratings, setRatings] = useState(
    player?.ratings || {
      shotStopping: 75,
      highBalls: 70,
      oneOnOne: 75,
      footwork: 75,
      distribution: 70,
      mentalCoaching: 75,
    }
  );

  const handleRatingChange = (key: keyof typeof ratings, val: number) => {
    setRatings(prev => ({ ...prev, [key]: val }));
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert('選手氏名を入力してください');
      return;
    }

    const strengths = strengthsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const weaknesses = weaknessesText
      .split('\n')
      .map(w => w.trim())
      .filter(Boolean);

    const savedPlayer: Player = {
      id: player?.id || `player-${Date.now()}`,
      name: name.trim(),
      furigana: furigana.trim(),
      number: Number(number) || 1,
      category,
      birthDate,
      team: team.trim(),
      height: Number(height) || 170,
      weight: Number(weight) || 60,
      dominantFoot,
      dominantHand,
      gloveSize,
      status: player?.status || 'active',
      avatarUrl: player?.avatarUrl || '/src/assets/images/avatar_gk_pro_1790947297215.jpg',
      ratings,
      strengths,
      weaknesses,
      idpGoal: idpGoal.trim(),
      notes: player?.notes || [],
      attendance: player?.attendance || [],
      createdAt: player?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(savedPlayer);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <h2 className="text-base font-bold text-white">
            {player ? 'GK選手のプロフィール編集' : '新規GK選手の登録'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs custom-scrollbar">
          {/* Identity */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-neutral-400 mb-1">氏名 *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例: 田中 陸斗"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">フリガナ</label>
              <input
                type="text"
                value={furigana}
                onChange={(e) => setFurigana(e.target.value)}
                placeholder="タナカ リクト"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">背番号</label>
              <input
                type="number"
                min="1"
                max="99"
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white font-mono"
              />
            </div>
          </div>

          {/* Category & Team */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-neutral-400 mb-1">年代カテゴリ</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AgeCategory)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white"
              >
                <option value="U-10">U-10</option>
                <option value="U-12">U-12</option>
                <option value="U-15">U-15</option>
                <option value="U-18">U-18</option>
                <option value="Senior/Pro">Senior/Pro</option>
              </select>
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">所属チーム / スクール</label>
              <input
                type="text"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">生年月日</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white font-mono"
              />
            </div>
          </div>

          {/* Physical */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-neutral-400 mb-1">身長 (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">体重 (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">利き足</label>
              <select
                value={dominantFoot}
                onChange={(e) => setDominantFoot(e.target.value as any)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white"
              >
                <option value="Right">右足</option>
                <option value="Left">左足</option>
                <option value="Both">両足</option>
              </select>
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">グローブ号数</label>
              <input
                type="text"
                value={gloveSize}
                onChange={(e) => setGloveSize(e.target.value)}
                placeholder="8.5号"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
          </div>

          {/* 6-Pillar Technical Ratings */}
          <div className="bg-neutral-950/60 p-4 rounded-xl border border-neutral-800 space-y-3">
            <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              GK 6大ピラー能力値 (1 - 100)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'shotStopping', label: 'シュートストップ' },
                { key: 'highBalls', label: 'ハイボール・クロス' },
                { key: 'oneOnOne', label: '1対1・ブロッキング' },
                { key: 'footwork', label: 'ポジショニング・ステップ' },
                { key: 'distribution', label: '配球・ビルドアップ' },
                { key: 'mentalCoaching', label: '指示・メンタル' },
              ].map(item => {
                const k = item.key as keyof typeof ratings;
                return (
                  <div key={k} className="space-y-1">
                    <div className="flex justify-between text-neutral-300">
                      <span>{item.label}</span>
                      <span className="font-mono text-emerald-400 font-bold">{ratings[k]}</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="99"
                      value={ratings[k]}
                      onChange={(e) => handleRatingChange(k, Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* IDP Goal */}
          <div>
            <label className="block text-neutral-400 mb-1">個別育成計画 (IDP) 目標</label>
            <textarea
              rows={2}
              value={idpGoal}
              onChange={(e) => setIdpGoal(e.target.value)}
              placeholder="今期の強化目標、到達目標..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white"
            />
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-400 mb-1">強み（1行に1つ）</label>
              <textarea
                rows={3}
                value={strengthsText}
                onChange={(e) => setStrengthsText(e.target.value)}
                placeholder="ハイボールでの空中掌握&#10;通りの良いコーチング"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">改善課題（1行に1つ）</label>
              <textarea
                rows={3}
                value={weaknessesText}
                onChange={(e) => setWeaknessesText(e.target.value)}
                placeholder="至近距離コラプシング&#10;逆足でのグラウンダーフィード"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-3 border-t border-neutral-800 bg-neutral-950/60 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs text-neutral-400 hover:text-white"
          >
            キャンセル
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            保存する
          </button>
        </div>
      </div>
    </div>
  );
};
