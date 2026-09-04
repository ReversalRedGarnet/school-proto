/* ============================================================================
 * list.js — renders result cards from the filtered set
 * ----------------------------------------------------------------------------
 * Pure render: given the already-filtered array plus state, produce the cards.
 * Clicking (or Enter/Space on) a card selects that school — exactly the same
 * action a marker click performs in map.js.
 * ==========================================================================*/

window.SF = window.SF || {};
SF.list = {};

/* Shared presentation helpers, also used by panel.js. */
SF.format = {
  fees: function (school) {
    if (school.feeMin === 0 && school.feeMax === 0) return 'No fees';
    var lo = school.feeMin === 0 ? 'Free' : '$' + school.feeMin.toLocaleString('en-US');
    return lo + ' – $' + school.feeMax.toLocaleString('en-US') + ' ' + school.currency;
  },
  years: function (school) {
    var y = school.yearLevels;
    return y.min === y.max ? 'Year ' + y.min : 'Years ' + y.min + '–' + y.max;
  },
  place: function (school) {
    return school.town === school.province
      ? school.town
      : school.town + ', ' + school.province;
  },
  initials: function (name) {
    var skip = { the: 1, of: 1, and: 1, '&': 1 };
    return name.split(/\s+/)
      .filter(function (w) { return !skip[w.toLowerCase()]; })
      .slice(0, 2)
      .map(function (w) { return w.charAt(0).toUpperCase(); })
      .join('');
  },
  date: function (iso) {
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  },
  esc: function (s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
};

var listEl, countEl, subEl, chipsEl;

SF.list.init = function () {
  listEl  = document.getElementById('results-list');
  countEl = document.getElementById('result-count');
  subEl   = document.getElementById('result-sub');
  chipsEl = document.getElementById('active-chips');

  listEl.addEventListener('click', function (e) {
    var card = e.target.closest('.card');
    if (card) SF.select(card.getAttribute('data-id'));
  });

  listEl.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var card = e.target.closest('.card');
    if (!card) return;
    e.preventDefault();
    SF.select(card.getAttribute('data-id'));
  });

  /* Removable filter chips above the results. */
  chipsEl.addEventListener('click', function (e) {
    var chip = e.target.closest('[data-chip-key]');
    if (!chip) return;
    var key = chip.getAttribute('data-chip-key');
    var value = chip.getAttribute('data-chip-value');
    if (value !== null && value !== '') SF.toggleFilterValue(key, value);
    else SF.setFilter(key, key === 'boarding' ? '' : null);
  });
};

SF.list.render = function (results, state) {
  var total = SF.SCHOOLS.length;
  var esc = SF.format.esc;

  countEl.textContent = results.length;
  subEl.textContent = results.length === total
    ? 'in the directory'
    : 'of ' + total + ' match your search';

  /* Active filter chips */
  var chips = SF.filters.activeChips(state);
  chipsEl.innerHTML = chips.map(function (c) {
    return '<button type="button" class="chip chip-removable" data-chip-key="' + esc(c.key) +
           '" data-chip-value="' + esc(c.value === null ? '' : c.value) + '">' +
           esc(c.label) + '<span aria-hidden="true">&times;</span>' +
           '<span class="sr-only"> — remove filter</span></button>';
  }).join('');
  chipsEl.hidden = chips.length === 0;

  if (results.length === 0) {
    listEl.innerHTML =
      '<div class="empty">' +
        '<p class="empty-title">No schools match these filters</p>' +
        '<p class="empty-body">Try removing a filter, widening the fee range, or searching for a province such as “Malaita”.</p>' +
        '<button type="button" class="btn btn-primary" id="empty-clear">Clear all filters</button>' +
      '</div>';
    return;
  }

  listEl.innerHTML = results.map(function (school) {
    return card(school, school.id === state.selectedId);
  }).join('');
};

/** Scroll the selected card into view without yanking the page around. */
SF.list.revealSelected = function (id) {
  if (!id || !listEl) return;
  var el = listEl.querySelector('.card[data-id="' + id + '"]');
  if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
};

function card(school, isSelected) {
  var esc = SF.format.esc;
  var distance = typeof school.distanceKm === 'number'
    ? '<span class="card-distance">' + SF.geo.formatDistance(school.distanceKm) + '</span>'
    : '';

  var tags = school.educationLevels.map(function (l) {
    return '<li class="tag">' + esc(l) + '</li>';
  }).join('') +
  '<li class="tag tag-quiet">' + esc(school.boarding === 'Both' ? 'Day & boarding' : school.boarding) + '</li>';

  return '' +
    '<article class="card' + (isSelected ? ' is-selected' : '') + '" data-id="' + esc(school.id) + '"' +
      ' role="button" tabindex="0" aria-pressed="' + (isSelected ? 'true' : 'false') + '">' +
      '<div class="card-head">' +
        '<span class="avatar" data-type="' + esc(school.schoolType) + '" aria-hidden="true">' +
          esc(SF.format.initials(school.name)) + '</span>' +
        '<div class="card-heading">' +
          '<h3 class="card-name">' + esc(school.name) + '</h3>' +
          '<p class="card-place">' + esc(SF.format.place(school)) + ' &middot; ' + esc(school.denomination.replace(' / Non-denominational', '')) + '</p>' +
        '</div>' +
        distance +
      '</div>' +
      '<ul class="tag-row">' + tags + '</ul>' +
      '<div class="card-foot">' +
        '<span>' + esc(SF.format.years(school)) + '</span>' +
        '<span class="card-fee">' + esc(SF.format.fees(school)) + '</span>' +
      '</div>' +
    '</article>';
}
