import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TacticalBoardData, TacticalElement, TacticalArrow, PitchType, PitchStyle, ElementType } from '../../types';
import { ElementGraphic } from './TacticalSvgDefs';
import { 
  RotateCw, 
  Trash2, 
  Copy, 
  ZoomIn, 
  ZoomOut, 
  Undo, 
  Redo, 
  Move, 
  Maximize2, 
  MousePointer, 
  Check, 
  ChevronRight, 
  ChevronLeft,
  Image as ImageIcon,
  Play,
  Download
} from 'lucide-react';

interface TacticalPitchProps {
  board: TacticalBoardData;
  onChange: (board: TacticalBoardData) => void;
  activeTool: 'select' | 'arrow_shot' | 'arrow_pass' | 'arrow_gk' | 'arrow_cross' | 'text';
  setActiveTool: (tool: 'select' | 'arrow_shot' | 'arrow_pass' | 'arrow_gk' | 'arrow_cross' | 'text') => void;
  drillTitle?: string;
}

interface PitchThumbnailOption {
  type: PitchType;
  label: string;
}

const PITCH_OPTIONS: PitchThumbnailOption[] = [
  { type: 'goal_mouth', label: '16メートル幅のピッチ' },
  { type: 'penalty_area', label: 'ペナルティエリア正面' },
  { type: 'penalty_area_arc', label: 'PAとアーク' },
  { type: 'half_pitch', label: 'ハーフピッチ（縦）' },
  { type: 'full_pitch', label: 'フルピッチ（縦）' },
  { type: 'half_pitch_horizontal', label: 'ハーフピッチ（横）' },
  { type: 'full_pitch_horizontal', label: 'フルピッチ（横）' },
  { type: 'perspective_angle', label: '斜めアングル視点' },
];

export const TacticalPitch: React.FC<TacticalPitchProps> = ({
  board,
  onChange,
  activeTool,
  setActiveTool,
  drillTitle = 'GK Drill'
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [selectedArrowId, setSelectedArrowId] = useState<string | null>(null);

  // Dragging element state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Arrow drawing state
  const [drawingArrowStart, setDrawingArrowStart] = useState<{ x: number; y: number } | null>(null);
  const [arrowCurrentPoint, setArrowCurrentPoint] = useState<{ x: number; y: number } | null>(null);

  // Zoom scale
  const [zoomLevel, setZoomLevel] = useState(1);

  // Mode: Image vs Animation (Screenshot 2 toggle)
  const [editorMode, setEditorMode] = useState<'image' | 'animation'>('image');

  // Undo / Redo history
  const [history, setHistory] = useState<TacticalBoardData[]>([board]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const pushHistory = useCallback((newBoard: TacticalBoardData) => {
    setHistory(prev => {
      const sliced = prev.slice(0, historyIndex + 1);
      return [...sliced, newBoard];
    });
    setHistoryIndex(prev => prev + 1);
    onChange(newBoard);
  }, [historyIndex, onChange]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      onChange(history[nextIndex]);
      setSelectedElementId(null);
      setSelectedArrowId(null);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      onChange(history[nextIndex]);
    }
  };

  // SVG coordinate converter
  const getSvgPoint = (clientX: number, clientY: number): { x: number; y: number } => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const pt = svgRef.current.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const svgP = pt.matrixTransform(svgRef.current.getScreenCTM()?.inverse());
    return {
      x: Math.max(0, Math.min(1000, Math.round(svgP.x))),
      y: Math.max(0, Math.min(700, Math.round(svgP.y))),
    };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const pt = getSvgPoint(e.clientX, e.clientY);

    if (activeTool !== 'select') {
      setDrawingArrowStart(pt);
      setArrowCurrentPoint(pt);
      return;
    }

    const target = e.target as SVGElement;
    const elementG = target.closest('[data-element-id]');
    const arrowG = target.closest('[data-arrow-id]');

    if (!elementG && !arrowG) {
      setSelectedElementId(null);
      setSelectedArrowId(null);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const pt = getSvgPoint(e.clientX, e.clientY);

    if (drawingArrowStart) {
      setArrowCurrentPoint(pt);
      return;
    }

    if (isDragging && selectedElementId) {
      const newElements = board.elements.map(el => {
        if (el.id === selectedElementId) {
          return {
            ...el,
            x: Math.max(20, Math.min(980, pt.x - dragOffset.x)),
            y: Math.max(20, Math.min(680, pt.y - dragOffset.y)),
          };
        }
        return el;
      });
      onChange({ ...board, elements: newElements });
    }
  };

  const handlePointerUp = () => {
    if (drawingArrowStart && arrowCurrentPoint) {
      const dist = Math.hypot(arrowCurrentPoint.x - drawingArrowStart.x, arrowCurrentPoint.y - drawingArrowStart.y);
      if (dist > 25) {
        let type: TacticalArrow['type'] = 'shot';
        let color = '#ef4444';
        let dashed = false;

        if (activeTool === 'arrow_pass') {
          type = 'pass';
          color = '#22c55e';
        } else if (activeTool === 'arrow_gk') {
          type = 'gk_move';
          color = '#06b6d4';
          dashed = true;
        } else if (activeTool === 'arrow_cross') {
          type = 'cross_aerial';
          color = '#f59e0b';
        }

        const newArrow: TacticalArrow = {
          id: `arrow-${Date.now()}`,
          type,
          color,
          dashed,
          points: [drawingArrowStart, arrowCurrentPoint],
        };

        const newBoard = {
          ...board,
          arrows: [...board.arrows, newArrow],
        };
        pushHistory(newBoard);
      }
      setDrawingArrowStart(null);
      setArrowCurrentPoint(null);
      setActiveTool('select');
      return;
    }

    if (isDragging) {
      setIsDragging(false);
      pushHistory(board);
    }
  };

  const handleElementPointerDown = (e: React.PointerEvent, element: TacticalElement) => {
    e.stopPropagation();
    if (activeTool !== 'select') return;

    setSelectedElementId(element.id);
    setSelectedArrowId(null);
    setIsDragging(true);

    const pt = getSvgPoint(e.clientX, e.clientY);
    setDragOffset({
      x: pt.x - element.x,
      y: pt.y - element.y,
    });
  };

  const handleDeleteSelected = () => {
    if (selectedElementId) {
      const newElements = board.elements.filter(el => el.id !== selectedElementId);
      pushHistory({ ...board, elements: newElements });
      setSelectedElementId(null);
    } else if (selectedArrowId) {
      const newArrows = board.arrows.filter(ar => ar.id !== selectedArrowId);
      pushHistory({ ...board, arrows: newArrows });
      setSelectedArrowId(null);
    }
  };

  const handleRotateSelected = (delta: number) => {
    if (!selectedElementId) return;
    const newElements = board.elements.map(el => {
      if (el.id === selectedElementId) {
        return { ...el, rotation: (el.rotation + delta + 360) % 360 };
      }
      return el;
    });
    pushHistory({ ...board, elements: newElements });
  };

  const handleScaleSelected = (delta: number) => {
    if (!selectedElementId) return;
    const newElements = board.elements.map(el => {
      if (el.id === selectedElementId) {
        const nextScale = Math.max(0.5, Math.min(2.5, Number((el.scale + delta).toFixed(1))));
        return { ...el, scale: nextScale };
      }
      return el;
    });
    pushHistory({ ...board, elements: newElements });
  };

  // High-res PNG export
  const handleExportPng = () => {
    if (!svgRef.current) return;
    const svgElement = svgRef.current;
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2000;
      canvas.height = 1400;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(image, 0, 0, 2000, 1400);
        const png = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = png;
        downloadLink.download = `${drillTitle.replace(/\s+/g, '_')}_tactical_board.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
      URL.revokeObjectURL(blobURL);
    };
    image.src = blobURL;
  };

  const selectedElement = board.elements.find(e => e.id === selectedElementId);

  return (
    <div className="flex flex-col flex-1 h-full bg-[#f8fafc] overflow-hidden select-none font-sans">
      {/* 1. Pitch Thumbnail Selector Strip (Screenshot 2) */}
      <div className="px-6 py-3 bg-white border-b border-neutral-200">
        <div className="flex items-center gap-3 overflow-x-auto pb-1 custom-scrollbar">
          {PITCH_OPTIONS.map(opt => {
            const isSelected = board.pitchType === opt.type;
            return (
              <button
                key={opt.type}
                onClick={() => pushHistory({ ...board, pitchType: opt.type })}
                className={`group relative flex flex-col items-center w-28 min-w-[110px] aspect-[16/10] rounded-lg overflow-hidden border transition-all ${
                  isSelected
                    ? 'border-[#081a2e] ring-2 ring-[#081a2e] shadow-xs'
                    : 'border-neutral-300 hover:border-neutral-400 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Mini Pitch Preview */}
                <div className="w-full h-full bg-[#15803d] relative flex items-center justify-center pointer-events-none">
                  <svg viewBox="0 0 100 65" className="w-full h-full">
                    <rect x="0" y="0" width="100" height="65" fill="#15803d" />
                    <rect x="4" y="4" width="92" height="57" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
                    <line x1="4" y1="12" x2="96" y2="12" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
                    <rect x="30" y="12" width="40" height="15" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />
                    {/* Goal posts */}
                    <line x1="42" y1="12" x2="58" y2="12" stroke="#ffffff" strokeWidth="2" />
                  </svg>
                </div>

                {/* Selected Checkmark in Yellow (Screenshot 2 checkmark) */}
                {isSelected && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#eab308] text-[#081a2e] flex items-center justify-center font-bold shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}

                {/* Tooltip Label */}
                {isSelected && (
                  <div className="absolute -bottom-8 z-30 px-2 py-0.5 rounded bg-[#081a2e] text-white text-[10px] whitespace-nowrap shadow-md">
                    {opt.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Image vs Animation Mode Toggle (Screenshot 2) */}
        <div className="flex items-center justify-center mt-3">
          <div className="flex items-center bg-[#081a2e] p-0.5 rounded-full text-xs font-semibold text-white shadow-sm">
            <button
              onClick={() => setEditorMode('image')}
              className={`flex items-center gap-1.5 px-4 py-1 rounded-full transition-colors ${
                editorMode === 'image' ? 'bg-[#0f2c4e] text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>画像</span>
            </button>
            <button
              onClick={() => setEditorMode('animation')}
              className={`flex items-center gap-1.5 px-4 py-1 rounded-full transition-colors ${
                editorMode === 'animation' ? 'bg-[#0f2c4e] text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>アニメーション</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Canvas Action Toolbar (Screenshot 2 Toolbar) */}
      <div className="flex items-center justify-between px-8 py-2 bg-[#f1f5f9] border-b border-neutral-200 text-neutral-700">
        <div className="flex items-center gap-2">
          {/* Undo / Redo */}
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            title="元に戻す"
            className="p-1.5 rounded-lg hover:bg-neutral-200 disabled:opacity-30 text-neutral-700 transition-colors"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            title="やり直す"
            className="p-1.5 rounded-lg hover:bg-neutral-200 disabled:opacity-30 text-neutral-700 transition-colors"
          >
            <Redo className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-neutral-300 mx-1" />

          {/* Yellow Pointer Tool (Screenshot 2 active tool) */}
          <button
            onClick={() => setActiveTool('select')}
            title="選択ツール"
            className={`p-1.5 rounded-lg transition-colors ${
              activeTool === 'select'
                ? 'bg-[#f59e0b] text-[#081a2e] shadow-xs'
                : 'hover:bg-neutral-200 text-neutral-700'
            }`}
          >
            <MousePointer className="w-4 h-4 fill-current" />
          </button>

          {/* Trash Delete */}
          <button
            onClick={handleDeleteSelected}
            title="選択要素を削除"
            className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700 hover:text-rose-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-neutral-300 mx-1" />

          {/* Pan / Move */}
          <button
            title="移動・パン"
            className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700 transition-colors"
          >
            <Move className="w-4 h-4" />
          </button>

          {/* Zoom Controls */}
          <button
            onClick={() => setZoomLevel(prev => Math.min(1.8, prev + 0.1))}
            title="拡大"
            className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(0.6, prev - 0.1))}
            title="縮小"
            className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700 transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen();
              } else {
                document.documentElement.requestFullscreen();
              }
            }}
            title="全画面表示"
            className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Export Image PNG Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPng}
            className="flex items-center gap-1.5 px-3 py-1 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-semibold text-xs rounded-lg shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-neutral-500" />
            <span>作図をPNG画像保存</span>
          </button>
        </div>
      </div>

      {/* 3. The Pitch Canvas (Screenshot 2 Canvas) */}
      <div className="flex-1 relative flex items-center justify-center p-4 overflow-hidden bg-[#e2e8f0]">
        <div 
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
          className="relative w-full max-w-4xl aspect-[10/7] rounded-xl overflow-hidden shadow-xl border border-neutral-300 transition-transform duration-150"
        >
          <svg
            ref={svgRef}
            viewBox="0 0 1000 700"
            className="w-full h-full cursor-crosshair select-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {/* Pitch Markings */}
            {renderPitchLines(board.pitchType, board.pitchStyle)}

            {/* Tactical Arrows */}
            {board.arrows.map(arrow => {
              const isSelected = arrow.id === selectedArrowId;
              return (
                <g
                  key={arrow.id}
                  data-arrow-id={arrow.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedArrowId(arrow.id);
                    setSelectedElementId(null);
                  }}
                  className="cursor-pointer"
                >
                  {renderTacticalArrow(arrow, isSelected)}
                </g>
              );
            })}

            {/* Preview Arrow Line */}
            {drawingArrowStart && arrowCurrentPoint && (
              <line
                x1={drawingArrowStart.x}
                y1={drawingArrowStart.y}
                x2={arrowCurrentPoint.x}
                y2={arrowCurrentPoint.y}
                stroke={
                  activeTool === 'arrow_shot'
                    ? '#ef4444'
                    : activeTool === 'arrow_pass'
                    ? '#22c55e'
                    : activeTool === 'arrow_gk'
                    ? '#06b6d4'
                    : '#f59e0b'
                }
                strokeWidth="4"
                strokeDasharray={activeTool === 'arrow_gk' ? '8 6' : undefined}
                strokeLinecap="round"
                opacity="0.85"
              />
            )}

            {/* Elements (Goalkeepers, Players, Equipment, Callouts) */}
            {board.elements.map(element => {
              const isSelected = element.id === selectedElementId;
              return (
                <g
                  key={element.id}
                  data-element-id={element.id}
                  transform={`translate(${element.x}, ${element.y}) rotate(${element.rotation}) scale(${element.scale})`}
                  onPointerDown={(e) => handleElementPointerDown(e, element)}
                  className="cursor-move"
                >
                  <ElementGraphic
                    type={element.type}
                    scale={element.scale}
                    label={element.label}
                    color={element.color}
                    selected={isSelected}
                  />

                  {/* Selection Ring */}
                  {isSelected && (
                    <circle
                      cx="0"
                      cy="0"
                      r="34"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      strokeDasharray="4 4"
                      className="pointer-events-none animate-pulse"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Floating Element HUD */}
          {selectedElement && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#081a2e]/95 border border-[#eab308]/60 shadow-xl px-4 py-2 rounded-xl backdrop-blur-md text-white text-xs">
              <span className="font-bold text-[#eab308] mr-1">
                {selectedElement.label || selectedElement.type}
              </span>
              <button
                onClick={() => handleRotateSelected(-45)}
                title="左回転"
                className="p-1 hover:bg-[#132c4a] rounded text-neutral-300 hover:text-white"
              >
                <RotateCw className="w-3.5 h-3.5 -scale-x-100" />
              </button>
              <button
                onClick={() => handleRotateSelected(45)}
                title="右回転"
                className="p-1 hover:bg-[#132c4a] rounded text-neutral-300 hover:text-white"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleScaleSelected(-0.1)}
                title="縮小"
                className="p-1 hover:bg-[#132c4a] rounded text-neutral-300 hover:text-white"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleScaleSelected(0.1)}
                title="拡大"
                className="p-1 hover:bg-[#132c4a] rounded text-neutral-300 hover:text-white"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  const copyEl: TacticalElement = {
                    ...selectedElement,
                    id: `el-${Date.now()}`,
                    x: selectedElement.x + 30,
                    y: selectedElement.y + 30,
                  };
                  pushHistory({ ...board, elements: [...board.elements, copyEl] });
                  setSelectedElementId(copyEl.id);
                }}
                title="複製"
                className="p-1 hover:bg-[#132c4a] rounded text-neutral-300 hover:text-white"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleDeleteSelected}
                title="削除"
                className="p-1 hover:bg-rose-950 rounded text-rose-400 hover:text-rose-300"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Tactical Pitch Background & Lines
function renderPitchLines(pitchType: PitchType, pitchStyle: PitchStyle) {
  const bgColor = '#15803d'; // authentic turf green
  const stripeColor = '#166534';
  const lineColor = 'rgba(255,255,255,0.85)';
  const penaltyBoxFill = 'rgba(255,255,255,0.03)';

  return (
    <g>
      <rect x="0" y="0" width="1000" height="700" fill={bgColor} />

      {/* Alternating Mowing Stripes */}
      {[0, 100, 200, 300, 400, 500, 600].map(y => (
        <rect
          key={y}
          x="0"
          y={y}
          width="1000"
          height="50"
          fill={stripeColor}
          opacity="0.35"
        />
      ))}

      {/* Touchline Border */}
      <rect
        x="30"
        y="30"
        width="940"
        height="640"
        fill="none"
        stroke={lineColor}
        strokeWidth="3.5"
      />

      {/* 16m Front View (Screenshot 2 checkmarked pitch) */}
      {(pitchType === 'goal_mouth' || pitchType === 'perspective_angle') && (
        <g>
          <line x1="30" y1="80" x2="970" y2="80" stroke={lineColor} strokeWidth="4" />
          <rect x="280" y="80" width="440" height="150" fill={penaltyBoxFill} stroke={lineColor} strokeWidth="3" />
          <rect x="120" y="80" width="760" height="400" fill={penaltyBoxFill} stroke={lineColor} strokeWidth="3.5" />
          <circle cx="500" cy="320" r="5" fill="#ffffff" />
          <path d="M400,480 A120,120 0 0,0 600,480" fill="none" stroke={lineColor} strokeWidth="3" />
          {/* 3D Goal Perspective on line */}
          <line x1="410" y1="80" x2="590" y2="80" stroke="#ffffff" strokeWidth="8" />
        </g>
      )}

      {pitchType === 'penalty_area' && (
        <g>
          <line x1="30" y1="70" x2="970" y2="70" stroke={lineColor} strokeWidth="4" />
          <rect x="330" y="70" width="340" height="120" fill={penaltyBoxFill} stroke={lineColor} strokeWidth="3" />
          <rect x="180" y="70" width="640" height="340" fill={penaltyBoxFill} stroke={lineColor} strokeWidth="3.5" />
          <circle cx="500" cy="270" r="4.5" fill="#ffffff" />
          <path d="M420,410 A100,100 0 0,0 580,410" fill="none" stroke={lineColor} strokeWidth="3" />
        </g>
      )}

      {pitchType === 'half_pitch' && (
        <g>
          <line x1="30" y1="60" x2="970" y2="60" stroke={lineColor} strokeWidth="4" />
          <rect x="250" y="60" width="500" height="220" fill={penaltyBoxFill} stroke={lineColor} strokeWidth="3" />
          <rect x="380" y="60" width="240" height="80" fill={penaltyBoxFill} stroke={lineColor} strokeWidth="2.5" />
          <circle cx="500" cy="190" r="4" fill="#ffffff" />
          <line x1="30" y1="640" x2="970" y2="640" stroke={lineColor} strokeWidth="4" />
          <path d="M380,640 A120,120 0 0,1 620,640" fill="none" stroke={lineColor} strokeWidth="3" />
        </g>
      )}

      {pitchType === 'full_pitch' && (
        <g>
          <line x1="500" y1="30" x2="500" y2="670" stroke={lineColor} strokeWidth="3" />
          <circle cx="500" cy="350" r="70" fill="none" stroke={lineColor} strokeWidth="3" />
          <circle cx="500" cy="350" r="4" fill="#ffffff" />
          <rect x="30" y="180" width="160" height="340" fill={penaltyBoxFill} stroke={lineColor} strokeWidth="3" />
          <rect x="810" y="180" width="160" height="340" fill={penaltyBoxFill} stroke={lineColor} strokeWidth="3" />
        </g>
      )}
    </g>
  );
}

function renderTacticalArrow(arrow: TacticalArrow, isSelected: boolean) {
  if (arrow.points.length < 2) return null;
  const p1 = arrow.points[0];
  const p2 = arrow.points[1];

  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const angle = Math.atan2(dy, dx);
  const headLength = 16;

  const arrowX1 = p2.x - headLength * Math.cos(angle - Math.PI / 7);
  const arrowY1 = p2.y - headLength * Math.sin(angle - Math.PI / 7);
  const arrowX2 = p2.x - headLength * Math.cos(angle + Math.PI / 7);
  const arrowY2 = p2.y - headLength * Math.sin(angle + Math.PI / 7);

  const isCross = arrow.type === 'cross_aerial';
  let pathD = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
  if (isCross) {
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2 - 40;
    pathD = `M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`;
  }

  return (
    <g className={isSelected ? 'filter drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : ''}>
      <path
        d={pathD}
        fill="none"
        stroke={arrow.color}
        strokeWidth={isSelected ? 5 : 3.5}
        strokeDasharray={arrow.dashed ? '8 6' : undefined}
        strokeLinecap="round"
      />
      <polygon
        points={`${p2.x},${p2.y} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`}
        fill={arrow.color}
      />
      {arrow.label && (
        <text
          x={(p1.x + p2.x) / 2}
          y={(p1.y + p2.y) / 2 - 10}
          textAnchor="middle"
          fontSize="11"
          fontWeight="bold"
          fill="#ffffff"
          stroke="#0f172a"
          strokeWidth="2.5"
          paintOrder="stroke fill"
        >
          {arrow.label}
        </text>
      )}
    </g>
  );
}
