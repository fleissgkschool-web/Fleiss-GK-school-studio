export type PitchType = 
  | 'goal_mouth'              // 16メートル幅のピッチ（ゴール正面アップ）
  | 'penalty_area'            // ペナルティエリア正面
  | 'penalty_area_arc'        // ペナルティエリア＋アーク
  | 'half_pitch'              // ハーフピッチ（縦）
  | 'full_pitch'              // フルピッチ（縦）
  | 'half_pitch_horizontal'   // ハーフピッチ（横）
  | 'full_pitch_horizontal'   // フルピッチ（横）
  | 'perspective_angle';      // 斜めパースペクティブ視点

export type PitchStyle = 'emerald_grass' | 'tactical_dark' | 'line_chalk';

export type DrillCategory = 
  | 'all'
  | 'one_on_one'      // 1対1
  | 'global'          // グローバル
  | 'shot_stopping'   // セービング・シュートストップ
  | 'distribution'    // ディストリビューション
  | 'high_ball'       // ハイボール
  | 'positioning'     // ポジショニング
  | 'footwork'        // フットワーク
  | 'reaction'        // 反応・リアクション
  | 'game_situation'; // ゲーム形式

export type AgeCategory = 'U-10' | 'U-12' | 'U-15' | 'U-18' | 'Senior/Pro' | 'All';

export type ElementType =
  // Goalkeeper stances & actions (Screenshot 3 Goalkeeper Tray)
  | 'gk_ready'            // 1. 基本姿勢・構え
  | 'gk_spread'           // 2. スプレッド（両足開き）
  | 'gk_k_block'          // 3. Kブロック（片膝着地）
  | 'gk_stand_single'     // 4. 片足ステップ・スイング
  | 'gk_high_catch'       // 5. ハイキャッチ（頭上確保）
  | 'gk_arms_up'          // 6. 両手上構え・アピール
  | 'gk_air_claim'        // 7. 空中ジャンプキャッチ
  | 'gk_smother'          // 8. フロントダイブ・前傾
  | 'gk_dive_low_left'    // 9. ローダイブ左
  | 'gk_dive_low_right'   // 10. ローダイブ右
  | 'gk_dive_mid_left'    // 11. ミドルダイブ左
  | 'gk_dive_mid_right'   // 12. ミドルダイブ右
  | 'gk_dive_high_left'   // 13. ハイダイブ左
  | 'gk_dive_high_right'  // 14. ハイダイブ右
  | 'gk_slide_left'       // 15. 水平スライド左
  | 'gk_slide_right'      // 16. 水平スライド右
  | 'gk_block_spread'     // 互換用
  | 'gk_footwork'
  // Players & Servers
  | 'coach_server'        // コーチ（ボード・ホイッスル）
  | 'server_2'            // サーバー2
  | 'attacker'            // フィールド選手（黄 / 赤）
  | 'defender'            // フィールド選手（青）
  // Equipment
  | 'goal_regulation'     // 公式ゴール 7.32m (3Dネット)
  | 'goal_mini'           // ミニゴール
  | 'cone_tall_orange'    // 三角コーン（赤・橙）
  | 'cone_tall_yellow'    // 三角コーン（黄）
  | 'cone_tall_blue'      // 三角コーン（青）
  | 'marker_disc_white'   // マーカーコーン（白）
  | 'marker_disc_red'     // マーカーコーン（赤）
  | 'marker_disc_yellow'  // マーカーコーン（黄）
  | 'marker_disc_blue'    // マーカーコーン（青）
  | 'mannequin'           // 人垣マネキン
  | 'ladder'              // アジリティラダー
  | 'hurdle'              // ミニハードル
  | 'rebounder'           // リバウンダー
  | 'deflection_board'    // 偏向ボード
  | 'ball'                // サッカーボール
  | 'tennis_ball'         // テニスボール
  | 'target_ring'         // ターゲット枠
  | 'text_label'          // テキスト吹き出し・指示枠（"7.32を守る" etc）
  | 'callout_box'         // 白背景角丸テキスト枠
  | 'step_number'         // 手順番号 ①②③
  | 'zone_box';           // ゾーン網掛け枠

export interface TacticalElement {
  id: string;
  type: ElementType;
  x: number; // 0 to 1000
  y: number; // 0 to 700
  rotation: number; // 0 to 360
  scale: number; // 0.5 to 2.5
  label?: string;
  color?: string;
  subText?: string;
}

export interface TacticalArrow {
  id: string;
  type: 'shot' | 'pass' | 'gk_move' | 'cross_aerial' | 'dribble';
  points: { x: number; y: number }[]; // array of {x, y}
  color: string;
  dashed?: boolean;
  label?: string;
}

export interface TacticalBoardData {
  pitchType: PitchType;
  pitchStyle: PitchStyle;
  elements: TacticalElement[];
  arrows: TacticalArrow[];
}

export interface DrillPhase {
  id: string;
  name: string;
  description?: string;
  board: TacticalBoardData;
}

export interface Drill {
  id: string;
  title: string;
  category: DrillCategory;
  ageCategory: AgeCategory;
  durationMinutes: number;
  intensity: 'Low' | 'Medium' | 'High' | 'Match';
  gkCount: number;
  objectives: string[];
  setup: string;
  procedure: string[];
  coachingPoints: string[];
  progressions?: string[];
  tags: string[];
  board: TacticalBoardData;
  phases?: DrillPhase[];
  isFavorite?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PlayerRatings {
  shotStopping: number;    // シュートストップ (1-100)
  highBalls: number;       // ハイボール・クロス (1-100)
  oneOnOne: number;        // 1対1・ブロッキング (1-100)
  footwork: number;        // ポジショニング・フットワーク (1-100)
  distribution: number;    // 配球・ビルドアップ (1-100)
  mentalCoaching: number;  // 指示・メンタル・集中力 (1-100)
}

export interface PlayerNote {
  id: string;
  date: string;
  author: string;
  title: string;
  content: string;
  type: 'evaluation' | 'medical' | 'training' | 'idp';
}

export interface PlayerAttendance {
  id: string;
  date: string;
  drillId?: string;
  drillTitle?: string;
  performanceRating: number; // 1-5
  comment?: string;
}

export interface Player {
  id: string;
  name: string;
  furigana: string;
  number: number;
  category: AgeCategory;
  birthDate: string;
  team: string;
  height: number; // cm
  weight: number; // kg
  dominantFoot: 'Right' | 'Left' | 'Both';
  dominantHand: 'Right' | 'Left' | 'Both';
  gloveSize: string;
  status: 'active' | 'light' | 'injured' | 'match_ready';
  avatarUrl: string;
  ratings: PlayerRatings;
  strengths: string[];
  weaknesses: string[];
  idpGoal: string; // 個別育成目標
  notes: PlayerNote[];
  attendance: PlayerAttendance[];
  createdAt: string;
  updatedAt: string;
}

export interface SessionPlan {
  id: string;
  title: string;
  date: string;
  targetCategory: AgeCategory;
  assignedPlayerIds: string[];
  drills: {
    drillId: string;
    durationMinutes: number;
    customNotes?: string;
  }[];
  mainObjective: string;
  coachNotes: string;
  createdAt: string;
}
