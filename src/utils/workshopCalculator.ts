import { LiberatingStructure, Workshop, WorkshopSession } from '../types/Workshop';
import { liberatingStructures } from '../data/liberatingStructures';
import { purposes } from '../data/purposes';

// Helper function to format minutes to HH:MM time string
const formatMinutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

export const generateWorkshop = (hours: number, participants: number, purposes: string[]): Workshop => {
  // Calculate welcome and closing durations based on workshop length
  const getWelcomeClosingDuration = (totalHours: number): number => {
    if (totalHours <= 2) return 10;
    if (totalHours <= 4) return 15;
    if (totalHours <= 6) return 20;
    return 30;
  };

  const welcomeClosingDuration = getWelcomeClosingDuration(hours);
  const totalMinutes = hours * 60;
  const availableMinutes = totalMinutes - (2 * welcomeClosingDuration); // Subtract welcome and closing

  // Filter structures based on selected purposes
  let availableStructures = liberatingStructures.filter(structure => 
    structure.id !== 'welcome' && structure.id !== 'closing' && 
    structure.id !== 'short-break' && structure.id !== 'long-break' &&
    structure.minParticipants <= participants && 
    structure.maxParticipants >= participants
  );

  // If purposes are selected, prioritize recommended structures
  if (purposes.length > 0) {
    const recommendedStructures = availableStructures.filter(structure => {
      return purposes.some(purpose => {
        const purposeData = purposes.find(p => p.id === purpose);
        return purposeData?.recommendedStructures.includes(structure.id);
      });
    });
    
    // Use recommended structures if available, otherwise use all available
    if (recommendedStructures.length > 0) {
      availableStructures = recommendedStructures;
    }
  }

  const sessions: WorkshopSession[] = [];
  let currentTime = 0;

  // Add welcome activity
  const welcomeStructure = liberatingStructures.find(s => s.id === 'welcome')!;
  sessions.push({
    id: `session-${sessions.length}`,
    structure: welcomeStructure,
    duration: welcomeClosingDuration,
    startTime: formatMinutesToTime(currentTime),
    endTime: formatMinutesToTime(currentTime + welcomeClosingDuration)
  });
  currentTime += welcomeClosingDuration;

  let remainingMinutes = availableMinutes;
  let lastBreakTime = currentTime;

  // Add main activities
  while (remainingMinutes > 20 && availableStructures.length > 0) {
    // Check if we need a break (roughly every hour)
    if (currentTime - lastBreakTime >= 60) {
      const breakDuration = currentTime - lastBreakTime >= 120 ? 15 : 10;
      const breakStructure = liberatingStructures.find(s => 
        s.id === (breakDuration === 15 ? 'long-break' : 'short-break')
      )!;
      sessions.push({
        id: `session-${sessions.length}`,
        structure: breakStructure,
        duration: breakDuration,
        startTime: formatMinutesToTime(currentTime),
        endTime: formatMinutesToTime(currentTime + breakDuration)
      });
      currentTime += breakDuration;
      lastBreakTime = currentTime;
      remainingMinutes -= breakDuration;
    }

    // Select a random structure
    const randomIndex = Math.floor(Math.random() * availableStructures.length);
    const selectedStructure = availableStructures[randomIndex];
    
    // Calculate duration and round up to nearest 5 minutes
    const baseDuration = selectedStructure.baseTime + (selectedStructure.scalingFactor * participants);
    const roundedDuration = Math.ceil(baseDuration / 5) * 5;
    
    if (roundedDuration <= remainingMinutes) {
      sessions.push({
        id: `session-${sessions.length}`,
        structure: selectedStructure,
        duration: roundedDuration,
        startTime: formatMinutesToTime(currentTime),
        endTime: formatMinutesToTime(currentTime + roundedDuration)
      });
      
      currentTime += roundedDuration;
      remainingMinutes -= roundedDuration;
    }
    
    // Remove used structure to avoid repetition
    availableStructures.splice(randomIndex, 1);
  }

  // Add closing activity
  const closingStructure = liberatingStructures.find(s => s.id === 'closing')!;
  sessions.push({
    id: `session-${sessions.length}`,
    structure: closingStructure,
    duration: welcomeClosingDuration,
    startTime: formatMinutesToTime(currentTime),
    endTime: formatMinutesToTime(currentTime + welcomeClosingDuration)
  });

  return {
    id: `workshop-${Date.now()}`,
    title: `Workshop ${hours}h - ${participants} deltagare`,
    duration: hours,
    participants,
    purposes,
    sessions,
    totalTime: currentTime + welcomeClosingDuration
  };
};

export const formatTime = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}min`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${minutes}min`;
  }
};