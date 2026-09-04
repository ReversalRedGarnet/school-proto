/* ============================================================================
 * SchoolFinder SI — MOCK DATA
 * ----------------------------------------------------------------------------
 * !!! EVERY SCHOOL BELOW IS FICTIONAL. !!!
 *
 * Names, contact details, fees, subjects, coordinates and "last verified"
 * dates are invented for demonstration purposes only. Place names, provinces
 * and approximate coordinates are real Solomon Islands locations so the map
 * looks plausible, but no school record here corresponds to a real school.
 *
 * This file stands in for what would eventually be an API response
 * (e.g. GET /api/schools). Keep the shape stable; swap the source, not the
 * consumers.
 * ==========================================================================*/

window.SF = window.SF || {};

/* FILTERABLE subjects. Deliberately short: IT is the only subject offering
 * confirmed as consistent across schools, so it is the only one the subject
 * filter exposes. Each school record still carries a fuller `subjects` list
 * for display in its profile, but those are demo values and must not be
 * presented as a searchable, confirmed national dataset until they are. */
SF.SUBJECT_GROUPS = [
  { group: 'Confirmed offerings', subjects: ['IT'] }
];

/* Filter vocabularies. In a real system these would come from the API too. */
SF.PROVINCES = [
  'Honiara', 'Guadalcanal', 'Malaita', 'Western', 'Isabel',
  'Makira-Ulawa', 'Temotu', 'Choiseul', 'Central', 'Rennell and Bellona'
];

SF.DENOMINATIONS = ['SDA', 'Anglican', 'SSEC', 'Catholic', 'Other'];

/* `educationLevels` on each record keeps these four broad values. The school
 * level *filter* replaces the flat 'Secondary' bucket with the four national
 * exam form groupings below — see SF.SCHOOL_LEVEL_OPTIONS. */
SF.EDUCATION_LEVELS = ['Early Childhood', 'Primary', 'Secondary', 'Tertiary/Vocational'];

/* Secondary is grouped the way the national exams group it.
 * Form 1-3 = Year 7-9, Form 4-5 = Year 10-11, Form 6 = Year 12, Form 7 = Year 13. */
SF.FORM_GROUPS = ['Form 1-3', 'Form 4-5', 'Form 6', 'Form 7'];

/* Streams are only meaningful at Form 6 and Form 7. */
SF.FORM6_STREAMS = ['Science', 'Arts'];
SF.FORM7_STREAMS = ['Foundation Arts', 'Foundation Science', 'Foundation Business'];

/* What the "School level" filter offers: the non-secondary levels as they are,
 * with the four form groupings standing in for 'Secondary'. `kind` tells the
 * predicate which field on the school to test. */
SF.SCHOOL_LEVEL_OPTIONS = [
  { value: 'Early Childhood',     kind: 'level' },
  { value: 'Primary',             kind: 'level' },
  { value: 'Form 1-3',            kind: 'form'  },
  { value: 'Form 4-5',            kind: 'form'  },
  { value: 'Form 6',              kind: 'form'  },
  { value: 'Form 7',              kind: 'form'  },
  { value: 'Tertiary/Vocational', kind: 'level' }
];

SF.BOARDING_OPTIONS = ['Day', 'Boarding', 'Both'];

/* Plain-language labels for the general public. The stored values above are
   what a real API would return and never change; these are display only. */
SF.DISPLAY_LABELS = {
  'Tertiary/Vocational': 'Vocational & college',
  'Form 1-3': 'Form 1\u20133',
  'Form 4-5': 'Form 4\u20135',
  'Science': 'Science stream',
  'Arts': 'Arts stream'
};

SF.label = function (value) {
  return SF.DISPLAY_LABELS[value] || value;
};

/* --- The fictional dataset ------------------------------------------------ */
SF.SCHOOLS = [
  /* ---- Honiara cluster (dense, so the default map view isn't sparse) ---- */
  {
    id: 'sch_001',
    name: 'Panatina Community High School',
    description: 'A large day school on the eastern edge of Honiara, known for its IT lab and strong senior science stream.',
    denomination: 'Other',
    province: 'Honiara', island: 'Guadalcanal', town: 'Panatina, Honiara',
    latitude: -9.4306, longitude: 160.0184,
    phone: '+677 21140', email: 'admin@panatina.edu.sb', website: 'https://example.com/panatina',
    educationLevels: ['Secondary'], yearLevels: { min: 7, max: 13 },
    formGroups: ['Form 1-3', 'Form 4-5', 'Form 6', 'Form 7'],
    streams: { form6: ['Science', 'Arts'], form7: ['Foundation Science', 'Foundation Business'] },
    subjects: ['English', 'Mathematics', 'Science', 'Biology', 'Chemistry', 'Physics', 'IT', 'Business Studies', 'Social Studies', 'Physical Education'],
    feeMin: 1200, feeMax: 2400, currency: 'SBD',
    boarding: 'Day', schoolType: 'Government',
    lastVerified: '2026-08-12', image: null
  },
  {
    id: 'sch_002',
    name: 'St. Nicholas Anglican School',
    description: 'One of the oldest church schools in the capital, offering a combined primary and secondary programme with a long choral tradition.',
    denomination: 'Anglican',
    province: 'Honiara', island: 'Guadalcanal', town: 'Vavaya Ridge, Honiara',
    latitude: -9.4338, longitude: 159.9662,
    phone: '+677 21073', email: 'office@stnicholas.edu.sb', website: 'https://example.com/st-nicholas',
    educationLevels: ['Primary', 'Secondary'], yearLevels: { min: 1, max: 12 },
    formGroups: ['Form 1-3', 'Form 4-5', 'Form 6'],
    streams: { form6: ['Arts'], form7: [] },
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Christian Education', 'Music', 'Visual Arts', 'English Literature', 'Physical Education', 'IT'],
    feeMin: 1800, feeMax: 3600, currency: 'SBD',
    boarding: 'Day', schoolType: 'Church',
    lastVerified: '2026-07-30', image: null
  },
  {
    id: 'sch_003',
    name: 'Mataniko Primary School',
    description: 'A busy neighbourhood primary school beside the Mataniko River serving central Honiara families.',
    denomination: 'Other',
    province: 'Honiara', island: 'Guadalcanal', town: 'Mataniko, Honiara',
    latitude: -9.4297, longitude: 159.9587,
    phone: '+677 21988', email: 'hello@mataniko.edu.sb', website: 'https://example.com/mataniko',
    educationLevels: ['Early Childhood', 'Primary'], yearLevels: { min: 1, max: 6 },
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Vernacular Language', 'Physical Education', 'Visual Arts'],
    feeMin: 0, feeMax: 450, currency: 'SBD',
    boarding: 'Day', schoolType: 'Government',
    lastVerified: '2026-08-02', image: null
  },
  {
    id: 'sch_004',
    name: 'Holy Cross Catholic College',
    description: 'A selective Catholic secondary college with a well-regarded commerce stream and an active student council.',
    denomination: 'Catholic',
    province: 'Honiara', island: 'Guadalcanal', town: 'Kola’a Ridge, Honiara',
    latitude: -9.4392, longitude: 159.9821,
    phone: '+677 22415', email: 'enquiries@holycross.edu.sb', website: 'https://example.com/holy-cross',
    educationLevels: ['Secondary'], yearLevels: { min: 7, max: 13 },
    formGroups: ['Form 1-3', 'Form 4-5', 'Form 6', 'Form 7'],
    streams: { form6: ['Arts', 'Science'], form7: ['Foundation Arts', 'Foundation Business'] },
    subjects: ['English', 'Mathematics', 'Science', 'Christian Education', 'Accounting', 'Economics', 'Business Studies', 'IT', 'English Literature'],
    feeMin: 2600, feeMax: 4800, currency: 'SBD',
    boarding: 'Both', schoolType: 'Church',
    lastVerified: '2026-08-19', image: null
  },
  {
    id: 'sch_005',
    name: 'Betikama Adventist College',
    description: 'A large SDA campus east of the capital combining academic secondary study with carpentry, mechanics and agriculture workshops.',
    denomination: 'SDA',
    province: 'Honiara', island: 'Guadalcanal', town: 'Betikama, Honiara',
    latitude: -9.4249, longitude: 160.0361,
    phone: '+677 30122', email: 'registrar@betikama.edu.sb', website: 'https://example.com/betikama',
    educationLevels: ['Secondary', 'Tertiary/Vocational'], yearLevels: { min: 7, max: 12 },
    formGroups: ['Form 1-3', 'Form 4-5', 'Form 6'],
    streams: { form6: ['Science', 'Arts'], form7: [] },
    subjects: ['English', 'Mathematics', 'Science', 'Christian Education', 'Agriculture', 'Carpentry & Joinery', 'Mechanics', 'Design & Technology', 'Technical Drawing', 'Home Economics', 'IT'],
    feeMin: 3200, feeMax: 6400, currency: 'SBD',
    boarding: 'Boarding', schoolType: 'Church',
    lastVerified: '2026-06-28', image: null
  },
  {
    id: 'sch_006',
    name: 'Naha Early Learning Centre',
    description: 'A small early childhood centre in east Honiara focused on play-based learning in Pijin and English.',
    denomination: 'Other',
    province: 'Honiara', island: 'Guadalcanal', town: 'Naha, Honiara',
    latitude: -9.4383, longitude: 160.0009,
    phone: '+677 25604', email: 'naha.elc@example.edu.sb', website: 'https://example.com/naha-elc',
    educationLevels: ['Early Childhood'], yearLevels: { min: 1, max: 1 },
    subjects: ['English', 'Vernacular Language', 'Visual Arts', 'Music', 'Physical Education'],
    feeMin: 300, feeMax: 900, currency: 'SBD',
    boarding: 'Day', schoolType: 'Community',
    lastVerified: '2026-05-14', image: null
  },
  {
    id: 'sch_007',
    name: 'Honiara Technical Institute',
    description: 'Post-secondary trade and vocational training with evening classes for working students.',
    denomination: 'Other',
    province: 'Honiara', island: 'Guadalcanal', town: 'Ranadi, Honiara',
    latitude: -9.4451, longitude: 160.0102,
    phone: '+677 24700', email: 'info@hti.edu.sb', website: 'https://example.com/hti',
    educationLevels: ['Tertiary/Vocational'], yearLevels: { min: 12, max: 13 },
    subjects: ['IT', 'Mechanics', 'Carpentry & Joinery', 'Technical Drawing', 'Business Studies', 'Accounting', 'Tourism & Hospitality'],
    feeMin: 4200, feeMax: 8500, currency: 'SBD',
    boarding: 'Day', schoolType: 'Government',
    lastVerified: '2026-08-25', image: null
  },
  {
    id: 'sch_008',
    name: 'Kukum Christian Academy',
    description: 'An independent primary school with small class sizes and a strong reading programme.',
    denomination: 'SSEC',
    province: 'Honiara', island: 'Guadalcanal', town: 'Kukum, Honiara',
    latitude: -9.4275, longitude: 159.9915,
    phone: '+677 23311', email: 'admin@kukumacademy.edu.sb', website: 'https://example.com/kukum-academy',
    educationLevels: ['Early Childhood', 'Primary'], yearLevels: { min: 1, max: 6 },
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Christian Education', 'IT', 'Music'],
    feeMin: 2200, feeMax: 3400, currency: 'SBD',
    boarding: 'Day', schoolType: 'Private',
    lastVerified: '2026-07-11', image: null
  },
  {
    id: 'sch_009',
    name: 'Rove Girls Secondary School',
    description: 'A girls-only secondary school in west Honiara with a nursing and health science pathway.',
    denomination: 'Other',
    province: 'Honiara', island: 'Guadalcanal', town: 'Rove, Honiara',
    latitude: -9.4319, longitude: 159.9425,
    phone: '+677 21562', email: 'office@rovegirls.edu.sb', website: 'https://example.com/rove-girls',
    educationLevels: ['Secondary'], yearLevels: { min: 7, max: 12 },
    formGroups: ['Form 1-3', 'Form 4-5', 'Form 6'],
    streams: { form6: ['Science'], form7: [] },
    subjects: ['English', 'Mathematics', 'Science', 'Biology', 'Health Science', 'Nursing Studies', 'Home Economics', 'Social Studies', 'Christian Education', 'IT'],
    feeMin: 1900, feeMax: 3300, currency: 'SBD',
    boarding: 'Both', schoolType: 'Church',
    lastVerified: '2026-08-08', image: null
  },

  /* ---- Guadalcanal province (outside the capital) ---- */
  {
    id: 'sch_010',
    name: 'Tetere Rural Training Centre',
    description: 'A rural training centre on the Guadalcanal plains teaching agriculture, mechanics and small-business skills.',
    denomination: 'Catholic',
    province: 'Guadalcanal', island: 'Guadalcanal', town: 'Tetere',
    latitude: -9.4712, longitude: 160.2043,
    phone: '+677 36420', email: 'tetere.rtc@example.edu.sb', website: 'https://example.com/tetere-rtc',
    educationLevels: ['Tertiary/Vocational'], yearLevels: { min: 10, max: 13 },
    subjects: ['Agriculture', 'Mechanics', 'Carpentry & Joinery', 'Business Studies', 'Home Economics', 'Christian Education'],
    feeMin: 2800, feeMax: 4600, currency: 'SBD',
    boarding: 'Boarding', schoolType: 'Church',
    lastVerified: '2026-04-22', image: null
  },
  {
    id: 'sch_011',
    name: 'Aola Bay Provincial Secondary School',
    description: 'A coastal boarding school on north Guadalcanal serving villages along the Aola coast.',
    denomination: 'Anglican',
    province: 'Guadalcanal', island: 'Guadalcanal', town: 'Aola',
    latitude: -9.5261, longitude: 160.4802,
    phone: '+677 36118', email: 'aolabay@example.edu.sb', website: 'https://example.com/aola-bay',
    educationLevels: ['Secondary'], yearLevels: { min: 7, max: 11 },
    formGroups: ['Form 1-3', 'Form 4-5'],
    streams: { form6: [], form7: [] },
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Agriculture', 'Christian Education', 'Physical Education', 'IT'],
    feeMin: 1500, feeMax: 2900, currency: 'SBD',
    boarding: 'Boarding', schoolType: 'Church',
    lastVerified: '2026-03-19', image: null
  },
  {
    id: 'sch_012',
    name: 'Visale Primary School',
    description: 'A village primary school on the north-west Guadalcanal coast with a community-run library.',
    denomination: 'Catholic',
    province: 'Guadalcanal', island: 'Guadalcanal', town: 'Visale',
    latitude: -9.2624, longitude: 159.7891,
    phone: '+677 36055', email: 'visale.ps@example.edu.sb', website: 'https://example.com/visale',
    educationLevels: ['Primary'], yearLevels: { min: 1, max: 6 },
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Vernacular Language', 'Christian Education'],
    feeMin: 0, feeMax: 380, currency: 'SBD',
    boarding: 'Day', schoolType: 'Church',
    lastVerified: '2026-02-27', image: null
  },
  {
    id: 'sch_013',
    name: 'Avu Avu Community School',
    description: 'A remote weather-coast school reached mostly by boat, serving south Guadalcanal communities.',
    denomination: 'SSEC',
    province: 'Guadalcanal', island: 'Guadalcanal', town: 'Avu Avu',
    latitude: -9.8633, longitude: 160.3979,
    phone: '+677 36901', email: 'avuavu@example.edu.sb', website: 'https://example.com/avu-avu',
    educationLevels: ['Primary', 'Secondary'], yearLevels: { min: 1, max: 9 },
    formGroups: ['Form 1-3'],
    streams: { form6: [], form7: [] },
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Agriculture', 'Fisheries & Marine Studies', 'Christian Education'],
    feeMin: 200, feeMax: 1100, currency: 'SBD',
    boarding: 'Both', schoolType: 'Community',
    lastVerified: '2026-01-30', image: null
  },

  /* ---- Malaita ---- */
  {
    id: 'sch_014',
    name: 'Auki Provincial Secondary School',
    description: 'The largest secondary school in Malaita Province, drawing students from across the island.',
    denomination: 'Other',
    province: 'Malaita', island: 'Malaita', town: 'Auki',
    latitude: -8.7683, longitude: 160.7025,
    phone: '+677 40213', email: 'auki.pss@example.edu.sb', website: 'https://example.com/auki-pss',
    educationLevels: ['Secondary'], yearLevels: { min: 7, max: 13 },
    formGroups: ['Form 1-3', 'Form 4-5', 'Form 6', 'Form 7'],
    streams: { form6: ['Science', 'Arts'], form7: ['Foundation Arts', 'Foundation Science'] },
    subjects: ['English', 'Mathematics', 'Science', 'Biology', 'Chemistry', 'Physics', 'Social Studies', 'IT', 'Business Studies', 'Physical Education'],
    feeMin: 1400, feeMax: 2700, currency: 'SBD',
    boarding: 'Both', schoolType: 'Government',
    lastVerified: '2026-07-16', image: null
  },
  {
    id: 'sch_015',
    name: 'Malu’u Anglican High School',
    description: 'A north Malaita boarding school with a strong record in national exams and a working school garden.',
    denomination: 'Anglican',
    province: 'Malaita', island: 'Malaita', town: 'Malu’u',
    latitude: -8.3597, longitude: 160.7118,
    phone: '+677 40877', email: 'maluu.hs@example.edu.sb', website: 'https://example.com/maluu',
    educationLevels: ['Secondary'], yearLevels: { min: 7, max: 12 },
    formGroups: ['Form 1-3', 'Form 4-5', 'Form 6'],
    streams: { form6: ['Arts'], form7: [] },
    subjects: ['English', 'Mathematics', 'Science', 'Agriculture', 'Christian Education', 'Social Studies', 'Home Economics', 'Music', 'IT'],
    feeMin: 1700, feeMax: 3100, currency: 'SBD',
    boarding: 'Boarding', schoolType: 'Church',
    lastVerified: '2026-05-03', image: null
  },
  {
    id: 'sch_016',
    name: 'Atori Community Primary School',
    description: 'A small east Malaita primary school run in partnership with the local village committee.',
    denomination: 'SSEC',
    province: 'Malaita', island: 'Malaita', town: 'Atori',
    latitude: -8.9756, longitude: 161.0281,
    phone: '+677 40509', email: 'atori.ps@example.edu.sb', website: 'https://example.com/atori',
    educationLevels: ['Early Childhood', 'Primary'], yearLevels: { min: 1, max: 6 },
    subjects: ['English', 'Mathematics', 'Science', 'Vernacular Language', 'Christian Education', 'Cultural Studies'],
    feeMin: 0, feeMax: 320, currency: 'SBD',
    boarding: 'Day', schoolType: 'Community',
    lastVerified: '2026-06-09', image: null
  },
  {
    id: 'sch_017',
    name: 'Afio Rural Training Centre',
    description: 'A south Malaita centre teaching marine studies, boat maintenance and small-enterprise skills.',
    denomination: 'Other',
    province: 'Malaita', island: 'Malaita', town: 'Afio',
    latitude: -9.6104, longitude: 161.4188,
    phone: '+677 40644', email: 'afio.rtc@example.edu.sb', website: 'https://example.com/afio-rtc',
    educationLevels: ['Tertiary/Vocational'], yearLevels: { min: 10, max: 13 },
    subjects: ['Fisheries & Marine Studies', 'Mechanics', 'Carpentry & Joinery', 'Business Studies', 'Agriculture'],
    feeMin: 2400, feeMax: 4100, currency: 'SBD',
    boarding: 'Boarding', schoolType: 'Church',
    lastVerified: '2026-04-01', image: null
  },

  /* ---- Western Province ---- */
  {
    id: 'sch_018',
    name: 'Gizo Central High School',
    description: 'The main secondary school of the Western Province capital, with a marine science elective using the surrounding lagoon.',
    denomination: 'Other',
    province: 'Western', island: 'Ghizo', town: 'Gizo',
    latitude: -8.1032, longitude: 156.8419,
    phone: '+677 60188', email: 'gizo.chs@example.edu.sb', website: 'https://example.com/gizo-chs',
    educationLevels: ['Secondary'], yearLevels: { min: 7, max: 13 },
    formGroups: ['Form 1-3', 'Form 4-5', 'Form 6', 'Form 7'],
    streams: { form6: ['Science', 'Arts'], form7: ['Foundation Science'] },
    subjects: ['English', 'Mathematics', 'Science', 'Biology', 'Environmental Science', 'Fisheries & Marine Studies', 'IT', 'Tourism & Hospitality', 'Social Studies'],
    feeMin: 1600, feeMax: 3000, currency: 'SBD',
    boarding: 'Both', schoolType: 'Government',
    lastVerified: '2026-08-05', image: null
  },
  {
    id: 'sch_019',
    name: 'Munda United Church College',
    description: 'A New Georgia boarding college with sciences, teaching preparation and an early childhood training stream.',
    denomination: 'Other',
    province: 'Western', island: 'New Georgia', town: 'Munda',
    latitude: -8.3277, longitude: 157.2634,
    phone: '+677 62240', email: 'munda.college@example.edu.sb', website: 'https://example.com/munda-college',
    educationLevels: ['Secondary', 'Tertiary/Vocational'], yearLevels: { min: 7, max: 12 },
    formGroups: ['Form 1-3', 'Form 4-5', 'Form 6'],
    streams: { form6: ['Science', 'Arts'], form7: [] },
    subjects: ['English', 'Mathematics', 'Science', 'Chemistry', 'Physics', 'Christian Education', 'Early Childhood Teaching', 'Social Studies', 'IT'],
    feeMin: 2900, feeMax: 5200, currency: 'SBD',
    boarding: 'Boarding', schoolType: 'Church',
    lastVerified: '2026-07-22', image: null
  },
  {
    id: 'sch_020',
    name: 'Noro Primary School',
    description: 'A primary school in the fishing port of Noro serving cannery and shipping families.',
    denomination: 'Other',
    province: 'Western', island: 'New Georgia', town: 'Noro',
    latitude: -8.2262, longitude: 157.2042,
    phone: '+677 61355', email: 'noro.ps@example.edu.sb', website: 'https://example.com/noro',
    educationLevels: ['Early Childhood', 'Primary'], yearLevels: { min: 1, max: 6 },
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Physical Education', 'Visual Arts'],
    feeMin: 0, feeMax: 500, currency: 'SBD',
    boarding: 'Day', schoolType: 'Government',
    lastVerified: '2026-06-18', image: null
  },
  {
    id: 'sch_021',
    name: 'Seghe Marine & Tourism Academy',
    description: 'A small specialist academy at Marovo Lagoon training dive guides, boat operators and eco-lodge staff.',
    denomination: 'Other',
    province: 'Western', island: 'Vangunu', town: 'Seghe',
    latitude: -8.5779, longitude: 157.8762,
    phone: '+677 62901', email: 'seghe.academy@example.edu.sb', website: 'https://example.com/seghe-academy',
    educationLevels: ['Tertiary/Vocational'], yearLevels: { min: 11, max: 13 },
    subjects: ['Fisheries & Marine Studies', 'Tourism & Hospitality', 'Environmental Science', 'English', 'Business Studies', 'IT'],
    feeMin: 3800, feeMax: 7200, currency: 'SBD',
    boarding: 'Boarding', schoolType: 'Private',
    lastVerified: '2026-08-21', image: null
  },

  /* ---- Isabel ---- */
  {
    id: 'sch_022',
    name: 'Buala Anglican Secondary School',
    description: 'The provincial secondary school of Isabel, set below the Maringe hills with a large boarding intake.',
    denomination: 'Anglican',
    province: 'Isabel', island: 'Santa Isabel', town: 'Buala',
    latitude: -8.1447, longitude: 159.5906,
    phone: '+677 35110', email: 'buala.ass@example.edu.sb', website: 'https://example.com/buala',
    educationLevels: ['Secondary'], yearLevels: { min: 7, max: 12 },
    formGroups: ['Form 1-3', 'Form 4-5', 'Form 6'],
    streams: { form6: ['Arts'], form7: [] },
    subjects: ['English', 'Mathematics', 'Science', 'Biology', 'Social Studies', 'Christian Education', 'Agriculture', 'Music', 'IT'],
    feeMin: 1500, feeMax: 2800, currency: 'SBD',
    boarding: 'Boarding', schoolType: 'Church',
    lastVerified: '2026-05-27', image: null
  },
  {
    id: 'sch_023',
    name: 'Kia Community School',
    description: 'A stilt-village school in north Isabel where most students arrive by canoe.',
    denomination: 'Anglican',
    province: 'Isabel', island: 'Santa Isabel', town: 'Kia',
    latitude: -7.5346, longitude: 158.4998,
    phone: '+677 35288', email: 'kia.cs@example.edu.sb', website: 'https://example.com/kia',
    educationLevels: ['Primary', 'Secondary'], yearLevels: { min: 1, max: 9 },
    formGroups: ['Form 1-3'],
    streams: { form6: [], form7: [] },
    subjects: ['English', 'Mathematics', 'Science', 'Vernacular Language', 'Fisheries & Marine Studies', 'Cultural Studies'],
    feeMin: 0, feeMax: 700, currency: 'SBD',
    boarding: 'Day', schoolType: 'Community',
    lastVerified: '2026-03-06', image: null
  },

  /* ---- Makira-Ulawa ---- */
  {
    id: 'sch_024',
    name: 'Kirakira Provincial High School',
    description: 'Makira’s main secondary school, with an agriculture programme built around the school’s cocoa plots.',
    denomination: 'Other',
    province: 'Makira-Ulawa', island: 'Makira', town: 'Kirakira',
    latitude: -10.4530, longitude: 161.9212,
    phone: '+677 50133', email: 'kirakira.phs@example.edu.sb', website: 'https://example.com/kirakira',
    educationLevels: ['Secondary'], yearLevels: { min: 7, max: 12 },
    formGroups: ['Form 1-3', 'Form 4-5', 'Form 6'],
    streams: { form6: ['Science'], form7: [] },
    subjects: ['English', 'Mathematics', 'Science', 'Agriculture', 'Social Studies', 'Business Studies', 'Physical Education', 'IT'],
    feeMin: 1300, feeMax: 2600, currency: 'SBD',
    boarding: 'Both', schoolType: 'Government',
    lastVerified: '2026-07-04', image: null
  },
  {
    id: 'sch_025',
    name: 'Santa Ana Island Primary School',
    description: 'A two-teacher island school off eastern Makira with a strong custom-dance and cultural studies programme.',
    denomination: 'Catholic',
    province: 'Makira-Ulawa', island: 'Owaraha (Santa Ana)', town: 'Ghupuna',
    latitude: -10.8481, longitude: 162.4489,
    phone: '+677 50477', email: 'santaana.ps@example.edu.sb', website: 'https://example.com/santa-ana',
    educationLevels: ['Early Childhood', 'Primary'], yearLevels: { min: 1, max: 6 },
    subjects: ['English', 'Mathematics', 'Vernacular Language', 'Cultural Studies', 'Performing Arts', 'Christian Education'],
    feeMin: 0, feeMax: 260, currency: 'SBD',
    boarding: 'Day', schoolType: 'Church',
    lastVerified: '2026-02-11', image: null
  },

  /* ---- Temotu ---- */
  {
    id: 'sch_026',
    name: 'Lata Secondary School',
    description: 'The furthest-east school in the directory, serving Nendo and the outer Reef Islands from Temotu’s provincial centre.',
    denomination: 'Anglican',
    province: 'Temotu', island: 'Nendo (Santa Cruz)', town: 'Lata',
    latitude: -10.7261, longitude: 165.8309,
    phone: '+677 53080', email: 'lata.ss@example.edu.sb', website: 'https://example.com/lata',
    educationLevels: ['Secondary'], yearLevels: { min: 7, max: 11 },
    formGroups: ['Form 1-3', 'Form 4-5'],
    streams: { form6: [], form7: [] },
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Christian Education', 'Fisheries & Marine Studies', 'Environmental Science', 'IT'],
    feeMin: 1400, feeMax: 2500, currency: 'SBD',
    boarding: 'Boarding', schoolType: 'Church',
    lastVerified: '2026-01-16', image: null
  },

  /* ---- Choiseul ---- */
  {
    id: 'sch_027',
    name: 'Taro Island Provincial School',
    description: 'A compact campus on the low coral island that serves as Choiseul’s provincial capital.',
    denomination: 'Other',
    province: 'Choiseul', island: 'Taro Island', town: 'Taro',
    latitude: -6.7108, longitude: 156.3966,
    phone: '+677 63022', email: 'taro.ps@example.edu.sb', website: 'https://example.com/taro',
    educationLevels: ['Primary', 'Secondary'], yearLevels: { min: 1, max: 11 },
    formGroups: ['Form 1-3', 'Form 4-5'],
    streams: { form6: [], form7: [] },
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Environmental Science', 'IT', 'Physical Education'],
    feeMin: 600, feeMax: 2200, currency: 'SBD',
    boarding: 'Both', schoolType: 'Government',
    lastVerified: '2026-06-02', image: null
  },
  {
    id: 'sch_028',
    name: 'Sasamungga United Church High School',
    description: 'A west Choiseul boarding school with a health science stream linked to the nearby district hospital.',
    denomination: 'Other',
    province: 'Choiseul', island: 'Choiseul', town: 'Sasamungga',
    latitude: -7.0225, longitude: 156.7847,
    phone: '+677 63140', email: 'sasamungga@example.edu.sb', website: 'https://example.com/sasamungga',
    educationLevels: ['Secondary'], yearLevels: { min: 7, max: 12 },
    formGroups: ['Form 1-3', 'Form 4-5', 'Form 6'],
    streams: { form6: ['Science'], form7: [] },
    subjects: ['English', 'Mathematics', 'Science', 'Biology', 'Health Science', 'Nursing Studies', 'Christian Education', 'Home Economics', 'IT'],
    feeMin: 1800, feeMax: 3400, currency: 'SBD',
    boarding: 'Boarding', schoolType: 'Church',
    lastVerified: '2026-05-20', image: null
  },

  /* ---- Central Province ---- */
  {
    id: 'sch_029',
    name: 'Tulagi Heritage School',
    description: 'A primary and junior secondary school in the old colonial capital, a short boat ride from Honiara.',
    denomination: 'Anglican',
    province: 'Central', island: 'Tulagi', town: 'Tulagi',
    latitude: -9.1024, longitude: 160.1478,
    phone: '+677 32077', email: 'tulagi.hs@example.edu.sb', website: 'https://example.com/tulagi',
    educationLevels: ['Primary', 'Secondary'], yearLevels: { min: 1, max: 9 },
    formGroups: ['Form 1-3'],
    streams: { form6: [], form7: [] },
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Cultural Studies', 'Christian Education', 'Visual Arts'],
    feeMin: 500, feeMax: 1900, currency: 'SBD',
    boarding: 'Day', schoolType: 'Church',
    lastVerified: '2026-04-14', image: null
  },
  {
    id: 'sch_030',
    name: 'Yandina Plantation Secondary School',
    description: 'A Russell Islands school with an applied agriculture programme built around copra and cocoa production.',
    denomination: 'SDA',
    province: 'Central', island: 'Mbanika (Russell Islands)', town: 'Yandina',
    latitude: -9.0903, longitude: 159.2205,
    phone: '+677 32411', email: 'yandina.ss@example.edu.sb', website: 'https://example.com/yandina',
    educationLevels: ['Secondary', 'Tertiary/Vocational'], yearLevels: { min: 7, max: 12 },
    formGroups: ['Form 1-3', 'Form 4-5', 'Form 6'],
    streams: { form6: ['Arts'], form7: [] },
    subjects: ['English', 'Mathematics', 'Science', 'Agriculture', 'Business Studies', 'Mechanics', 'Christian Education', 'IT'],
    feeMin: 2100, feeMax: 3900, currency: 'SBD',
    boarding: 'Boarding', schoolType: 'Church',
    lastVerified: '2026-03-28', image: null
  },

  /* ---- Rennell and Bellona ---- */
  {
    id: 'sch_031',
    name: 'Tigoa Community High School',
    description: 'The main school on Rennell, near East Rennell’s World Heritage lake, with an environmental science focus.',
    denomination: 'SDA',
    province: 'Rennell and Bellona', island: 'Rennell', town: 'Tigoa',
    latitude: -11.6294, longitude: 160.2803,
    phone: '+677 39012', email: 'tigoa.chs@example.edu.sb', website: 'https://example.com/tigoa',
    educationLevels: ['Primary', 'Secondary'], yearLevels: { min: 1, max: 11 },
    formGroups: ['Form 1-3', 'Form 4-5'],
    streams: { form6: [], form7: [] },
    subjects: ['English', 'Mathematics', 'Science', 'Environmental Science', 'Social Studies', 'Vernacular Language', 'Christian Education', 'IT'],
    feeMin: 400, feeMax: 1800, currency: 'SBD',
    boarding: 'Both', schoolType: 'Community',
    lastVerified: '2026-02-19', image: null
  }
];
