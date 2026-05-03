export type UserStats = {
  level: number;
  xp: number;
  maxXp: number;
  streak: number;
  attributes: {
    strength: number;
    agility: number;
    health: number;
  };
};

export type Consumable = {
  id: string;
  name: string;
  description: string;
  xp: number;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  image: string;
  type: string;
};

export type Exercise = {
  id: string;
  name: string;
  category: string;
  type: string;
  series: number;
  reps: string;
  weight: string;
  xp: number;
  image: string;
  status: 'pending' | 'completed';
  isDropSet?: boolean;
  tempo?: string;
};

export type Mission = {
  id: string;
  title: string;
  type: 'EJERCICIO' | 'COMIDA';
  xp: number;
  completed: boolean;
};

export const INITIAL_STATS: UserStats = {
  level: 14,
  xp: 1240,
  maxXp: 1500,
  streak: 12,
  attributes: {
    strength: 84,
    agility: 92,
    health: 100,
  }
};

export const DAILY_CONSUMABLES: Consumable[] = [
  {
    id: 'n1',
    name: 'Avena Energética',
    description: '70g Avena, 250ml Leche, 1 Plátano, 15g Mantequilla Cacahuete, 25g Whey',
    xp: 150, protein: 35, carbs: 65, fat: 15, calories: 550, type: 'DESAYUNO',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=400&fit=crop'
  },
  {
    id: 'n2',
    name: 'Media Mañana IQ',
    description: '250g Yogur griego natural 0%, 30g Nueces, 1 Manzana',
    xp: 80, protein: 20, carbs: 25, fat: 15, calories: 350, type: 'MEDIA MAÑANA',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop'
  },
  {
    id: 'n3',
    name: 'Plato del Campeón',
    description: '150g Arroz (cocido), 180g Pechuga de Pollo, 10g Aceite Oliva, Verduras',
    xp: 200, protein: 45, carbs: 85, fat: 15, calories: 700, type: 'COMIDA',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop'
  },
  {
    id: 'n4',
    name: 'Prep Táctico',
    description: '2 rebanadas Pan Integral, 80g Pavo, 1 Plátano, 10g Miel',
    xp: 100, protein: 15, carbs: 60, fat: 5, calories: 350, type: 'MERIENDA',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=400&fit=crop'
  },
  {
    id: 'n5',
    name: 'Post-Entreno Anabólico',
    description: '25g Proteína Whey, 1 Plátano',
    xp: 120, protein: 25, carbs: 30, fat: 2, calories: 200, type: 'POST-ENTRENO',
    image: 'https://images.unsplash.com/photo-1593095191070-9a2831a6afff?w=400&h=400&fit=crop'
  },
  {
    id: 'n6',
    name: 'Cena de Recuperación',
    description: '120g Salmón (o 2h+2c), Ensalada mixta, 5g Aceite',
    xp: 150, protein: 25, carbs: 10, fat: 15, calories: 200, type: 'CENA',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=400&fit=crop'
  }
];

const createDay = (week: number, day: number, title: string, ex: any[]) => ({
  title,
  exercises: ex.map((e, i) => ({
    id: `w${week}d${day}-${i}`,
    name: e.n,
    category: e.c,
    type: e.t || 'Base',
    series: e.s,
    reps: e.r,
    weight: e.w || 'Auto',
    xp: 150,
    status: 'pending',
    image: '',
    isDropSet: e.ds,
    tempo: e.tm
  }))
});

export const WORKOUT_PLAN: Record<number, Record<number, any>> = {
  1: {
    1: createDay(1, 1, 'Pecho / Tríceps', [
      { n: 'Press banca barra', c: 'Pecho', s: 4, r: '10' },
      { n: 'Press inclinado mancuernas', c: 'Pecho', s: 4, r: '10' },
      { n: 'Aperturas en banco plano', c: 'Pecho', s: 3, r: '12' },
      { n: 'Fondos en paralelas', c: 'Brazo', s: 3, r: '8-10' },
      { n: 'Jalón tríceps cuerda', c: 'Brazo', s: 3, r: '12' },
      { n: 'Extensión overhead', c: 'Brazo', s: 3, r: '12' }
    ]),
    2: createDay(1, 2, 'Espalda / Bíceps', [
      { n: 'Dominadas', c: 'Espalda', s: 4, r: '8' },
      { n: 'Remo con barra', c: 'Espalda', s: 4, r: '10' },
      { n: 'Jalón al pecho', c: 'Espalda', s: 3, r: '12' },
      { n: 'Remo polea baja', c: 'Espalda', s: 3, r: '12' },
      { n: 'Curl barra', c: 'Brazo', s: 3, r: '10' },
      { n: 'Curl martillo', c: 'Brazo', s: 3, r: '12' }
    ]),
    3: createDay(1, 3, 'Pierna (Cuádriceps)', [
      { n: 'Sentadilla barra', c: 'Pierna', s: 4, r: '8-10' },
      { n: 'Prensa 45°', c: 'Pierna', s: 4, r: '12' },
      { n: 'Extensión cuádriceps', c: 'Pierna', s: 3, r: '12' },
      { n: 'Zancadas caminando', c: 'Pierna', s: 3, r: '10/p' },
      { n: 'Hack squat', c: 'Pierna', s: 3, r: '10' },
      { n: 'Gemelo de pie', c: 'Pierna', s: 4, r: '15' }
    ]),
    4: createDay(1, 4, 'Hombro / Core', [
      { n: 'Press militar barra', c: 'Hombro', s: 4, r: '10' },
      { n: 'Elevaciones laterales', c: 'Hombro', s: 4, r: '12' },
      { n: 'Elevaciones frontales', c: 'Hombro', s: 3, r: '12' },
      { n: 'Pájaros', c: 'Hombro', s: 3, r: '12' },
      { n: 'Crunch abdominal', c: 'Core', s: 4, r: '15' },
      { n: 'Plancha', c: 'Core', s: 3, r: '40s' }
    ]),
    5: createDay(1, 5, 'Pecho / Espalda (Volumen)', [
      { n: 'Press inclinado barra', c: 'Pecho', s: 4, r: '10' },
      { n: 'Remo mancuerna', c: 'Espalda', s: 4, r: '10' },
      { n: 'Press plano mancuernas', c: 'Pecho', s: 3, r: '12' },
      { n: 'Jalón agarre estrecho', c: 'Espalda', s: 3, r: '12' },
      { n: 'Cruce poleas', c: 'Pecho', s: 3, r: '15' },
      { n: 'Remo cable', c: 'Espalda', s: 3, r: '12' }
    ]),
    6: createDay(1, 6, 'Pierna (Glúteo/Femoral)', [
      { n: 'Peso muerto rumano', c: 'Pierna', s: 4, r: '10' },
      { n: 'Hip thrust', c: 'Pierna', s: 4, r: '12' },
      { n: 'Curl femoral tumbado', c: 'Pierna', s: 3, r: '12' },
      { n: 'Sentadilla sumo', c: 'Pierna', s: 3, r: '10' },
      { n: 'Abductores máquina', c: 'Pierna', s: 3, r: '15' },
      { n: 'Gemelo sentado', c: 'Pierna', s: 4, r: '15' }
    ]),
    7: { title: 'Descanso', exercises: [] }
  },
  2: {
    1: createDay(2, 1, 'Pecho / Tríceps', [
      { n: 'Press banca', c: 'Pecho', s: 5, r: '10' },
      { n: 'Inclinado mancuernas', c: 'Pecho', s: 4, r: '10' },
      { n: 'Aperturas', c: 'Pecho', s: 3, r: '12' },
      { n: 'Fondos', c: 'Brazo', s: 4, r: '8-10' },
      { n: 'Jalón tríceps', c: 'Brazo', s: 3, r: '12' },
      { n: 'Extensión overhead', c: 'Brazo', s: 3, r: '12' }
    ]),
    2: createDay(2, 2, 'Espalda / Bíceps', [
      { n: 'Dominadas', c: 'Espalda', s: 5, r: '8' },
      { n: 'Remo barra', c: 'Espalda', s: 5, r: '10' },
      { n: 'Jalón pecho', c: 'Espalda', s: 4, r: '12' },
      { n: 'Remo polea', c: 'Espalda', s: 3, r: '12' },
      { n: 'Curl barra', c: 'Brazo', s: 4, r: '10' },
      { n: 'Curl martillo', c: 'Brazo', s: 3, r: '12' }
    ]),
    3: createDay(2, 3, 'Pierna (Cuádriceps)', [
      { n: 'Sentadilla', c: 'Pierna', s: 5, r: '8' },
      { n: 'Prensa', c: 'Pierna', s: 5, r: '12' },
      { n: 'Extensión', c: 'Pierna', s: 4, r: '12' },
      { n: 'Zancadas', c: 'Pierna', s: 3, r: '12' },
      { n: 'Hack squat', c: 'Pierna', s: 4, r: '10' },
      { n: 'Gemelo', c: 'Pierna', s: 4, r: '15' }
    ]),
    4: createDay(2, 4, 'Hombro / Core', [
      { n: 'Press militar', c: 'Hombro', s: 5, r: '10' },
      { n: 'Laterales', c: 'Hombro', s: 4, r: '12' },
      { n: 'Frontales', c: 'Hombro', s: 3, r: '12' },
      { n: 'Pájaros', c: 'Hombro', s: 4, r: '12' },
      { n: 'Crunch', c: 'Core', s: 4, r: '15' },
      { n: 'Plancha', c: 'Core', s: 3, r: '50s' }
    ]),
    5: createDay(2, 5, 'Pecho / Espalda', [
      { n: 'Inclinado barra', c: 'Pecho', s: 5, r: '10' },
      { n: 'Remo mancuerna', c: 'Espalda', s: 5, r: '10' },
      { n: 'Press plano', c: 'Pecho', s: 4, r: '12' },
      { n: 'Jalón estrecho', c: 'Espalda', s: 4, r: '12' },
      { n: 'Cruce poleas', c: 'Pecho', s: 3, r: '15' },
      { n: 'Remo cable', c: 'Espalda', s: 4, r: '12' }
    ]),
    6: createDay(2, 6, 'Pierna (Glúteo)', [
      { n: 'Rumano', c: 'Pierna', s: 5, r: '10' },
      { n: 'Hip thrust', c: 'Pierna', s: 5, r: '12' },
      { n: 'Curl femoral', c: 'Pierna', s: 4, r: '12' },
      { n: 'Sumo squat', c: 'Pierna', s: 4, r: '10' },
      { n: 'Abductores', c: 'Pierna', s: 4, r: '15' },
      { n: 'Gemelo sentado', c: 'Pierna', s: 4, r: '15' }
    ]),
    7: { title: 'Descanso', exercises: [] }
  },
  3: {
    1: createDay(3, 1, 'Pecho / Tríceps', [
      { n: 'Press banca', c: 'Pecho', s: 5, r: '6-8' },
      { n: 'Inclinado mancuernas', c: 'Pecho', s: 4, r: '8' },
      { n: 'Aperturas', c: 'Pecho', s: 3, r: '10' },
      { n: 'Fondos', c: 'Brazo', s: 4, r: '6-8' },
      { n: 'Jalón tríceps', c: 'Brazo', s: 3, r: '10' },
      { n: 'Extensión overhead', c: 'Brazo', s: 3, r: '10' }
    ]),
    2: createDay(3, 2, 'Espalda / Bíceps', [
      { n: 'Dominadas lastradas', c: 'Espalda', s: 5, r: '6-8' },
      { n: 'Remo barra', c: 'Espalda', s: 5, r: '6-8' },
      { n: 'Jalón pecho', c: 'Espalda', s: 4, r: '10' },
      { n: 'Remo polea', c: 'Espalda', s: 3, r: '10' },
      { n: 'Curl barra', c: 'Brazo', s: 4, r: '8' },
      { n: 'Curl martillo', c: 'Brazo', s: 3, r: '10' }
    ]),
    3: createDay(3, 3, 'Pierna (Cuádriceps)', [
      { n: 'Sentadilla', c: 'Pierna', s: 5, r: '6-8' },
      { n: 'Prensa', c: 'Pierna', s: 5, r: '10' },
      { n: 'Extensión', c: 'Pierna', s: 4, r: '10' },
      { n: 'Zancadas', c: 'Pierna', s: 3, r: '10' },
      { n: 'Hack squat', c: 'Pierna', s: 4, r: '8' },
      { n: 'Gemelo', c: 'Pierna', s: 5, r: '12' }
    ]),
    4: createDay(3, 4, 'Hombro / Core', [
      { n: 'Press militar', c: 'Hombro', s: 5, r: '6-8' },
      { n: 'Laterales', c: 'Hombro', s: 4, r: '10' },
      { n: 'Frontales', c: 'Hombro', s: 3, r: '10' },
      { n: 'Pájaros', c: 'Hombro', s: 4, r: '10' },
      { n: 'Crunch peso', c: 'Core', s: 4, r: '12' },
      { n: 'Plancha', c: 'Core', s: 3, r: '60s' }
    ]),
    5: createDay(3, 5, 'Pecho / Espalda', [
      { n: 'Inclinado barra', c: 'Pecho', s: 5, r: '6-8' },
      { n: 'Remo mancuerna', c: 'Espalda', s: 5, r: '8' },
      { n: 'Press plano', c: 'Pecho', s: 4, r: '10' },
      { n: 'Jalón estrecho', c: 'Espalda', s: 4, r: '10' },
      { n: 'Cruce poleas', c: 'Pecho', s: 3, r: '12' },
      { n: 'Remo cable', c: 'Espalda', s: 4, r: '10' }
    ]),
    6: createDay(3, 6, 'Pierna (Glúteo)', [
      { n: 'Rumano', c: 'Pierna', s: 5, r: '6-8' },
      { n: 'Hip thrust', c: 'Pierna', s: 5, r: '10' },
      { n: 'Curl femoral', c: 'Pierna', s: 4, r: '10' },
      { n: 'Sumo', c: 'Pierna', s: 4, r: '8' },
      { n: 'Abductores', c: 'Pierna', s: 4, r: '12' },
      { n: 'Gemelo', c: 'Pierna', s: 5, r: '12' }
    ]),
    7: { title: 'Descanso', exercises: [] }
  },
  4: {
    1: createDay(4, 1, 'Pecho / Tríceps (Max H)', [
      { n: 'Press banca', c: 'Pecho', s: 5, r: '8', ds: true, tm: '3s' },
      { n: 'Inclinado mancuernas', c: 'Pecho', s: 4, r: '10', tm: '3s' },
      { n: 'Aperturas', c: 'Pecho', s: 4, r: '12', tm: '3s' },
      { n: 'Fondos', c: 'Brazo', s: 4, r: '8', tm: '3s' },
      { n: 'Jalón tríceps', c: 'Brazo', s: 4, r: '12', ds: true, tm: '3s' },
      { n: 'Extensión overhead', c: 'Brazo', s: 3, r: '12', tm: '3s' }
    ]),
    2: createDay(4, 2, 'Espalda / Bíceps (Max H)', [
      { n: 'Dominadas', c: 'Espalda', s: 5, r: '8', tm: '3s' },
      { n: 'Remo barra', c: 'Espalda', s: 5, r: '10', tm: '3s' },
      { n: 'Jalón pecho', c: 'Espalda', s: 4, r: '12', tm: '3s' },
      { n: 'Remo polea', c: 'Espalda', s: 4, r: '12', tm: '3s' },
      { n: 'Curl barra', c: 'Brazo', s: 4, r: '10', ds: true, tm: '3s' },
      { n: 'Curl martillo', c: 'Brazo', s: 3, r: '12', tm: '3s' }
    ]),
    3: createDay(4, 3, 'Pierna (Cuádriceps) (Max H)', [
      { n: 'Sentadilla', c: 'Pierna', s: 5, r: '8', tm: '3s' },
      { n: 'Prensa', c: 'Pierna', s: 5, r: '12', tm: '3s' },
      { n: 'Extensión', c: 'Pierna', s: 4, r: '15', ds: true, tm: '3s' },
      { n: 'Zancadas', c: 'Pierna', s: 4, r: '12', tm: '3s' },
      { n: 'Hack squat', c: 'Pierna', s: 4, r: '10', tm: '3s' },
      { n: 'Gemelo de pie', c: 'Pierna', s: 5, r: '15', tm: '3s' }
    ]),
    4: createDay(4, 4, 'Hombro / Core (Max H)', [
      { n: 'Press militar', c: 'Hombro', s: 5, r: '8', tm: '3s' },
      { n: 'Elevaciones laterales', c: 'Hombro', s: 5, r: '12', ds: true, tm: '3s' },
      { n: 'Elevaciones frontales', c: 'Hombro', s: 3, r: '12', tm: '3s' },
      { n: 'Pájaros', c: 'Hombro', s: 4, r: '12', tm: '3s' },
      { n: 'Crunch abs', c: 'Core', s: 4, r: '15', tm: '3s' },
      { n: 'Plancha', c: 'Core', s: 3, r: '60s' }
    ]),
    5: createDay(4, 5, 'Pecho / Espalda (Max H)', [
      { n: 'Inclinado barra', c: 'Pecho', s: 5, r: '8', tm: '3s' },
      { n: 'Remo mancuerna', c: 'Espalda', s: 5, r: '10', tm: '3s' },
      { n: 'Press plano mancuernas', c: 'Pecho', s: 4, r: '12', tm: '3s' },
      { n: 'Jalón estrecho', c: 'Espalda', s: 4, r: '12', tm: '3s' },
      { n: 'Cruce poleas', c: 'Pecho', s: 4, r: '15', ds: true, tm: '3s' },
      { n: 'Remo cable', c: 'Espalda', s: 4, r: '12', tm: '3s' }
    ]),
    6: createDay(4, 6, 'Pierna (Glúteo/Fem)', [
      { n: 'Rumano', c: 'Pierna', s: 5, r: '8', tm: '3s' },
      { n: 'Hip thrust', c: 'Pierna', s: 5, r: '12', ds: true, tm: '3s' },
      { n: 'Curl femoral', c: 'Pierna', s: 4, r: '12', tm: '3s' },
      { n: 'Sumo squat', c: 'Pierna', s: 4, r: '10', tm: '3s' },
      { n: 'Abductores', c: 'Pierna', s: 4, r: '15', tm: '3s' },
      { n: 'Gemelo sentado', c: 'Pierna', s: 5, r: '15', tm: '3s' }
    ]),
    7: { title: 'Descanso', exercises: [] }
  }
};

export const MOCK_MISSIONS: Mission[] = [
  { id: 'm1', title: 'Entrenamiento del Día', type: 'EJERCICIO', xp: 200, completed: false },
  { id: 'm2', title: 'Macro Meta: Proteína', type: 'COMIDA', xp: 100, completed: false }
];
