import { DivIcon } from "leaflet";

/* Function to get the icon depending from the symbol and the category */
export default function getIcon(symbol, category) {
  return new DivIcon({
    className: `marker ${category} icon-${symbol}`,
    iconSize: [18, 18],
    iconAnchor: [11, 18],
    popupAnchor: [0, -18]
  });
}
