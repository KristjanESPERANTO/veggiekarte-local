/** @module menu-control */

import { Control, DomEvent, DomUtil } from "leaflet";
import { getUserLanguage, onLanguageChange, setUserLanguage, t } from "./i18n.js";
import { openInfo } from "./info-button-control.js";

export const LANGUAGES = [
  ["ca", "Català"],
  ["de", "Deutsch"],
  ["en", "English"],
  ["eo", "Esperanto"],
  ["es", "Español"],
  ["fi", "suomi"],
  ["fr", "Français"],
  ["it", "Italiano"],
  ["ko", "한국어"],
  ["ru", "Русский"]
];

const MENU_ICON = "<svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' aria-hidden='true'><path d='M4 7h16M4 12h16M4 17h16'/></svg>";

/**
 * MenuControl - map button with a menu for language, information, fullscreen and statistics.
 *
 * Options:
 * - fullscreenControl: leaflet.fullscreen control whose toggle the fullscreen entry uses
 */
export const MenuControl = Control.extend({
  options: {
    position: "topright",
    fullscreenControl: null
  },

  onAdd(map) {
    this._map = map;
    const container = DomUtil.create("div", "leaflet-control menu-control");
    DomEvent.disableClickPropagation(container);
    DomEvent.disableScrollPropagation(container);

    this._button = DomUtil.create("button", "menu-button", container);
    this._button.type = "button";
    this._button.innerHTML = MENU_ICON;
    this._button.setAttribute("aria-haspopup", "true");
    this._button.setAttribute("aria-expanded", "false");
    this._button.setAttribute("aria-controls", "map-menu");

    this._panel = DomUtil.create("div", "menu-panel", container);
    this._panel.id = "map-menu";
    this._panel.hidden = true;

    this._languageTitle = DomUtil.create("p", "menu-heading", this._panel);
    this._languageList = DomUtil.create("div", "menu-languages", this._panel);
    this._languageList.setAttribute("role", "group");
    this._languageButtons = LANGUAGES.map(([code, name]) => {
      const button = DomUtil.create("button", "menu-language", this._languageList);
      button.type = "button";
      button.lang = code;
      button.textContent = name;
      DomEvent.on(button, "click", () => {
        setUserLanguage(code);
        this.close();
      });
      return { code, button };
    });

    DomUtil.create("hr", "menu-divider", this._panel);
    this._infoItem = this._createItem(() => openInfo());
    if (this.options.fullscreenControl) {
      this._fullscreenItem = this._createItem(() => this.options.fullscreenControl.toggleFullScreen());
      map.on("enterFullscreen exitFullscreen", this._updateLabels, this);
    }
    this._statisticsItem = DomUtil.create("a", "menu-item", this._panel);
    this._statisticsItem.href = "data_chart.html";

    DomEvent.on(this._button, "click", () => (this._panel.hidden ? this.open() : this.close()));
    DomEvent.on(container, "keydown", (evt) => {
      if (evt.key === "Escape") {
        this.close();
        this._button.focus();
      }
    });
    this._outsideHandler = (evt) => {
      if (!container.contains(evt.target)) { this.close(); }
    };

    this._updateLabels();
    onLanguageChange(() => this._updateLabels());
    return container;
  },

  _createItem(action) {
    const item = DomUtil.create("button", "menu-item", this._panel);
    item.type = "button";
    DomEvent.on(item, "click", () => {
      this.close();
      action();
    });
    return item;
  },

  _updateLabels() {
    const menuLabel = t("menu_title");
    this._button.title = menuLabel;
    this._button.setAttribute("aria-label", menuLabel);
    this._languageTitle.textContent = t("leaflet_L_control_languageselector_title");
    this._languageList.setAttribute("aria-label", t("leaflet_L_control_languageselector_title"));
    const current = getUserLanguage();
    this._languageButtons.forEach(({ code, button }) => button.setAttribute("aria-pressed", String(code === current)));
    this._infoItem.textContent = t("leaflet_L_control_infoButton_title");
    if (this._fullscreenItem) {
      this._fullscreenItem.textContent = this._map._isFullscreen
        ? t("leaflet_L_control_fullscreen_exitFullscreen")
        : t("leaflet_L_control_fullscreen_fullscreen");
    }
    this._statisticsItem.textContent = t("menu_statistics");
  },

  open() {
    this._panel.hidden = false;
    this._button.setAttribute("aria-expanded", "true");
    document.addEventListener("pointerdown", this._outsideHandler);
    this._languageButtons.find(({ code }) => code === getUserLanguage())?.button.focus();
  },

  close() {
    this._panel.hidden = true;
    this._button.setAttribute("aria-expanded", "false");
    document.removeEventListener("pointerdown", this._outsideHandler);
  }
});
