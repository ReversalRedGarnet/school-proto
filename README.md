# SchoolFinder SI — prototype

A searchable directory and interactive map of schools across Solomon Islands.

> ## ⚠️ All school data in this project is fictional
> Every one of the 31 school records in `js/data/schools.js` — names, contact
> details, fees, subjects, coordinates and verification dates — is invented for
> demonstration purposes. Place names, provinces and approximate coordinates are
> real so the map looks plausible, but **no record corresponds to a real school**.
> This is a concept prototype, not a public information service.

---

## Running it

There is no build step, no bundler and no server-side code.

- **GitHub Pages:** push the repository and enable Pages on the branch root
  (Settings → Pages → Deploy from a branch → `main` / `/ (root)`). It works
  as-is; `.nojekyll` keeps Pages from running the files through Jekyll.
  Every path in the site is relative, with one deliberate exception: the
  `og:url` / `og:image` link-preview tags in `index.html` are absolute, because
  scrapers require it. **Update those two URLs if the repo is renamed or moves
  to a custom domain.**
- **Locally:** open `index.html` directly in a browser, or serve the folder
  (`python3 -m http.server`). A local server is recommended, because browser
  geolocation only works on `https://` or `localhost`.

External dependencies are loaded from CDNs at runtime: Leaflet 1.9.4 and two
Google fonts (Inter, Source Serif 4). Nothing is installed.

## Structure

```
index.html              app shell / markup
css/styles.css          all styling (single stylesheet, CSS custom properties)
js/data/schools.js      MOCK dataset + filter vocabularies (province, subject taxonomy…)
js/state.js             the single app-state object, setters and subscribers
js/filters.js           search, filtering, sorting, facet counts — pure functions
js/geolocation.js       geolocation request + haversine distance
js/filterPanel.js       renders and syncs the filter controls
js/list.js              result cards + shared formatting helpers
js/map.js               Leaflet init, markers, marker → selection
js/panel.js             selected-school detail panel / mobile bottom sheet
js/main.js              wiring: events → state → single render pass
```

Scripts are plain `<script>` tags sharing one global namespace (`SF`) rather
than ES modules, so the app also runs from `file://` without a server.

## How it works

One state object, one render pass, two views:

```
event → SF.setState(patch) → subscribers → render(state)
                                             ├── SF.filters.getResults(state)
                                             ├── SF.list.render(results, state)
                                             ├── SF.map.render(results, state)
                                             ├── SF.panel.render(state)
                                             └── SF.filterPanel.sync(state)
```

The list and the map are handed the *same* filtered array, so they cannot
disagree. Selecting a school — from a card or from a marker — is the same
`SF.select(id)` call.

Filter semantics: filter types combine with AND; multiple values within one
type combine with OR, except **subjects**, which is AND ("must teach all of
these"). Option counts beside each filter are live facet counts.

## Design notes

**Palette** is the Solomon Islands flag. Blue `#0051BA` carries the brand and
every primary action (7.3:1 on white). Green `#215B33` is the secondary accent —
your location on the map, "Free" fees, the location-on state (8.1:1). Yellow
`#FCD116` is used only as a thin stripe or a small fill behind dark text: it
measures **1.47:1 against white**, so it can never carry text on a light
background and never serves as a focus ring there. Focus rings are blue on
light surfaces and switch to yellow over the blue header and banner.

**Filters** live in one overlay drawer at every screen size rather than an
always-open rail, so the default view is a search box, a list and a map. What
is currently applied stays visible as removable chips above the results.

**The map is locked to Solomon Islands.** `maxBounds` plus
`maxBoundsViscosity: 1.0` stop panning dead at the country's edge, and the
zoom floor is recalculated from the container size on every resize, so zooming
all the way out lands exactly on the whole-country view and no further. See the
bounds constants at the top of `js/map.js`.

## Swapping the mock data for an API

`js/data/schools.js` is the only file that knows what the data is. Replace the
assignment to `SF.SCHOOLS` with a `fetch()` that resolves before `render()` is
first called, keep the object shape, and nothing else needs to change.

## Basemap

Standard OpenStreetMap raster tiles — free, no API key, no sign-up. The tile
layer is desaturated slightly in CSS (`.leaflet-tile-pane`) so the school
markers stay the loudest thing on screen. Note that OSM's public tile server is
fine for a demo but has a usage policy; a real deployment should use a tile
provider with a proper plan.

## Out of scope

No authentication, backend, admin tooling, data submission, reviews or user
accounts — see the implementation brief.
