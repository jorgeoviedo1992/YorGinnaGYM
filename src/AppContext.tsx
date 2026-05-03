import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { UserStats, INITIAL_STATS, Mission, MOCK_MISSIONS, Consumable, DAILY_CONSUMABLES, Exercise, WORKOUT_PLAN } from './types';
import { startOfToday, differenceInWeeks, getDay, startOfISOWeek } from 'date-fns';

interface AppContextType {
  stats: UserStats;
  missions: Mission[];
  consumables: Consumable[];
  exercises: Exercise[];
  workoutTitle: string;
  selectedDate: Date;
  currentWeek: number;
  currentDay: number;
  setSelectedDate: (date: Date) => void;
  addXp: (amount: number) => void;
  completeMission: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Reference start date for the 4-week cycle (a Monday)
const CYCLE_START_DATE = new Date(2026, 3, 27); // April 27, 2026 (Monday)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [missions, setMissions] = useState<Mission[]>(MOCK_MISSIONS);
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());

  // Calculate Week and Day
  const currentWeek = useMemo(() => {
    const diff = differenceInWeeks(startOfISOWeek(selectedDate), CYCLE_START_DATE);
    return (Math.abs(diff) % 4) + 1;
  }, [selectedDate]);

  const currentDay = useMemo(() => {
    const day = getDay(selectedDate);
    return day === 0 ? 7 : day; // Monday=1, ..., Sunday=7
  }, [selectedDate]);

  // Derived Data
  const workoutInfo = useMemo(() => {
    const weekData = WORKOUT_PLAN[currentWeek] || WORKOUT_PLAN[1];
    return weekData[currentDay] || { title: 'Descanso', exercises: [] };
  }, [currentWeek, currentDay]);

  const exercises = workoutInfo.exercises;
  const workoutTitle = workoutInfo.title;
  
  const consumables = DAILY_CONSUMABLES; // Constant for now as per user request

  const addXp = (amount: number) => {
    setStats(prev => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      let newMaxXp = prev.maxXp;

      while (newXp >= newMaxXp) {
        newXp -= newMaxXp;
        newLevel += 1;
        newMaxXp += 200;
      }

      return {
        ...prev,
        level: newLevel,
        xp: newXp,
        maxXp: newMaxXp
      };
    });
  };

  const completeMission = (id: string) => {
    setMissions(prev => prev.map(m => {
      if (m.id === id && !m.completed) {
        addXp(m.xp);
        return { ...m, completed: true };
      }
      return m;
    }));
  };

  return (
    <AppContext.Provider value={{
      stats,
      missions,
      consumables,
      exercises,
      workoutTitle,
      selectedDate,
      currentWeek,
      currentDay,
      setSelectedDate,
      addXp,
      completeMission
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
