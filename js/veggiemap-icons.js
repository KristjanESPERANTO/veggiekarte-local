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

/* Function to get the icon depending from the symbol and the category */
export function getIcon(symbol, category) {
  return new DivIcon({
    className: `marker ${category} icon-${symbol}`,
    iconSize: [18, 18],
    iconAnchor: [11, 18],
    popupAnchor: [0, -18]
  });
}
