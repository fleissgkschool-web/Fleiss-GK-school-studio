import React, { useState } from 'react';
import { TacticalBoardData, ElementType } from '../../types';
import { TacticalPitch } from './TacticalPitch';
import { IllustrationLibrary } from './IllustrationLibrary';

interface TacticalStudioProps {
  board: TacticalBoardData;
  onChange: (board: TacticalBoardData) => void;
  drillTitle?: string;
}

export const TacticalStudio: React.FC<TacticalStudioProps> = ({
  board,
  onChange,
  drillTitle,
}) => {
  const [activeTool, setActiveTool] = useState<
    'select' | 'arrow_shot' | 'arrow_pass' | 'arrow_gk' | 'arrow_cross' | 'text'
  >('select');

  const handleAddElement = (type: ElementType, customLabel?: string) => {
    // Generate placement with slight offset
    const offsetX = Math.floor(Math.random() * 60) - 30;
    const offsetY = Math.floor(Math.random() * 60) - 30;

    let defaultX = 500 + offsetX;
    let defaultY = 320 + offsetY;
    let defaultScale = 1;
    let defaultRotation = 0;

    if (type === 'goal_regulation') {
      defaultX = 500;
      defaultY = 80;
      defaultScale = 1.1;
    } else if (type.startsWith('gk_')) {
      defaultX = 500 + offsetX;
      defaultY = 200 + offsetY;
      defaultRotation = 180;
    } else if (type === 'coach_server') {
      defaultX = 500;
      defaultY = 480;
    } else if (type === 'ball') {
      defaultX = 490;
      defaultY = 420;
    } else if (type === 'callout_box' || type === 'text_label') {
      defaultX = 400 + offsetX;
      defaultY = 280 + offsetY;
    }

    const newElement = {
      id: `el-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type,
      x: defaultX,
      y: defaultY,
      rotation: defaultRotation,
      scale: defaultScale,
      label: customLabel,
    };

    onChange({
      ...board,
      elements: [...board.elements, newElement],
    });
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-[#f8fafc]">
      {/* Upper area: Tactical Pitch with Pitch selector and Toolbar */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <TacticalPitch
          board={board}
          onChange={onChange}
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          drillTitle={drillTitle}
        />
      </div>

      {/* Lower area: Bottom Tool Dock & Goalkeeper Poses Tray (Screenshot 3) */}
      <IllustrationLibrary
        onAddElement={handleAddElement}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
      />
    </div>
  );
};
