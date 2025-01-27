import { create } from 'zustand';
import { TimeState, TimeConfig } from '../types';
import { TIME_CONFIG } from '../config';

interface TimeStore {
  time: TimeState;
  updateTime: () => void;
  getLightLevel: () => number;
}

const calculateLightLevel = (hour: number, minute: number, config: TimeConfig): number => {
  const timeInHours = hour + minute / 60;
  
  if (timeInHours < config.dayStartHour - config.transitionDuration || 
      timeInHours > config.dayEndHour + config.transitionDuration) {
    return 0.2;
  }
  
  if (timeInHours >= config.dayStartHour - config.transitionDuration && 
      timeInHours <= config.dayStartHour + config.transitionDuration) {
    const progress = (timeInHours - (config.dayStartHour - config.transitionDuration)) / 
                    (config.transitionDuration * 2);
    return 0.2 + (0.8 * progress);
  }
  
  if (timeInHours >= config.dayEndHour - config.transitionDuration && 
      timeInHours <= config.dayEndHour + config.transitionDuration) {
    const progress = 1 - ((timeInHours - (config.dayEndHour - config.transitionDuration)) / 
                    (config.transitionDuration * 2));
    return 0.2 + (0.8 * progress);
  }
  
  return 1;
};

export const useTimeSystem = create<TimeStore>((set, get) => ({
  time: {
    hour: TIME_CONFIG.dayStartHour,
    minute: 0,
    isDaylight: true,
    lightLevel: 1
  },
  
  updateTime: () => {
    set(state => {
      let newMinute = state.time.minute + 1;
      let newHour = state.time.hour;
      
      if (newMinute >= 60) {
        newMinute = 0;
        newHour = (newHour + 1) % 24;
      }
      
      const isDaylight = newHour >= TIME_CONFIG.dayStartHour && 
                        newHour < TIME_CONFIG.dayEndHour;
      
      const lightLevel = calculateLightLevel(newHour, newMinute, TIME_CONFIG);
      
      return {
        time: {
          hour: newHour,
          minute: newMinute,
          isDaylight,
          lightLevel
        }
      };
    });
  },
  
  getLightLevel: () => get().time.lightLevel,
}));