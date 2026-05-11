import { useEffect, useState } from 'react';
import { db, UserProfile } from './lib/db';
import IntakeScreen from './components/IntakeScreen';
import SessionScreen from './components/SessionScreen';
import HomeScreen from './components/HomeScreen';
import CategoryDetailsScreen from './components/CategoryDetailsScreen';
import TutorSessionScreen from './components/TutorSessionScreen';
import CommunityScreen from './components/CommunityScreen';
import { Tutor, TUTORS } from './lib/tutors';
import { UNIDOS_COURSE } from './lib/courses';

export type AppScreen = 'home' | 'category' | 'intake' | 'session' | 'tutor_session' | 'community';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [selectedCourseModule, setSelectedCourseModule] = useState<string | null>(null);

  useEffect(() => {
    const p = db.getProfile();
    setProfile(p);
  }, []);

  const handleIntakeComplete = (newProfile: UserProfile) => {
    db.saveProfile(newProfile);
    setProfile(newProfile);
    if (selectedExpert) {
      startExpertSession(selectedExpert);
    } else {
      setCurrentScreen('home');
    }
  };

  const handleSessionComplete = (updatedProfile: UserProfile) => {
    let finalProfile = { ...updatedProfile };
    
    if (selectedCourseModule && selectedCourseModule !== 'sos') {
      let newUnlocked = finalProfile.unlockedModules || profile?.unlockedModules || ['m1'];
      const curIdx = UNIDOS_COURSE.findIndex(m => m.id === selectedCourseModule);
      if (curIdx !== -1 && curIdx + 1 < UNIDOS_COURSE.length) {
         const nextMod = UNIDOS_COURSE[curIdx + 1].id;
         if (!newUnlocked.includes(nextMod)) {
            newUnlocked = [...newUnlocked, nextMod];
         }
      }
      finalProfile.unlockedModules = newUnlocked;
    }

    db.saveProfile(finalProfile);
    setProfile(finalProfile);
    if (selectedCourseModule === 'm8') {
       setCurrentScreen('community');
    } else {
       setCurrentScreen('home');
    }
  };

  const startExpertSession = (expertId: string, moduleId?: string) => {
    setSelectedExpert(expertId);
    setSelectedCourseModule(moduleId || null);
    if (!profile) {
      setCurrentScreen('intake');
      return;
    }
    
    if (expertId === 'fredo') {
      setCurrentScreen('session');
    } else {
      setCurrentScreen('tutor_session');
    }
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentScreen('category');
  };

  const currentTutor = TUTORS.find(t => t.id === selectedExpert);

  return (
    <div className="min-h-screen bg-zinc-950 text-[#FAFAFA] font-sans selection:bg-[#F27D26] selection:text-white pb-20">
      <main className="w-full min-h-screen relative overflow-hidden bg-zinc-950">
        {currentScreen === 'home' ? (
          <HomeScreen 
            profile={profile} 
            onSelectCategory={handleSelectCategory}
            onStartIntake={() => setCurrentScreen('intake')}
            onLogout={() => { localStorage.clear(); setProfile(null); setCurrentScreen('home'); }}
            onShowCommunity={() => setCurrentScreen('community')}
          />
        ) : (
          <div className="max-w-md mx-auto relative min-h-screen bg-[#0A0A0A] shadow-2xl">
            {currentScreen === 'category' && selectedCategory && profile && (
              <CategoryDetailsScreen 
                categoryId={selectedCategory} 
                profile={profile}
                onBack={() => setCurrentScreen('home')}
                onSelectExpert={startExpertSession}
              />
            )}
            {currentScreen === 'category' && selectedCategory && !profile && (
              <CategoryDetailsScreen 
                categoryId={selectedCategory} 
                profile={{name: '', age: '', focusArea: '', initialWellbeing: 5, triggerEvent: '', previousAttempts: '', definitionOfWellbeing: '', timeConstraint: '', firstSessionDate: '', intakeSummary: '', sessionsComplete: 0, completedTasks: [], history: [], unlockedModules: ['m1']}}
                onBack={() => setCurrentScreen('home')}
                onSelectExpert={startExpertSession}
              />
            )}
            {currentScreen === 'intake' && (
              <IntakeScreen onComplete={handleIntakeComplete} />
            )}
            {currentScreen === 'session' && profile && (
              <SessionScreen profile={profile} onComplete={handleSessionComplete} onExit={() => setCurrentScreen('home')} />
            )}
            {currentScreen === 'tutor_session' && profile && currentTutor && (
              <TutorSessionScreen 
                profile={profile} 
                tutor={currentTutor} 
                courseModuleId={selectedCourseModule || undefined}
                onExit={() => setCurrentScreen('category')} 
                onComplete={handleSessionComplete} 
              />
            )}
            {currentScreen === 'community' && profile && (
              <CommunityScreen 
                profile={profile}
                onBack={() => setCurrentScreen('home')}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
