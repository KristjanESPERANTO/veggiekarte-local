# Offene Punkte & Upstream-Contributions

## 🔄 Offene Aufgaben für dieses Projekt

### npm-Migration-Kandidaten

## 🚀 Upstream Pull Requests (zu erstellen)

Die folgenden Änderungen wurden an Plugins vorgenommen und sollten als PRs an Upstream geschickt werden:

### 1. leaflet.locatecontrol v0.85.1

**Repository:** https://github.com/domoritz/leaflet-locatecontrol

**Datei:** `L.Control.Locate.esm.patched.js` (gepatchte Version)

**Änderungen:**

1. **Import-Fixes für Leaflet 2.0:**

```diff
- import { Marker, setOptions, divIcon, Control, DomUtil, LayerGroup, DomEvent, Util, circle } from 'leaflet';
+ import { Marker, DivIcon, Control, DomUtil, LayerGroup, DomEvent, Util, Circle } from 'leaflet';
+
+ // Factory functions for compatibility with original code (Leaflet 2.0 requires 'new')
+ const divIcon = (options) => new DivIcon(options);
+ const circle = (latlng, radius, options) => {
+   const opts = { ...options };
+   opts.radius = radius;
+   return new Circle(latlng, opts);
+ };
```

2. **setOptions Ersetzung:**

```diff
- setOptions(this, options);
+ Util.setOptions(this, options);
```

3. **requestAnimFrame Ersetzung (Leaflet 2.0 entfernt):**

**Zeile 581 (setView):**

```diff
- Util.requestAnimFrame(function () {
-   this._ignoreEvent = false;
- }, this);
+ requestAnimationFrame(() => {
+   this._ignoreEvent = false;
+ });
```

**Zeile 716 (\_setCompassHeading):**

```diff
- Util.requestAnimFrame(this._drawCompass, this);
+ requestAnimationFrame(() => this._drawCompass.call(this));
```

**Grund:**

- `setOptions`, `divIcon`, `circle` sind in Leaflet 2.0 nicht als Named Exports verfügbar
- `DivIcon`, `Circle` sind die korrekten Klassennamen (müssen mit `new` aufgerufen werden)
- `setOptions` ist nur als `Util.setOptions` verfügbar
- `Util.requestAnimFrame` wurde in Leaflet 2.0 entfernt → natives `requestAnimationFrame()` verwenden
- `Circle` Konstruktor-Signatur: `new Circle(latlng, options)` (radius in options, nicht separates Argument)

**Nutzen:** ESM-Build wird mit Leaflet 2.0 npm-Package kompatibel

**PR-Titel:** "Fix ES Module imports and API changes for Leaflet 2.0 compatibility"

---

## 📝 ToDos

7. Vollständige npm-Migration aller Plugins
8. `overrides` in `package.json` entfernen, sobald Leaflet 2.0 stable ist (aktuell nötig wegen Peer-Dependency-Konflikt mit Alpha-Version)
9. Third-Party-Verzeichnis löschen, sobald alle Plugins via npm geladen werden
10. Übernahme von sinnvollen Funktionen aus Map-Apps wie Google Maps und comaps

- Analyse, welche Funktionen fehlen
- könnte man implemantationsn von funktionen von anderen open source projekten wiederverwenden um zeit zu sparen und dem ökosystem etwas zurückzugeben?
- Konkretes Beispiel: könnte man die logik von /home/kristjan/Development/web/veggiekarte-local/shortcoder.html sinnvoll in die popups der jeweiligen marker packen. oder statt popups vielleicht modals anzeigen für handys. oder wie es google maps und comaps machen: in desktop: links und bei handys: unten einblenden.

10. python skript durch node.js version ersetzen
11. ladebalken in infobox
12. kategorie- und sprach-control sind ohne titel (wenn man mit der maus draufgeht)
13. opening_ours hat noch suncalc als commonjs dependency drin, müsste auch auf esm umgestellt werden. wenn das erfolgt ist, können wir in rollup die commonjs plugin entfernen.
