/* eslint-disable camelcase */
/**
 * Category mapping for place types
 * Maps icon types to hierarchical categories
 */

export const CATEGORY_HIERARCHY = {
  food: {
    id: "food",
    labelKey: "category_food",
    icon: "🍽️",
    defaultEnabled: true,
    subcategories: {
      restaurant: {
        id: "restaurant",
        labelKey: "category_food_restaurant",
        icon: "🍽️",
        icons: ["restaurant", "bbq", "canteen", "food_court"]
      },
      community_meals: {
        id: "community_meals",
        labelKey: "category_food_community_meals",
        label: "Community meals",
        icon: "🥣",
        icons: ["soup_kitchen"]
      },
      pizza: {
        id: "pizza",
        labelKey: "category_food_pizza",
        icon: "🍕",
        icons: ["restaurant-pizza"]
      },
      cafe: {
        id: "cafe",
        labelKey: "category_food_cafe",
        icon: "☕",
        icons: ["cafe"]
      },
      fast_food: {
        id: "fast_food",
        labelKey: "category_food_fast_food",
        icon: "🍔",
        icons: ["fast_food"]
      },
      bar_pub: {
        id: "bar_pub",
        labelKey: "category_food_bar_pub",
        icon: "🍻",
        icons: ["bar", "pub"]
      },
      ice_cream: {
        id: "ice_cream",
        labelKey: "category_food_ice_cream",
        icon: "🍨",
        icons: ["ice_cream"]
      },
      bakery: {
        id: "bakery",
        labelKey: "category_food_bakery",
        icon: "🥨",
        icons: ["bakery", "confectionery"]
      }
    }
  },
  shopping: {
    id: "shopping",
    labelKey: "category_shopping",
    icon: "🛒",
    defaultEnabled: true,
    subcategories: {
      supermarket: {
        id: "supermarket",
        labelKey: "category_shopping_supermarket",
        icon: "🏪",
        icons: ["supermarket", "convenience", "shop"]
      },
      food_shop: {
        id: "food_shop",
        labelKey: "category_shopping_food_shop",
        icon: "🍏",
        icons: ["greengrocer", "butcher", "alcohol"]
      },
      general: {
        id: "general",
        labelKey: "category_shopping_general",
        icon: "🛒",
        icons: ["department_store", "gift", "clothes", "shoe", "music", "bicycle", "diy", "garden-centre"]
      }
    }
  },
  health_beauty: {
    id: "health_beauty",
    labelKey: "category_health_beauty",
    icon: "💇",
    defaultEnabled: false,
    subcategories: {
      hairdresser: {
        id: "hairdresser",
        labelKey: "category_health_beauty_hairdresser",
        icon: "💇",
        icons: ["hairdresser", "beauty"]
      },
      pharmacy: {
        id: "pharmacy",
        labelKey: "category_health_beauty_pharmacy",
        icon: "💊",
        icons: ["pharmacy"]
      },
      spa: {
        id: "spa",
        labelKey: "category_health_beauty_spa",
        icon: "🧖",
        icons: ["spa"]
      },
      hospital: {
        id: "hospital",
        labelKey: "category_health_beauty_hospital",
        icon: "🏥",
        icons: ["hospital"]
      }
    }
  },
  accommodation: {
    id: "accommodation",
    labelKey: "category_accommodation",
    icon: "🏨",
    defaultEnabled: false,
    subcategories: {
      hotel: {
        id: "hotel",
        labelKey: "category_accommodation_hotel",
        icon: "🏨",
        icons: ["guest_house"]
      },
      hut: {
        id: "hut",
        labelKey: "category_accommodation_hut",
        icon: "🛖",
        icons: ["hut"]
      }
    }
  },
  culture: {
    id: "culture",
    labelKey: "category_culture",
    icon: "🎭",
    defaultEnabled: false,
    subcategories: {
      entertainment: {
        id: "entertainment",
        labelKey: "category_culture_entertainment",
        icon: "🎭",
        icons: ["cinema", "theatre", "museum", "monument"]
      },
      library: {
        id: "library",
        labelKey: "category_culture_library",
        icon: "📚",
        icons: ["library"]
      }
    }
  },
  sports: {
    id: "sports",
    labelKey: "category_sports",
    icon: "🏃",
    defaultEnabled: false,
    subcategories: {
      facilities: {
        id: "facilities",
        labelKey: "category_sports_facilities",
        icon: "🏃",
        icons: ["sports", "pitch", "stadium", "golf", "swimming"]
      }
    }
  },
  education: {
    id: "education",
    labelKey: "category_education",
    icon: "🎓",
    defaultEnabled: false,
    subcategories: {
      school: {
        id: "school",
        labelKey: "category_education_school",
        icon: "🏫",
        icons: ["school", "college", "playground"]
      }
    }
  },
  other: {
    id: "other",
    labelKey: "category_other",
    icon: "⭐",
    defaultEnabled: true,
    subcategories: {
      misc: {
        id: "misc",
        labelKey: "category_other_misc",
        icon: "⭐",
        icons: ["place_of_worship", "shelter", "star-stroked", "fuel"]
      }
    }
  }
};

/**
 * Create reverse mapping: icon -> category path
 * @returns {Object} Map from icon name to {mainCategory, subCategory}
 */
export function createIconToCategoryMap() {
  const iconMap = {};

  Object.entries(CATEGORY_HIERARCHY).forEach(([mainId, mainCat]) => {
    Object.entries(mainCat.subcategories).forEach(([subId, subCat]) => {
      subCat.icons.forEach((icon) => {
        iconMap[icon] = {
          mainCategory: mainId,
          subCategory: subId,
          mainCategoryData: mainCat,
          subCategoryData: subCat
        };
      });
    });
  });

  return iconMap;
}

/**
 * Get category info for a given icon
 * @param {string} icon - Icon name
 * @returns {Object|null} Category information or null if not found
 */
export function getCategoryForIcon(icon) {
  const iconMap = createIconToCategoryMap();
  return iconMap[icon] || {
    mainCategory: "other",
    subCategory: "misc",
    mainCategoryData: CATEGORY_HIERARCHY.other,
    subCategoryData: CATEGORY_HIERARCHY.other.subcategories.misc
  };
}

/**
 * Get all main categories
 * @returns {Array} Array of main category objects
 */
export function getMainCategories() {
  return Object.values(CATEGORY_HIERARCHY);
}

/**
 * Check if a category should be enabled by default
 * @param {string} mainCategoryId - Main category ID
 * @returns {boolean}
 */
export function isDefaultEnabled(mainCategoryId) {
  return CATEGORY_HIERARCHY[mainCategoryId]?.defaultEnabled ?? true;
}
