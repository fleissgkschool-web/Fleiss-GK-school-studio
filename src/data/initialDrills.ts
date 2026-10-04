import { Drill } from '../types';

export const INITIAL_DRILLS: Drill[] = [
  // 1. ミドルフィード (Screenshot 1 Drill 1)
  {
    id: 'drill-middle-feed',
    title: 'ミドルフィード',
    category: 'distribution',
    ageCategory: 'All',
    durationMinutes: 15,
    intensity: 'Low',
    gkCount: 2,
    objectives: [
      '蹴る位置と角度に応じた正確なサイドチェンジとフィードキック',
      '助走角度とボールの置き位置の再現性向上',
      '受け手の胸または足元へ届く最適な弾道コントロール'
    ],
    setup: 'ペナルティエリア内〜ハーフウェイライン。タッチライン沿いにターゲットを配置。',
    procedure: [
      '1. GKはバックパスを受け、蹴りやすい位置へファーストタッチ。',
      '2. 蹴る位置によって助走の角度を調整（「蹴る位置によって斜を変える」）。',
      '3. 逆サイドのハーフライン付近の味方へ正確なミドルフィード。'
    ],
    coachingPoints: [
      'ボールを体から遠ざけすぎず、軸足をボールの真横にしっかり踏み込む',
      '蹴る位置に応じて斜めに入る助走の角度を微調整する',
      'インパクトの瞬間、足首をしっかり固定して振り抜く'
    ],
    progressions: [
      '相手FWのプレッシャー（制限時間3秒）を付加してダイレクトキック'
    ],
    tags: ['コーン', 'マーカーコーン', 'フィード', '配球'],
    isFavorite: true,
    createdAt: '2026-10-01T09:00:00Z',
    updatedAt: '2026-10-01T09:00:00Z',
    board: {
      pitchType: 'half_pitch',
      pitchStyle: 'emerald_grass',
      elements: [
        { id: 'el-m1', type: 'goal_regulation', x: 500, y: 70, rotation: 0, scale: 1.1 },
        { id: 'el-m2', type: 'gk_ready', x: 500, y: 180, rotation: 180, scale: 1, label: 'GK' },
        { id: 'el-m3', type: 'ball', x: 500, y: 220, rotation: 0, scale: 1 },
        { id: 'el-m4', type: 'callout_box', x: 340, y: 200, rotation: 0, scale: 1, label: '蹴る位置によって斜を変える' },
        { id: 'el-m5', type: 'attacker', x: 200, y: 460, rotation: 45, scale: 1, label: 'Target L' },
        { id: 'el-m6', type: 'attacker', x: 800, y: 460, rotation: -45, scale: 1, label: 'Target R' },
        { id: 'el-m7', type: 'cone_tall_orange', x: 220, y: 490, rotation: 0, scale: 0.9 },
        { id: 'el-m8', type: 'cone_tall_orange', x: 780, y: 490, rotation: 0, scale: 0.9 },
      ],
      arrows: [
        { id: 'ar-m1', type: 'shot', points: [{ x: 500, y: 220 }, { x: 240, y: 450 }], color: '#f59e0b', label: '対角フィード' },
        { id: 'ar-m2', type: 'shot', points: [{ x: 500, y: 220 }, { x: 760, y: 450 }], color: '#f59e0b', label: 'ロングパス' },
      ]
    }
  },

  // 2. ダブルゴール (Screenshot 1 Drill 2)
  {
    id: 'drill-double-goal',
    title: 'ダブルゴール',
    category: 'one_on_one',
    ageCategory: 'All',
    durationMinutes: 15,
    intensity: 'High',
    gkCount: 2,
    objectives: [
      '7.32mのゴール幅を3歩のステップで遮断する敏捷性の向上',
      '投げる前のフェイクに惑わされず、ボールが手から離れるまで我慢するポジショニング',
      '素早いセカンドリカバリーと即座のカウンター配球'
    ],
    setup: '向かい合わせに設置した2つのゴールの間で実施。コーンとマーカーを両脇に配置。',
    procedure: [
      '1. GK1がゴール前で構える。',
      '2. GK2（またはサーバー）が「投げるふりはOK（5秒以内にはスローすること）」のルールでスロー。',
      '3. GK1は「3歩で7.32を閉じる」ステップで対応し、シュートストップ。',
      '4. セーブ後、即座に反対側のゴールへスロー返球。'
    ],
    coachingPoints: [
      '7.32mを守る意識：不用意に飛び出さず、コースの真ん中に重心を置く',
      'ボールより先に動かない（フェイクに釣られて重心を崩さない）',
      'スローは必ず指定で受ける'
    ],
    tags: ['コーン', 'マーカーコーン', '1対1', 'セービング'],
    isFavorite: true,
    createdAt: '2026-10-01T10:00:00Z',
    updatedAt: '2026-10-01T10:00:00Z',
    board: {
      pitchType: 'goal_mouth',
      pitchStyle: 'emerald_grass',
      elements: [
        { id: 'el-d1', type: 'goal_regulation', x: 500, y: 70, rotation: 0, scale: 1.1 },
        { id: 'el-d2', type: 'gk_ready', x: 500, y: 180, rotation: 180, scale: 1, label: 'GK 1' },
        { id: 'el-d3', type: 'gk_ready', x: 500, y: 440, rotation: 0, scale: 1, label: 'GK 2' },
        { id: 'el-d4', type: 'cone_tall_orange', x: 380, y: 320, rotation: 0, scale: 0.9 },
        { id: 'el-d5', type: 'cone_tall_orange', x: 620, y: 320, rotation: 0, scale: 0.9 },
        { id: 'el-d6', type: 'ball', x: 490, y: 410, rotation: 0, scale: 1 },
        { id: 'el-d7', type: 'callout_box', x: 680, y: 130, rotation: 0, scale: 0.9, label: '7.32を守る' },
        { id: 'el-d8', type: 'callout_box', x: 680, y: 170, rotation: 0, scale: 0.9, label: '3歩で7.32を閉じる' },
        { id: 'el-d9', type: 'callout_box', x: 680, y: 210, rotation: 0, scale: 0.9, label: 'スローは必ず指定で' },
        { id: 'el-d10', type: 'callout_box', x: 680, y: 250, rotation: 0, scale: 0.9, label: 'ボールより先に動かない' },
        { id: 'el-d11', type: 'callout_box', x: 640, y: 380, rotation: 0, scale: 0.85, label: '投げるふりはOK (5秒以内にはスローすること)' },
      ],
      arrows: [
        { id: 'ar-d1', type: 'shot', points: [{ x: 500, y: 410 }, { x: 560, y: 140 }], color: '#ef4444', label: 'スローシュート' },
        { id: 'ar-d2', type: 'gk_move', points: [{ x: 500, y: 180 }, { x: 550, y: 170 }], color: '#06b6d4', dashed: true, label: '3歩ステップ' },
      ]
    }
  },

  // 3. 反応 (Screenshot 1 Drill 3)
  {
    id: 'drill-reaction-tennis',
    title: '反応',
    category: 'reaction',
    ageCategory: 'All',
    durationMinutes: 5,
    intensity: 'Low',
    gkCount: 2,
    objectives: [
      '視覚的キュー（色・合図）に対する即座の反応とステップ動作',
      'テニスボールを用いた手先・指先の繊細なキャッチ感覚の養成',
      'ウォーミングアップにおける周辺視野と集中の立ち上げ'
    ],
    setup: 'ゴール前5m四方に異なる色のマーカー（赤、青、緑、黄）を配置。テニスボール2個使用。',
    procedure: [
      '1. GK同士がテニスボールを投げ合いながらステップワーク。',
      '2. コーチがランダムに「Green!」「Red!」と色をコール。',
      '3. GKはボールを保持したまま、コールされた色のマーカーへ瞬時にタッチしてセンターに戻る。'
    ],
    coachingPoints: [
      'テニスボールを投げ合い、動く（足を止めない）',
      'コーチが色を言ったら、その色を取る（最速判断）',
      '重心を低く保ち、母指球で素早く地面を押す'
    ],
    tags: ['テニスボール', 'マーカーコーン', 'ウォームアップ', '反応'],
    isFavorite: true,
    createdAt: '2026-10-01T11:00:00Z',
    updatedAt: '2026-10-01T11:00:00Z',
    board: {
      pitchType: 'goal_mouth',
      pitchStyle: 'emerald_grass',
      elements: [
        { id: 'el-r1', type: 'goal_regulation', x: 500, y: 70, rotation: 0, scale: 1.1 },
        { id: 'el-r2', type: 'gk_ready', x: 440, y: 220, rotation: 180, scale: 1, label: 'GK A' },
        { id: 'el-r3', type: 'gk_ready', x: 560, y: 220, rotation: 180, scale: 1, label: 'GK B' },
        { id: 'el-r4', type: 'coach_server', x: 500, y: 480, rotation: 0, scale: 1, label: 'Coach' },
        { id: 'el-r5', type: 'marker_disc_red', x: 420, y: 320, rotation: 0, scale: 1 },
        { id: 'el-r6', type: 'marker_disc_blue', x: 580, y: 320, rotation: 0, scale: 1 },
        { id: 'el-r7', type: 'marker_disc_yellow', x: 500, y: 380, rotation: 0, scale: 1 },
        { id: 'el-r8', type: 'tennis_ball', x: 460, y: 210, rotation: 0, scale: 1.2 },
        { id: 'el-r9', type: 'tennis_ball', x: 540, y: 210, rotation: 0, scale: 1.2 },
        { id: 'el-r10', type: 'callout_box', x: 330, y: 330, rotation: 0, scale: 0.9, label: 'テニスボールを投げ合い、動く' },
        { id: 'el-r11', type: 'callout_box', x: 330, y: 370, rotation: 0, scale: 0.9, label: 'コーチが色を言ったら、その色を取る' },
        { id: 'el-r12', type: 'callout_box', x: 670, y: 260, rotation: 0, scale: 0.9, label: 'Green' },
      ],
      arrows: [
        { id: 'ar-r1', type: 'pass', points: [{ x: 460, y: 220 }, { x: 540, y: 220 }], color: '#22c55e', label: 'テニスボール' },
      ]
    }
  },

  // 4. 1対1 ブレイクアウェイ (1対1)
  {
    id: 'drill-1v1-breakaway',
    title: '1対1 ブレイクアウェイ：間合いの詰めとKセーブ',
    category: 'one_on_one',
    ageCategory: 'All',
    durationMinutes: 20,
    intensity: 'High',
    gkCount: 2,
    objectives: [
      '相手のボールタッチの大きさに応じたステップイン',
      '近距離被シュートに対するKブロック・スプレッドでのカバー面積最大化',
      '最後まで倒れ込まずに我慢するメンタリティ'
    ],
    setup: 'ペナルティエリア内。スルーパスからFWがボックス内に侵入。',
    procedure: [
      '1. サーバーからスルーパスを供給。',
      '2. FWがドリブル侵入。GKはボールが足から離れた瞬間に間合いを詰める。',
      '3. FWがシュートモーションに入った瞬間にストップ＆セット。',
      '4. Kセーブ（片膝を地面につけ股下を締める）でブロック。'
    ],
    coachingPoints: [
      '相手が顔を上げた瞬間にピタッと止まる',
      '股下のトンネルを作らないよう膝と踵の隙間をゼロにする',
      '胸を起こし両手を広げて壁を作る'
    ],
    tags: ['1対1', 'Kセーブ', 'ブロッキング', 'コーン'],
    isFavorite: true,
    createdAt: '2026-10-01T12:00:00Z',
    updatedAt: '2026-10-01T12:00:00Z',
    board: {
      pitchType: 'goal_mouth',
      pitchStyle: 'emerald_grass',
      elements: [
        { id: 'el-11', type: 'goal_regulation', x: 500, y: 70, rotation: 0, scale: 1.1 },
        { id: 'el-12', type: 'gk_k_block', x: 500, y: 200, rotation: 180, scale: 1.1, label: 'GK' },
        { id: 'el-13', type: 'attacker', x: 500, y: 440, rotation: 0, scale: 1, label: 'FW' },
        { id: 'el-14', type: 'ball', x: 500, y: 390, rotation: 0, scale: 1 },
        { id: 'el-15', type: 'callout_box', x: 670, y: 190, rotation: 0, scale: 0.9, label: 'Kセーブで股下を遮断' },
      ],
      arrows: [
        { id: 'ar-11', type: 'dribble', points: [{ x: 500, y: 440 }, { x: 500, y: 280 }], color: '#ef4444', label: 'ドリブル進入' },
        { id: 'ar-12', type: 'gk_move', points: [{ x: 500, y: 120 }, { x: 500, y: 200 }], color: '#06b6d4', dashed: true, label: 'アプローチ' },
      ]
    }
  },

  // 5. ローダイブ基礎 & コラプシング (セービング)
  {
    id: 'drill-low-dive',
    title: 'ローダイブ基礎 & コラプシング',
    category: 'shot_stopping',
    ageCategory: 'All',
    durationMinutes: 20,
    intensity: 'Medium',
    gkCount: 2,
    objectives: [
      'ボール正面への最短距離での手の到達と確実なグラウンダーキャッチ',
      '近距離シュートにおけるコラプシング（膝の抜き）による反応スピード向上'
    ],
    setup: 'ゴール前にマーカーゲートを設置。キッカーはペナルティマーク付近。',
    procedure: [
      '1. GKはセンターで構えを作る。',
      '2. コーチから低弾道ゴロシュートが放たれ、ローダイブでキャッチ。',
      '3. キャッチ後、素早くボールを返球し反対側へステップ。'
    ],
    coachingPoints: [
      '手を先行させてボールの軌道上へ一直線に出す',
      '着地は体の側面で衝撃を逃し、肘を突かない'
    ],
    tags: ['ローダイブ', 'コラプシング', 'マーカーコーン'],
    isFavorite: true,
    createdAt: '2026-10-01T13:00:00Z',
    updatedAt: '2026-10-01T13:00:00Z',
    board: {
      pitchType: 'goal_mouth',
      pitchStyle: 'emerald_grass',
      elements: [
        { id: 'el-ld1', type: 'goal_regulation', x: 500, y: 70, rotation: 0, scale: 1.1 },
        { id: 'el-ld2', type: 'gk_dive_low_right', x: 580, y: 190, rotation: 150, scale: 1, label: 'Dive R' },
        { id: 'el-ld3', type: 'coach_server', x: 500, y: 520, rotation: 0, scale: 1, label: 'Coach' },
        { id: 'el-ld4', type: 'ball', x: 490, y: 480, rotation: 0, scale: 1 },
      ],
      arrows: [
        { id: 'ar-ld1', type: 'shot', points: [{ x: 500, y: 480 }, { x: 580, y: 200 }], color: '#ef4444', label: '低弾道ゴロ' },
      ]
    }
  },

  // 6. ハイボール・クロス対応 (ハイボール)
  {
    id: 'drill-high-cross',
    title: 'ハイボール・クロス対応 & 即時カウンター配球',
    category: 'high_ball',
    ageCategory: 'All',
    durationMinutes: 25,
    intensity: 'High',
    gkCount: 3,
    objectives: [
      '落下地点の早期予測と最頂点でのワンステップ・ジャンプキャッチ',
      '人垣（マネキン）を越える空中戦でのボールアタック',
      'キャッチ直後の素早いサイドハンドスローでのカウンター起点化'
    ],
    setup: 'ペナルティエリア全域。左右コーナー付近にキッカー。ゴールエリア正面に人垣マネキン2体。',
    procedure: [
      '1. GKはゴールライン中央より一歩前で構え、クロス供給者のキックモーションを凝視。',
      '2. クロスが上がる。GKは「Keeper!」と力強くコーリングし最高到達点でジャンプキャッチ。',
      '3. 着地後、即座に逆サイドのターゲットへ正確にスロー配球。'
    ],
    coachingPoints: [
      'クロスが上がる前のポジショニング：ファーポストとボールが同一視野に入る半身',
      'コーリングのタイミングは出ると決断した瞬間に力強く発する',
      '片膝を自然に上げて骨盤を保護し空中バランスを保つ'
    ],
    tags: ['クロス', 'ハイボール', 'マネキン', '配球'],
    isFavorite: true,
    createdAt: '2026-10-01T14:00:00Z',
    updatedAt: '2026-10-01T14:00:00Z',
    board: {
      pitchType: 'goal_mouth',
      pitchStyle: 'emerald_grass',
      elements: [
        { id: 'el-hc1', type: 'goal_regulation', x: 500, y: 70, rotation: 0, scale: 1.1 },
        { id: 'el-hc2', type: 'gk_air_claim', x: 480, y: 200, rotation: 120, scale: 1.1, label: 'GK' },
        { id: 'el-hc3', type: 'mannequin', x: 440, y: 250, rotation: 0, scale: 1 },
        { id: 'el-hc4', type: 'mannequin', x: 540, y: 240, rotation: 0, scale: 1 },
        { id: 'el-hc5', type: 'coach_server', x: 200, y: 380, rotation: 60, scale: 1, label: 'Kicker' },
        { id: 'el-hc6', type: 'ball', x: 220, y: 370, rotation: 0, scale: 1 },
      ],
      arrows: [
        { id: 'ar-hc1', type: 'cross_aerial', points: [{ x: 220, y: 370 }, { x: 480, y: 200 }], color: '#f59e0b', label: 'アーリークロス' },
      ]
    }
  },

  // 7. ニアポスト遮断とアングルプレー (ポジショニング)
  {
    id: 'drill-near-post-angle',
    title: 'ニアポスト遮断とアングルプレー',
    category: 'positioning',
    ageCategory: 'All',
    durationMinutes: 20,
    intensity: 'Medium',
    gkCount: 2,
    objectives: [
      '角度のない位置からのニアポスト直接シュートに対する隙のないポジショニング',
      'カットバック（マイナス折り返し）が出た際の迅速なゴール正面へのリポジショニング'
    ],
    setup: 'ペナルティエリア片側。サイド深くのアタッカーとマイナスのサポート選手。',
    procedure: [
      '1. サイド深くのアタッカーAへパス。',
      '2. GKはニアポストに寄り、ニアの狭いシュートコースを完全に塞ぐ。',
      '3. マイナスパスが出た瞬間、クロスステップで中央へスライドしシュートに対峙。'
    ],
    coachingPoints: [
      'ニアポストでの構え：ポストと自分の体の間に隙間を空けない',
      'マイナスの受け手がボールを蹴る瞬間に確実に止まる'
    ],
    tags: ['ポジショニング', 'ニアポスト', 'コーン'],
    isFavorite: false,
    createdAt: '2026-10-01T15:00:00Z',
    updatedAt: '2026-10-01T15:00:00Z',
    board: {
      pitchType: 'goal_mouth',
      pitchStyle: 'emerald_grass',
      elements: [
        { id: 'el-np1', type: 'goal_regulation', x: 500, y: 70, rotation: 0, scale: 1.1 },
        { id: 'el-np2', type: 'gk_ready', x: 380, y: 140, rotation: 220, scale: 1, label: 'GK' },
        { id: 'el-np3', type: 'attacker', x: 220, y: 300, rotation: 45, scale: 1, label: 'Winger' },
        { id: 'el-np4', type: 'attacker', x: 480, y: 380, rotation: 0, scale: 1, label: 'FW' },
        { id: 'el-np5', type: 'callout_box', x: 360, y: 90, rotation: 0, scale: 0.9, label: 'ニアを完全に塞ぐ' },
      ],
      arrows: [
        { id: 'ar-np1', type: 'pass', points: [{ x: 230, y: 290 }, { x: 470, y: 370 }], color: '#22c55e', label: 'マイナスパス' },
        { id: 'ar-np2', type: 'gk_move', points: [{ x: 380, y: 140 }, { x: 480, y: 160 }], color: '#06b6d4', dashed: true, label: 'スライド' },
      ]
    }
  },

  // 8. 4ゴール・ポジショニングゲーム (ポジショニング)
  {
    id: 'drill-4-goal-positioning',
    title: '4ゴール・マルチアングルポジショニング',
    category: 'positioning',
    ageCategory: 'All',
    durationMinutes: 20,
    intensity: 'Medium',
    gkCount: 2,
    objectives: [
      '複数のキッカーに対する素早い正対角度の修正',
      'ボール移動中の最短移動距離によるアングル調整'
    ],
    setup: 'ゴールエリア前に4つのミニゲートを扇状に設置。',
    procedure: [
      '1. コーチがコールした番号のゲートからキッカーがシュート。',
      '2. GKは素早くアングルを合わせてセット。'
    ],
    coachingPoints: [
      'ボール移動中に素早くステップを完了させ、打つ瞬間には静止する'
    ],
    tags: ['ポジショニング', 'マーカーコーン', 'アングル'],
    isFavorite: false,
    createdAt: '2026-10-01T16:00:00Z',
    updatedAt: '2026-10-01T16:00:00Z',
    board: {
      pitchType: 'goal_mouth',
      pitchStyle: 'emerald_grass',
      elements: [
        { id: 'el-4g1', type: 'goal_regulation', x: 500, y: 70, rotation: 0, scale: 1.1 },
        { id: 'el-4g2', type: 'gk_ready', x: 500, y: 180, rotation: 180, scale: 1, label: 'GK' },
        { id: 'el-4g3', type: 'cone_tall_yellow', x: 300, y: 380, rotation: 0, scale: 0.9 },
        { id: 'el-4g4', type: 'cone_tall_yellow', x: 420, y: 440, rotation: 0, scale: 0.9 },
        { id: 'el-4g5', type: 'cone_tall_yellow', x: 580, y: 440, rotation: 0, scale: 0.9 },
        { id: 'el-4g6', type: 'cone_tall_yellow', x: 700, y: 380, rotation: 0, scale: 0.9 },
      ],
      arrows: []
    }
  },

  // 9. グローバルゲーム：3v3+2GK (グローバル)
  {
    id: 'drill-global-3v3',
    title: 'グローバルゲーム：3v3 + 2GK (狭小コート)',
    category: 'global',
    ageCategory: 'All',
    durationMinutes: 25,
    intensity: 'High',
    gkCount: 2,
    objectives: [
      '実戦状況におけるシュートストップとビルドアップ参加の両立',
      '味方DFへの指示・コーリングの反復'
    ],
    setup: 'ペナルティエリア2面を向かい合わせにした狭小ピッチ。',
    procedure: [
      '1. 3対3のミニゲームを実施。GKはバックパスを受けたらフリーで配球。',
      '2. シュート後は即時トランジション。'
    ],
    coachingPoints: [
      '常に味方DFの背後をカバーするポジショニング',
      'ボール奪取時の素早い配球判断'
    ],
    tags: ['グローバル', '実戦形式', 'ゲーム形式', 'コーン'],
    isFavorite: false,
    createdAt: '2026-10-01T17:00:00Z',
    updatedAt: '2026-10-01T17:00:00Z',
    board: {
      pitchType: 'goal_mouth',
      pitchStyle: 'emerald_grass',
      elements: [
        { id: 'el-gl1', type: 'goal_regulation', x: 500, y: 70, rotation: 0, scale: 1.1 },
        { id: 'el-gl2', type: 'gk_ready', x: 500, y: 160, rotation: 180, scale: 1, label: 'GK' },
        { id: 'el-gl3', type: 'attacker', x: 420, y: 320, rotation: 0, scale: 1, label: 'FW' },
        { id: 'el-gl4', type: 'defender', x: 540, y: 260, rotation: 0, scale: 1, label: 'DF' },
      ],
      arrows: []
    }
  },

  // 10. グローバル：クロス＆シュート複合 (グローバル)
  {
    id: 'drill-global-cross-shot',
    title: 'グローバル：クロスから中央シュートへの連続対応',
    category: 'global',
    ageCategory: 'All',
    durationMinutes: 20,
    intensity: 'High',
    gkCount: 2,
    objectives: [
      'クロス対応後の素早いリポジショニングと第2波への対応',
      'ペナルティエリア内の制圧'
    ],
    setup: 'サイドからのクロス後、こぼれ球をボックス外のミドルシューターが狙う。',
    procedure: [
      '1. サイドからハイボールクロス。GKがパンチングまたはキャッチ。',
      '2. こぼれたボールをミドルシュート。即座に起き上がりローダイブで阻止。'
    ],
    coachingPoints: [
      '1stアクション後の着地反動を使った最速リカバリー',
      'ボールの行方から目を離さない'
    ],
    tags: ['グローバル', 'クロス', 'セカンドボール'],
    isFavorite: false,
    createdAt: '2026-10-01T18:00:00Z',
    updatedAt: '2026-10-01T18:00:00Z',
    board: {
      pitchType: 'goal_mouth',
      pitchStyle: 'emerald_grass',
      elements: [
        { id: 'el-cs1', type: 'goal_regulation', x: 500, y: 70, rotation: 0, scale: 1.1 },
        { id: 'el-cs2', type: 'gk_high_catch', x: 480, y: 190, rotation: 120, scale: 1.1, label: 'GK' },
        { id: 'el-cs3', type: 'attacker', x: 550, y: 400, rotation: 0, scale: 1, label: 'Shooter' },
        { id: 'el-cs4', type: 'coach_server', x: 180, y: 320, rotation: 45, scale: 1, label: 'Cross' },
      ],
      arrows: []
    }
  }
];
