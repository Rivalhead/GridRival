export interface TimeState {
  hour: number;
  minute: number;
  isDaylight: boolean;
  lightLevel: number;
}

export interface TimeConfig {
  dayStartHour: number;
  dayEndHour: number;
  timeScale: number;
  transitionDuration: number;
}