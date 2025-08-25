import { LiberatingStructure, Workshop, WorkshopSession } from '../types/Workshop';
import { liberatingStructures } from '../data/liberatingStructures';
import { purposes as purposesData } from '../data/purposes';
import { loadWorkshopSessions, saveWorkshopSessions } from './workshopStorage';

// Helper function to format minutes to HH:MM time string
const formatMinutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

// Helper function to convert time string to minutes since midnight
const timeStringToMinutes = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

// Helper function to convert minutes since midnight to time string
const minutesToTimeString = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

// Helper function to calculate absolute start and end times
const calculateAbsoluteTimes = (startTime: string, relativeStartMinutes: number, duration: number): { startTime: string; endTime: string } => {
  const workshopStartMinutes = timeStringToMinutes(startTime);
  const absoluteStartMinutes = workshopStartMinutes + relativeStartMinutes;
  const absoluteEndMinutes = absoluteStartMinutes + duration;
  
  return {
    startTime: minutesToTimeString(absoluteStartMinutes),
    endTime: minutesToTimeString(absoluteEndMinutes)
  };
};

const getPhaseForActivity = (activityIndex: number, totalActivities: number, activityId: string): 'Open' | 'Diverge' | 'Explore' | 'Converge' | 'Commit' => {
  if (activityId === 'welcome') return 'Open';
  if (activityId === 'closing') return 'Commit';
  if (activityId === 'short-break' || activityId === 'long-break') {
    // Breaks inherit phase from surrounding activities
    const phaseIndex = Math.floor((activityIndex / totalActivities) * 3);
    return ['Diverge', 'Explore', 'Converge'][phaseIndex] as 'Diverge' | 'Explore' | 'Converge';
  }
  
  // Main activities distributed across Diverge → Explore → Converge
  const phaseIndex = Math.floor((activityIndex / totalActivities) * 3);
  return ['Diverge', 'Explore', 'Converge'][phaseIndex] as 'Diverge' | 'Explore' | 'Converge';
};

const getActivityPurpose = (structure: LiberatingStructure, phase: string, context: string): string => {
  const purposes = {
    'welcome': `Skapa trygghet och tydlighet kring workshopens syfte. Etablera gemensam förståelse för ${context.split('.')[0].toLowerCase()}.`,
    'closing': 'Säkerställa att alla vet vad som händer härnäst och känner sig engagerade i att genomföra planerade åtgärder.',
    'short-break': 'Ge deltagarna tid att smälta intryck och ladda om inför nästa fas.',
    'long-break': 'Ge deltagarna tid för reflektion och informella samtal som fördjupar förståelsen.'
  };
  
  if (purposes[structure.id as keyof typeof purposes]) {
    return purposes[structure.id as keyof typeof purposes];
  }
  
  // Generate purpose based on phase and structure
  const phasePurposes = {
    'Diverge': `Öppna upp perspektiv och samla in olika synvinklar på ${context.split('.')[0].toLowerCase()}.`,
    'Explore': `Fördjupa förståelsen och utforska möjliga lösningar och arbetssätt.`,
    'Converge': `Fokusera på de mest lovande idéerna och skapa konkreta handlingsplaner.`
  };
  
  return phasePurposes[phase as keyof typeof phasePurposes] || structure.description;
};

const getActivityOutput = (structure: LiberatingStructure, phase: string): string => {
  const outputs = {
    'welcome': 'Gemensam förståelse för workshopens syfte, agenda och förväntningar.',
    'closing': 'Tydliga åtaganden och nästa steg för alla deltagare.',
    'short-break': 'Återhämtade och fokuserade deltagare.',
    'long-break': 'Fördjupad reflektion och stärkta relationer mellan deltagare.'
  };
  
  if (outputs[structure.id as keyof typeof outputs]) {
    return outputs[structure.id as keyof typeof outputs];
  }
  
  const phaseOutputs = {
    'Diverge': 'Bred samling av perspektiv, utmaningar och möjligheter.',
    'Explore': 'Fördjupad förståelse och konkreta lösningsförslag.',
    'Converge': 'Prioriterade åtgärder och tydlig handlingsplan.'
  };
  
  return phaseOutputs[phase as keyof typeof phaseOutputs] || 'Insikter och idéer från gruppens diskussioner.';
};

const getActivityTransition = (currentStructure: LiberatingStructure, nextStructure: LiberatingStructure | null, currentPhase: string, nextPhase: string): string => {
  if (!nextStructure) return '';
  
  if (currentStructure.id === 'welcome') {
    return 'Nu när vi har en gemensam bild av vårt syfte, låt oss börja utforska utmaningen från olika perspektiv.';
  }
  
  if (nextStructure.id === 'closing') {
    return 'Baserat på allt vi har utforskat och bestämt, låt oss nu säkerställa att vi alla vet vad som händer härnäst.';
  }
  
  if (currentPhase !== nextPhase) {
    const phaseTransitions = {
      'Diverge-Explore': 'Nu när vi har samlat många perspektiv, låt oss fördjupa oss i de mest intressanta områdena.',
      'Explore-Converge': 'Med all denna förståelse, låt oss nu fokusera på vad vi faktiskt ska göra åt det.',
      'Converge-Commit': 'Nu när vi har bestämt vad vi ska göra, låt oss säkerställa att alla är redo att agera.'
    };
    return phaseTransitions[`${currentPhase}-${nextPhase}` as keyof typeof phaseTransitions] || 'Låt oss fortsätta med nästa aktivitet.';
  }
  
  return 'Låt oss bygga vidare på det vi just upptäckt.';
};

const getActivityRisks = (structure: LiberatingStructure, phase: string): { risks: string; mitigation: string } => {
  const commonRisks = {
    'welcome': {
      risks: 'Deltagare känner sig osäkra på syftet eller har olika förväntningar.',
      mitigation: 'Var extra tydlig med agenda och skapa utrymme för frågor. Kontrollera förståelsen.'
    },
    'closing': {
      risks: 'Åtaganden blir vaga eller ingen tar ansvar för uppföljning.',
      mitigation: 'Säkerställ konkreta åtaganden med namn och datum. Boka uppföljningsmöte innan alla går.'
    }
  };
  
  if (commonRisks[structure.id as keyof typeof commonRisks]) {
    return commonRisks[structure.id as keyof typeof commonRisks];
  }
  
  const phaseRisks = {
    'Diverge': {
      risks: 'Diskussionen blir för bred eller deltagare håller tillbaka sina åsikter.',
      mitigation: 'Håll fokus på den centrala frågan. Uppmuntra alla att delta genom små grupper först.'
    },
    'Explore': {
      risks: 'Gruppen fastnar i problemanalys utan att komma till lösningar.',
      mitigation: 'Sätt tydliga tidsgränser och påminn om att vi ska komma fram till handlingsplaner.'
    },
    'Converge': {
      risks: 'Svårt att komma överens eller beslut blir för vaga.',
      mitigation: 'Använd strukturerade beslutsmetoder och säkerställ att alla förstår vad som bestämts.'
    }
  };
  
  return phaseRisks[phase as keyof typeof phaseRisks] || {
    risks: 'Aktiviteten tar längre tid än planerat eller engagemanget sjunker.',
    mitigation: 'Håll koll på tiden och energinivån. Anpassa vid behov.'
  };
};

// Generate a unique workshop ID based on parameters and timestamp
export const generateWorkshopId = (
  hours: number,
  participants: number,
  purposes: string[],
  context: string,
  goals: string,
  startTime: string
): string => {
  // Create a hash from the parameters
  const paramsString = `${hours}-${participants}-${purposes.sort().join(',')}-${context}-${goals}-${startTime}`;
  
  let hash = 0;
  for (let i = 0; i < paramsString.length; i++) {
    const char = paramsString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  const timestamp = Date.now();
  const shortHash = Math.abs(hash).toString(36).substring(0, 8);
  
  return `${timestamp}-${shortHash}`;
};

export const generateWorkshop = (
  hours: number, 
  participants: number, 
  purposes: string[], 
  context: string, 
  goals: string, 
  startTime: string = "09:00"
): Workshop => {
  // Simple random selection for new workshops
  const randomIndex = (max: number): number => {
    return Math.floor(Math.random() * max);
  };

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
      return purposes.some(purposeId => {
        const purposeData = purposesData.find(p => p.id === purposeId);
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
  const welcomePhase = getPhaseForActivity(0, 0, 'welcome');
  const welcomeRiskMitigation = getActivityRisks(welcomeStructure, welcomePhase);
  const welcomeTimes = calculateAbsoluteTimes(startTime, currentTime, welcomeClosingDuration);
  sessions.push({
    id: `session-${sessions.length}`,
    structure: welcomeStructure,
    duration: welcomeClosingDuration,
    startTime: welcomeTimes.startTime,
    endTime: welcomeTimes.endTime,
    purpose: getActivityPurpose(welcomeStructure, welcomePhase, context),
    output: getActivityOutput(welcomeStructure, welcomePhase),
    transition: '',
    phase: welcomePhase,
    risks: welcomeRiskMitigation.risks,
    mitigation: welcomeRiskMitigation.mitigation
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
      const breakPhase = getPhaseForActivity(sessions.length, sessions.length + 5, breakStructure.id);
      const breakRiskMitigation = getActivityRisks(breakStructure, breakPhase);
      const breakTimes = calculateAbsoluteTimes(startTime, currentTime, breakDuration);
      sessions.push({
        id: `session-${sessions.length}`,
        structure: breakStructure,
        duration: breakDuration,
        startTime: breakTimes.startTime,
        endTime: breakTimes.endTime,
        purpose: getActivityPurpose(breakStructure, breakPhase, context),
        output: getActivityOutput(breakStructure, breakPhase),
        transition: '',
        phase: breakPhase,
        risks: breakRiskMitigation.risks,
        mitigation: breakRiskMitigation.mitigation
      });
      currentTime += breakDuration;
      lastBreakTime = currentTime;
      remainingMinutes -= breakDuration;
    }

    // Select a structure using seeded random or Math.random
    const randomIndexValue = randomIndex(availableStructures.length);
    const selectedStructure = availableStructures[randomIndexValue];
    
    // Calculate duration and round up to nearest 5 minutes
    const baseDuration = selectedStructure.baseTime + (selectedStructure.scalingFactor * participants);
    const roundedDuration = Math.ceil(baseDuration / 5) * 5;
    
    if (roundedDuration <= remainingMinutes) {
      const activityPhase = getPhaseForActivity(sessions.length, sessions.length + 5, selectedStructure.id);
      const activityRiskMitigation = getActivityRisks(selectedStructure, activityPhase);
      const activityTimes = calculateAbsoluteTimes(startTime, currentTime, roundedDuration);
      sessions.push({
        id: `session-${sessions.length}`,
        structure: selectedStructure,
        duration: roundedDuration,
        startTime: activityTimes.startTime,
        endTime: activityTimes.endTime,
        purpose: getActivityPurpose(selectedStructure, activityPhase, context),
        output: getActivityOutput(selectedStructure, activityPhase),
        transition: '',
        phase: activityPhase,
        risks: activityRiskMitigation.risks,
        mitigation: activityRiskMitigation.mitigation
      });
      
      currentTime += roundedDuration;
      remainingMinutes -= roundedDuration;
    }
    
    // Remove used structure to avoid repetition
    availableStructures.splice(randomIndexValue, 1);
  }

  // Add closing activity
  const closingStructure = liberatingStructures.find(s => s.id === 'closing')!;
  const closingPhase = getPhaseForActivity(sessions.length, sessions.length, 'closing');
  const closingRiskMitigation = getActivityRisks(closingStructure, closingPhase);
  const closingTimes = calculateAbsoluteTimes(startTime, currentTime, welcomeClosingDuration);
  sessions.push({
    id: `session-${sessions.length}`,
    structure: closingStructure,
    duration: welcomeClosingDuration,
    startTime: closingTimes.startTime,
    endTime: closingTimes.endTime,
    purpose: getActivityPurpose(closingStructure, closingPhase, context),
    output: getActivityOutput(closingStructure, closingPhase),
    transition: '',
    phase: closingPhase,
    risks: closingRiskMitigation.risks,
    mitigation: closingRiskMitigation.mitigation
  });

  // Add transitions between activities
  for (let i = 0; i < sessions.length - 1; i++) {
    const currentSession = sessions[i];
    const nextSession = sessions[i + 1];
    currentSession.transition = getActivityTransition(
      currentSession.structure,
      nextSession.structure,
      currentSession.phase,
      nextSession.phase
    );
  }

  return {
    id: `workshop-${Date.now()}`,
    title: `Workshop ${hours}h - ${participants} deltagare`,
    duration: hours,
    participants,
    purposes,
    context,
    goals,
    sessions,
    totalTime: currentTime + welcomeClosingDuration,
    startTime
  };
};

/**
 * Generate or load workshop sessions based on workshop ID
 * If sessions exist for the workshop ID, load them. Otherwise generate new ones.
 */
export const generateOrLoadWorkshopSessions = (
  workshopId: string,
  hours: number, 
  participants: number, 
  purposes: string[], 
  context: string, 
  goals: string, 
  startTime: string = "09:00"
): WorkshopSession[] => {
  // Try to load existing sessions first
  const existingSessions = loadWorkshopSessions(workshopId);
  
  if (existingSessions) {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Loaded existing sessions for workshop ${workshopId}`);
    }
    return existingSessions;
  }
  
  // Generate new sessions if none exist
  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Generating new sessions for workshop ${workshopId}`);
  }
  const newSessions = generateWorkshop(hours, participants, purposes, context, goals, startTime).sessions;
  
  // Save the new sessions
  saveWorkshopSessions(workshopId, newSessions);
  
  return newSessions;
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