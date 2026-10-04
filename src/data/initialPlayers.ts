import { Player } from '../types';

export const INITIAL_PLAYERS: Player[] = [
  {
    id: 'player-01',
    name: '田中 陸斗',
    furigana: 'タナカ リクト',
    number: 1,
    category: 'U-18',
    birthDate: '2008-05-14',
    team: 'FLEISS Youth FC U-18',
    height: 186,
    weight: 78,
    dominantFoot: 'Right',
    dominantHand: 'Right',
    gloveSize: '9.5号 (Roll Finger)',
    status: 'match_ready',
    avatarUrl: '/src/assets/images/avatar_gk_pro_1790947297215.jpg',
    ratings: {
      shotStopping: 88,
      highBalls: 84,
      oneOnOne: 82,
      footwork: 79,
      distribution: 85,
      mentalCoaching: 90
    },
    strengths: [
      'ハイボールに対する高い打点での空中掌握力',
      '的確で通りの良いディフェンスラインへのコーチング',
      '両足での正確なロングフィードとサイドチェンジ'
    ],
    weaknesses: [
      '至近距離でのコラプシングの反応速度',
      '左足でのグラウンダー配球の初速'
    ],
    idpGoal: '今シーズンはプレミアリーグ昇格に向け、失点率0.8点以下を維持。特に1v1での我慢強さとセカンドリアクションの向上を図る。',
    notes: [
      {
        id: 'note-01',
        date: '2026-09-28',
        author: 'FLEISS GK チーフコーチ',
        title: 'クロス対応と空中戦のポジショニング講評',
        content: '昨日の練習試合では、相手の鋭いインスイングクロスに対して迷いなく最高到達点でキャッチできていた。「Keeper!」のコーリングも相手FWを威嚇するのに十分な声量。後半に見られた至近距離シュートで重心がやや後ろに残っていたため、構えの重心位置（母指球荷重）を次回チェックする。',
        type: 'evaluation'
      },
      {
        id: 'note-02',
        date: '2026-09-15',
        author: 'GK アシスタントコーチ',
        title: '定期フィジカル測定・筋力測定',
        content: '垂直跳び 67cm、反復横跳び 59回。跳躍力・アジリティともに学年上位2%を記録。体幹の安定感が増しており、空中接触でもブレなくなってきた。',
        type: 'training'
      }
    ],
    attendance: [
      {
        id: 'att-01',
        date: '2026-09-28',
        drillId: 'drill-03-cross-claim',
        drillTitle: 'ハイボール・クロス対応 & 即時カウンター配球',
        performanceRating: 5,
        comment: '空中戦で完全勝利。サイドハンドスローの飛距離も50m到達。'
      },
      {
        id: 'att-02',
        date: '2026-09-25',
        drillId: 'drill-02-1v1-block',
        drillTitle: '1対1 ブレイクアウェイ：間合いの詰めとKセーブ',
        performanceRating: 4,
        comment: 'Kブロックの股下の隙間がよく閉まっていた。'
      },
      {
        id: 'att-03',
        date: '2026-09-20',
        drillId: 'drill-01-low-dive',
        drillTitle: 'ローダイブ基礎 & 踏み込みからコラプシング',
        performanceRating: 4,
        comment: 'コラプシング時の肘の着地クッションに注意。'
      }
    ],
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-28T12:00:00Z'
  },
  {
    id: 'player-02',
    name: '佐藤 蒼空',
    furigana: 'サトウ ソラ',
    number: 12,
    category: 'U-15',
    birthDate: '2011-11-03',
    team: 'FLEISS ジュニアユース',
    height: 174,
    weight: 64,
    dominantFoot: 'Right',
    dominantHand: 'Both',
    gloveSize: '8.5号 (Negative Cut)',
    status: 'active',
    avatarUrl: '/src/assets/images/avatar_gk_pro_1790947297215.jpg',
    ratings: {
      shotStopping: 82,
      highBalls: 70,
      oneOnOne: 88,
      footwork: 86,
      distribution: 75,
      mentalCoaching: 72
    },
    strengths: [
      '抜群の俊敏性と1対1での鋭いフロントダイブ',
      '近距離シュートに対する反射神経とフットセーブ',
      '果敢なブレイクアウェイの飛び出し'
    ],
    weaknesses: [
      'ハイボールにおける身長差をカバーするステップワーク',
      'バックパスを受けた際のビルドアップ判断のスピード'
    ],
    idpGoal: 'ハイボールの落下地点予測の判断速度向上。1試合を通じて安定したポジショニングを保つこと。',
    notes: [
      {
        id: 'note-03',
        date: '2026-09-24',
        author: 'FLEISS GK チーフコーチ',
        title: '1v1 ブロッキングの成長について',
        content: '相手FWとの間合いの詰め方が劇的に改善された。以前は足元に飛び込みすぎてかわされるケースがあったが、相手が顔を上げた瞬間にピタッと止まりKブロックで防ぐ意識が定着。',
        type: 'training'
      }
    ],
    attendance: [
      {
        id: 'att-04',
        date: '2026-09-26',
        drillId: 'drill-02-1v1-block',
        drillTitle: '1対1 ブレイクアウェイ',
        performanceRating: 5,
        comment: '1v1で全セーブ達成。素晴らしい我慢強さ。'
      },
      {
        id: 'att-05',
        date: '2026-09-22',
        drillId: 'drill-04-agility-footwork',
        drillTitle: 'ラダー・ミニハードルステップ',
        performanceRating: 5,
        comment: 'ラダーのスピードはトップクラス。'
      }
    ],
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-26T10:00:00Z'
  },
  {
    id: 'player-03',
    name: '山本 蓮',
    furigana: 'ヤマモト レン',
    number: 21,
    category: 'U-12',
    birthDate: '2014-07-22',
    team: 'FLEISS ジュニア アカデミー',
    height: 156,
    weight: 46,
    dominantFoot: 'Left',
    dominantHand: 'Left',
    gloveSize: '7号 (Flat Palm)',
    status: 'active',
    avatarUrl: '/src/assets/images/avatar_gk_pro_1790947297215.jpg',
    ratings: {
      shotStopping: 76,
      highBalls: 65,
      oneOnOne: 78,
      footwork: 80,
      distribution: 82,
      mentalCoaching: 68
    },
    strengths: [
      '左足のキック精度が非常に高く、プレッシャー下でもパスを繋げる',
      'ボールに対する恐怖心がなく、常に前向きに取り組む姿勢',
      'ステップワークの軽やかさ'
    ],
    weaknesses: [
      '強いシュートに対する手首の固定（W字キャッチ）',
      'ダイビング後の着地時の体の衝撃吸収'
    ],
    idpGoal: 'キャッチングの基本フォームの徹底習得。肘や手首の怪我を防ぐ安全な着地動作を身につける。',
    notes: [
      {
        id: 'note-04',
        date: '2026-09-19',
        author: 'FLEISS アカデミーコーチ',
        title: 'キャッチング基本技術の習熟度',
        content: 'ボールを体の正面で捉える意識が高まってきた。強いシュートの際に指先だけで弾いてしまうことがあるため、手のひら全体と胸でボールを包み込む「抱え込みキャッチ」を反復中。',
        type: 'evaluation'
      }
    ],
    attendance: [
      {
        id: 'att-06',
        date: '2026-09-27',
        drillId: 'drill-01-low-dive',
        drillTitle: 'ローダイブ基礎',
        performanceRating: 4,
        comment: 'グラウンダーの処理が安定してきた。'
      }
    ],
    createdAt: '2026-09-05T00:00:00Z',
    updatedAt: '2026-09-27T08:00:00Z'
  }
];
