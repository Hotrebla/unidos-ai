export interface UserProfile {
  name: string;
  age: string;
  focusArea: string;
  initialWellbeing: number;
  triggerEvent: string;
  previousAttempts: string;
  definitionOfWellbeing: string;
  timeConstraint: string;
  firstSessionDate: string;
  intakeSummary: string;
  sessionsComplete: number;
  completedTasks: string[];
  history: string[]; // Logs of past sessions or summaries
  tasks?: Array<{
    id: string;
    description: string;
    completed: boolean;
  }>;
  unlockedModules?: string[];
}

export const db = {
  getProfile: (): UserProfile | null => {
    const data = localStorage.getItem('fredo_user_profile');
    return data ? JSON.parse(data) : null;
  },
  saveProfile: (profile: UserProfile) => {
    localStorage.setItem('fredo_user_profile', JSON.stringify(profile));
  },
  clearProfile: () => {
    localStorage.removeItem('fredo_user_profile');
  }
};
