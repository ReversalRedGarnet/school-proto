/* ============================================================================
 * state.js — single source of truth
 * ----------------------------------------------------------------------------
 * One plain object holds everything the UI needs. Nothing else mutates it
 * directly: views call SF.setState(patch), which merges, then notifies
 * subscribers. main.js subscribes exactly one render() that re-draws the list,
 * the map markers and the detail panel from the same state. Two views, one
 * truth — no reactivity framework required at this size.
 * ==========================================================================*/

window.SF = window.SF || {};

SF.state = {
  /* Search + filters ----------------------------------------------------- */
  query: '',
  filters: {
    provinces:     [],   // string[]
    denominations: [],   // string[]
    levels:        [],   // string[] — education levels
    subjects:      [],   // string[]
    boarding:      '',   // '' | 'Day' | 'Boarding' | 'Both'
    yearLevel:     null, // number | null — school must span this year
    feeMax:        null, // number | null — school's feeMin must be <= this
    maxDistanceKm: null  // number | null — requires userLocation
  },

  /* View ----------------------------------------------------------------- */
  sortBy: 'relevance',   // relevance | name | distance | feeLow | feeHigh
  selectedId: null,      // string | null
  mobileView: 'list',    // list | map  (small screens only)
  filtersOpen: false,    // filter drawer (small screens only)

  /* Geolocation ---------------------------------------------------------- */
  userLocation: null,    // { lat, lng } | null
  geoStatus: 'idle'      // idle | prompting | granted | denied | unavailable
};

/* Default filter values, used by resetFilters(). */
SF.DEFAULT_FILTERS = JSON.parse(JSON.stringify(SF.state.filters));

/* Subscribers ------------------------------------------------------------ */
SF._subscribers = [];

SF.subscribe = function (fn) {
  SF._subscribers.push(fn);
  return function unsubscribe() {
    SF._subscribers = SF._subscribers.filter(function (f) { return f !== fn; });
  };
};

SF.notify = function () {
  SF._subscribers.forEach(function (fn) { fn(SF.state); });
};

/* Setters ---------------------------------------------------------------- */

/** Shallow-merge a patch into state; `filters` is merged one level deeper. */
SF.setState = function (patch) {
  if (patch && patch.filters) {
    SF.state.filters = Object.assign({}, SF.state.filters, patch.filters);
    patch = Object.assign({}, patch);
    delete patch.filters;
  }
  Object.assign(SF.state, patch);
  SF.notify();
};

/** Add/remove one value in an array-valued filter (checkbox behaviour). */
SF.toggleFilterValue = function (key, value) {
  var current = SF.state.filters[key] || [];
  var next = current.indexOf(value) === -1
    ? current.concat([value])
    : current.filter(function (v) { return v !== value; });
  SF.setState({ filters: setOne(key, next) });
};

SF.setFilter = function (key, value) {
  SF.setState({ filters: setOne(key, value) });
};

SF.resetFilters = function () {
  SF.state.filters = JSON.parse(JSON.stringify(SF.DEFAULT_FILTERS));
  SF.state.query = '';
  SF.notify();
};

SF.select = function (id) {
  SF.setState({ selectedId: id });
};

SF.clearSelection = function () {
  SF.setState({ selectedId: null });
};

/* Derived helpers -------------------------------------------------------- */

/** How many filter *values* are currently applied (used for badges). */
SF.activeFilterCount = function () {
  var f = SF.state.filters, n = 0;
  n += f.provinces.length + f.denominations.length + f.levels.length + f.subjects.length;
  if (f.boarding) n++;
  if (f.yearLevel !== null) n++;
  if (f.feeMax !== null) n++;
  if (f.maxDistanceKm !== null) n++;
  return n;
};

SF.hasActiveFilters = function () {
  return SF.activeFilterCount() > 0 || SF.state.query.trim() !== '';
};

SF.getSchoolById = function (id) {
  return SF.SCHOOLS.filter(function (s) { return s.id === id; })[0] || null;
};

function setOne(key, value) {
  var o = {};
  o[key] = value;
  return o;
}
