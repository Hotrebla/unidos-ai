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
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans overflow-x-hidden grain">
      {/* Background Auras — Unidos Teal Palette */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[15%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[140px] aura-animate"
          style={{ background: 'radial-gradient(circle, rgba(46,202,198,0.12) 0%, transparent 70%)' }} />
        <div className="absolute top-[55%] -right-[5%] w-[40%] h-[55%] rounded-full blur-[120px] aura-animate"
          style={{ background: 'radial-gradient(circle, rgba(46,202,198,0.06) 0%, transparent 70%)', animationDelay: '-6s' }} />
        <div className="absolute top-[25%] left-[40%] w-[30%] h-[30%] rounded-full blur-[100px] aura-animate-slow"
          style={{ background: 'radial-gradient(circle, rgba(93,213,207,0.05) 0%, transparent 70%)', animationDelay: '-3s' }} />
      </div>

      <main className="relative z-10 w-full min-h-screen">
        {currentScreen === 'home' ? (
          <HomeScreen 
            profile={profile} 
            onSelectCategory={handleSelectCategory}
            onStartIntake={() => setCurrentScreen('intake')}
            onLogout={() => { localStorage.clear(); setProfile(null); setCurrentScreen('home'); }}
            onShowCommunity={() => setCurrentScreen('community')}
          />
        ) : (
          <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
            {/* Virtual Device Container */}
            <div className="w-full max-w-md h-[852px] max-h-[90vh] glass-dark rounded-[3rem] shadow-premium relative overflow-hidden border border-white/10 flex flex-col"
              style={{ boxShadow: '0 30px 80px -10px rgba(0,0,0,0.8), 0 0 0 1px rgba(46,202,198,0.05), inset 0 1px 0 rgba(255,255,255,0.05)' }}
            >
              {/* Dynamic Island */}
              <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center z-50 pointer-events-none">
                <div className="w-24 h-5 bg-black rounded-full mt-2" />
              </div>

              {/* Teal accent line at top */}
              <div className="absolute top-0 left-[20%] right-[20%] h-[1px] z-50"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(46,202,198,0.4), transparent)' }} />

              <div className="flex-1 overflow-y-auto scrollbar-hide">
                {currentScreen === 'category' && selectedCategory && (
                  <CategoryDetailsScreen 
                    categoryId={selectedCategory} 
                    profile={profile || {name: '', age: '', focusArea: '', initialWellbeing: 5, triggerEvent: '', previousAttempts: '', definitionOfWellbeing: '', timeConstraint: '', firstSessionDate: '', intakeSummary: '', sessionsComplete: 0, completedTasks: [], history: [], unlockedModules: ['m1']}}
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
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
