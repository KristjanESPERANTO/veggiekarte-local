/** @module zoom-radius-supercluster */

import Supercluster from "supercluster";

/** Supercluster with a cluster radius that depends on the zoom level. */
export class ZoomRadiusSupercluster extends Supercluster {
  constructor(options, radiusForZoom) {
    super(options);
    this._radiusForZoom = radiusForZoom;
  }

  _cluster(data, ...clusterArgs) {
    const [, zoom] = clusterArgs;
    this.options.radius = this._radiusForZoom(zoom);
    return super._cluster(data, ...clusterArgs);
  }

  getChildren(clusterId) {
    // A cluster's children were merged with the radius of the zoom level the cluster was formed on
    this.options.radius = this._radiusForZoom(this._getOriginZoom(clusterId) - 1);
    return super.getChildren(clusterId);
  }
}
