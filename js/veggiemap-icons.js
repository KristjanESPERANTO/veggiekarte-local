import { DivIcon } from "leaflet";

export const iconToEmoji = {
  "alcohol": "🍷",
  "bakery": "🥨",
  "bar": "🍸",
  "bbq": "🍴",
  "beauty": "💄",
  "bicycle": "🚲",
  "butcher": "🔪",
  "cafe": "☕",
  "cinema": "🎦",
  "clothes": "👚",
  "college": "🎓",
  "confectionery": "🍬",
  "convenience": "🏪",
  "department_store": "🏬",
  "diy": "🛠️",
  "fast_food": "🍔",
  "fuel": "⛽",
  "garden-centre": "🏡",
  "gift": "🎁",
  "golf": "🏌️",
  "greengrocer": "🍏",
  "guest_house": "🏠",
  "hairdresser": "💇",
  "hospital": "🏥",
  "hut": "🛖",
  "ice_cream": "🍨",
  "library": "📚",
  "monument": "🗿",
  "museum": "🖼️",
  "music": "🎶",
  "pharmacy": "💊",
  "pitch": "🏃",
  "place_of_worship": "🛐",
  "playground": "🧒",
  "pub": "🍻",
  "restaurant": "🍽️",
  "restaurant-pizza": "🍕",
  "school": "🏫",
  "shelter": "☂️",
  "soup_kitchen": "🥣",
  "shoe": "👞",
  "shop": "🛒",
  "spa": "🧖",
  "sports": "🤼",
  "stadium": "🏟️",
  "star-stroked": "⭐",
  "supermarket": "🏪",
  "swimming": "🏊‍♀️",
  "theatre": "🎭"
};

// One icon per symbol and category, shared by all markers that look the same
const iconCache = new Map();

/* Function to get the icon depending from the symbol and the category */
export function getIcon(symbol, category) {
  const key = `${symbol} ${category}`;
  if (!iconCache.has(key)) {
    iconCache.set(key, new DivIcon({
      className: `marker ${category} icon-${symbol}`,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
      popupAnchor: [0, -18]
    }));
  }
  return iconCache.get(key);
}
