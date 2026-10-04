/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Drill, Player, SessionPlan } from './types';
import { StorageService } from './services/storage';
import { Sidebar, SidebarTab } from './components/Sidebar';
import { DrillList } from './components/DrillManager/DrillList';
import { DrillDetailModal } from './components/DrillManager/DrillDetailModal';
import { DrillEditor } from './components/DrillManager/DrillEditor';
import { PlayerList } from './components/PlayerManager/PlayerList';
import { PlayerDetailModal } from './components/PlayerManager/PlayerDetailModal';
import { PlayerEditorModal } from './components/PlayerManager/PlayerEditorModal';
import { SessionPlanner } from './components/SessionPlanner/SessionPlanner';
import { GitHubExportModal } from './components/GitHubSync/GitHubExportModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<SidebarTab>('drills');

  // Core Data
  const [drills, setDrills] = useState<Drill[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [sessions, setSessions] = useState<SessionPlan[]>([]);

  // Modals
  const [selectedDrill, setSelectedDrill] = useState<Drill | null>(null);
  const [editingDrill, setEditingDrill] = useState<Drill | null | 'new'>(null);

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [editingPlayer, setEditingPlayer] = useState<Player | null | 'new'>(null);

  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);

  // Load from Storage
  useEffect(() => {
    const loadedDrills = StorageService.getDrills();
    const loadedPlayers = StorageService.getPlayers();
    const loadedSessions = StorageService.getSessions();

    setDrills(loadedDrills);
    setPlayers(loadedPlayers);
    setSessions(loadedSessions);
  }, []);

  // Drill Handlers
  const handleSaveDrill = (savedDrill: Drill) => {
    StorageService.saveDrill(savedDrill);
    const updated = StorageService.getDrills();
    setDrills(updated);
    setEditingDrill(null);
    setSelectedDrill(savedDrill);
  };

  const handleDeleteDrill = (id: string) => {
    StorageService.deleteDrill(id);
    setDrills(StorageService.getDrills());
    if (selectedDrill?.id === id) {
      setSelectedDrill(null);
    }
  };

  const handleDuplicateDrill = (drill: Drill) => {
    const duplicated: Drill = {
      ...drill,
      id: `drill-${Date.now()}`,
      title: `${drill.title} (コピー)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    StorageService.saveDrill(duplicated);
    setDrills(StorageService.getDrills());
  };

  const handleToggleFavorite = (id: string) => {
    const drill = drills.find(d => d.id === id);
    if (drill) {
      const updated = { ...drill, isFavorite: !drill.isFavorite };
      StorageService.saveDrill(updated);
      setDrills(StorageService.getDrills());
      if (selectedDrill?.id === id) {
        setSelectedDrill(updated);
      }
    }
  };

  // Player Handlers
  const handleSavePlayer = (savedPlayer: Player) => {
    StorageService.savePlayer(savedPlayer);
    setPlayers(StorageService.getPlayers());
    setEditingPlayer(null);
    setSelectedPlayer(savedPlayer);
  };

  const handleDeletePlayer = (id: string) => {
    StorageService.deletePlayer(id);
    setPlayers(StorageService.getPlayers());
    if (selectedPlayer?.id === id) {
      setSelectedPlayer(null);
    }
  };

  const handleAddPlayerNote = (playerId: string, note: any) => {
    const player = players.find(p => p.id === playerId);
    if (!player) return;

    const newNote = {
      ...note,
      id: `note-${Date.now()}`,
    };

    const updated = {
      ...player,
      notes: [newNote, ...player.notes],
    };

    StorageService.savePlayer(updated);
    setPlayers(StorageService.getPlayers());
    setSelectedPlayer(updated);
  };

  // Session Handlers
  const handleSaveSession = (session: SessionPlan) => {
    StorageService.saveSession(session);
    setSessions(StorageService.getSessions());
  };

  const handleDeleteSession = (id: string) => {
    StorageService.deleteSession(id);
    setSessions(StorageService.getSessions());
  };

  return (
    <div className="flex h-screen w-screen bg-[#f8fafc] text-neutral-800 overflow-hidden font-sans">
      {/* 1. Left Sidebar (Screenshot 1 & 2) */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'github') {
            setIsGitHubModalOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        drillCount={drills.length}
      />

      {/* 2. Main Content Viewport */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8fafc]">
        {/* Tab: マイドリル (Screenshot 1) */}
        {currentTab === 'drills' && (
          <DrillList
            drills={drills}
            onSelectDrill={(drill) => setSelectedDrill(drill)}
            onEditDrill={(drill) => setEditingDrill(drill)}
            onNewDrill={() => setEditingDrill('new')}
            onDeleteDrill={handleDeleteDrill}
            onDuplicateDrill={handleDuplicateDrill}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {/* Tab: ゴールキーパー (個人カルテ & レーダーチャート管理) */}
        {currentTab === 'goalkeepers' && (
          <PlayerList
            players={players}
            onSelectPlayer={(player) => setSelectedPlayer(player)}
            onEditPlayer={(player) => setEditingPlayer(player)}
            onNewPlayer={() => setEditingPlayer('new')}
            onDeletePlayer={handleDeletePlayer}
          />
        )}

        {/* Tab: セッション計画 / プラン */}
        {(currentTab === 'plan' || currentTab === 'templates' || currentTab === 'calendar') && (
          <SessionPlanner
            drills={drills}
            players={players}
            sessions={sessions}
            onSaveSession={handleSaveSession}
            onDeleteSession={handleDeleteSession}
          />
        )}

        {/* Tab: 探索 / アナリティクス */}
        {(currentTab === 'explore' || currentTab === 'analytics') && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#081a2e] text-[#eab308] flex items-center justify-center font-bold text-xl">
              GK
            </div>
            <h2 className="text-lg font-bold text-[#081a2e]">
              FLEISS GK School コミュニティ＆分析
            </h2>
            <p className="text-xs text-neutral-500 max-w-md leading-relaxed">
              全{drills.length}件のドリルメニューと{players.length}名の選手カルテが登録されています。左メニューの「マイドリル」または「ゴールキーパー」から操作してください。
            </p>
            <button
              onClick={() => setCurrentTab('drills')}
              className="px-4 py-2 bg-[#f59e0b] hover:bg-[#d97706] text-[#081a2e] font-bold text-xs rounded-xl shadow-xs"
            >
              マイドリルに戻る
            </button>
          </div>
        )}
      </main>

      {/* 3. Full-Screen Drill Editor (Screenshot 2 & 3) */}
      {editingDrill && (
        <DrillEditor
          drill={editingDrill === 'new' ? null : editingDrill}
          onSave={handleSaveDrill}
          onCancel={() => setEditingDrill(null)}
        />
      )}

      {/* 4. Drill Detail Modal */}
      {selectedDrill && (
        <DrillDetailModal
          drill={selectedDrill}
          onClose={() => setSelectedDrill(null)}
          onEdit={(drill) => {
            setSelectedDrill(null);
            setEditingDrill(drill);
          }}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* 5. Player Detail & Editor Modals */}
      {selectedPlayer && (
        <PlayerDetailModal
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
          onEdit={(player) => {
            setSelectedPlayer(null);
            setEditingPlayer(player);
          }}
          onAddNote={handleAddPlayerNote}
        />
      )}

      {editingPlayer && (
        <PlayerEditorModal
          player={editingPlayer === 'new' ? null : editingPlayer}
          onSave={handleSavePlayer}
          onClose={() => setEditingPlayer(null)}
        />
      )}

      {/* 6. GitHub Integration Modal */}
      {isGitHubModalOpen && (
        <GitHubExportModal
          drills={drills}
          players={players}
          onClose={() => setIsGitHubModalOpen(false)}
          onImportSuccess={(dCount, pCount) => {
            setDrills(StorageService.getDrills());
            setPlayers(StorageService.getPlayers());
          }}
        />
      )}
    </div>
  );
}
