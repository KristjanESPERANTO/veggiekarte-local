/* eslint-disable camelcase */
/**
 * Category mapping for place types
 * Maps icon types to hierarchical categories
 */

export const CATEGORY_HIERARCHY = {
  food: {
    id: "food",
    labelKey: "category.food",
    icon: "🍽️",
    defaultEnabled: true,
    subcategories: {
      restaurant: {
        id: "restaurant",
        labelKey: "category.food.restaurant",
        icon: "🍽️",
        icons: ["restaurant", "bbq", "canteen", "food_court"]
      },
      pizza: {
        id: "pizza",
        labelKey: "category.food.pizza",
        icon: "🍕",
        icons: ["restaurant-pizza"]
      },
      cafe: {
        id: "cafe",
        labelKey: "category.food.cafe",
        icon: "☕",
        icons: ["cafe"]
      },
      fast_food: {
        id: "fast_food",
        labelKey: "category.food.fast_food",
        icon: "🍔",
        icons: ["fast_food"]
      },
      bar_pub: {
        id: "bar_pub",
        labelKey: "category.food.bar_pub",
        icon: "🍻",
        icons: ["bar", "pub"]
      },
      ice_cream: {
        id: "ice_cream",
        labelKey: "category.food.ice_cream",
        icon: "🍨",
        icons: ["ice_cream"]
      },
      bakery: {
        id: "bakery",
        labelKey: "category.food.bakery",
        icon: "🥨",
        icons: ["bakery", "confectionery"]
      }
    }
  },
  shopping: {
    id: "shopping",
    labelKey: "category.shopping",
    icon: "🛒",
    defaultEnabled: true,
    subcategories: {
      supermarket: {
        id: "supermarket",
        labelKey: "category.shopping.supermarket",
        icon: "🏪",
        icons: ["supermarket", "convenience", "shop"]
      },
      food_shop: {
        id: "food_shop",
        labelKey: "category.shopping.food_shop",
        icon: "🍏",
        icons: ["greengrocer", "butcher", "alcohol"]
      },
      general: {
        id: "general",
        labelKey: "category.shopping.general",
        icon: "🛒",
        icons: ["department_store", "gift", "clothes", "shoe", "music", "bicycle", "diy", "garden-centre"]
      }
    }
  },
  health_beauty: {
    id: "health_beauty",
    labelKey: "category.health_beauty",
    icon: "💇",
    defaultEnabled: false,
    subcategories: {
      hairdresser: {
        id: "hairdresser",
        labelKey: "category.health_beauty.hairdresser",
        icon: "💇",
        icons: ["hairdresser", "beauty"]
      },
      pharmacy: {
        id: "pharmacy",
        labelKey: "category.health_beauty.pharmacy",
        icon: "💊",
        icons: ["pharmacy"]
      },
      spa: {
        id: "spa",
        labelKey: "category.health_beauty.spa",
        icon: "🧖",
        icons: ["spa"]
      },
      hospital: {
        id: "hospital",
        labelKey: "category.health_beauty.hospital",
        icon: "🏥",
        icons: ["hospital"]
      }
    }
  },
  accommodation: {
    id: "accommodation",
    labelKey: "category.accommodation",
    icon: "🏨",
    defaultEnabled: false,
    subcategories: {
      hotel: {
        id: "hotel",
        labelKey: "category.accommodation.hotel",
        icon: "🏨",
        icons: ["guest_house"]
      },
      hut: {
        id: "hut",
        labelKey: "category.accommodation.hut",
        icon: "🛖",
        icons: ["hut"]
      }
    }
  },
  culture: {
    id: "culture",
    labelKey: "category.culture",
    icon: "🎭",
    defaultEnabled: false,
    subcategories: {
      entertainment: {
        id: "entertainment",
        labelKey: "category.culture.entertainment",
        icon: "🎭",
        icons: ["cinema", "theatre", "museum", "monument"]
      },
      library: {
        id: "library",
        labelKey: "category.culture.library",
        icon: "📚",
        icons: ["library"]
      }
    }
  },
  sports: {
    id: "sports",
    labelKey: "category.sports",
    icon: "🏃",
    defaultEnabled: false,
    subcategories: {
      facilities: {
        id: "facilities",
        labelKey: "category.sports.facilities",
        icon: "🏃",
        icons: ["sports", "pitch", "stadium", "golf", "swimming"]
      }
    }
  },
  education: {
    id: "education",
    labelKey: "category.education",
    icon: "🎓",
    defaultEnabled: false,
    subcategories: {
      school: {
        id: "school",
        labelKey: "category.education.school",
        icon: "🏫",
        icons: ["school", "college", "playground"]
      }
    }
  },
  other: {
    id: "other",
    labelKey: "category.other",
    icon: "⭐",
    defaultEnabled: true,
    subcategories: {
      misc: {
        id: "misc",
        labelKey: "category.other.misc",
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
