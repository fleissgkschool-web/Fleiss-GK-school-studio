import React from 'react';
import { PlayerRatings } from '../../types';

interface RadarChartProps {
  ratings: PlayerRatings;
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ ratings, size = 260 }) => {
  const center = size / 2;
  const radius = size * 0.38;

  const categories = [
    { key: 'shotStopping', label: 'シュートストップ', val: ratings.shotStopping },
    { key: 'highBalls', label: 'ハイボール', val: ratings.highBalls },
    { key: 'oneOnOne', label: '1対1ブロック', val: ratings.oneOnOne },
    { key: 'footwork', label: 'フットワーク', val: ratings.footwork },
    { key: 'distribution', label: '配球・キック', val: ratings.distribution },
    { key: 'mentalCoaching', label: '指示・メンタル', val: ratings.mentalCoaching },
  ];

  const numSides = categories.length;
  const angleStep = (Math.PI * 2) / numSides;

  // Concentric levels 20, 40, 60, 80, 100
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const getCoordinates = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Data polygon points
  const points = categories.map((cat, i) => {
    const { x, y } = getCoordinates(cat.val, i);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex flex-col items-center select-none">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Grid Concentric Polygons */}
        {levels.map((level, lvlIdx) => {
          const polyPoints = Array.from({ length: numSides }).map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const r = level * radius;
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
          }).join(' ');

          return (
            <polygon
              key={lvlIdx}
              points={polyPoints}
              fill={lvlIdx === levels.length - 1 ? 'rgba(15,23,42,0.6)' : 'none'}
              stroke="#334155"
              strokeWidth={lvlIdx === levels.length - 1 ? '1.5' : '1'}
              strokeDasharray={lvlIdx === levels.length - 1 ? undefined : '2 3'}
            />
          );
        })}

        {/* Axis lines */}
        {categories.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#334155"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          points={points}
          fill="rgba(16, 185, 129, 0.35)"
          stroke="#10b981"
          strokeWidth="2.5"
          className="filter drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]"
        />

        {/* Data points */}
        {categories.map((cat, i) => {
          const { x, y } = getCoordinates(cat.val, i);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#10b981"
              stroke="#064e3b"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Labels & Values */}
        {categories.map((cat, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelDist = radius + 24;
          const x = center + labelDist * Math.cos(angle);
          const y = center + labelDist * Math.sin(angle);

          return (
            <g key={i}>
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="10"
                fontWeight="600"
                fill="#cbd5e1"
              >
                {cat.label}
              </text>
              <text
                x={x}
                y={y + 12}
                textAnchor="middle"
                fontSize="9"
                fontWeight="bold"
                fill="#34d399"
                className="font-mono tabular-nums"
              >
                {cat.val}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
