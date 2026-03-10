# Offene Punkte & Upstream-Contributions

## 📝 ToDos

1. `overrides` in `package.json` entfernen, sobald Leaflet 2.0 stable ist (aktuell nötig wegen Peer-Dependency-Konflikt mit Alpha-Version)

2. Übernahme von sinnvollen Funktionen aus Map-Apps wie Google Maps und comaps
   - Analyse, welche Funktionen fehlen
   - Könnte man Implementierungen von Funktionen aus anderen Open-Source-Projekten wiederverwenden, um Zeit zu sparen und dem Ökosystem etwas zurückzugeben?
   - Konkretes Beispiel: Könnte man die Logik von `shortcoder.html` sinnvoll in die Popups der jeweiligen Marker packen? Oder statt Popups vielleicht Modals anzeigen für Handys? Oder wie es Google Maps und comaps machen: in Desktop links und bei Handys unten einblenden.

3. Python-Skripte durch Node.js-Versionen ersetzen

4. Ladebalken in Infobox implementieren

5. Kategorie- und Sprach-Controls: Titel hinzufügen (wenn man mit der Maus draufgeht)

6. `opening_hours` hat noch `suncalc` als CommonJS-Dependency. Müsste auf ESM umgestellt werden. Wenn das erfolgt ist, können wir in Rollup das `@rollup/plugin-commonjs` entfernen.

7. gibt es logik die wir in npm pakete auslagern können, damit sie auch von anderen Projekten genutzt werden kann?
