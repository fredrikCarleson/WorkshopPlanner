import { WorkshopSession } from '../types/Workshop';

// Storage key prefix for workshop sessions
const WORKSHOP_SESSIONS_PREFIX = 'workshop_sessions_';

/**
 * Save workshop sessions to localStorage with workshop ID as key
 */
export const saveWorkshopSessions = (workshopId: string, sessions: WorkshopSession[]): void => {
  const storageKey = `${WORKSHOP_SESSIONS_PREFIX}${workshopId}`;
  try {
    localStorage.setItem(storageKey, JSON.stringify(sessions));
  } catch (error) {
    // In production, log to a proper logging service instead of console
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to save workshop sessions:', error);
    }
  }
};

/**
 * Load workshop sessions from localStorage by workshop ID
 */
export const loadWorkshopSessions = (workshopId: string): WorkshopSession[] | null => {
  const storageKey = `${WORKSHOP_SESSIONS_PREFIX}${workshopId}`;
  try {
    const savedSessions = localStorage.getItem(storageKey);
    if (savedSessions) {
      return JSON.parse(savedSessions);
    }
  } catch (error) {
    // In production, log to a proper logging service instead of console
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to load workshop sessions:', error);
    }
  }
  return null;
};

/**
 * Delete workshop sessions from localStorage
 */
export const deleteWorkshopSessions = (workshopId: string): void => {
  const storageKey = `${WORKSHOP_SESSIONS_PREFIX}${workshopId}`;
  try {
    localStorage.removeItem(storageKey);
  } catch (error) {
    // In production, log to a proper logging service instead of console
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to delete workshop sessions:', error);
    }
  }
};

/**
 * Check if workshop sessions exist for a given workshop ID
 */
export const hasWorkshopSessions = (workshopId: string): boolean => {
  const storageKey = `${WORKSHOP_SESSIONS_PREFIX}${workshopId}`;
  return localStorage.getItem(storageKey) !== null;
};

/**
 * Get all workshop session keys (for cleanup purposes)
 */
export const getAllWorkshopSessionKeys = (): string[] => {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(WORKSHOP_SESSIONS_PREFIX)) {
      keys.push(key);
    }
  }
  return keys;
};

/**
 * Clean up orphaned workshop sessions (sessions without corresponding workshop data)
 */
export const cleanupOrphanedSessions = (existingWorkshopIds: string[]): void => {
  const sessionKeys = getAllWorkshopSessionKeys();
  
  sessionKeys.forEach(key => {
    const workshopId = key.replace(WORKSHOP_SESSIONS_PREFIX, '');
    if (!existingWorkshopIds.includes(workshopId)) {
      localStorage.removeItem(key);
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`Cleaned up orphaned sessions for workshop: ${workshopId}`);
      }
    }
  });
};
