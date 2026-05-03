import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Trophy, Dumbbell, Backpack, Users, Bolt, Flame, Calendar, Plus, Stars, Trash2, CheckCircle2, ChevronDown, ChevronUp, Timer, AlertTriangle, Info, Check, Beef, Zap } from 'lucide-react';
import { AppProvider, useApp } from './AppContext';
import { cn } from './lib/utils';
import { format, addDays, startOfToday, isSameDay, subDays } from 'date-fns';
import { es } from 'date-fns/locale';

// --- Components ---

function TopAppBar() {
  const { stats } = useApp();
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-20 bg-white border-b border-border shadow-sm">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-surface-variant ring-1 ring-border">
            <img 
              alt="Avatar" 
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=100&h=100&auto=format&fit=crop" 
            />
          </div>
          <div className="flex flex-col">
            <span className="label-caps leading-none mb-1">Usuario</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-text-main">Alex Rivera</span>
              <span className="bg-primary-light text-primary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Lvl {stats.level}</span>
            </div>
          </div>
        </div>
        <div className="hidden md:block h-8 w-px bg-border"></div>
        <div className="hidden md:flex flex-col w-48">
          <div className="flex justify-between items-end mb-1">
            <span className="label-caps text-[10px]">Progreso XP</span>
            <span className="text-[10px] font-mono font-bold text-text-muted">{stats.xp} / {stats.maxXp}</span>
          </div>
          <div className="w-full h-2 bg-primary-light rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(stats.xp / stats.maxXp) * 100}%` }}
              className="bg-primary h-full"
            />
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-black italic text-primary tracking-tighter uppercase hidden lg:block">
        ANTIGRAVITY
      </h1>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end mr-2">
          <span className="label-caps">Racha</span>
          <div className="flex items-center gap-1 text-orange-500">
            <Flame className="w-4 h-4 fill-current" />
            <span className="text-xl font-bold tracking-tighter italic">{stats.streak}</span>
          </div>
        </div>
        <button className="text-primary-dark hover:scale-110 transition-transform p-2 bg-primary-light rounded-xl">
          <Bolt className="w-5 h-5 fill-current" />
        </button>
      </div>
    </header>
  );
}

function DateSelector() {
  const { selectedDate, setSelectedDate } = useApp();
  const today = startOfToday();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Show 15 days before and 15 days after today (total 31 days)
  const dates = Array.from({ length: 31 }).map((_, i) => addDays(subDays(today, 15), i));

  useEffect(() => {
    // Auto-scroll to selected date on mount
    const selectedElement = document.getElementById(`date-${selectedDate.getTime()}`);
    if (selectedElement && scrollRef.current) {
      const container = scrollRef.current;
      const scrollLeft = selectedElement.offsetLeft - container.offsetWidth / 2 + selectedElement.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'instant' });
    }
  }, []);

  return (
    <section className="mb-8">
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar py-6 px-4 snap-x snap-mandatory scroll-smooth"
      >
        {dates.map((date) => {
          const isSelected = isSameDay(date, selectedDate);
          const isToday = isSameDay(date, today);
          
          return (
            <button
              key={date.toISOString()}
              id={`date-${date.getTime()}`}
              onClick={() => setSelectedDate(date)}
              className={cn(
                "flex-shrink-0 w-24 h-28 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border snap-center",
                isSelected 
                  ? "bg-primary-light border-primary shadow-lg shadow-primary/10 -mt-2 h-32 scale-105" 
                  : "bg-white border-border opacity-60 hover:opacity-100 hover:scale-102"
              )}
            >
              <span className={cn(
                "label-caps text-[10px] mb-2",
                isSelected ? "text-primary" : "text-text-muted"
              )}>
                {isToday ? 'Hoy' : format(date, 'eee', { locale: es })}
              </span>
              <span className={cn(
                "font-bold text-2xl",
                isSelected ? "text-primary-dark" : "text-text-main"
              )}>
                {format(date, 'd')}
              </span>
              {isSelected && (
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function BottomNav({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) {
  const tabs = [
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutGrid },
    { id: 'quests', label: 'QUESTS', icon: Trophy },
    { id: 'training', label: 'TRAINING', icon: Dumbbell },
    { id: 'inventory', label: 'INVENTORY', icon: Backpack },
    { id: 'social', label: 'SOCIAL', icon: Users },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 pb-safe h-20 bg-white/95 backdrop-blur-xl border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.03)] rounded-t-[32px]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center justify-center transition-all duration-300 relative px-4 flex-1",
              isActive ? "text-primary" : "text-text-muted hover:text-text-main"
            )}
          >
            {isActive && (
              <motion.div 
                layoutId="navIndicator"
                className="absolute top-0 h-1 w-12 bg-primary rounded-b-full shadow-[0_2px_8px_rgba(99,102,241,0.3)]"
              />
            )}
            <Icon className={cn("w-6 h-6", isActive && "fill-primary/5")} strokeWidth={isActive ? 2.5 : 2} />
            <span className="label-caps text-[8px] mt-2">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

// --- Screens ---

function Dashboard() {
  const { stats, selectedDate, setSelectedDate, currentWeek, currentDay, workoutTitle, missions, completeMission } = useApp();
  
  return (
    <div className="space-y-12 pb-32">
      {/* Header Info */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-1"
      >
        <div>
          <span className="label-caps !text-[10px] tracking-[0.3em] block mb-2 opacity-60">SISTEMA OPERATIVO v4.2</span>
          <h1 className="text-6xl font-black text-text-main italic tracking-tighter leading-[0.8] mb-1">
            ESTADO:<br/>OPERATIVO
          </h1>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
              <span className="label-caps !text-[9px] font-black">Ciclo: Semana {currentWeek}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="label-caps !text-[9px] font-black">Racha: {stats.streak} DÍAS</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6 w-full md:w-auto text-right">
          <div>
            <p className="label-caps !text-[9px] mb-1 opacity-50">NIVEL</p>
            <p className="text-3xl font-black italic text-text-main leading-none">{stats.level}</p>
          </div>
          <div>
             <p className="label-caps !text-[9px] mb-1 opacity-50">STRENGTH</p>
             <p className="text-3xl font-black italic text-text-main leading-none">{stats.attributes.strength}</p>
          </div>
          <div>
             <p className="label-caps !text-[9px] mb-1 opacity-50">XP</p>
             <p className="text-sm font-black italic text-primary-dark leading-none">{stats.xp}/{stats.maxXp}</p>
          </div>
        </div>
      </motion.div>

      {/* Main Focus Card */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 theme-card p-10 bg-slate-900 text-white relative overflow-hidden flex flex-col justify-between min-h-[400px]"
        >
          <div className="absolute top-0 right-0 p-10 opacity-10">
             <Trophy className="w-64 h-64 -rotate-12" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-1 bg-primary rounded-full" />
              <span className="label-caps !text-[10px] tracking-[0.4em] text-primary-light uppercase">Objetivo Actual</span>
            </div>
            
            <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-4 leading-none">
              {workoutTitle === 'Descanso' ? 'RECUPERACIÓN ACTIVA' : workoutTitle}
            </h2>
            <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-lg">
              {workoutTitle === 'Descanso' 
                ? 'Hoy es día de recarga. Nutre tu cuerpo y prepara tus fibras para el siguiente ciclo de hipertrofia.'
                : `Día ${currentDay} de la Semana ${currentWeek}. Enfócate en la técnica progresiva y el control total.`}
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-10 items-end mt-12">
            <div>
              <p className="label-caps !text-[9px] text-slate-500 mb-2 uppercase">Progreso del Ciclo</p>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-black italic text-white">{Math.round((currentDay/7)*100)}%</div>
                <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${(currentDay/7)*100}%` }} />
                </div>
              </div>
            </div>
            <button 
              className="bg-white text-slate-900 px-8 py-4 label-caps !text-[10px] font-black rounded-full hover:bg-primary hover:text-white transition-all transform active:scale-95 shadow-xl"
            >
              Iniciar Rutina
            </button>
          </div>
        </motion.div>

        {/* Nutrition Summary Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="theme-card p-10 bg-white border-border flex flex-col justify-between overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <Beef className="w-48 h-48 -rotate-12" />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-1 bg-secondary rounded-full" />
              <span className="label-caps !text-[10px] tracking-[0.4em] text-text-muted uppercase">Combustible</span>
            </div>
            
            <div className="space-y-10">
              <div>
                <div className="flex justify-between items-end mb-3">
                   <p className="label-caps !text-[9px] uppercase">Gasto Energético</p>
                   <p className="text-3xl font-black italic">2300</p>
                </div>
                <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                  <div className="bg-slate-900 h-full" style={{ width: '100%' }} />
                </div>
                <p className="text-[10px] text-text-muted mt-2 font-bold italic uppercase tracking-wider">Plan Hipertrofia</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-text-muted label-caps !text-[10px]">Proteína</span>
                  <span className="font-mono text-primary">150g</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-text-muted label-caps !text-[10px]">Carbohidratos</span>
                  <span className="font-mono">300g</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-text-muted label-caps !text-[10px]">Grasas</span>
                  <span className="font-mono">70g</span>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full py-5 border-2 border-slate-900 text-slate-900 rounded-[28px] label-caps !text-[10px] font-black hover:bg-slate-900 hover:text-white transition-all mt-8">
            Ver Plan Detallado
          </button>
        </motion.div>
      </section>

      <DateSelector />

      <section className="space-y-6">
        <div className="flex justify-between items-center mb-2 px-1">
          <h3 className="text-xl font-bold tracking-tight uppercase italic font-black">Misiones Diarias</h3>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-[10px] font-bold uppercase tracking-wider">{missions.filter(m => !m.completed).length} DISPONIBLES</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {missions.map((mission) => (
            <motion.div 
              key={mission.id}
              layout
              className={cn(
                "p-5 bg-white border border-border rounded-[32px] flex items-center justify-between group transition-all theme-card-hover shadow-sm",
                mission.completed && "opacity-50 grayscale pointer-events-none bg-slate-50"
              )}
            >
              <div className="flex items-center gap-5">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-sm",
                  mission.type === 'EJERCICIO' ? "bg-slate-900 text-white" : "bg-primary text-white"
                )}>
                  {mission.type === 'EJERCICIO' ? <Dumbbell className="w-7 h-7" /> : <Beef className="w-7 h-7" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-[0.2em]",
                      mission.type === 'EJERCICIO' ? "text-slate-900" : "text-primary-dark"
                    )}>
                      {mission.type}
                    </span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-text-muted text-[10px] font-bold">+{mission.xp} XP</span>
                  </div>
                  <h4 className="font-bold text-text-main text-lg uppercase tracking-tight italic">{mission.title}</h4>
                </div>
              </div>
              <button 
                onClick={() => completeMission(mission.id)}
                className="w-12 h-12 border-2 border-slate-900 rounded-full flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all group/btn"
              >
                <Check className="w-6 h-6 opacity-40 group-hover/btn:opacity-100" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Inventory() {
  const { consumables } = useApp();
  
  const totals = consumables.reduce((acc, item) => ({
    calories: acc.calories + item.calories,
    protein: acc.protein + item.protein,
    carbs: acc.carbs + item.carbs,
    fat: acc.fat + item.fat
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  return (
    <div className="space-y-10 pb-32">
      <header className="theme-card p-8 bg-white">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-text-main">Dieta Hipertrofia</h2>
            <p className="label-caps text-[9px] mt-1">Superávit ligero + Rendimiento alto</p>
          </div>
          <div className="text-right">
            <span className="font-display text-4xl font-black text-text-main italic tracking-tighter">{totals.calories}</span>
            <span className="label-caps !text-[9px] block mt-1">/ 2300 Kcal</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-50 p-5 rounded-[24px]">
            <span className="label-caps !text-[8px] mb-2 block">Proteína</span>
            <span className="text-xl font-bold text-text-main">{totals.protein}g</span>
            <div className="w-full h-1 bg-slate-200 mt-2.5 rounded-full overflow-hidden">
              <div className="bg-blue-400 h-full transition-all duration-1000" style={{ width: `${(totals.protein / 150) * 100}%` }} />
            </div>
            <span className="text-[8px] text-text-muted mt-1 block">Meta: 150g</span>
          </div>
          <div className="bg-slate-50 p-5 rounded-[24px]">
            <span className="label-caps !text-[8px] mb-2 block">Carbos</span>
            <span className="text-xl font-bold text-text-main">{totals.carbs}g</span>
            <div className="w-full h-1 bg-slate-200 mt-2.5 rounded-full overflow-hidden">
              <div className="bg-orange-400 h-full transition-all duration-1000" style={{ width: `${(totals.carbs / 300) * 100}%` }} />
            </div>
            <span className="text-[8px] text-text-muted mt-1 block">Meta: 300g</span>
          </div>
          <div className="bg-slate-50 p-5 rounded-[24px]">
            <span className="label-caps !text-[8px] mb-2 block">Grasas</span>
            <span className="text-xl font-bold text-text-main">{totals.fat}g</span>
            <div className="w-full h-1 bg-slate-200 mt-2.5 rounded-full overflow-hidden">
              <div className="bg-yellow-400 h-full transition-all duration-1000" style={{ width: `${(totals.fat / 70) * 100}%` }} />
            </div>
            <span className="text-[8px] text-text-muted mt-1 block">Meta: 70g</span>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="label-caps !text-[8px] mb-1">Crecimiento Muscular</span>
            <p className="text-sm font-bold text-text-main">Meta: +0.5kg / semana</p>
          </div>
          <div className="w-16 h-16 border-4 border-slate-100 rounded-full flex items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
               <circle cx="32" cy="32" r="28" strokeWidth="4" stroke="currentColor" fill="transparent" className="text-primary" strokeDasharray="175.8" strokeDashoffset={175.8 * (1 - totals.calories / 2300)} />
            </svg>
            <span className="text-[10px] font-bold">{Math.round((totals.calories / 2300) * 100)}%</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {consumables.map(item => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-border rounded-[32px] p-5 flex gap-5 group theme-card-hover shadow-sm"
          >
            <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-border relative">
              <img src={item.image} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-lg text-[7px] font-black tracking-widest text-text-main">
                {item.type}
              </div>
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-text-main leading-tight text-sm uppercase tracking-tight">{item.name}</h3>
                  <span className="label-caps text-primary text-[8px] flex items-center gap-1 bg-primary-light px-1.5 py-0.5 rounded-full font-black">
                    +{item.xp} XP
                  </span>
                </div>
                <p className="text-text-muted text-[10px] font-medium italic line-clamp-2">
                  {item.description}
                </p>
              </div>
              <div className="flex justify-between items-center bg-slate-50 rounded-xl px-3 py-2">
                 <div className="text-center">
                    <p className="label-caps !text-[6px]">P</p>
                    <p className="font-bold text-[10px]">{item.protein}g</p>
                 </div>
                 <div className="text-center">
                    <p className="label-caps !text-[6px]">C</p>
                    <p className="font-bold text-[10px]">{item.carbs}g</p>
                 </div>
                 <div className="text-center">
                    <p className="label-caps !text-[6px]">F</p>
                    <p className="font-bold text-[10px]">{item.fat}g</p>
                 </div>
                 <div className="h-4 w-px bg-slate-200" />
                 <p className="font-mono font-bold text-primary text-[10px]">{item.calories}K</p>
              </div>
            </div>
          </motion.div>
        ))}
        
        <button className="theme-card border-dashed p-6 border-2 border-slate-200 flex items-center justify-center gap-2 text-text-muted hover:border-primary hover:text-primary transition-all">
          <p className="font-bold text-sm">Registrar alimento...</p>
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <button className="fixed right-8 bottom-24 w-16 h-16 theme-button-primary shadow-xl shadow-slate-200 flex items-center justify-center active:scale-95 z-40">
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}

function Training() {
  const { exercises, workoutTitle, currentWeek, currentDay } = useApp();
  const [activeExercise, setActiveExercise] = useState<null | string>(null);

  if (activeExercise) {
    const exercise = exercises.find(e => e.id === activeExercise)!;
    return <BossFight exercise={exercise} onClose={() => setActiveExercise(null)} />;
  }

  return (
    <div className="space-y-10 pb-32">
      <header className="flex justify-between items-end mb-8 px-1">
        <div>
          <span className="label-caps !text-[10px] tracking-[0.3em] block mb-2">SEMANA {currentWeek} • DÍA {currentDay}</span>
          <h2 className="text-4xl font-black text-text-main uppercase italic tracking-tighter">{workoutTitle.toUpperCase()}</h2>
        </div>
        <div className="text-right">
          <span className="label-caps !text-[9px] block mb-1">XP Estimada</span>
          <span className="text-primary-dark font-black text-2xl italic">+{exercises.reduce((sum, e) => sum + e.xp, 0).toLocaleString()} XP</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exercises.length > 0 ? exercises.map((exercise, idx) => (
          <motion.div 
            key={exercise.id}
            className="theme-card p-6 border-l-4 border-l-secondary relative overflow-hidden group"
          >
            <div className="flex justify-between mb-6">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-border grayscale-[0.6] group-hover:grayscale-0 transition-all duration-500 bg-slate-50 flex items-center justify-center">
                  {exercise.image ? (
                    <img src={exercise.image} alt={exercise.name} className="w-full h-full object-cover" />
                  ) : (
                    <Dumbbell className="w-8 h-8 text-slate-300" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-text-main text-lg">{exercise.name}</h3>
                  <div className="flex gap-2 mt-2">
                    <span className="label-caps bg-slate-50 text-text-muted px-2 py-0.5 rounded-lg text-[8px] border border-slate-100">{exercise.category}</span>
                    <span className="label-caps bg-slate-50 text-text-muted px-2 py-0.5 rounded-lg text-[8px] border border-slate-100">{exercise.type}</span>
                    {exercise.isDropSet && (
                      <span className="label-caps bg-red-50 text-red-500 px-2 py-0.5 rounded-lg text-[8px] border border-red-100">DROP SET</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-3xl font-black text-slate-100">0{idx + 1}</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-5 border-y border-slate-50 mb-6 bg-slate-50/50 rounded-2xl px-4">
              <div className="text-center flex-1">
                <p className="label-caps !text-[8px] mb-1">Series</p>
                <p className="font-bold text-text-main">{exercise.series}</p>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center flex-1">
                <p className="label-caps !text-[8px] mb-1">Reps</p>
                <p className="font-bold text-text-main">{exercise.reps}</p>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center flex-1">
                <p className="label-caps !text-[8px] mb-1">Peso</p>
                <p className="font-bold text-text-main">{exercise.weight}</p>
              </div>
            </div>

            {exercise.tempo && (
              <p className="text-[10px] text-text-muted italic mb-4 px-1">
                Tempo: <span className="font-bold text-primary">{exercise.tempo}</span> (Bajada - Pausa - Subida)
              </p>
            )}

            <button 
              onClick={() => setActiveExercise(exercise.id)}
              className="w-full py-4 bg-slate-900 text-white label-caps tracking-widest text-[10px] rounded-2xl hover:bg-primary transition-all active:scale-[0.98] shadow-sm"
            >
              Iniciar Boss Fight
            </button>
          </motion.div>
        )) : (
          <div className="col-span-full theme-card p-12 flex flex-col items-center justify-center bg-white border-dashed border-2">
            <Calendar className="w-12 h-12 text-slate-200 mb-4" />
            <h3 className="text-xl font-bold text-text-main">Día de Descanso</h3>
            <p className="text-text-muted text-sm mt-2">La recuperación es parte fundamental del crecimiento muscular.</p>
          </div>
        )}
        
        <button className="theme-card border-dashed p-8 border-2 border-slate-200 flex flex-col items-center justify-center gap-3 text-text-muted hover:border-primary hover:text-primary transition-all">
          <Plus className="w-6 h-6 opacity-30" />
          <p className="font-bold text-sm">Añadir ejercicio a la rutina</p>
        </button>
      </div>
    </div>
  );
}

function BossFight({ exercise, onClose }: { exercise: any, onClose: () => void }) {
  const [bossHp, setBossHp] = useState(7450);
  const maxBossHp = 10000;
  const [reps, setReps] = useState(8);
  const [weight, setWeight] = useState(100);
  const { addXp } = useApp();

  const handleAttack = () => {
    const damage = reps * 200;
    setBossHp(prev => Math.max(0, prev - damage));
    addXp(50);
    if (bossHp - damage <= 0) {
      setTimeout(() => {
        addXp(exercise.xp);
        onClose();
      }, 1000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[60] bg-white p-6 overflow-y-auto no-scrollbar"
    >
      <div className="max-w-md mx-auto space-y-8 pb-10">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-text-muted hover:text-text-main font-bold text-sm bg-slate-100 rounded-full">
          <Trash2 className="w-5 h-5" />
        </button>

        <section className="text-center pt-8">
          <div className="flex justify-center mb-6">
            <div className="px-5 py-2 rounded-full border border-red-100 bg-red-50 text-red-600">
              <span className="label-caps flex items-center gap-2 !text-red-500">
                <AlertTriangle className="w-3.5 h-3.5" />
                Combate Contra Jefe: Nivel 5
              </span>
            </div>
          </div>
          <h1 className="text-4xl font-black text-text-main uppercase italic tracking-tighter mb-2">{exercise.name}</h1>
          <p className="label-caps text-text-muted tracking-[0.3em]">RETO: {exercise.weight} x {exercise.reps} Reps</p>
        </section>

        <section className="theme-card p-8 bg-slate-50/50">
          <div className="flex justify-between items-end mb-3">
            <span className="label-caps text-primary-dark">HP del Jefe</span>
            <span className="font-mono text-xl font-bold">{bossHp.toLocaleString()} <span className="text-text-muted text-xs">/ {maxBossHp.toLocaleString()}</span></span>
          </div>
          <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden p-0.5 border border-white">
            <motion.div 
              animate={{ width: `${(bossHp / maxBossHp) * 100}%` }}
              className="h-full bg-primary rounded-full"
            />
          </div>
          
          <div className="mt-8 rounded-[32px] overflow-hidden aspect-video border-2 border-white shadow-xl relative group">
            <img src={exercise.image} className="w-full h-full object-cover brightness-75 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_red]" />
              <span className="label-caps !text-white text-xs">Fase: Berserk</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="theme-card p-6 flex flex-col items-center bg-white">
            <label className="label-caps mb-4">Repeticiones</label>
            <div className="flex items-center gap-8">
              <button onClick={() => setReps(r => Math.max(0, r - 1))} className="w-12 h-12 rounded-2xl border border-border text-text-main flex items-center justify-center hover:bg-slate-100 transition-all">
                <ChevronDown className="w-6 h-6" />
              </button>
              <span className="font-mono text-4xl font-black text-text-main">{reps.toString().padStart(2, '0')}</span>
              <button onClick={() => setReps(r => r + 1)} className="w-12 h-12 rounded-2xl border border-border text-text-main flex items-center justify-center hover:bg-slate-100 transition-all">
                <ChevronUp className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="theme-card p-6 flex flex-col items-center bg-white">
            <label className="label-caps mb-4">Peso (kg)</label>
            <div className="flex items-center gap-6">
               <button onClick={() => setWeight(w => Math.max(0, w - 2.5))} className="w-12 h-12 rounded-2xl border border-border text-text-main flex items-center justify-center hover:bg-slate-100 transition-all">
                <ChevronDown className="w-6 h-6" />
              </button>
              <span className="font-mono text-3xl font-black text-text-main">{weight.toFixed(1)}</span>
              <button onClick={() => setWeight(w => w + 2.5)} className="w-12 h-12 rounded-2xl border border-border text-text-main flex items-center justify-center hover:bg-slate-100 transition-all">
                <ChevronUp className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={handleAttack}
          className="w-full py-6 rounded-[24px] bg-slate-900 text-white font-bold text-2xl uppercase tracking-tighter shadow-2xl shadow-slate-200 active:scale-95 transition-all"
        >
          Registrar Ataque
        </button>

        <div className="theme-card p-8 bg-primary-light border-primary/20 relative overflow-hidden text-center">
           <div className="mb-4">
            <Timer className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="label-caps !text-primary-dark">Siguiente asalto disponible</p>
           </div>
           <p className="font-mono text-5xl font-black text-primary-dark mb-4">00:45</p>
           <p className="text-text-muted text-sm font-medium italic">Preparando recuperación muscular...</p>
        </div>
      </div>
    </motion.div>
  );
}

function Social() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8">
      <div className="space-y-6">
        <div className="relative">
          <Users className="w-20 h-20 text-primary mx-auto opacity-20" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full"
          />
        </div>
        <h2 className="font-display text-3xl font-black italic uppercase">MÓDULO MULTIJUGADOR</h2>
        <div className="space-y-2">
          <p className="label-caps text-primary tracking-[0.3em]">En desarrollo: Alpha 0.1</p>
          <p className="text-white/40 text-sm max-w-xs mx-auto">Próximamente: Clan Wars, Boss Raids cooperativas y Tablas de Clasificación Global.</p>
        </div>
      </div>
    </div>
  );
}

// --- Main App Wrapper ---

function AntigravityApp() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background">
      <TopAppBar />
      <main className="pt-24 px-gutter container mx-auto max-w-container-max-width">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'training' && <Training />}
            {activeTab === 'inventory' && <Inventory />}
            {activeTab === 'social' && <Social />}
            {activeTab === 'quests' && <Dashboard />}
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AntigravityApp />
    </AppProvider>
  );
}
