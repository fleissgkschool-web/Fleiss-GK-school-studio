import { Drill, Player, SessionPlan } from '../types';
import { INITIAL_DRILLS } from '../data/initialDrills';
import { INITIAL_PLAYERS } from '../data/initialPlayers';

const STORAGE_KEYS = {
  DRILLS: 'fleiss_gk_drills_v1',
  PLAYERS: 'fleiss_gk_players_v1',
  SESSIONS: 'fleiss_gk_sessions_v1',
  SETTINGS: 'fleiss_gk_settings_v1',
};

export const StorageService = {
  getDrills(): Drill[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DRILLS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load drills from localStorage', e);
    }
    // Default seed
    localStorage.setItem(STORAGE_KEYS.DRILLS, JSON.stringify(INITIAL_DRILLS));
    return INITIAL_DRILLS;
  },

  saveDrills(drills: Drill[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.DRILLS, JSON.stringify(drills));
    } catch (e) {
      console.error('Failed to save drills to localStorage', e);
    }
  },

  saveDrill(drill: Drill): void {
    const drills = this.getDrills();
    const index = drills.findIndex(d => d.id === drill.id);
    if (index >= 0) {
      drills[index] = { ...drill, updatedAt: new Date().toISOString() };
    } else {
      drills.unshift({ ...drill, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    this.saveDrills(drills);
  },

  deleteDrill(id: string): void {
    const drills = this.getDrills().filter(d => d.id !== id);
    this.saveDrills(drills);
  },

  getPlayers(): Player[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PLAYERS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load players from localStorage', e);
    }
    localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(INITIAL_PLAYERS));
    return INITIAL_PLAYERS;
  },

  savePlayers(players: Player[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(players));
    } catch (e) {
      console.error('Failed to save players to localStorage', e);
    }
  },

  savePlayer(player: Player): void {
    const players = this.getPlayers();
    const index = players.findIndex(p => p.id === player.id);
    if (index >= 0) {
      players[index] = { ...player, updatedAt: new Date().toISOString() };
    } else {
      players.unshift({ ...player, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    this.savePlayers(players);
  },

  deletePlayer(id: string): void {
    const players = this.getPlayers().filter(p => p.id !== id);
    this.savePlayers(players);
  },

  getSessions(): SessionPlan[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load sessions', e);
    }
    return [];
  },

  saveSession(session: SessionPlan): void {
    const sessions = this.getSessions();
    const index = sessions.findIndex(s => s.id === session.id);
    if (index >= 0) {
      sessions[index] = session;
    } else {
      sessions.unshift(session);
    }
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  },

  deleteSession(id: string): void {
    const sessions = this.getSessions().filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  },

  exportAllDataJson(): string {
    const data = {
      app: 'FLEISS Goalkeeper Studio',
      exportedAt: new Date().toISOString(),
      drills: this.getDrills(),
      players: this.getPlayers(),
      sessions: this.getSessions(),
    };
    return JSON.stringify(data, null, 2);
  },

  importDataJson(jsonString: string): { success: boolean; message: string; drillCount?: number; playerCount?: number } {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed.drills)) {
        this.saveDrills(parsed.drills);
      }
      if (Array.isArray(parsed.players)) {
        this.savePlayers(parsed.players);
      }
      if (Array.isArray(parsed.sessions)) {
        localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(parsed.sessions));
      }
      return {
        success: true,
        message: 'データを正常にインポートしました。',
        drillCount: parsed.drills?.length ?? 0,
        playerCount: parsed.players?.length ?? 0,
      };
    } catch (e) {
      return {
        success: false,
        message: 'JSONフォーマットの解析に失敗しました。正しいバックアップファイルを選択してください。',
      };
    }
  },

  resetToDefaults(): void {
    localStorage.setItem(STORAGE_KEYS.DRILLS, JSON.stringify(INITIAL_DRILLS));
    localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(INITIAL_PLAYERS));
  }
};
