import { generateWorkshop, generateWorkshopId, generateOrLoadWorkshopSessions } from '../utils/workshopCalculator';

describe('Workshop Persistence with File Storage', () => {
  test('should demonstrate that activities are persistent with file storage', () => {
    const baseParams = {
      hours: 4,
      participants: 12,
      purposes: ['articulate-challenge'],
      context: 'Test workshop context',
      goals: 'Test workshop goals',
      startTime: '09:00'
    };

    // Generate workshop ID
    const workshopId = generateWorkshopId(
      baseParams.hours,
      baseParams.participants,
      baseParams.purposes,
      baseParams.context,
      baseParams.goals,
      baseParams.startTime
    );

    // Generate sessions multiple times with the same workshop ID
    const sessions1 = generateOrLoadWorkshopSessions(
      workshopId,
      baseParams.hours,
      baseParams.participants,
      baseParams.purposes,
      baseParams.context,
      baseParams.goals,
      baseParams.startTime
    );

    const sessions2 = generateOrLoadWorkshopSessions(
      workshopId,
      baseParams.hours,
      baseParams.participants,
      baseParams.purposes,
      baseParams.context,
      baseParams.goals,
      baseParams.startTime
    );

    // Extract the main activities (excluding welcome, closing, and breaks)
    const mainActivities1 = sessions1
      .filter(session => 
        !['welcome', 'closing', 'short-break', 'long-break'].includes(session.structure.id)
      )
      .map(session => session.structure.id);

    const mainActivities2 = sessions2
      .filter(session => 
        !['welcome', 'closing', 'short-break', 'long-break'].includes(session.structure.id)
      )
      .map(session => session.structure.id);

    // Check if both sessions have the same activities in the same order
    const allSame = JSON.stringify(mainActivities1) === JSON.stringify(mainActivities2);

    // This test should PASS because activities are now persistent with file storage
    expect(allSame).toBe(true);
  });

  test('should generate different workshop IDs for different parameters', () => {
    const baseParams = {
      hours: 4,
      participants: 12,
      purposes: ['articulate-challenge'],
      context: 'Test workshop context',
      goals: 'Test workshop goals',
      startTime: '09:00'
    };

    const workshopId1 = generateWorkshopId(
      baseParams.hours,
      baseParams.participants,
      baseParams.purposes,
      baseParams.context,
      baseParams.goals,
      baseParams.startTime
    );

    const workshopId2 = generateWorkshopId(
      baseParams.hours,
      baseParams.participants,
      baseParams.purposes,
      baseParams.context,
      baseParams.goals,
      '09:30' // Different start time
    );

    expect(workshopId1).not.toBe(workshopId2);
  });

  test('should generate same workshop ID for same parameters', () => {
    const baseParams = {
      hours: 4,
      participants: 12,
      purposes: ['articulate-challenge'],
      context: 'Test workshop context',
      goals: 'Test workshop goals',
      startTime: '09:00'
    };

    const workshopId1 = generateWorkshopId(
      baseParams.hours,
      baseParams.participants,
      baseParams.purposes,
      baseParams.context,
      baseParams.goals,
      baseParams.startTime
    );

    const workshopId2 = generateWorkshopId(
      baseParams.hours,
      baseParams.participants,
      baseParams.purposes,
      baseParams.context,
      baseParams.goals,
      baseParams.startTime
    );

    expect(workshopId1).toBe(workshopId2);
  });
});
