import { Workshop, FormData, SavedWorkshop } from '../types/Workshop';

// Generate a unique ID for workshops
export const generateWorkshopId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Generate a workshop name based on context and goals
export const generateWorkshopName = (context: string, goals: string): string => {
  const contextPreview = context.length > 30 ? context.substring(0, 30) + '...' : context;
  const goalsPreview = goals.length > 30 ? goals.substring(0, 30) + '...' : goals;
  
  if (context && goals) {
    return `${contextPreview} - ${goalsPreview}`;
  } else if (context) {
    return contextPreview;
  } else if (goals) {
    return goalsPreview;
  } else {
    return `Workshop ${new Date().toLocaleDateString()}`;
  }
};

// Compress workshop data for URL
export const compressWorkshopData = (workshop: Workshop): string => {
  try {
    const compressed = JSON.stringify(workshop);
    return btoa(compressed);
  } catch (error) {
    console.error('Error compressing workshop data:', error);
    return '';
  }
};

// Decompress workshop data from URL
export const decompressWorkshopData = (compressed: string): Workshop | null => {
  try {
    const decompressed = atob(compressed);
    return JSON.parse(decompressed);
  } catch (error) {
    console.error('Error decompressing workshop data:', error);
    return null;
  }
};

// Save workshop to localStorage
export const saveWorkshop = (workshop: Workshop, formData: FormData): SavedWorkshop => {
  const id = generateWorkshopId();
  const name = generateWorkshopName(formData.context, formData.goals);
  const now = new Date();
  
  const savedWorkshop: SavedWorkshop = {
    id,
    name,
    createdAt: now,
    lastModified: now,
    status: 'completed',
    formData,
    workshop,
    url: `${window.location.origin}/workshop/${id}`
  };

  // Save to localStorage
  const savedWorkshops = getSavedWorkshops();
  savedWorkshops.push(savedWorkshop);
  localStorage.setItem('savedWorkshops', JSON.stringify(savedWorkshops));

  return savedWorkshop;
};

// Save draft (form data only)
export const saveDraft = (formData: FormData): SavedWorkshop => {
  const id = generateWorkshopId();
  const name = generateWorkshopName(formData.context, formData.goals);
  const now = new Date();
  
  const savedWorkshop: SavedWorkshop = {
    id,
    name,
    createdAt: now,
    lastModified: now,
    status: 'draft',
    formData,
    url: `${window.location.origin}/workshop/${id}`
  };

  // Save to localStorage
  const savedWorkshops = getSavedWorkshops();
  savedWorkshops.push(savedWorkshop);
  localStorage.setItem('savedWorkshops', JSON.stringify(savedWorkshops));

  return savedWorkshop;
};

// Get all saved workshops from localStorage
export const getSavedWorkshops = (): SavedWorkshop[] => {
  try {
    const saved = localStorage.getItem('savedWorkshops');
    if (saved) {
      const workshops = JSON.parse(saved);
      // Convert date strings back to Date objects
      return workshops.map((w: any) => ({
        ...w,
        createdAt: new Date(w.createdAt),
        lastModified: new Date(w.lastModified)
      }));
    }
  } catch (error) {
    console.error('Error loading saved workshops:', error);
  }
  return [];
};

// Get a specific workshop by ID
export const getWorkshopById = (id: string): SavedWorkshop | null => {
  const workshops = getSavedWorkshops();
  return workshops.find(w => w.id === id) || null;
};

// Update an existing workshop
export const updateWorkshop = (id: string, updates: Partial<SavedWorkshop>): SavedWorkshop | null => {
  const workshops = getSavedWorkshops();
  const index = workshops.findIndex(w => w.id === id);
  
  if (index !== -1) {
    workshops[index] = {
      ...workshops[index],
      ...updates,
      lastModified: new Date()
    };
    localStorage.setItem('savedWorkshops', JSON.stringify(workshops));
    return workshops[index];
  }
  
  return null;
};

// Delete a workshop
export const deleteWorkshop = (id: string): boolean => {
  const workshops = getSavedWorkshops();
  const filtered = workshops.filter(w => w.id !== id);
  
  if (filtered.length !== workshops.length) {
    localStorage.setItem('savedWorkshops', JSON.stringify(filtered));
    return true;
  }
  
  return false;
};

// Auto-save form data
export const autoSaveFormData = (formData: FormData): void => {
  try {
    localStorage.setItem('autoSavedFormData', JSON.stringify({
      ...formData,
      lastSaved: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error auto-saving form data:', error);
  }
};

// Load auto-saved form data
export const loadAutoSavedFormData = (): FormData | null => {
  try {
    const saved = localStorage.getItem('autoSavedFormData');
    if (saved) {
      const data = JSON.parse(saved);
      // Remove the lastSaved field and return FormData
      const { lastSaved, ...formData } = data;
      return formData;
    }
  } catch (error) {
    console.error('Error loading auto-saved form data:', error);
  }
  return null;
};

// Clean up duplicate workshops (keep only the most recent version of each unique workshop)
export const cleanupDuplicateWorkshops = (): void => {
  try {
    const workshops = getSavedWorkshops();
    const uniqueWorkshops = new Map<string, SavedWorkshop>();
    
    // Group workshops by name and keep only the most recent one
    workshops.forEach(workshop => {
      const existing = uniqueWorkshops.get(workshop.name);
      if (!existing || workshop.lastModified > existing.lastModified) {
        uniqueWorkshops.set(workshop.name, workshop);
      }
    });
    
    // Save the deduplicated workshops
    const cleanedWorkshops = Array.from(uniqueWorkshops.values());
    localStorage.setItem('savedWorkshops', JSON.stringify(cleanedWorkshops));
    
    console.log(`Cleaned up workshops: ${workshops.length} -> ${cleanedWorkshops.length}`);
  } catch (error) {
    console.error('Error cleaning up duplicate workshops:', error);
  }
};
