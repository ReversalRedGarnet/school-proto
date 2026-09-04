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

/* Subject taxonomy — used to render the subjects filter as grouped,
 * searchable categories instead of one sprawling flat checkbox list. */
SF.SUBJECT_GROUPS = [
  { group: 'Core',              subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Christian Education'] },
  { group: 'Sciences',          subjects: ['Biology', 'Chemistry', 'Physics', 'Environmental Science'] },
  { group: 'Languages & Arts',  subjects: ['English Literature', 'Vernacular Language', 'Visual Arts', 'Music', 'Performing Arts', 'Cultural Studies'] },
  { group: 'Technology',        subjects: ['ICT', 'Computing', 'Design & Technology', 'Technical Drawing'] },
  { group: 'Commerce',          subjects: ['Business Studies', 'Accounting', 'Economics'] },
  { group: 'Vocational & Trade',subjects: ['Agriculture', 'Fisheries & Marine Studies', 'Carpentry & Joinery', 'Mechanics', 'Tourism & Hospitality', 'Home Economics', 'Nursing Studies', 'Early Childhood Teaching'] },
  { group: 'Health & Sport',    subjects: ['Physical Education', 'Health Science'] }
];

/* Filter vocabularies. In a real system these would come from the API too. */
SF.PROVINCES = [
  'Honiara', 'Guadalcanal', 'Malaita', 'Western', 'Isabel',
  'Makira-Ulawa', 'Temotu', 'Choiseul', 'Central', 'Rennell and Bellona'
];

SF.DENOMINATIONS = [
  'Government / Non-denominational', 'Anglican', 'Catholic', 'SDA',
  'United Church', 'South Seas Evangelical'
];

SF.EDUCATION_LEVELS = ['Early Childhood', 'Primary', 'Secondary', 'Tertiary/Vocational'];

SF.BOARDING_OPTIONS = ['Day', 'Boarding', 'Both'];

/* Plain-language labels for the general public. The stored values above are
   what a real API would return and never change; these are display only. */
SF.DISPLAY_LABELS = {
  'Tertiary/Vocational': 'Vocational & college',
  'Government / Non-denominational': 'Government (non-church)',
  'South Seas Evangelical': 'South Seas Evangelical',
  'SDA': 'Seventh-day Adventist'
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
    description: 'A large day school on the eastern edge of Honiara, known for its ICT lab and strong senior science stream.',
    denomination: 'Government / Non-denominational',
    province: 'Honiara', island: 'Guadalcanal', town: 'Panatina, Honiara',
    latitude: -9.4306, longitude: 160.0184,
    phone: '+677 21140', email: 'admin@panatina.edu.sb', website: 'https://example.com/panatina',
    educationLevels: ['Secondary'], yearLevels: { min: 7, max: 13 },
    subjects: ['English', 'Mathematics', 'Science', 'Biology', 'Chemistry', 'Physics', 'ICT', 'Computing', 'Business Studies', 'Social Studies', 'Physical Education'],
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
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Christian Education', 'Music', 'Visual Arts', 'English Literature', 'Physical Education'],
    feeMin: 1800, feeMax: 3600, currency: 'SBD',
    boarding: 'Day', schoolType: 'Church',
    lastVerified: '2026-07-30', image: null
  },
  {
    id: 'sch_003',
    name: 'Mataniko Primary School',
    description: 'A busy neighbourhood primary school beside the Mataniko River serving central Honiara families.',
    denomination: 'Government / Non-denominational',
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
    subjects: ['English', 'Mathematics', 'Science', 'Christian Education', 'Accounting', 'Economics', 'Business Studies', 'ICT', 'English Literature'],
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
    educationLevels: ['Secondary', 'Tertiary/Vocational'], yearLevels: { min: 7, max: 13 },
    subjects: ['English', 'Mathematics', 'Science', 'Christian Education', 'Agriculture', 'Carpentry & Joinery', 'Mechanics', 'Design & Technology', 'Technical Drawing', 'Home Economics'],
    feeMin: 3200, feeMax: 6400, currency: 'SBD',
    boarding: 'Boarding', schoolType: 'Church',
    lastVerified: '2026-06-28', image: null
  },
  {
    id: 'sch_006',
    name: 'Naha Early Learning Centre',
    description: 'A small early childhood centre in east Honiara focused on play-based learning in Pijin and English.',
    denomination: 'Government / Non-denominational',
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
    denomination: 'Government / Non-denominational',
    province: 'Honiara', island: 'Guadalcanal', town: 'Ranadi, Honiara',
    latitude: -9.4451, longitude: 160.0102,
    phone: '+677 24700', email: 'info@hti.edu.sb', website: 'https://example.com/hti',
    educationLevels: ['Tertiary/Vocational'], yearLevels: { min: 12, max: 13 },
    subjects: ['ICT', 'Computing', 'Mechanics', 'Carpentry & Joinery', 'Technical Drawing', 'Business Studies', 'Accounting', 'Tourism & Hospitality'],
    feeMin: 4200, feeMax: 8500, currency: 'SBD',
    boarding: 'Day', schoolType: 'Government',
    lastVerified: '2026-08-25', image: null
  },
  {
    id: 'sch_008',
    name: 'Kukum Christian Academy',
    description: 'An independent primary school with small class sizes and a strong reading programme.',
    denomination: 'South Seas Evangelical',
    province: 'Honiara', island: 'Guadalcanal', town: 'Kukum, Honiara',
    latitude: -9.4275, longitude: 159.9915,
    phone: '+677 23311', email: 'admin@kukumacademy.edu.sb', website: 'https://example.com/kukum-academy',
    educationLevels: ['Early Childhood', 'Primary'], yearLevels: { min: 1, max: 6 },
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Christian Education', 'ICT', 'Music'],
    feeMin: 2200, feeMax: 3400, currency: 'SBD',
    boarding: 'Day', schoolType: 'Private',
    lastVerified: '2026-07-11', image: null
  },
  {
    id: 'sch_009',
    name: 'Rove Girls Secondary School',
    description: 'A girls-only secondary school in west Honiara with a nursing and health science pathway.',
    denomination: 'United Church',
    province: 'Honiara', island: 'Guadalcanal', town: 'Rove, Honiara',
    latitude: -9.4319, longitude: 159.9425,
    phone: '+677 21562', email: 'office@rovegirls.edu.sb', website: 'https://example.com/rove-girls',
    educationLevels: ['Secondary'], yearLevels: { min: 7, max: 12 },
    subjects: ['English', 'Mathematics', 'Science', 'Biology', 'Health Science', 'Nursing Studies', 'Home Economics', 'Social Studies', 'Christian Education'],
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
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Agriculture', 'Christian Education', 'Physical Education'],
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
    denomination: 'South Seas Evangelical',
    province: 'Guadalcanal', island: 'Guadalcanal', town: 'Avu Avu',
    latitude: -9.8633, longitude: 160.3979,
    phone: '+677 36901', email: 'avuavu@example.edu.sb', website: 'https://example.com/avu-avu',
    educationLevels: ['Primary', 'Secondary'], yearLevels: { min: 1, max: 9 },
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
    denomination: 'Government / Non-denominational',
    province: 'Malaita', island: 'Malaita', town: 'Auki',
    latitude: -8.7683, longitude: 160.7025,
    phone: '+677 40213', email: 'auki.pss@example.edu.sb', website: 'https://example.com/auki-pss',
    educationLevels: ['Secondary'], yearLevels: { min: 7, max: 13 },
    subjects: ['English', 'Mathematics', 'Science', 'Biology', 'Chemistry', 'Physics', 'Social Studies', 'ICT', 'Business Studies', 'Physical Education'],
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
    subjects: ['English', 'Mathematics', 'Science', 'Agriculture', 'Christian Education', 'Social Studies', 'Home Economics', 'Music'],
    feeMin: 1700, feeMax: 3100, currency: 'SBD',
    boarding: 'Boarding', schoolType: 'Church',
    lastVerified: '2026-05-03', image: null
  },
  {
    id: 'sch_016',
    name: 'Atori Community Primary School',
    description: 'A small east Malaita primary school run in partnership with the local village committee.',
    denomination: 'South Seas Evangelical',
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
    denomination: 'United Church',
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
    denomination: 'Government / Non-denominational',
    province: 'Western', island: 'Ghizo', town: 'Gizo',
    latitude: -8.1032, longitude: 156.8419,
    phone: '+677 60188', email: 'gizo.chs@example.edu.sb', website: 'https://example.com/gizo-chs',
    educationLevels: ['Secondary'], yearLevels: { min: 7, max: 13 },
    subjects: ['English', 'Mathematics', 'Science', 'Biology', 'Environmental Science', 'Fisheries & Marine Studies', 'ICT', 'Tourism & Hospitality', 'Social Studies'],
    feeMin: 1600, feeMax: 3000, currency: 'SBD',
    boarding: 'Both', schoolType: 'Government',
    lastVerified: '2026-08-05', image: null
  },
  {
    id: 'sch_019',
    name: 'Munda United Church College',
    description: 'A New Georgia boarding college with sciences, teaching preparation and an early childhood training stream.',
    denomination: 'United Church',
    province: 'Western', island: 'New Georgia', town: 'Munda',
    latitude: -8.3277, longitude: 157.2634,
    phone: '+677 62240', email: 'munda.college@example.edu.sb', website: 'https://example.com/munda-college',
    educationLevels: ['Secondary', 'Tertiary/Vocational'], yearLevels: { min: 7, max: 13 },
    subjects: ['English', 'Mathematics', 'Science', 'Chemistry', 'Physics', 'Christian Education', 'Early Childhood Teaching', 'Social Studies', 'ICT'],
    feeMin: 2900, feeMax: 5200, currency: 'SBD',
    boarding: 'Boarding', schoolType: 'Church',
    lastVerified: '2026-07-22', image: null
  },
  {
    id: 'sch_020',
    name: 'Noro Primary School',
    description: 'A primary school in the fishing port of Noro serving cannery and shipping families.',
    denomination: 'Government / Non-denominational',
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
    denomination: 'Government / Non-denominational',
    province: 'Western', island: 'Vangunu', town: 'Seghe',
    latitude: -8.5779, longitude: 157.8762,
    phone: '+677 62901', email: 'seghe.academy@example.edu.sb', website: 'https://example.com/seghe-academy',
    educationLevels: ['Tertiary/Vocational'], yearLevels: { min: 11, max: 13 },
    subjects: ['Fisheries & Marine Studies', 'Tourism & Hospitality', 'Environmental Science', 'English', 'Business Studies', 'ICT'],
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
    subjects: ['English', 'Mathematics', 'Science', 'Biology', 'Social Studies', 'Christian Education', 'Agriculture', 'Music'],
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
    denomination: 'Government / Non-denominational',
    province: 'Makira-Ulawa', island: 'Makira', town: 'Kirakira',
    latitude: -10.4530, longitude: 161.9212,
    phone: '+677 50133', email: 'kirakira.phs@example.edu.sb', website: 'https://example.com/kirakira',
    educationLevels: ['Secondary'], yearLevels: { min: 7, max: 12 },
    subjects: ['English', 'Mathematics', 'Science', 'Agriculture', 'Social Studies', 'Business Studies', 'Physical Education'],
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
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Christian Education', 'Fisheries & Marine Studies', 'Environmental Science'],
    feeMin: 1400, feeMax: 2500, currency: 'SBD',
    boarding: 'Boarding', schoolType: 'Church',
    lastVerified: '2026-01-16', image: null
  },

  /* ---- Choiseul ---- */
  {
    id: 'sch_027',
    name: 'Taro Island Provincial School',
    description: 'A compact campus on the low coral island that serves as Choiseul’s provincial capital.',
    denomination: 'Government / Non-denominational',
    province: 'Choiseul', island: 'Taro Island', town: 'Taro',
    latitude: -6.7108, longitude: 156.3966,
    phone: '+677 63022', email: 'taro.ps@example.edu.sb', website: 'https://example.com/taro',
    educationLevels: ['Primary', 'Secondary'], yearLevels: { min: 1, max: 11 },
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Environmental Science', 'ICT', 'Physical Education'],
    feeMin: 600, feeMax: 2200, currency: 'SBD',
    boarding: 'Both', schoolType: 'Government',
    lastVerified: '2026-06-02', image: null
  },
  {
    id: 'sch_028',
    name: 'Sasamungga United Church High School',
    description: 'A west Choiseul boarding school with a health science stream linked to the nearby district hospital.',
    denomination: 'United Church',
    province: 'Choiseul', island: 'Choiseul', town: 'Sasamungga',
    latitude: -7.0225, longitude: 156.7847,
    phone: '+677 63140', email: 'sasamungga@example.edu.sb', website: 'https://example.com/sasamungga',
    educationLevels: ['Secondary'], yearLevels: { min: 7, max: 12 },
    subjects: ['English', 'Mathematics', 'Science', 'Biology', 'Health Science', 'Nursing Studies', 'Christian Education', 'Home Economics'],
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
    educationLevels: ['Secondary', 'Tertiary/Vocational'], yearLevels: { min: 7, max: 13 },
    subjects: ['English', 'Mathematics', 'Science', 'Agriculture', 'Business Studies', 'Mechanics', 'Christian Education'],
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
    subjects: ['English', 'Mathematics', 'Science', 'Environmental Science', 'Social Studies', 'Vernacular Language', 'Christian Education'],
    feeMin: 400, feeMax: 1800, currency: 'SBD',
    boarding: 'Both', schoolType: 'Community',
    lastVerified: '2026-02-19', image: null
  }
];
