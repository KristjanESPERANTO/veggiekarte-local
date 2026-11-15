// Leaflet 2 beta removed Class.extend and Browser; the plugins and our controls still use them.
import { Control, Marker } from "leaflet";

function addExtend(BaseClass) {
  BaseClass.extend = function extend(definition) {
    const { options = {}, initialize, ...methods } = definition;

    class Extended extends this {
      static defaultOptions = options;

      constructor(...args) {
        super(...args);
        if (new.target === Extended) { initialize?.apply(this, args); }
      }
    }

    Object.assign(Extended.prototype, methods);
    return Extended;
  };
}

addExtend(Control);
addExtend(Marker);

export * from "leaflet";

export const Browser = {
  touch: typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)
};
