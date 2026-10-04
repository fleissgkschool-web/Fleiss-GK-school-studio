import React from 'react';
import { ElementType } from '../../types';

interface ElementGraphicProps {
  type: ElementType;
  scale?: number;
  label?: string;
  color?: string;
  selected?: boolean;
}

export const ElementGraphic: React.FC<ElementGraphicProps> = ({
  type,
  scale = 1,
  label,
  color,
  selected = false,
}) => {
  return (
    <g className={`transition-all ${selected ? 'filter drop-shadow-[0_0_8px_rgba(245,158,11,0.9)]' : ''}`}>
      {renderElementSvg(type, color, label)}
      {label && type !== 'text_label' && type !== 'callout_box' && (
        <text
          x="0"
          y="32"
          textAnchor="middle"
          fontSize="11"
          fontWeight="bold"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="2.5"
          paintOrder="stroke fill"
          className="select-none pointer-events-none"
        >
          {label}
        </text>
      )}
    </g>
  );
};

function renderElementSvg(type: ElementType, customColor?: string, label?: string) {
  // Goalkeeper studio blue kit palette
  const kitBlue = customColor || '#2563eb';
  const kitBlueDark = '#1d4ed8';
  const shortsDark = '#0f172a';
  const gloveYellow = '#facc15';
  const skinTone = '#fed7aa';

  switch (type) {
    // ---------------- GK POSES (SCREENSHOT 3 TRAY) ----------------
    // 1. 基本姿勢・構え (Ready Power Position)
    case 'gk_ready':
      return (
        <g transform="translate(-20, -28)">
          <ellipse cx="20" cy="48" rx="14" ry="4" fill="rgba(0,0,0,0.3)" />
          {/* Head & Hair */}
          <circle cx="20" cy="12" r="5" fill={skinTone} />
          <path d="M16,10 Q20,6 24,10" stroke="#1f2937" strokeWidth="2.5" fill="none" />
          {/* Blue Jersey */}
          <path d="M13,17 L27,17 L25,30 L15,30 Z" fill={kitBlue} stroke={kitBlueDark} strokeWidth="1" />
          {/* Black Shorts */}
          <path d="M15,30 L25,30 L26,38 L14,38 Z" fill={shortsDark} />
          {/* Legs & Socks */}
          <path d="M16,38 L14,46 M24,38 L26,46" stroke={kitBlue} strokeWidth="3" strokeLinecap="round" />
          <circle cx="14" cy="47" r="2" fill="#ffffff" />
          <circle cx="26" cy="47" r="2" fill="#ffffff" />
          {/* Arms forward & Yellow Gloves */}
          <path d="M14,20 L8,26 M26,20 L32,26" stroke={kitBlue} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="7" cy="27" r="3.5" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
          <circle cx="33" cy="27" r="3.5" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
        </g>
      );

    // 2. スプレッド（両足開き・横ブロッキング）
    case 'gk_spread':
    case 'gk_block_spread':
      return (
        <g transform="translate(-28, -26)">
          <ellipse cx="28" cy="46" rx="22" ry="5" fill="rgba(0,0,0,0.3)" />
          <circle cx="28" cy="11" r="5" fill={skinTone} />
          <path d="M24,9 Q28,6 32,9" stroke="#1f2937" strokeWidth="2.5" fill="none" />
          <path d="M21,16 L35,16 L33,28 L23,28 Z" fill={kitBlue} stroke={kitBlueDark} strokeWidth="1" />
          <path d="M23,28 L33,28 L36,36 L20,36 Z" fill={shortsDark} />
          {/* Wide Legs spread */}
          <path d="M21,36 L10,44 M35,36 L46,44" stroke={kitBlue} strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="9" cy="44" r="2.5" fill="#ffffff" />
          <circle cx="47" cy="44" r="2.5" fill="#ffffff" />
          {/* Arms out wide (Star barrier) */}
          <path d="M21,18 L7,24 M35,18 L49,24" stroke={kitBlue} strokeWidth="3" strokeLinecap="round" />
          <circle cx="6" cy="24" r="3.5" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
          <circle cx="50" cy="24" r="3.5" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
        </g>
      );

    // 3. Kブロック（片膝着地・股下締め）
    case 'gk_k_block':
      return (
        <g transform="translate(-24, -26)">
          <ellipse cx="24" cy="46" rx="18" ry="5" fill="rgba(0,0,0,0.3)" />
          <circle cx="24" cy="11" r="5" fill={skinTone} />
          <path d="M20,9 Q24,6 28,9" stroke="#1f2937" strokeWidth="2.5" fill="none" />
          <path d="M17,16 L31,16 L29,28 L19,28 Z" fill={kitBlue} stroke={kitBlueDark} strokeWidth="1" />
          <path d="M19,28 L29,28 L32,36 L16,36 Z" fill={shortsDark} />
          {/* Left leg knee down to ground touching heel */}
          <path d="M20,36 L15,44 L11,43" stroke={kitBlue} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Right leg flared out */}
          <path d="M28,36 L36,41 L40,43" stroke={kitBlue} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Arms spread low to cover 5-hole and low shots */}
          <path d="M18,18 L7,26 M30,18 L41,26" stroke={kitBlue} strokeWidth="3" strokeLinecap="round" />
          <circle cx="6" cy="26" r="3.5" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
          <circle cx="42" cy="26" r="3.5" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
        </g>
      );

    // 4. 片足ステップ・スイング
    case 'gk_stand_single':
      return (
        <g transform="translate(-18, -28)">
          <ellipse cx="18" cy="48" rx="12" ry="4" fill="rgba(0,0,0,0.3)" />
          <circle cx="18" cy="12" r="5" fill={skinTone} />
          <path d="M14,10 Q18,6 22,10" stroke="#1f2937" strokeWidth="2" fill="none" />
          <path d="M12,17 L24,17 L22,30 L14,30 Z" fill={kitBlue} stroke={kitBlueDark} strokeWidth="1" />
          <path d="M14,30 L22,30 L24,37 L12,37 Z" fill={shortsDark} />
          {/* One leg straight, one bent */}
          <path d="M15,37 L15,46" stroke={kitBlue} strokeWidth="3" strokeLinecap="round" />
          <path d="M21,37 L26,41 L23,45" stroke={kitBlue} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="15" cy="47" r="2" fill="#ffffff" />
          <path d="M13,20 L8,26 M23,20 L27,27" stroke={kitBlue} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="7" cy="26" r="3.5" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
          <circle cx="28" cy="27" r="3.5" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
        </g>
      );

    // 5. ハイキャッチ（頭上確保）
    case 'gk_high_catch':
      return (
        <g transform="translate(-20, -38)">
          <ellipse cx="20" cy="56" rx="14" ry="4" fill="rgba(0,0,0,0.25)" />
          <circle cx="20" cy="19" r="5" fill={skinTone} />
          <path d="M16,17 Q20,13 24,17" stroke="#1f2937" strokeWidth="2" fill="none" />
          <path d="M13,24 L27,24 L25,37 L15,37 Z" fill={kitBlue} stroke={kitBlueDark} strokeWidth="1" />
          <path d="M15,37 L25,37 L26,45 L14,45 Z" fill={shortsDark} />
          <path d="M16,45 L15,54 M24,45 L25,54" stroke={kitBlue} strokeWidth="3" strokeLinecap="round" />
          <circle cx="15" cy="55" r="2" fill="#ffffff" />
          <circle cx="25" cy="55" r="2" fill="#ffffff" />
          {/* Hands high above head forming W-shape */}
          <path d="M14,24 L13,8 M26,24 L27,8" stroke={kitBlue} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="12" cy="7" r="3.5" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
          <circle cx="28" cy="7" r="3.5" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
          {/* Ball caught at top */}
          <circle cx="20" cy="6" r="5" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
          <polygon points="20,4 21,5.5 20.5,7 19.5,7 19,5.5" fill="#0f172a" />
        </g>
      );

    // 6. 両手を挙げて構え・アピール
    case 'gk_arms_up':
      return (
        <g transform="translate(-20, -34)">
          <ellipse cx="20" cy="52" rx="14" ry="4" fill="rgba(0,0,0,0.25)" />
          <circle cx="20" cy="16" r="5" fill={skinTone} />
          <path d="M14,22 L26,22 L24,35 L16,35 Z" fill={kitBlue} />
          <path d="M16,35 L24,35 L25,43 L15,43 Z" fill={shortsDark} />
          <path d="M17,43 L16,51 M23,43 L24,51" stroke={kitBlue} strokeWidth="3" strokeLinecap="round" />
          <path d="M15,22 L11,9 M25,22 L29,9" stroke={kitBlue} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="10" cy="8" r="3.5" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
          <circle cx="30" cy="8" r="3.5" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
        </g>
      );

    // 7. 空中ジャンプキャッチ（シールド膝上げ）
    case 'gk_air_claim':
      return (
        <g transform="translate(-22, -40)">
          <ellipse cx="22" cy="60" rx="16" ry="4" fill="rgba(0,0,0,0.2)" />
          <circle cx="22" cy="18" r="5" fill={skinTone} />
          <path d="M15,24 L29,24 L27,37 L17,37 Z" fill={kitBlue} />
          <path d="M17,37 L27,37 L28,45 L16,45 Z" fill={shortsDark} />
          {/* Shield Knee bent upwards in air */}
          <path d="M18,45 L12,50 L17,56" stroke={kitBlue} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M26,45 L27,56" stroke={kitBlue} strokeWidth="3" strokeLinecap="round" />
          {/* Hands high above head */}
          <path d="M16,24 L14,7 M28,24 L30,7" stroke={kitBlue} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="13" cy="6" r="3.5" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
          <circle cx="31" cy="6" r="3.5" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
          <circle cx="22" cy="5" r="5.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
        </g>
      );

    // 8. フロントダイブ・前傾
    case 'gk_smother':
      return (
        <g transform="translate(-28, -20)">
          <ellipse cx="28" cy="28" rx="24" ry="6" fill="rgba(0,0,0,0.3)" />
          {/* Body forward */}
          <path d="M46,24 L26,20 L16,19" stroke={kitBlue} strokeWidth="9" strokeLinecap="round" />
          <circle cx="14" cy="18" r="5" fill={skinTone} />
          <path d="M44,24 L52,28" stroke={shortsDark} strokeWidth="5" strokeLinecap="round" />
          {/* Hands securing ball on grass */}
          <circle cx="6" cy="20" r="5" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
          <path d="M14,21 Q6,14 5,21 Q6,26 14,23" stroke={gloveYellow} strokeWidth="3" fill="none" />
        </g>
      );

    // 9. ローダイブ左 (Low Dive Left)
    case 'gk_dive_low_left':
      return (
        <g transform="translate(-36, -20)">
          <ellipse cx="36" cy="26" rx="28" ry="6" fill="rgba(0,0,0,0.3)" />
          <path d="M56,22 L30,20 L18,18" stroke={kitBlue} strokeWidth="8" strokeLinecap="round" />
          <circle cx="18" cy="17" r="5" fill={skinTone} />
          <path d="M52,22 L62,26 M52,22 L60,19" stroke={shortsDark} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M24,20 L8,22" stroke={kitBlue} strokeWidth="3" strokeLinecap="round" />
          <circle cx="6" cy="22" r="4" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
          <circle cx="10" cy="25" r="4" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
        </g>
      );

    // 10. ローダイブ右 (Low Dive Right)
    case 'gk_dive_low_right':
      return (
        <g transform="translate(-24, -20)">
          <ellipse cx="24" cy="26" rx="28" ry="6" fill="rgba(0,0,0,0.3)" />
          <path d="M8,22 L34,20 L46,18" stroke={kitBlue} strokeWidth="8" strokeLinecap="round" />
          <circle cx="46" cy="17" r="5" fill={skinTone} />
          <path d="M12,22 L2,26 M12,22 L4,19" stroke={shortsDark} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M40,20 L56,22" stroke={kitBlue} strokeWidth="3" strokeLinecap="round" />
          <circle cx="58" cy="22" r="4" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
          <circle cx="54" cy="25" r="4" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
        </g>
      );

    // 11. ミドルダイブ左 (Mid Dive Left)
    case 'gk_dive_mid_left':
      return (
        <g transform="translate(-34, -26)">
          <ellipse cx="36" cy="38" rx="24" ry="5" fill="rgba(0,0,0,0.25)" />
          <path d="M50,30 Q34,22 22,16" stroke={kitBlue} strokeWidth="8" strokeLinecap="round" fill="none" />
          <circle cx="20" cy="15" r="5" fill={skinTone} />
          <path d="M48,32 L58,38" stroke={shortsDark} strokeWidth="4" strokeLinecap="round" />
          <path d="M22,17 L8,11" stroke={kitBlue} strokeWidth="3" strokeLinecap="round" />
          <circle cx="7" cy="10" r="4" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
          <circle cx="10" cy="16" r="4" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
        </g>
      );

    // 12. ミドルダイブ右 (Mid Dive Right)
    case 'gk_dive_mid_right':
      return (
        <g transform="translate(-26, -26)">
          <ellipse cx="24" cy="38" rx="24" ry="5" fill="rgba(0,0,0,0.25)" />
          <path d="M10,30 Q26,22 38,16" stroke={kitBlue} strokeWidth="8" strokeLinecap="round" fill="none" />
          <circle cx="40" cy="15" r="5" fill={skinTone} />
          <path d="M12,32 L2,38" stroke={shortsDark} strokeWidth="4" strokeLinecap="round" />
          <path d="M38,17 L52,11" stroke={kitBlue} strokeWidth="3" strokeLinecap="round" />
          <circle cx="53" cy="10" r="4" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
          <circle cx="50" cy="16" r="4" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
        </g>
      );

    // 13. ハイダイブ左 (High Dive Left Leaping to Top Corner)
    case 'gk_dive_high_left':
      return (
        <g transform="translate(-32, -32)">
          <ellipse cx="36" cy="46" rx="20" ry="5" fill="rgba(0,0,0,0.2)" />
          <path d="M46,40 Q36,24 22,14" stroke={kitBlue} strokeWidth="8" strokeLinecap="round" fill="none" />
          <circle cx="22" cy="13" r="5" fill={skinTone} />
          <path d="M46,40 L54,46" stroke={shortsDark} strokeWidth="4" strokeLinecap="round" />
          <path d="M22,15 L8,6" stroke={kitBlue} strokeWidth="3" strokeLinecap="round" />
          <circle cx="7" cy="5" r="4" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
          <circle cx="9" cy="12" r="4" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
        </g>
      );

    // 14. ハイダイブ右 (High Dive Right Leaping to Top Corner)
    case 'gk_dive_high_right':
      return (
        <g transform="translate(-24, -32)">
          <ellipse cx="24" cy="46" rx="20" ry="5" fill="rgba(0,0,0,0.2)" />
          <path d="M14,40 Q24,24 38,14" stroke={kitBlue} strokeWidth="8" strokeLinecap="round" fill="none" />
          <circle cx="38" cy="13" r="5" fill={skinTone} />
          <path d="M14,40 L6,46" stroke={shortsDark} strokeWidth="4" strokeLinecap="round" />
          <path d="M38,15 L52,6" stroke={kitBlue} strokeWidth="3" strokeLinecap="round" />
          <circle cx="53" cy="5" r="4" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
          <circle cx="51" cy="12" r="4" fill={gloveYellow} stroke="#ca8a04" strokeWidth="1" />
        </g>
      );

    // 15. 水平スライド左 / 16. 水平スライド右
    case 'gk_slide_left':
      return (
        <g transform="translate(-36, -16)">
          <ellipse cx="36" cy="22" rx="30" ry="5" fill="rgba(0,0,0,0.3)" />
          <path d="M60,18 L32,16 L18,15" stroke={kitBlue} strokeWidth="7" strokeLinecap="round" />
          <circle cx="16" cy="14" r="4.5" fill={skinTone} />
          <path d="M22,16 L6,17" stroke={kitBlue} strokeWidth="3" strokeLinecap="round" />
          <circle cx="5" cy="17" r="3.5" fill={gloveYellow} />
        </g>
      );

    case 'gk_slide_right':
      return (
        <g transform="translate(-20, -16)">
          <ellipse cx="24" cy="22" rx="30" ry="5" fill="rgba(0,0,0,0.3)" />
          <path d="M4,18 L32,16 L46,15" stroke={kitBlue} strokeWidth="7" strokeLinecap="round" />
          <circle cx="48" cy="14" r="4.5" fill={skinTone} />
          <path d="M42,16 L58,17" stroke={kitBlue} strokeWidth="3" strokeLinecap="round" />
          <circle cx="59" cy="17" r="3.5" fill={gloveYellow} />
        </g>
      );

    case 'gk_footwork':
      return (
        <g transform="translate(-16, -16)">
          <circle cx="16" cy="16" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
          <text x="16" y="20" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#ffffff">🧤</text>
        </g>
      );

    // ---------------- COACH & PLAYERS ----------------
    case 'coach_server':
      return (
        <g transform="translate(-20, -26)">
          <ellipse cx="20" cy="44" rx="14" ry="4" fill="rgba(0,0,0,0.3)" />
          <circle cx="20" cy="12" r="5" fill={skinTone} />
          {/* Coach Kit (Dark Navy) */}
          <path d="M13,17 L27,17 L25,32 L15,32 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
          <path d="M16,32 L15,42 M24,32 L25,42" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
          {/* White Clipboard */}
          <rect x="7" y="22" width="7" height="9" rx="1" fill="#f8fafc" stroke="#475569" strokeWidth="1" />
          <line x1="8" y1="24" x2="13" y2="24" stroke="#0f172a" strokeWidth="0.8" />
          <line x1="8" y1="26" x2="12" y2="26" stroke="#0f172a" strokeWidth="0.8" />
        </g>
      );

    case 'server_2':
      return (
        <g transform="translate(-20, -26)">
          <ellipse cx="20" cy="44" rx="14" ry="4" fill="rgba(0,0,0,0.3)" />
          <circle cx="20" cy="12" r="5" fill={skinTone} />
          <path d="M13,17 L27,17 L25,32 L15,32 Z" fill="#334155" stroke="#1e293b" strokeWidth="1" />
          <path d="M16,32 L15,42 M24,32 L25,42" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
          <text x="20" y="27" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#ffffff">S2</text>
        </g>
      );

    // Attacker (Yellow jersey like Goalkeeper Studio Screenshot 1!)
    case 'attacker':
      return (
        <g transform="translate(-20, -26)">
          <ellipse cx="20" cy="44" rx="14" ry="4" fill="rgba(0,0,0,0.3)" />
          <circle cx="20" cy="12" r="5" fill={skinTone} />
          {/* Yellow or Red Jersey */}
          <path d="M13,17 L27,17 L25,31 L15,31 Z" fill={customColor || '#eab308'} stroke="#ca8a04" strokeWidth="1" />
          <path d="M15,31 L25,31 L26,38 L14,38 Z" fill="#0f172a" />
          <path d="M16,38 L14,44 M24,38 L26,44" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" />
          <text x="20" y="26" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#000000">FW</text>
        </g>
      );

    // Defender (Blue jersey like Screenshot 1)
    case 'defender':
      return (
        <g transform="translate(-20, -26)">
          <ellipse cx="20" cy="44" rx="14" ry="4" fill="rgba(0,0,0,0.3)" />
          <circle cx="20" cy="12" r="5" fill={skinTone} />
          <path d="M13,17 L27,17 L25,31 L15,31 Z" fill={customColor || '#2563eb'} stroke="#1d4ed8" strokeWidth="1" />
          <path d="M15,31 L25,31 L26,38 L14,38 Z" fill="#ffffff" />
          <path d="M16,38 L14,44 M24,38 L26,44" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
          <text x="20" y="26" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#ffffff">DF</text>
        </g>
      );

    // ---------------- EQUIPMENT ----------------
    // Official 7.32m Goal with 3D Perspective Net
    case 'goal_regulation':
      return (
        <g transform="translate(-100, -32)">
          {/* 3D Net Mesh */}
          <path d="M12,28 L38,2 L162,2 L188,28 Z" fill="rgba(255,255,255,0.08)" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="38" y1="2" x2="38" y2="28" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="162" y1="2" x2="162" y2="28" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Net Depth Grid */}
          <line x1="68" y1="2" x2="56" y2="28" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="100" y1="2" x2="100" y2="28" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="132" y1="2" x2="144" y2="28" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="2 2" />
          {/* Goal Line Shadow */}
          <line x1="10" y1="29" x2="190" y2="29" stroke="#ffffff" strokeWidth="3" strokeOpacity="0.4" />
          {/* White Goal Posts & Crossbar */}
          <rect x="8" y="24" width="7" height="9" rx="1.5" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
          <rect x="185" y="24" width="7" height="9" rx="1.5" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
          <line x1="12" y1="27" x2="188" y2="27" stroke="#ffffff" strokeWidth="5" />
          <text x="100" y="20" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#ffffff">7.32m × 2.44m</text>
        </g>
      );

    case 'goal_mini':
      return (
        <g transform="translate(-40, -18)">
          <path d="M6,16 L18,4 L62,4 L74,16 Z" fill="rgba(255,255,255,0.15)" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 2" />
          <rect x="5" y="14" width="4" height="6" fill="#38bdf8" rx="1" />
          <rect x="71" y="14" width="4" height="6" fill="#38bdf8" rx="1" />
          <line x1="7" y1="16" x2="73" y2="16" stroke="#38bdf8" strokeWidth="3.5" />
          <text x="40" y="12" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#bae6fd">MINI</text>
        </g>
      );

    // Cones (Screenshot 1: red/orange cones)
    case 'cone_tall_orange':
      return (
        <g transform="translate(-14, -14)">
          <ellipse cx="14" cy="22" rx="12" ry="5" fill="rgba(0,0,0,0.3)" />
          <rect x="4" y="19" width="20" height="5" rx="1" fill="#ea580c" stroke="#c2410c" strokeWidth="1" />
          <polygon points="14,2 8,20 20,20" fill="#f97316" stroke="#c2410c" strokeWidth="1" />
          <polygon points="14,8 10,14 18,14" fill="#ffffff" />
        </g>
      );

    case 'cone_tall_yellow':
      return (
        <g transform="translate(-14, -14)">
          <ellipse cx="14" cy="22" rx="12" ry="5" fill="rgba(0,0,0,0.3)" />
          <rect x="4" y="19" width="20" height="5" rx="1" fill="#ca8a04" stroke="#a16207" strokeWidth="1" />
          <polygon points="14,2 8,20 20,20" fill="#eab308" stroke="#a16207" strokeWidth="1" />
          <polygon points="14,8 10,14 18,14" fill="#ffffff" />
        </g>
      );

    case 'cone_tall_blue':
      return (
        <g transform="translate(-14, -14)">
          <ellipse cx="14" cy="22" rx="12" ry="5" fill="rgba(0,0,0,0.3)" />
          <rect x="4" y="19" width="20" height="5" rx="1" fill="#1d4ed8" stroke="#1e40af" strokeWidth="1" />
          <polygon points="14,2 8,20 20,20" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
          <polygon points="14,8 10,14 18,14" fill="#ffffff" />
        </g>
      );

    case 'marker_disc_white':
      return (
        <g transform="translate(-10, -10)">
          <ellipse cx="10" cy="12" rx="8" ry="3.5" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
          <circle cx="10" cy="12" r="1.5" fill="#64748b" />
        </g>
      );

    case 'marker_disc_red':
      return (
        <g transform="translate(-10, -10)">
          <ellipse cx="10" cy="12" rx="8" ry="3.5" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
          <circle cx="10" cy="12" r="1.5" fill="#7f1d1d" />
        </g>
      );

    case 'marker_disc_yellow':
      return (
        <g transform="translate(-10, -10)">
          <ellipse cx="10" cy="12" rx="8" ry="3.5" fill="#eab308" stroke="#a16207" strokeWidth="1" />
          <circle cx="10" cy="12" r="1.5" fill="#713f12" />
        </g>
      );

    case 'marker_disc_blue':
      return (
        <g transform="translate(-10, -10)">
          <ellipse cx="10" cy="12" rx="8" ry="3.5" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1" />
          <circle cx="10" cy="12" r="1.5" fill="#1e3a8a" />
        </g>
      );

    case 'mannequin':
      return (
        <g transform="translate(-16, -32)">
          <ellipse cx="16" cy="56" rx="14" ry="4" fill="rgba(0,0,0,0.3)" />
          <circle cx="16" cy="10" r="6" fill="#eab308" stroke="#854d0e" strokeWidth="1.2" />
          <path d="M7,17 L25,17 L23,44 L9,44 Z" fill="#eab308" stroke="#854d0e" strokeWidth="1.2" rx="2" />
          <line x1="10" y1="24" x2="22" y2="24" stroke="#854d0e" strokeWidth="1.2" />
          <line x1="10" y1="30" x2="22" y2="30" stroke="#854d0e" strokeWidth="1.2" />
          <line x1="10" y1="36" x2="22" y2="36" stroke="#854d0e" strokeWidth="1.2" />
          <line x1="16" y1="44" x2="16" y2="56" stroke="#334155" strokeWidth="2.5" />
        </g>
      );

    case 'ladder':
      return (
        <g transform="translate(-14, -45)">
          <line x1="4" y1="5" x2="4" y2="85" stroke="#0f172a" strokeWidth="2.5" />
          <line x1="24" y1="5" x2="24" y2="85" stroke="#0f172a" strokeWidth="2.5" />
          {[12, 26, 40, 54, 68, 80].map((y, i) => (
            <line key={i} x1="3" y1={y} x2="25" y2={y} stroke="#facc15" strokeWidth="3" />
          ))}
        </g>
      );

    case 'hurdle':
      return (
        <g transform="translate(-22, -14)">
          <ellipse cx="22" cy="20" rx="18" ry="4" fill="rgba(0,0,0,0.2)" />
          <path d="M5,20 L5,8 Q22,4 39,8 L39,20" stroke="#f97316" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <rect x="3" y="18" width="5" height="4" fill="#0f172a" rx="1" />
          <rect x="36" y="18" width="5" height="4" fill="#0f172a" rx="1" />
        </g>
      );

    case 'rebounder':
      return (
        <g transform="translate(-24, -18)">
          <ellipse cx="24" cy="30" rx="20" ry="5" fill="rgba(0,0,0,0.25)" />
          <rect x="4" y="6" width="40" height="20" rx="2" fill="rgba(255,255,255,0.15)" stroke="#06b6d4" strokeWidth="2" />
          <line x1="14" y1="6" x2="14" y2="26" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="24" y1="6" x2="24" y2="26" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="34" y1="6" x2="34" y2="26" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="2 2" />
          <text x="24" y="18" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#67e8f9">REBOUND</text>
        </g>
      );

    case 'deflection_board':
      return (
        <g transform="translate(-26, -14)">
          <ellipse cx="26" cy="22" rx="22" ry="5" fill="rgba(0,0,0,0.3)" />
          <rect x="4" y="6" width="44" height="14" rx="2" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="12" cy="13" r="3" fill="#cbd5e1" />
          <circle cx="26" cy="13" r="3.5" fill="#cbd5e1" />
          <circle cx="40" cy="13" r="3" fill="#cbd5e1" />
        </g>
      );

    case 'ball':
      return (
        <g transform="translate(-9, -9)">
          <ellipse cx="9" cy="13" rx="7" ry="2.5" fill="rgba(0,0,0,0.3)" />
          <circle cx="9" cy="9" r="7" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
          <polygon points="9,5 11,7 10,9 8,9 7,7" fill="#0f172a" />
        </g>
      );

    case 'tennis_ball':
      return (
        <g transform="translate(-6, -6)">
          <circle cx="6" cy="6" r="5" fill="#a3e635" stroke="#4d7c0f" strokeWidth="1" />
          <path d="M2,6 A4,4 0 0,0 6,10" fill="none" stroke="#ffffff" strokeWidth="0.8" />
          <path d="M6,2 A4,4 0 0,0 10,6" fill="none" stroke="#ffffff" strokeWidth="0.8" />
        </g>
      );

    case 'target_ring':
      return (
        <g transform="translate(-16, -16)">
          <ellipse cx="16" cy="16" rx="15" ry="15" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
          <circle cx="16" cy="16" r="3" fill="#ef4444" />
        </g>
      );

    // Callout box / Instruction note (Screenshot 1: "7.32を守る", "3歩で7.32を閉じる", "テニスボールを投げ合い、動く")
    case 'callout_box':
    case 'text_label':
      const text = label || '指示テキスト';
      const width = Math.max(80, text.length * 13 + 20);
      return (
        <g transform={`translate(-${width / 2}, -14)`}>
          {/* White rounded callout with subtle shadow */}
          <rect
            x="0"
            y="0"
            width={width}
            height="24"
            rx="12"
            fill="#ffffff"
            stroke="#94a3b8"
            strokeWidth="1.2"
            className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
          />
          <text
            x={width / 2}
            y="16"
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
            fill="#0f172a"
          >
            {text}
          </text>
        </g>
      );

    // Step Number ①②③
    case 'step_number':
      return (
        <g transform="translate(-14, -14)">
          <circle cx="14" cy="14" r="12" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
          <text x="14" y="18" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#000000">
            {label || '1'}
          </text>
        </g>
      );

    case 'zone_box':
      return (
        <g transform="translate(-60, -40)">
          <rect x="0" y="0" width="120" height="80" rx="4" fill="rgba(34,197,94,0.18)" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4" />
          {label && (
            <text x="60" y="20" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#15803d">
              {label}
            </text>
          )}
        </g>
      );

    default:
      return <circle cx="0" cy="0" r="8" fill="#64748b" />;
  }
}
